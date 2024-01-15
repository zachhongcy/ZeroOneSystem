using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Content;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Guids;
using ZeroOneSystem.BlobContainers;
using ZeroOneSystem.Common;
using ZeroOneSystem.Constants;
using ZeroOneSystem.Enums;
using ZeroOneSystem.Extensions;
using ZeroOneSystem.Localization;
using ZeroOneSystem.ProductGroups;
using ZeroOneSystem.ProductGroups.Dto;
using ZeroOneSystem.Products.Dto;

namespace ZeroOneSystem.Products
{
    public class ProductAppService : ApplicationService, IProductAppService
    {
        private readonly IGuidGenerator _guidGenerator;
        private readonly IRepository<Product, Guid> _productRepository;
        private readonly IRepository<ProductGroup, Guid> _productGroupRepository;
        private readonly IFileService<ProductImageContainer> _fileService;

        public ProductAppService(
            IGuidGenerator guidGenerator,
            IRepository<Product, Guid> productRepository,
            IRepository<ProductGroup, Guid> productGroupRepository,
            IFileService<ProductImageContainer> fileService)
        {
            _guidGenerator = guidGenerator;
            _productRepository = productRepository;
            _productGroupRepository = productGroupRepository;
            _fileService = fileService;
            LocalizationResource = typeof(ZeroOneSystemResource);
        }

        public async Task CreateAsync([FromForm] CreateProductDto input)
        {
            var isDuplicate = await _productRepository.AnyAsync(x => x.Code == input.Code);

            if (isDuplicate)
            {
                throw new UserFriendlyException("Unable to add Product: Duplicate item.");
            }

            var imageFileName = string.Empty;

            if (input.Image != null)
            {
                imageFileName = await _fileService.UploadAsync(input.Image);
            }

            var product = Product.Create(
                _guidGenerator.Create(),
                input.Code,
                imageFileName,
                input.NameEn,
                input.NameCn,
                input.Uom,
                input.QuantityPr,
                input.QuantityPa,
                input.QuantityRu,
                input.QuantityRn,
                input.Status,
                input.Location,
                input.Owner,
                input.ProductGroupId);

            product.SetProductSize(
                input.ProductSize.Type,
                input.ProductSize.Height,
                input.ProductSize.Length,
                input.ProductSize.Width,
                input.ProductSize.Thickness,
                input.ProductSize.Remark ?? string.Empty);

            product.SetProductPrice(
                input.ProductPrice.StandardPurchaseCost,
                input.ProductPrice.MinPurchaseCost,
                input.ProductPrice.MaxPurchaseCost,
                input.ProductPrice.StandardSellingPrice,
                input.ProductPrice.SellingPrice2,
                input.ProductPrice.SellingPrice3,
                input.ProductPrice.MinSellingPrice,
                input.ProductPrice.MaxSellingPrice,
                input.ProductPrice.StandardRentalPrice,
                input.ProductPrice.RentalPrice2,
                input.ProductPrice.RentalPrice3,
                input.ProductPrice.MinRentalPrice,
                input.ProductPrice.MaxRentalPrice);

            await _productRepository.InsertAsync(product);
        }

        public async Task<PagedResultDto<ProductDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        {
            var products = await _productRepository.GetPagedListAsync(
                input.SkipCount, input.MaxResultCount, input.Sorting ?? string.Empty);

            var totalCount = await _productRepository.CountAsync();

            var productGroupDictionary = await GetProductGroupDictionaryAsync(products);

            var productDtos = ObjectMapper.Map<List<Product>, List<ProductDto>>(products);

            await Task.WhenAll(productDtos.Select(async x =>
            {
                x.ImageContent = await _fileService.GetBase64ContentAsync(x.ImageFileName);
                x.ProductQuantities = x.GetProductQuantities();
                x.ProductGroupCodeName = productGroupDictionary[x.ProductGroupId].GetProductGroupCodeName();
            }));

            return new PagedResultDto<ProductDto>
            {
                TotalCount = totalCount,
                Items = productDtos
            };
        }

        public async Task<ProductDto> GetAsync(Guid id)
        {
            var queryable = await _productRepository.WithDetailsAsync(x => x.ProductSize, x => x.ProductPrice);

            var query = queryable.Where(x => x.Id == id);

            var product = await AsyncExecuter.FirstOrDefaultAsync(query)
                ?? throw new EntityNotFoundException(typeof(Product), id);

            var productGroup = await _productGroupRepository.GetAsync(product.ProductGroupId);

            var productDto = ObjectMapper.Map<Product, ProductDto>(product);

            productDto.ProductGroupCodeName = productGroup.GetProductGroupCodeName();

            return productDto;
        }

