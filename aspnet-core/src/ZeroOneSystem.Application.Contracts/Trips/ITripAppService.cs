using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Content;
using ZeroOneSystem.Drivers.Dto;
using ZeroOneSystem.Trips.Dto;
using ZeroOneSystem.Vehicles.Dto;

namespace ZeroOneSystem.Trips
{
    public interface ITripAppService : IApplicationService
    {
        Task CreateAsync(CreateTripDto input);
        Task<PagedResultDto<TripDto>> GetListAsync(PagedAndSortedResultRequestDto input);
        Task<TripDto> GetAsync(Guid id);
        Task UpdateAsync(Guid id, UpdateTripDto input);
        Task DeleteAsync(Guid id);
        Task<IRemoteStreamContent> ExportAsync();
        Task<ListResultDto<DriverLookupDto>> GetDriverLookupAsync();
        Task<ListResultDto<VehicleLookupDto>> GetVehicleLookupAsync();
        Task<string> GetTripNoAsync();
    }
}
