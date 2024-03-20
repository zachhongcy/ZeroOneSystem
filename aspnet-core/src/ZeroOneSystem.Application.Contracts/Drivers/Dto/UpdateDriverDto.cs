﻿using System;
using Volo.Abp.Content;
using ZeroOneSystem.Enums.Common;

namespace ZeroOneSystem.Drivers.Dto
{
    [Serializable]
    public class UpdateDriverDto
    {
        public string DriverNo { get; set; }
        public string? ImageName { get; set; } = string.Empty;
        public string? ImageContent { get; set; }
        public string DriverName { get; set; }
        public string LicenseNo { get; set; }
        public DateTime LicenseExpiryDate { get; set; }
        public string ContactNo { get; set; }
        public int EmployeeCategory { get; set; }
        public string Password { get; set; }
        public Status Status { get; set; }
        public string? Remark { get; set; }
        public string EmergencyContactName { get; set; }
        public string EmergencyRelationship { get; set; }
        public string EmergencyContactNo { get; set; }
        public string Address { get; set; }
    }
}
