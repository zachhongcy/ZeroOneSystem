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
using ZeroOneSystem.ProductGroups.Dto;

namespace ZeroOneSystem.ProductGroups
{
    public class ProductGroupAppService : BaseAppService, IProductGroupAppService
    {
        private readonly IProductGroupRepository _productGroupRepository;

        public ProductGroupAppService(
            IGuidGenerator guidGenerator,
            IProductGroupRepository productGroupRepository)
            : base(guidGenerator)
        {
            _productGroupRepository = productGroupRepository;
        }

        public async Task CreateAsync(CreateProductGroupDto input)
        {
            var isDuplicate = await _productGroupRepository
                .AnyAsync(x => x.ShortCode.ToLower() == input.ShortCode.ToLower());

            if (isDuplicate)
            {
                throw new UserFriendlyException("Unable to add Product Group: Duplicate item.");
            }

            var productGroup = ProductGroup.CreateProductGroup(
                _guidGenerator.Create(),
                input.Name,
                input.ShortCode,
                input.Description,
                input.Status,
                input.IsForSales);

            await _productGroupRepository.InsertAsync(productGroup);
        }

        public async Task<PagedResultDto<ProductGroupDto>> GetListAsync(GetProductGroupsDto input)
        {
            if (input.Sorting.IsNullOrEmpty())
            {
                input.Sorting = nameof(ProductGroup.Name);
            }

            var totalCount = await _productGroupRepository.CountAsync();

            var productGroups = await _productGroupRepository
                .GetListAsync(input.SkipCount, input.MaxResultCount, input.Sorting, input.Filter);

            return new PagedResultDto<ProductGroupDto>
            {
                TotalCount = totalCount,
                Items = ObjectMapper.Map<List<ProductGroup>, List<ProductGroupDto>>(productGroups)
            };
        }

        public async Task<ProductGroupDto> GetAsync(Guid id)
        {
            var productGroup = await _productGroupRepository.GetAsync(id)
                ?? throw new EntityNotFoundException(typeof(ProductGroup), id);

            return ObjectMapper.Map<ProductGroup, ProductGroupDto>(productGroup);
        }

        public async Task UpdateAsync(Guid id, UpdateProductGroupDto input)
        {
            var productGroup = await _productGroupRepository.GetAsync(x => x.Id == id)
                ?? throw new EntityNotFoundException(typeof(ProductGroup), id);

            productGroup.UpdateProductGroup(
                input.Name,
                input.ShortCode,
                input.Description,
                input.Status,
                input.IsForSales);

            await _productGroupRepository.UpdateAsync(productGroup);
        }

        public async Task DeleteAsync(Guid id)
        {
            var isProductGroupExist = await _productGroupRepository.AnyAsync(x => x.Id == id);

            if (!isProductGroupExist)
            {
                throw new EntityNotFoundException(typeof(ProductGroup), id);
            }

            await _productGroupRepository.DeleteAsync(id);
        }

        public async Task<IRemoteStreamContent> ExportAsync()
        {
            var productGroups = await _productGroupRepository.GetListAsync();

            if (productGroups.Count <= 0)
            {
                throw new UserFriendlyException("There is nothing to export.");
            }

            var memoryStream = new MemoryStream();

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add(L["ProductGroups"]);

                string[][] columnNames = [
                    [
                        L["ProductGroup:Name"],
                        L["ProductGroup:ShortCode"],
                        L["ProductGroup:Description"],
                        L["ProductGroup:Status"],
                        L["ProductGroup:IsForSales"]
                    ]
                ];

                worksheet.Cell(1, 1).InsertData(columnNames);

                var productGroupsToExport = productGroups.AsEnumerable().Select(x => new
                {
                    x.Name,
                    x.ShortCode,
                    x.Description,
                    x.Status,
                    x.IsForSales
                });

                worksheet.Cell(2, 1).InsertData(productGroupsToExport);

                worksheet.BeautifySheet();

                workbook.SaveAs(memoryStream);
            }

            memoryStream.Position = 0;

            var sb = new StringBuilder(ExportConstants.PRODUCT_GROUPS_PREFIX)
                .Append(DateTime.Now.ToTimestampString());

            return new RemoteStreamContent(memoryStream, sb.ToString(), ExportConstants.CONTENT_TYPE);
        }
    }
}
