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
using ZeroOneSystem.Drivers.Dto;
using ZeroOneSystem.Enums;
using ZeroOneSystem.Extensions;

namespace ZeroOneSystem.Drivers
{
    public class DriverAppService : BaseAppService, IDriverAppService
    {
        private readonly IRepository<Driver, Guid> _driverRepository;
        private readonly IFileService<DriverImageContainer> _fileService;

        public DriverAppService(
            IGuidGenerator guidGenerator,
            IRepository<Driver, Guid> driverRepository,
            IFileService<DriverImageContainer> fileService) 
            : base(guidGenerator)
        {
            _driverRepository = driverRepository;
            _fileService = fileService;
        }

        public async Task CreateAsync([FromForm] CreateDriverDro input)
        {
            var isDuplicate = await _driverRepository.AnyAsync(x => x.DriverNo == input.DriverNo);

            if (isDuplicate)
            {
                throw new UserFriendlyException("Unable to add Driver: Duplicate item.");
            }

            var imageFileName = string.Empty;

            if (input.Image != null)
            {
                imageFileName = await _fileService.UploadAsync(input.Image);
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
                imageFileName);

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

            await Task.WhenAll(driverDtos.Select(async x =>
            {
                x.ImageContent = await _fileService.GetBase64ContentAsync(x.ImageFileName);
            }));

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

        public async Task UpdateAsync(Guid id, [FromForm] UpdateDriverDto input)
        {
            var driver = await _driverRepository.GetAsync(x => x.Id == id)
                ?? throw new EntityNotFoundException(typeof(UpdateDriverDto), id);

            var imageFileName = driver.ImageFileName;

            if (input.Image != null)
            {
                imageFileName = await _fileService.UploadAsync(input.Image);

                if (!driver.ImageFileName.IsNullOrEmpty())
                {
                    await _fileService.DeleteAsync(driver.ImageFileName);
                }
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
                imageFileName);

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
                .Append(DateTime.Now.ToExcelTimestampString());

            return new RemoteStreamContent(memoryStream, sb.ToString(), ExportConstants.CONTENT_TYPE);
        }

        public async Task<string> GenerateDriverNumberAsync()
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
    }
}
