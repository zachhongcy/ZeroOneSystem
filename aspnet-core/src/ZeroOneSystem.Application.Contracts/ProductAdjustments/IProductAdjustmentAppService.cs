using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Content;
using ZeroOneSystem.ProductAdjustments.Dto;

namespace ZeroOneSystem.ProductAdjustments
{
    public interface IProductAdjustmentAppService : IApplicationService
    {
        Task CreateAsync(CreateProductAdjustmentDto input);
        Task<PagedResultDto<ProductAdjustmentDto>> GetListAsync(PagedAndSortedResultRequestDto input);
        Task<ProductAdjustmentDto> GetAsync(Guid id);
        Task UpdateAsync(Guid id, UpdateProductAdjustmentDto input);
        Task DeleteAsync(Guid id);
        Task<IRemoteStreamContent> ExportAsync();
        Task<string> GenerateDocumentNoAsync();
    }
}
