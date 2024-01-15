using ClosedXML.Excel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Content;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Guids;
using ZeroOneSystem.Common;
using ZeroOneSystem.Constants;
using ZeroOneSystem.Extensions;
using ZeroOneSystem.ProductAdjustments.Dto;

namespace ZeroOneSystem.ProductAdjustments
{
    public class ProductAdjustmentAppService : BaseAppService, IProductAdjustmentAppService
    {
        private readonly IRepository<ProductAdjustment, Guid> _productAdjustmentRepository;

        public ProductAdjustmentAppService(
            IGuidGenerator guidGenerator, 
            IRepository<ProductAdjustment, Guid> productAdjustmentRepository)
            : base(guidGenerator)
        {
            _productAdjustmentRepository = productAdjustmentRepository;
        }

        public async Task CreateAsync(CreateProductAdjustmentDto input)
        {
            var isDuplicate = await _productAdjustmentRepository
                .AnyAsync(x => x.DocumentNo.ToLower() == input.DocumentNo.ToLower());

            if (isDuplicate)
            {
                throw new UserFriendlyException("Unable to add Product Adjustment: Duplicate item.");
            }

            var productAdjustment = ProductAdjustment.Create(
                _guidGenerator.Create(),
                input.DocumentNo,
                input.DocumentDate,
                input.Description ?? string.Empty);

            foreach (var item in input.ProductAdjustmentItems)
            {
                productAdjustment.AddProductAdjustmentItem(
                    item.ItemCode,
                    item.Description ?? string.Empty,
                    item.Uom,
                    item.Quantity,
                    item.UnitCost);
            }

            await _productAdjustmentRepository.InsertAsync(productAdjustment);
        }

        public async Task<PagedResultDto<ProductAdjustmentDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        {
            if (input.Sorting.IsNullOrEmpty())
            {
                input.Sorting = nameof(ProductAdjustment.DocumentNo);
            }

            var totalCount = await _productAdjustmentRepository.CountAsync();

            var productAdjustments = await _productAdjustmentRepository.GetPagedListAsync(
                input.SkipCount, input.MaxResultCount, input.Sorting);

            var productAdjustmentDtos = ObjectMapper.Map<List<ProductAdjustment>, List<ProductAdjustmentDto>>(productAdjustments);

            foreach (var productAdjustment in productAdjustmentDtos)
            {
                productAdjustment.TotalCost = productAdjustment.ProductAdjustmentItems
                    .Sum(x => x.UnitCost * x.Quantity);
            }

            return new PagedResultDto<ProductAdjustmentDto>
            {
                TotalCount = totalCount,
                Items = productAdjustmentDtos 
            };
        }

        public async Task<ProductAdjustmentDto> GetAsync(Guid id)
        {
            var productAdjustment = await _productAdjustmentRepository.GetAsync(id)
                ?? throw new EntityNotFoundException(typeof(ProductAdjustment), id);

            return ObjectMapper.Map<ProductAdjustment, ProductAdjustmentDto>(productAdjustment);
        }

        public async Task UpdateAsync(Guid id, UpdateProductAdjustmentDto input)
        {
            var productAdjustment = await _productAdjustmentRepository.GetAsync(id)
                ?? throw new EntityNotFoundException(typeof(ProductAdjustment), id);

            productAdjustment.Update(input.DocumentDate, input.Description ?? string.Empty);

            var newItems = ObjectMapper
                .Map<ICollection<ProductAdjustmentItemDto>, ICollection<ProductAdjustmentItem>>(
                input.ProductAdjustmentItems);

            var existingItems = productAdjustment.ProductAdjustmentItems;

            var itemsToRemove = existingItems.Except(newItems);
            foreach (var item in itemsToRemove)
            {
                productAdjustment.RemoveProductAdjustmentItem(item.ItemCode);
            }

            var itemsToAdd = newItems.Except(existingItems);
            foreach (var item in itemsToAdd)
            {
                productAdjustment.AddProductAdjustmentItem(
                    item.ItemCode, item.Description ?? string.Empty, item.Uom, item.Quantity, item.UnitCost);
            }

            var itemsToUpdate = newItems.Intersect(existingItems);
            foreach (var item in itemsToUpdate)
            {
                productAdjustment.UpdateProductAdjustmentItem(
                    item.ItemCode, item.Description ?? string.Empty, item.Uom, item.Quantity, item.UnitCost);
            }

            await _productAdjustmentRepository.UpdateAsync(productAdjustment);
        }

        public async Task DeleteAsync(Guid id)
        {
            var isProductAdjustmentExist = await _productAdjustmentRepository.AnyAsync(x => x.Id == id);

            if (!isProductAdjustmentExist)
            {
                throw new EntityNotFoundException(typeof(ProductAdjustment), id);
            }

            await _productAdjustmentRepository.DeleteAsync(id);
        }

        public async Task<IRemoteStreamContent> ExportAsync()
        {
            var productAdjustments = await _productAdjustmentRepository.GetListAsync();

            if (productAdjustments.Count < 1)
            {
                throw new UserFriendlyException("There is nothing to export.");
            }

            var memoryStream = new MemoryStream();

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add(L["ProductAdjustments"]);

                string[][] columnNames = [
                    [
                        L["ProductAdjustments:DocumentNumber"],
                        L["ProductAdjustments:Date"],
                        L["ProductAdjustments:Description"],
                        L["ProductAdjustments:Total"],
                        L["Common:CreationTime"]
                    ]
                ];

                worksheet.Cell(1, 1).InsertData(columnNames);

                var productAdjustmentToExport = productAdjustments.AsEnumerable().Select(x => new
                {
                    x.DocumentNo,
                    DocumentDate = x.DocumentDate.ToExcelDateString(),
                    x.Description,
                    TotalCost = x.ProductAdjustmentItems.Sum(y => y.UnitCost * y.SubTotal),
                    CreationTime = x.CreationTime.ToExcelDateTimeString()
                });

                worksheet.Cell(2, 1).InsertData(productAdjustmentToExport);

                worksheet.BeautifySheet();

                workbook.SaveAs(memoryStream);
            }

            memoryStream.Position = 0;

            var sb = new StringBuilder(ExportConstants.PRODUCT_ADJUSTMENTS_PREFIX)
                .Append(DateTime.Now.ToExcelTimestampString());

            return new RemoteStreamContent(memoryStream, sb.ToString(), ExportConstants.CONTENT_TYPE);
        }

        public async Task<string> GenerateDocumentNoAsync()
        {
            var count = await _productAdjustmentRepository.CountAsync();

            count++;

            var currentDate = DateTime.Now;

            var sb = new StringBuilder("ADJ")
                .Append(currentDate.ToString("yy"))
                .Append(currentDate.ToString("MM"))
                .Append('-')
                .Append(count.ToString("D4"));

            return sb.ToString();
        }
    }
}
