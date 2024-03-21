using System;
using ZeroOneSystem.Enums.Common;
using ZeroOneSystem.Enums.Vehicles;

namespace ZeroOneSystem.Vehicles.Dto
{
    [Serializable]
    public class CreateVehicleDto
    {
        public VehicleType VehicleType { get; set; }
        public string? ImageName { get; set; } = string.Empty;
        public string? ImageContent { get; set; }
        public string VehiclePlate { get; set; } = string.Empty;
        public string VehicleModel { get; set; } = string.Empty;
        public DateTime RoadTaxExpiryDate { get; set; }
        public DateTime ServiceDate { get; set; }
        public Status Status { get; set; }
        public string? Remark { get; set; }
    }
}
