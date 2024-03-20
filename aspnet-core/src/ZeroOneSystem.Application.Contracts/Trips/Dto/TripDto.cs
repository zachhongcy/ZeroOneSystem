using System;
using Volo.Abp.Application.Dtos;
using ZeroOneSystem.Enums.Trips;

namespace ZeroOneSystem.Trips.Dto
{
    public class TripDto : CreationAuditedEntityDto<Guid>
    {
        public string TripNo { get; set; }
        public TripType TripType { get; set; }
        public DateTime TripDate { get; set; }
        public TripStatus TripStatus { get; set; }
        public string CustomerName { get; set; }
        public int ReferDocNo { get; set; }
        public TripPriority Priority { get; set; }
        public string? Remark { get; set; }
        public string SiteName { get; set; }
        public string SiteDetails { get; set; }
        public SiteDetail SiteDetail { get; set; }
        public string SiteAddress { get; set; }
        public string ContactPerson { get; set; }
        public string ContactNo { get; set; }
        public Guid DriverId { get; set; }
        public string DriverName { get; set; }
        public Guid VehicleId { get; set; }
        public string VehiclePlate { get; set; }
    }
}
