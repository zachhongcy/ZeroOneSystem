using System;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;
using ZeroOneSystem.Drivers;
using ZeroOneSystem.Enums.Trips;
using ZeroOneSystem.Vehicles;

namespace ZeroOneSystem.Trips
{
    public class Trip : FullAuditedEntity<Guid>
    {
        public string TripNo { get; protected set; } = string.Empty;
        public TripType TripType { get; protected set; }
        public DateTime TripDate { get; protected set; }
        public TripStatus TripStatus { get; protected set; }
        public string CustomerName { get; protected set; } = string.Empty;
        public int ReferDocNo { get; protected set; }
        public TripPriority Priority { get; protected set; }
        public string SiteName { get; protected set; } = string.Empty;
        public SiteDetail SiteDetail { get; protected set; }
        public string SiteAddress { get; protected set; } = string.Empty;
        public string ContactPerson { get; protected set; } = string.Empty;
        public string ContactNo { get; protected set; } = string.Empty;
        public string Remark { get; protected set; } = string.Empty;
        public Guid DriverId { get; protected set; }
        public Guid VehicleId { get; protected set; }

        public Driver Driver { get; protected set; }
        public Vehicle Vehicle { get; protected set; }

        protected Trip() { }

        internal Trip(
            Guid id,
            string tripNo,
            TripType tripType,
            DateTime tripDate,
            TripStatus status,
            string customerName,
            int referDocNo,
            TripPriority priority,
            string remark,
            string siteName,
            SiteDetail siteDetail,
            string siteAddress,
            string contactPerson,
            string contactNo,
            Guid driverId,
            Guid vehicleId) : base(id)
        {
            TripNo = tripNo;
            TripType = tripType;
            TripDate = tripDate;
            TripStatus = status;
            CustomerName = customerName;
            ReferDocNo = referDocNo;
            Priority = priority;
            Remark = remark;
            SiteName = siteName;
            SiteDetail = siteDetail;
            SiteAddress = siteAddress;
            ContactPerson = contactPerson;
            ContactNo = contactNo;
            DriverId = driverId;
            VehicleId = vehicleId;
        }

        public static Trip Create(
            Guid id,
            string tripNo,
            TripType tripType,
            DateTime tripDate,
            TripStatus tripStatus,
            string customerName,
            int referDocNo,
            TripPriority priority,
            string remark,
            string siteName,
            SiteDetail siteDetail,
            string siteAddress,
            string contactPerson,
            string contactNo,
            Guid driverId,
            Guid vehicleId)
        {
            Check.NotNullOrEmpty(tripNo, nameof(tripNo));
            Check.NotNullOrEmpty(customerName, nameof(customerName));
            Check.NotNullOrEmpty(siteName, nameof(siteName));
            Check.NotNullOrEmpty(siteAddress, nameof(siteAddress));
            Check.NotNullOrEmpty(contactPerson, nameof(contactPerson));
            Check.NotNullOrEmpty(contactNo, nameof(contactNo));

            return new Trip(
                id,
                tripNo,
                tripType,
                tripDate,
                tripStatus,
                customerName,
                referDocNo,
                priority,
                remark,
                siteName,
                siteDetail,
                siteAddress,
                contactPerson,
                contactNo,
                driverId,
                vehicleId);
        }

        public void Update(
            TripType tripType,
            DateTime tripDate,
            TripStatus tripStatus,
            string customerName,
            int referDocNo,
            TripPriority priority,
            string remark,
            string siteName,
            SiteDetail siteDetail,
            string siteAddress,
            string contactPerson,
            string contactNo,
            Guid driverId,
            Guid vehicleId)
        {
            Check.NotNullOrEmpty(customerName, nameof(customerName));
            Check.NotNullOrEmpty(siteName, nameof(siteName));
            Check.NotNullOrEmpty(siteAddress, nameof(siteAddress));
            Check.NotNullOrEmpty(contactPerson, nameof(contactPerson));
            Check.NotNullOrEmpty(contactNo, nameof(contactNo));

            TripType = tripType;
            TripDate = tripDate;
            TripStatus = tripStatus;
            CustomerName = customerName;
            ReferDocNo = referDocNo;
            Priority = priority;
            Remark = remark;
            SiteName = siteName;
            SiteDetail = siteDetail;
            SiteAddress = siteAddress;
            ContactPerson = contactPerson;
            ContactNo = contactNo;
            DriverId = driverId;
            VehicleId = vehicleId;
        }
    }
}
