using System;
using ZeroOneSystem.Enums.Trips;

namespace ZeroOneSystem.Trips.Dto
{
    [Serializable]
    public class CreateTripDto
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
        public SiteDetail SiteDetail { get; set; }
        public string SiteAddress { get; set; }
        public string ContactPerson { get; set; }
        public string ContactNo { get; set; }
        public Guid DriverId { get; set; }
        public Guid VehicleId { get; set; }
    }
}
