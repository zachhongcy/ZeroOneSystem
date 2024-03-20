using System;
using Volo.Abp.Content;
using ZeroOneSystem.Enums.Common;
using ZeroOneSystem.Enums.Vehicles;

namespace ZeroOneSystem.Vehicles.Dto
{
    [Serializable]
    public class UpdateVehicleDto
    {
        public VehicleType VehicleType { get; set; }
        public string? ImageName { get; set; } = string.Empty;
        public string? ImageContent { get; set; }
        public string VehiclePlate { get; set; }
        public string VehicleModel { get; set; }
        public DateTime RoadTaxExpiryDate { get; set; }
        public DateTime ServiceDate { get; set; }
        public Status Status { get; set; }
        public string? Remark { get; set; }
    }
}
