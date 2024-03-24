using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;
using ZeroOneSystem.Enums.Common;
using ZeroOneSystem.Trips;

namespace ZeroOneSystem.Drivers
{
    public class Driver : FullAuditedEntity<Guid>
    {
        public string DriverNo { get; protected set; } = string.Empty;
        public string DriverName { get; protected set; } = string.Empty;
        public string LicenseNo { get; protected set; } = string.Empty;
        public DateTime LicenseExpiryDate { get; protected set; }
        public string ContactNo { get; protected set; } = string.Empty;
        public int EmployeeCategory { get; protected set; }
        public string Password { get; protected set; } = string.Empty;
        public Status Status { get; protected set; }
        public string Remark { get; protected set; } = string.Empty;
        public string EmergencyContactName { get; protected set; } = string.Empty;
        public string EmergencyRelationship { get; protected set; } = string.Empty;
        public string EmergencyContactNo { get; protected set; } = string.Empty;
        public string Address { get; protected set; } = string.Empty;
        public string ImageFileName { get; protected set; } = string.Empty;

        public ICollection<Trip> Trips { get; protected set; }

        protected Driver() { }

        internal Driver(
            Guid id,
            string driverNo,
            string driverName,
            string licenseNo,
            DateTime licenseExpiryDate,
            string contactNo,
            int employeeCategory,
            string password,
            Status status,
            string remark,
            string emergencyContactName,
            string emergencyRelationship,
            string emergencyContactNo,
            string address,
            string imageFileName) : base(id)
        {
            DriverNo = driverNo;
            DriverName = driverName;
            LicenseNo = licenseNo;
            LicenseExpiryDate = licenseExpiryDate;
            ContactNo = contactNo;
            EmployeeCategory = employeeCategory;
            Password = password;
            Status = status;
            Remark = remark;
            EmergencyContactName = emergencyContactName;
            EmergencyRelationship = emergencyRelationship;
            EmergencyContactNo = emergencyContactNo;
            Address = address;
            Trips = new Collection<Trip>();
            ImageFileName = imageFileName;
            CreationTime = DateTime.Now;
        }

        public static Driver Create(
            Guid id,
            string driverNo,
            string driverName,
            string licenseNo,
            DateTime licenseExpiryDate,
            string contactNo,
            int employeeCategory,
            string password,
            Status status,
            string remark,
            string emergencyContactName,
            string emergencyRelationship,
            string emergencyContactNo,
            string address,
            string imageFileName)
        {
            Check.NotNullOrEmpty(driverNo, nameof(driverNo));
            Check.NotNullOrEmpty(driverName, nameof(driverName));
            Check.NotNullOrEmpty(licenseNo, nameof(licenseNo));
            Check.NotNullOrEmpty(contactNo, nameof(contactNo));
            Check.NotNull(employeeCategory, nameof(employeeCategory));
            Check.NotNullOrEmpty(password, nameof(password));
            Check.NotNullOrEmpty(emergencyContactName, nameof(emergencyContactName));
            Check.NotNullOrEmpty(emergencyRelationship, nameof(emergencyRelationship));
            Check.NotNullOrEmpty(emergencyContactNo, nameof(emergencyContactNo));
            Check.NotNullOrEmpty(address, nameof(address));

            return new Driver(
                id,
                driverNo,
                driverName,
                licenseNo,
                licenseExpiryDate,
                contactNo,
                employeeCategory,
                password,
                status,
                remark,
                emergencyContactName,
                emergencyRelationship,
                emergencyContactNo,
                address,
                imageFileName);
        }

        public void Update(
            string driverName,
            string licenseNo,
            DateTime licenseExpiryDate,
            string contactNo,
            int employeeCategory,
            string password,
            Status status,
            string remark,
            string emergencyContactName,
            string emergencyRelationship,
            string emergencyContactNo,
            string address,
            string imageFileName)
        {
            DriverName = Check.NotNullOrEmpty(driverName, nameof(driverName));
            LicenseNo = Check.NotNullOrEmpty(licenseNo, nameof(licenseNo));
            LicenseExpiryDate = licenseExpiryDate;
            ContactNo = Check.NotNullOrEmpty(contactNo, nameof(contactNo));
            EmployeeCategory = employeeCategory;
            Password = Check.NotNullOrEmpty(password, nameof(password));
            Status = status;
            Remark = remark;
            EmergencyContactName = Check.NotNullOrEmpty(emergencyContactName, nameof(emergencyContactName));
            EmergencyRelationship = Check.NotNullOrEmpty(emergencyRelationship, nameof(emergencyRelationship));
            EmergencyContactNo = Check.NotNullOrEmpty(emergencyContactNo, nameof(emergencyContactNo));
            Address = Check.NotNullOrEmpty(address, nameof(address));
            ImageFileName = imageFileName;
            LastModificationTime = DateTime.Now;
        }
    }
}
