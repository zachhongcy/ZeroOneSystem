using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Content;
using ZeroOneSystem.Vehicles.Dto;

namespace ZeroOneSystem.Vehicles
{
    public interface IVehicleAppService : IApplicationService
    {
        Task CreateAsync(CreateVehicleDto input);
        Task<PagedResultDto<VehicleDto>> GetListAsync(PagedAndSortedResultRequestDto input);
        Task<VehicleDto> GetAsync(Guid id);
        Task UpdateAsync(Guid id, UpdateVehicleDto input);
        Task DeleteAsync(Guid id);
        Task<IRemoteStreamContent> ExportAsync();
    }
}
