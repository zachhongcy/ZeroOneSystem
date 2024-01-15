using System;
using Volo.Abp.Application.Dtos;
using ZeroOneSystem.Enums.Common;
using ZeroOneSystem.Enums.Vehicles;

namespace ZeroOneSystem.Vehicles.Dto
{
    public class VehicleDto : CreationAuditedEntityDto<Guid>
    {
        public VehicleType VehicleType { get; set; }
        public string ImageFileName { get; set; }
        public string ImageContent { get; set; }
        public string VehiclePlate { get; set; }
        public string VehicleModel { get; set; }
        public DateTime RoadTaxExpiryDate { get; set; }
        public DateTime ServiceDate { get; set; }
        public Status Status { get; set; }
        public string Remark { get; set; }
    }
}
