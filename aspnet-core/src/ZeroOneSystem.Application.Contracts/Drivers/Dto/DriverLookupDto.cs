using System;
using Volo.Abp.Application.Dtos;

namespace ZeroOneSystem.Drivers.Dto
{
    public class DriverLookupDto : EntityDto<Guid>
    {
        public string DriverName { get; set; }
    }
}
