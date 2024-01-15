using Microsoft.EntityFrameworkCore;
using Volo.Abp;
using Volo.Abp.EntityFrameworkCore.Modeling;
using ZeroOneSystem.Drivers;
using ZeroOneSystem.ProductAdjustments;
using ZeroOneSystem.ProductGroups;
using ZeroOneSystem.Products;
using ZeroOneSystem.Trips;
using ZeroOneSystem.Vehicles;

namespace ZeroOneSystem.EntityFrameworkCore
{
    public static class ZeroOneSystemDbContextModelCreatingExtensions
    {
        public static void ConfigureZeroOneSystem(this ModelBuilder builder)
        {
            Check.NotNull(builder, nameof(builder));

            builder.Entity<ProductGroup>(b =>
            {
                b.ToTable("ProductGroups");

                b.ConfigureByConvention();

                b.Property(x => x.Name).IsRequired();
                b.Property(x => x.ShortCode).IsRequired();
                b.Property(x => x.Description).IsRequired();
                b.Property(x => x.Status).IsRequired();
                b.Property(x => x.IsForSales).IsRequired();

                b.HasMany(x => x.Products)
                .WithOne()
                .HasForeignKey(y => y.ProductGroupId)
                .HasConstraintName("FK_Products_ProductGroups_ProductGroupId")
                .OnDelete(DeleteBehavior.NoAction);
            });

            builder.Entity<Product>(b =>
            {
                b.ToTable("Products");

                b.ConfigureByConvention();

                b.Property(x => x.Code).IsRequired();
                b.Property(x => x.NameEn).IsRequired();
                b.Property(x => x.NameCn).IsRequired();
                b.Property(x => x.QuantityPr).IsRequired();
                b.Property(x => x.QuantityPa).IsRequired();
                b.Property(x => x.QuantityRu).IsRequired();
                b.Property(x => x.QuantityRn).IsRequired();
                b.Property(x => x.Location).IsRequired();
                b.Property(x => x.Status).IsRequired();
                b.Property(x => x.Owner).IsRequired();

                b.OwnsOne(x => x.ProductSize, y =>
                {
                    y.ToJson();
                });

                b.OwnsOne(x => x.ProductPrice, y =>
                {
                    y.ToJson();
                });
            });

            builder.Entity<ProductAdjustment>(b =>
            {
                b.ToTable("ProductAdjustments");

                b.ConfigureByConvention();

                b.Property(x => x.DocumentNo).IsRequired();
                b.Property(x => x.DocumentDate).IsRequired();
                b.Property(x => x.Description).IsRequired(false).HasDefaultValue(string.Empty);

                b.OwnsMany(x => x.ProductAdjustmentItems, y =>
                {
                    y.ToJson();
                });
            });

            builder.Entity<Trip>(b =>
            {
                b.ToTable("Trips");

                b.ConfigureByConvention();

                b.Property(x => x.TripNo).IsRequired();
                b.Property(x => x.TripType).IsRequired();
                b.Property(x => x.TripDate).IsRequired();
                b.Property(x => x.TripStatus).IsRequired();
                b.Property(x => x.CustomerName).IsRequired();
                b.Property(x => x.ReferDocNo).IsRequired();
                b.Property(x => x.Priority).IsRequired();
                b.Property(x => x.SiteName).IsRequired();
                b.Property(x => x.SiteDetail).IsRequired();
                b.Property(x => x.SiteAddress).IsRequired();
                b.Property(x => x.ContactPerson).IsRequired();
                b.Property(x => x.ContactNo).IsRequired();
                b.Property(x => x.Remark).IsRequired(false).HasDefaultValue(string.Empty);
                b.Property(x => x.DriverId).IsRequired();
                b.Property(x => x.VehicleId).IsRequired();

                b.HasOne(x => x.Driver)
                .WithMany(y => y.Trips)
                .HasForeignKey(x => x.DriverId)
                .HasConstraintName("FK_Drivers_Trips_DriverId")
                .OnDelete(DeleteBehavior.NoAction);

                b.HasOne(x => x.Vehicle)
                .WithMany(y => y.Trips)
                .HasForeignKey(x => x.VehicleId)
                .HasConstraintName("FK_Vehicles_Trips_VehicleId")
                .OnDelete(DeleteBehavior.NoAction);
            });

            builder.Entity<Driver>(b =>
            {
                b.ToTable("Drivers");

                b.ConfigureByConvention();

                b.Property(x => x.DriverNo).IsRequired();
                b.Property(x => x.DriverName).IsRequired();
                b.Property(x => x.LicenseNo).IsRequired();
                b.Property(x => x.LicenseExpiryDate).IsRequired();
                b.Property(x => x.ContactNo).IsRequired();
                b.Property(x => x.EmployeeCategory).IsRequired();
                b.Property(x => x.Password).IsRequired();
                b.Property(x => x.Status).IsRequired();
                b.Property(x => x.Remark).IsRequired(false).HasDefaultValue(string.Empty);
                b.Property(x => x.EmergencyContactName).IsRequired();
                b.Property(x => x.EmergencyRelationship).IsRequired();
                b.Property(x => x.EmergencyContactNo).IsRequired();
                b.Property(x => x.Address).IsRequired();
            });

            builder.Entity<Vehicle>(b =>
            {
                b.ToTable("Vehicles");

                b.ConfigureByConvention();

                b.Property(x => x.VehicleType).IsRequired();
                b.Property(x => x.VehiclePlate).IsRequired();
                b.Property(x => x.VehicleModel).IsRequired();
                b.Property(x => x.RoadTaxExpiryDate).IsRequired();
                b.Property(x => x.ServiceDate).IsRequired();
                b.Property(x => x.Status).IsRequired();
                b.Property(x => x.Remark).IsRequired(false).HasDefaultValue(string.Empty);
            });
        }
    }
}
