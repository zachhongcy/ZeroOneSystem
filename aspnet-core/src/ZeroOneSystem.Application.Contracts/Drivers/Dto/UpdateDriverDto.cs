using System;
using ZeroOneSystem.Enums.Common;

namespace ZeroOneSystem.Drivers.Dto
{
    [Serializable]
    public class UpdateDriverDto
    {
        public string DriverNo { get; set; } = string.Empty;
        public string? ImageName { get; set; }
        public string? ImageContent { get; set; }
        public string DriverName { get; set; } = string.Empty;
        public string LicenseNo { get; set; } = string.Empty;
        public DateTime LicenseExpiryDate { get; set; }
        public string ContactNo { get; set; } = string.Empty;
        public int EmployeeCategory { get; set; }
        public string Password { get; set; } = string.Empty;
        public Status Status { get; set; }
        public string? Remark { get; set; }
        public string EmergencyContactName { get; set; } = string.Empty;
        public string EmergencyRelationship { get; set; } = string.Empty;
        public string EmergencyContactNo { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
    }
}
