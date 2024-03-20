using ClosedXML.Excel;
using DocumentFormat.OpenXml.Bibliography;
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
using ZeroOneSystem.Drivers;
using ZeroOneSystem.Drivers.Dto;
using ZeroOneSystem.Enums;
using ZeroOneSystem.Extensions;
using ZeroOneSystem.Trips.Dto;
using ZeroOneSystem.Vehicles;
using ZeroOneSystem.Vehicles.Dto;

namespace ZeroOneSystem.Trips
{
    public class TripAppService : BaseAppService, ITripAppService
    {
        private readonly ITripRepository _tripRepository;
        private readonly IDriverRepository _driverRepository;
        private readonly IVehicleRepository _vehicleRepository;

        public TripAppService(
            IGuidGenerator guidGenerator,
            ITripRepository tripRepository,
            IDriverRepository driverRepository,
            IVehicleRepository vehicleRepository)
            : base (guidGenerator)
        {
            _tripRepository = tripRepository;
            _driverRepository = driverRepository;
            _vehicleRepository = vehicleRepository;
        }

        public async Task CreateAsync(CreateTripDto input)
        {
            var isDuplicate = await _tripRepository.AnyAsync(x => x.TripNo == input.TripNo);

            if (isDuplicate)
            {
                throw new UserFriendlyException("Unable to add Trip: Duplicate item.");
            }

            var trip = Trip.Create(
                _guidGenerator.Create(),
                input.TripNo,
                input.TripType,
                input.TripDate,
                input.TripStatus,
                input.CustomerName,
                input.ReferDocNo,
                input.Priority,
                input.Remark ?? string.Empty,
                input.SiteName,
                input.SiteDetail,
                input.SiteAddress,
                input.ContactPerson,
                input.ContactNo,
                input.DriverId,
                input.VehicleId);

            await _tripRepository.InsertAsync(trip, true);
        }

        public async Task<PagedResultDto<TripDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        {
            if (input.Sorting.IsNullOrEmpty())
            {
                input.Sorting = nameof(TripDto.TripNo);
            }
            
            var totalCount = await _tripRepository.CountAsync();

            var trips = await _tripRepository.GetPagedListAsync(
                input.SkipCount, input.MaxResultCount, input.Sorting);

            var driverDictionary = await GetDriverDictionaryAsync(trips);

            var vehicleDictionary = await GetVehicleDictionaryAsync(trips);

            var tripDtos = ObjectMapper.Map<List<Trip>, List<TripDto>>(trips);

            tripDtos.ForEach(x =>
            {
                x.SiteDetails = x.GetTripSiteDetails();
                x.DriverName = driverDictionary.TryGetValue(x.DriverId, out Driver? driver) ? driver.DriverName : string.Empty; 
                x.VehiclePlate = vehicleDictionary.TryGetValue(x.VehicleId, out Vehicle? vehicle) ? vehicle.VehiclePlate : string.Empty;
            });

            return new PagedResultDto<TripDto>
            {
                TotalCount = totalCount,
                Items = tripDtos
            };
        }

        public async Task<TripDto> GetAsync(Guid id)
        {
            var trip = await _tripRepository.GetAsync(id)
                ?? throw new EntityNotFoundException(typeof(Trip), id);

            var tripDto = ObjectMapper.Map<Trip, TripDto>(trip);

            try
            {
                var driver = await _driverRepository.GetAsync(trip.DriverId);
                tripDto.DriverName = driver.DriverName;
            }
            catch (EntityNotFoundException)
            {
                tripDto.DriverName = string.Empty;
            }

            try
            {
                var vehicle = await _vehicleRepository.GetAsync(trip.VehicleId);
                tripDto.VehiclePlate = vehicle.VehiclePlate;
            }
            catch (EntityNotFoundException)
            {
                tripDto.VehiclePlate = string.Empty;
            }

            return tripDto;
        }

        public async Task UpdateAsync(Guid id, UpdateTripDto input)
        {
            var trip = await _tripRepository.GetAsync(x => x.Id == id)
                ?? throw new EntityNotFoundException(typeof(Trip), id);

            trip.Update(
                input.TripType,
                input.TripDate,
                input.TripStatus,
                input.CustomerName,
                input.ReferDocNo,
                input.Priority,
                input.Remark ?? string.Empty,
                input.SiteName,
                input.SiteDetail,
                input.SiteAddress,
                input.ContactPerson,
                input.ContactNo,
                input.DriverId,
                input.VehicleId);

            await _tripRepository.UpdateAsync(trip);
        }

