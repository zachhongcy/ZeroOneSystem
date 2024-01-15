using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Content;
using ZeroOneSystem.ProductGroups.Dto;
using ZeroOneSystem.Products.Dto;

namespace ZeroOneSystem.Products
{
    public interface IProductAppService : IApplicationService
    {
        Task CreateAsync(CreateProductDto input);
        Task<PagedResultDto<ProductDto>> GetListAsync(PagedAndSortedResultRequestDto input);
        Task<ProductDto> GetAsync(Guid id);
        Task UpdateAsync(Guid id, UpdateProductDto input);
        Task DeleteAsync(Guid id);
        Task<ListResultDto<ProductGroupLookupDto>> GetProductGroupLookupAsync();
        Task<IRemoteStreamContent> ExportAsync();
    }
}
