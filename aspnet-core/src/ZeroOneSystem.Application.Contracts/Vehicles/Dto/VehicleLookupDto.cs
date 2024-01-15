using System;
using Volo.Abp.Application.Dtos;

namespace ZeroOneSystem.Vehicles.Dto
{
    public class VehicleLookupDto : EntityDto<Guid>
    {
        public string VehiclePlate { get; set; }
    }
}