        public async Task DeleteAsync(Guid id)
        {
            var isTripExist = await _tripRepository.AnyAsync(x => x.Id == id);

            if (!isTripExist)
            {
                throw new EntityNotFoundException(typeof(Trip), id);
            }

            await _tripRepository.DeleteAsync(id);
        }

        public async Task<IRemoteStreamContent> ExportAsync()
        {
            var trips = await _tripRepository.GetListAsync();

            if (trips.Count < 1)
            {
                throw new UserFriendlyException("There is nothing to export.");
            }

            var memoryStream = new MemoryStream();

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add(L["Trips"]);

                string[][] columnNames = [
                    [
                        L["Trip:Date"], 
                        L["Trip:Date"], 
                        L["Trip:Status"], 
                        L["Trip:Type"],
                        L["Trip:CustomerName"], 
                        L["Trip:ReferDocNo"], 
                        L["Trip:Priority"],
                        L["Trip:SiteDetails"], 
                        L["Trip:Driver"], 
                        L["Trip:Vehicle"],
                        L["Trip:Remark"], 
                        L["Common:CreationTime"]
                    ]
                ];

                worksheet.Cell(1, 1).InsertData(columnNames);

                var driverDictionary = await GetDriverDictionaryAsync(trips);

                var vehicleDictionary = await GetVehicleDictionaryAsync(trips);

                var tripsToExport = trips.AsEnumerable().Select(x => new
                {
                    x.TripNo,
                    TripDate = x.TripDate.ToExcelDateString(),
                    TripStatus = x.TripStatus.GetDescription(),
                    TripType = x.TripType.GetDescription(),
                    x.CustomerName,
                    x.ReferDocNo,
                    Priority = x.Priority.GetDescription(),
                    SiteDetails = x.GetTripSiteDetails(),
                    driverDictionary[x.DriverId].DriverName,
                    vehicleDictionary[x.VehicleId].VehiclePlate,
                    x.Remark,
                    CreationTime = x.CreationTime.ToExcelDateTimeString()
                });

                worksheet.Cell(2, 1).InsertData(tripsToExport);

                worksheet.BeautifySheet();

                workbook.SaveAs(memoryStream);
            }

            memoryStream.Position = 0;

            var sb = new StringBuilder(ExportConstants.TRIPS_PREFIX)
                .Append(DateTime.Now.ToTimestampString());

            return new RemoteStreamContent(memoryStream, sb.ToString(), ExportConstants.CONTENT_TYPE);
        }

        public async Task<ListResultDto<DriverLookupDto>> GetDriverLookupAsync()
        {
            var drivers = await _driverRepository.GetListAsync();

            return new ListResultDto<DriverLookupDto>(ObjectMapper.Map<List<Driver>, List<DriverLookupDto>>(drivers));
        }

        public async Task<ListResultDto<VehicleLookupDto>> GetVehicleLookupAsync()
        {
            var vehicles = await _vehicleRepository.GetListAsync();

            return new ListResultDto<VehicleLookupDto>(ObjectMapper.Map<List<Vehicle>, List<VehicleLookupDto>>(vehicles));
        }

        public async Task<string> GetTripNoAsync()
        {
            var count = await _tripRepository.CountAsync();

            count++;

            var currentDate = DateTime.Now;

            var sb = new StringBuilder(currentDate.ToString("yy"))
                .Append(currentDate.ToString("MM"))
                .Append('-')
                .Append(count.ToString("D4"));

            return sb.ToString();
        }

        private async Task<Dictionary<Guid, Driver>> GetDriverDictionaryAsync(List<Trip> trips)
        {
            var driverIds = trips.Select(x => x.DriverId).Distinct().ToArray();

            var drivers = await _driverRepository.GetListAsync(x => driverIds.Contains(x.Id));

            return drivers.ToDictionary(x => x.Id, x => x);
        }

        private async Task<Dictionary<Guid, Vehicle>> GetVehicleDictionaryAsync(List<Trip> trips)
        {
            var vehicleIds = trips.Select(x => x.VehicleId).Distinct().ToArray();

            var vehicles = await _vehicleRepository.GetListAsync(x => vehicleIds.Contains(x.Id));

            return vehicles.ToDictionary(x => x.Id, x => x);
        }
    }
}
