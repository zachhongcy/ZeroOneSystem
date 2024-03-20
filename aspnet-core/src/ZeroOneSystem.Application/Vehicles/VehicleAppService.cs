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
using Volo.Abp.Content;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Guids;
using ZeroOneSystem.BlobContainers;
using ZeroOneSystem.Common;
using ZeroOneSystem.Constants;
using ZeroOneSystem.Enums;
using ZeroOneSystem.Extensions;
using ZeroOneSystem.Vehicles.Dto;

namespace ZeroOneSystem.Vehicles
{
    public class VehicleAppService : BaseAppService, IVehicleAppService
    {
        private readonly IVehicleRepository _vehicleRepository;
        private readonly IFileService<VehicleImageContainer> _fileService;

        public VehicleAppService(
            IGuidGenerator guidGenerator,
            IVehicleRepository vehicleRepository,
            IFileService<VehicleImageContainer> fileService)
            : base(guidGenerator)
        {
            _vehicleRepository = vehicleRepository;
            _fileService = fileService;
        }

        public async Task CreateAsync(CreateVehicleDto input)
        {
            var imageFileName = string.Empty;

            if (!input.ImageContent.IsNullOrEmpty())
            {
                imageFileName = await _fileService.UploadAsync(input.ImageName, input.ImageContent);
            }

            var vehicle = Vehicle.Create(
                _guidGenerator.Create(),
                input.VehicleType,
                imageFileName,
                input.VehiclePlate,
                input.VehicleModel,
                input.RoadTaxExpiryDate,
                input.ServiceDate,
                input.Status,
                input.Remark ?? string.Empty);

            await _vehicleRepository.InsertAsync(vehicle);
        }

        public async Task<PagedResultDto<VehicleDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        {
            if (input.Sorting.IsNullOrEmpty())
            {
                input.Sorting = nameof(Vehicle.VehiclePlate);
            }

            var totalCount = await _vehicleRepository.CountAsync();

            var vehicles = await _vehicleRepository.GetPagedListAsync(
                input.SkipCount, input.MaxResultCount, input.Sorting);

            var vehicleDtos = ObjectMapper.Map<List<Vehicle>, List<VehicleDto>>(vehicles);

            return new PagedResultDto<VehicleDto>
            {
                TotalCount = totalCount,
                Items = vehicleDtos
            };
        }

        public async Task<VehicleDto> GetAsync(Guid id)
        {
            var vehicle = await _vehicleRepository.GetAsync(id)
                ?? throw new EntityNotFoundException(typeof(Vehicle), id);

            var vehicleDto = ObjectMapper.Map<Vehicle, VehicleDto>(vehicle);

            return vehicleDto;
        }

        public async Task UpdateAsync(Guid id, UpdateVehicleDto input)
        {
            var vehicle = await _vehicleRepository.GetAsync(id)
                ?? throw new EntityNotFoundException(typeof(Vehicle), id);

            var imageFileName = vehicle.ImageFileName;

            if (!input.ImageContent.IsNullOrEmpty())
            {
                imageFileName = await _fileService.UploadAsync(input.ImageName, input.ImageContent);

                if (!vehicle.ImageFileName.IsNullOrEmpty())
                {
                    await _fileService.DeleteAsync(vehicle.ImageFileName);
                }
            }

            vehicle.Update(
                input.VehicleType,
                imageFileName,
                input.VehiclePlate,
                input.VehicleModel,
                input.RoadTaxExpiryDate,
                input.ServiceDate,
                input.Status,
                input.Remark ?? string.Empty);

            await _vehicleRepository.UpdateAsync(vehicle);
        }

        public async Task DeleteAsync(Guid id)
        {
            var vehicle = await _vehicleRepository.GetAsync(id);

            var isVehicleExist = vehicle.Id == id;

            if (!isVehicleExist)
            {
                throw new EntityNotFoundException(typeof(Vehicle), id);
            }

            if (!vehicle.ImageFileName.IsNullOrEmpty())
            {
                await _fileService.DeleteAsync(vehicle.ImageFileName);
            }

            await _vehicleRepository.DeleteAsync(id);
        }

        public async Task<IRemoteStreamContent> ExportAsync()
        {
            var vehicles = await _vehicleRepository.GetListAsync();

            if (vehicles.Count <= 0)
            {
                throw new UserFriendlyException("There is nothing to export.");
            }

            var memoryStream = new MemoryStream();

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add(L["Vehicles"]);

                string[][] columnNames = [
                    [
                        L["Vehicle:Plate"],
                        L["Vehicle:Model"],
                        L["Vehicle:Type"],
                        L["Vehicle:RoadTaxExpiryDate"],
                        L["Vehicle:ServiceDate"],
                        L["Vehicle:Status"],
                        L["Common:CreationTime"],
                    ]
                ];

                worksheet.Cell(1, 1).InsertData(columnNames);

                var vehiclesToExport = vehicles.AsEnumerable().Select(x => new
                {
                    x.VehiclePlate,
                    x.VehicleModel,
                    VehicleType = x.VehicleType.GetDescription(),
                    RoadTaxExpiryDate = x.RoadTaxExpiryDate.ToExcelDateString(),
                    ServiceDate = x.ServiceDate.ToShortDateString(),
                    Status = x.Status.GetDescription(),
                    CreationTime = x.CreationTime.ToExcelDateTimeString()
                });

                worksheet.Cell(2, 1).InsertData(vehiclesToExport);

                worksheet.BeautifySheet();

                workbook.SaveAs(memoryStream);
            }

            memoryStream.Position = 0;

            var sb = new StringBuilder(ExportConstants.VEHICLES_PREFIX)
                .Append(DateTime.Now.ToTimestampString());

            return new RemoteStreamContent(memoryStream, sb.ToString(), ExportConstants.CONTENT_TYPE);
        }

        [HttpGet]
        public async Task<string> GetImageContentAsync(Guid id)
        {
            var vehicle = await _vehicleRepository.GetAsync(id);

            return await _fileService.GetBase64ContentAsync(vehicle.ImageFileName);
        }
    }
}