        public async Task UpdateAsync(Guid id, [FromForm] UpdateProductDto input)
        {
            var queryable = await _productRepository.WithDetailsAsync(x => x.ProductSize, x => x.ProductPrice);

            var query = queryable.Where(x => x.Id == id);

            var product = await AsyncExecuter.FirstOrDefaultAsync(query)
                ?? throw new EntityNotFoundException(typeof(Product), id);

            var imageFileName = product.ImageFileName;

            if (input.Image != null)
            {
                imageFileName = await _fileService.UploadAsync(input.Image);

                if (!product.ImageFileName.IsNullOrEmpty())
                {
                    await _fileService.DeleteAsync(product.ImageFileName);
                }
            }

            product.Update(
                input.Code,
                imageFileName,
                input.NameEn,
                input.NameCn,
                input.Uom,
                input.QuantityPr,
                input.QuantityPa,
                input.QuantityRu,
                input.QuantityRn,
                input.Status,
                input.Location,
                input.Owner,
                input.ProductGroupId);

            product.SetProductSize(
                input.ProductSize.Type,
                input.ProductSize.Height,
                input.ProductSize.Length,
                input.ProductSize.Width,
                input.ProductSize.Thickness,
                input.ProductSize.Remark ?? string.Empty);

            product.SetProductPrice(
                input.ProductPrice.StandardPurchaseCost,
                input.ProductPrice.MinPurchaseCost,
                input.ProductPrice.MaxPurchaseCost,
                input.ProductPrice.StandardSellingPrice,
                input.ProductPrice.SellingPrice2,
                input.ProductPrice.SellingPrice3,
                input.ProductPrice.MinSellingPrice,
                input.ProductPrice.MaxSellingPrice,
                input.ProductPrice.StandardRentalPrice,
                input.ProductPrice.RentalPrice2,
                input.ProductPrice.RentalPrice3,
                input.ProductPrice.MinRentalPrice,
                input.ProductPrice.MaxRentalPrice);

            await _productRepository.UpdateAsync(product);
        }

        public async Task DeleteAsync(Guid id)
        {
            var queryable = await _productRepository.WithDetailsAsync(x => x.ProductSize, x => x.ProductPrice);

            var query = queryable.Where(x => x.Id == id);

            var product = await AsyncExecuter.FirstOrDefaultAsync(query)
                ?? throw new EntityNotFoundException(typeof(Product), id);

            if (!product.ImageFileName.IsNullOrEmpty())
            {
                await _fileService.DeleteAsync(product.ImageFileName);
            }

            await _productRepository.DeleteAsync(id);
        }

        public async Task<IRemoteStreamContent> ExportAsync()
        {
            var products = await _productRepository.GetListAsync();

            if (products.Count <= 0)
            {
                throw new UserFriendlyException("There is nothing to export.");
            }

            var memoryStream = new MemoryStream();

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add(L["Products"]);

                string[][] columnNames = [
                    [
                        L["Product:Code"],
                        L["Product:NameEn"],
                        L["Product:NameCn"],
                        L["Product:ProductGroup"],
                        L["Product:Uom"],
                        L["Product:Quantities"],
                        L["Product:Location"],
                        L["Product:Status"],
                        L["Product:Owner"]
                    ]
                ];

                var productGroupDictionary = await GetProductGroupDictionaryAsync(products);

                var productsToExport = products.AsEnumerable().Select(x => new
                {
                    x.Code,
                    x.NameEn,
                    x.NameCn,
                    ProductGroupCodeName = productGroupDictionary[x.ProductGroupId].GetProductGroupCodeName(),
                    Uom = x.Uom.GetDescription(),
                    ProductQuantities = x.GetProductQuantities(),
                    x.Location,
                    Status = x.Status.GetDescription(),
                    x.Owner
                });

                worksheet.Cell(2, 1).InsertData(productsToExport);

                worksheet.BeautifySheet();

                workbook.SaveAs(memoryStream);
            }

            memoryStream.Position = 0;

            var sb = new StringBuilder(ExportConstants.PRODUCTS_PREFIX)
                .Append(DateTime.Now.ToExcelTimestampString());

            return new RemoteStreamContent(memoryStream, sb.ToString(), ExportConstants.CONTENT_TYPE);
        }

        public async Task<ListResultDto<ProductGroupLookupDto>> GetProductGroupLookupAsync()
        {
            var productGroups = await _productGroupRepository.GetListAsync();

            var productGroupDtos = ObjectMapper.Map<List<ProductGroup>, List<ProductGroupLookupDto>>(productGroups);

            productGroupDtos.ForEach(x =>
            {
                var sb = new StringBuilder(x.ShortCode).Append(" - ").Append(x.Name);

                x.CodeName = sb.ToString();
            });

            return new ListResultDto<ProductGroupLookupDto>(productGroupDtos);
        }

        private async Task<Dictionary<Guid, ProductGroup>> GetProductGroupDictionaryAsync(List<Product> products)
        {
            var productGroupIds = products.Select(x => x.ProductGroupId).Distinct().ToArray();

            var productGroups = await _productGroupRepository.GetListAsync(x => productGroupIds.Contains(x.Id));

            return productGroups.ToDictionary(x => x.Id, x => x);
        }
    }
}
