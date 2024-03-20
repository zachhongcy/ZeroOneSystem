using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Content;
using ZeroOneSystem.Drivers.Dto;

namespace ZeroOneSystem.Drivers
{
    public interface IDriverAppService : IApplicationService
    {
        Task CreateAsync(CreateDriverDto input);
        Task<PagedResultDto<DriverDto>> GetListAsync(PagedAndSortedResultRequestDto input);
        Task<DriverDto> GetAsync(Guid id);
        Task UpdateAsync(Guid id, UpdateDriverDto input);
        Task DeleteAsync(Guid id);
        Task<IRemoteStreamContent> ExportAsync();
        Task<string> GetDriverNoAsync();
        Task<string> GetImageContentAsync(Guid id);
    }
}
