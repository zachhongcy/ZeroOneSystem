using ClosedXML.Excel;
using DocumentFormat.OpenXml.Bibliography;
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
using ZeroOneSystem.Drivers.Dto;
using ZeroOneSystem.Enums;
using ZeroOneSystem.Extensions;

namespace ZeroOneSystem.Drivers
{
    public class DriverAppService : BaseAppService, IDriverAppService
    {
        private readonly IDriverRepository _driverRepository;
        private readonly IFileService<DriverImageContainer> _fileService;

        public DriverAppService(
            IGuidGenerator guidGenerator,
            IDriverRepository driverRepository,
            IFileService<DriverImageContainer> fileService) 
            : base(guidGenerator)
        {
            _driverRepository = driverRepository;
            _fileService = fileService;
        }

        public async Task CreateAsync(CreateDriverDto input)
        {
            var isDuplicate = await _driverRepository.AnyAsync(x => x.DriverNo == input.DriverNo);

            if (isDuplicate)
            {
                throw new UserFriendlyException("Unable to add Driver: Duplicate item.");
            }

            var uploadedImageFileName = string.Empty;

            if (!input.ImageContent.IsNullOrEmpty())
            {
                uploadedImageFileName = await _fileService.UploadAsync(input.ImageName, input.ImageContent);
            }

            var driver = Driver.Create(
                _guidGenerator.Create(),
                input.DriverNo,
                input.DriverName,
                input.LicenseNo,
                input.LicenseExpiryDate,
                input.ContactNo,
                input.EmployeeCategory,
                input.Password,
                input.Status,
                input.Remark ?? string.Empty,
                input.EmergencyContactName,
                input.EmergencyRelationship,
                input.EmergencyContactNo,
                input.Address,
                uploadedImageFileName);

            await _driverRepository.InsertAsync(driver, true);
        }

        public async Task<PagedResultDto<DriverDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        {
            if (input.Sorting.IsNullOrEmpty())
            {
                input.Sorting = nameof(Driver.DriverNo);
            }

            var totalCount = await _driverRepository.CountAsync();

            var drivers = await _driverRepository.GetPagedListAsync(
                input.SkipCount, input.MaxResultCount, input.Sorting);

            var driverDtos = ObjectMapper.Map<List<Driver>, List<DriverDto>>(drivers);
            return new PagedResultDto<DriverDto>
            {
                TotalCount = totalCount,
                Items = driverDtos
            };
        }

        public async Task<DriverDto> GetAsync(Guid id)
        {
            var driver = await _driverRepository.GetAsync(id)
                ?? throw new EntityNotFoundException(typeof(Driver), id);

            var driverDto = ObjectMapper.Map<Driver, DriverDto>(driver);

            return driverDto;
        }

        public async Task UpdateAsync(Guid id, UpdateDriverDto input)
        {
            var driver = await _driverRepository.GetAsync(x => x.Id == id)
                ?? throw new EntityNotFoundException(typeof(UpdateDriverDto), id);

            var uploadedImageFileName = driver.ImageFileName;

            if (!input.ImageContent.IsNullOrEmpty())
            {
                uploadedImageFileName = await _fileService.UploadAsync(input.ImageName, input.ImageContent);
            }

            driver.Update(
                input.DriverName,
                input.LicenseNo,
                input.LicenseExpiryDate,
                input.ContactNo,
                input.EmployeeCategory,
                input.Password,
                input.Status,
                input.Remark ?? string.Empty,
                input.EmergencyContactName,
                input.EmergencyRelationship,
                input.EmergencyContactNo,
                input.Address,
                uploadedImageFileName);

            await _driverRepository.UpdateAsync(driver);
        }

        public async Task DeleteAsync(Guid id)
        {
            var driver = await _driverRepository.GetAsync(id);
            var isDriverExist = driver.Id == id;

            if (!isDriverExist)
            {
                throw new EntityNotFoundException(typeof(Driver), id);
            }

            if (!driver.ImageFileName.IsNullOrEmpty())
            {
                await _fileService.DeleteAsync(driver.ImageFileName);
            }

            await _driverRepository.DeleteAsync(id);
        }

        public async Task<IRemoteStreamContent> ExportAsync()
        {
            var drivers = await _driverRepository.GetListAsync();

            if (drivers.Count < 1)
            {
                throw new UserFriendlyException("There is nothing to export.");
            }

            var memoryStream = new MemoryStream();

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add(L["Drivers"]);

                string[][] columnNames = [
                    [
                        L["Driver:Number"],
                        L["Driver:Name"],
                        L["Driver:LicenseNo"],
                        L["Driver:LicenseExpiryDate"],
                        L["Driver:ContactNo"],
                        L["Driver:EmployeeCategory"],
                        L["Driver:Status"],
                        L["Common:CreationTime"]
                    ]
                ];

                worksheet.Cell(1, 1).InsertData(columnNames);

                var driversToExport = drivers.AsEnumerable().Select(x => new
                {
                    x.DriverNo,
                    x.DriverName,
                    x.LicenseNo,
                    LicenseExpiryDate = x.LicenseExpiryDate.ToExcelDateString(),
                    x.ContactNo,
                    x.EmployeeCategory,
                    Status = x.Status.GetDescription(),
                    CreationTime = x.CreationTime.ToExcelDateTimeString(),
                });

                worksheet.Cell(2, 1).InsertData(driversToExport);

                worksheet.BeautifySheet();

                workbook.SaveAs(memoryStream);
            }

            memoryStream.Position = 0;

            var sb = new StringBuilder(ExportConstants.DRIVERS_PREFIX)
                .Append(DateTime.Now.ToTimestampString());

            return new RemoteStreamContent(memoryStream, sb.ToString(), ExportConstants.CONTENT_TYPE);
        }

        [HttpGet]
        public async Task<string> GetDriverNoAsync()
        {
            var count = await _driverRepository.CountAsync();

            count++;

            var currentDate = DateTime.Now;

            var sb = new StringBuilder()
                .Append('D')
                .Append(currentDate.ToString("yy"))
                .Append(currentDate.ToString("MM"))
                .Append('-')
                .Append(count.ToString("D4"));

            return sb.ToString();
        }

        [HttpGet]
        public async Task<string> GetImageContentAsync(Guid id)
        {
            var driver = await _driverRepository.GetAsync(id);

            return await _fileService.GetBase64ContentAsync(driver.ImageFileName);
        }
    }
}
