using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Content;
using ZeroOneSystem.ProductGroups.Dto;

namespace ZeroOneSystem.ProductGroups
{
    public interface IProductGroupAppService : IApplicationService
    {
        Task CreateAsync(CreateProductGroupDto input);
        Task<PagedResultDto<ProductGroupDto>> GetListAsync(PagedAndSortedResultRequestDto input);
        Task<ProductGroupDto> GetAsync(Guid id);
        Task UpdateAsync(Guid id, UpdateProductGroupDto input);
        Task DeleteAsync(Guid id);
        Task<IRemoteStreamContent> ExportAsync();
    }
}
