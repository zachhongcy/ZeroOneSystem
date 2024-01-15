using System;
using System.Collections.Generic;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;
using ZeroOneSystem.Enums.Common;
using ZeroOneSystem.Enums.Vehicles;
using ZeroOneSystem.Trips;

namespace ZeroOneSystem.Vehicles
{
    public class Vehicle : FullAuditedEntity<Guid>
    {
        public VehicleType VehicleType { get; protected set; }
        public string ImageFileName { get; protected set; }
        public string VehiclePlate { get; protected set; }
        public string VehicleModel { get; protected set; }
        public DateTime RoadTaxExpiryDate { get; protected set; }
        public DateTime ServiceDate { get; protected set; }
        public Status Status { get; protected set; }
        public string Remark { get; protected set; }

        public ICollection<Trip> Trips { get; protected set; }

        protected Vehicle() { }

        internal Vehicle(
            Guid id,
            VehicleType vehicleType,
            string imageFileName,
            string vehiclePlate,
            string vehicleModel,
            DateTime roadTaxExpiryDate,
            DateTime serviceDate,
            Status status,
            string remark) : base(id)
        {
            VehicleType = vehicleType;
            ImageFileName = imageFileName;
            VehiclePlate = vehiclePlate;
            VehicleModel = vehicleModel;
            RoadTaxExpiryDate = roadTaxExpiryDate;
            ServiceDate = serviceDate;
            Status = status;
            Remark = remark;
        }

        public static Vehicle Create(
            Guid id,
            VehicleType vehicleType,
            string imageFileName,
            string vehiclePlate,
            string vehicleModel,
            DateTime roadTaxExpiryDate,
            DateTime serviceDate,
            Status status,
            string remark)
        {
            Check.NotNullOrEmpty(vehiclePlate, nameof(vehiclePlate));
            Check.NotNullOrEmpty(vehicleModel, nameof(vehicleModel));

            return new Vehicle(
                id,
                vehicleType,
                imageFileName,
                vehiclePlate,
                vehicleModel,
                roadTaxExpiryDate,
                serviceDate,
                status,
                remark);
        }

        public void Update(
            VehicleType vehicleType,
            string imageFileName,
            string vehiclePlate,
            string vehicleModel,
            DateTime roadTaxExpiryDate,
            DateTime serviceDate,
            Status status,
            string remark)
        {
            VehicleType = vehicleType;
            ImageFileName = imageFileName;
            VehiclePlate = Check.NotNullOrEmpty(vehiclePlate, nameof(vehiclePlate));
            VehicleModel = Check.NotNullOrEmpty(vehicleModel, nameof(vehicleModel));
            RoadTaxExpiryDate = roadTaxExpiryDate;
            ServiceDate = serviceDate;
            Status = status;
            Remark = remark;
        }
    }
}
