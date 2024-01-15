using AutoMapper;
using ZeroOneSystem.Drivers;
using ZeroOneSystem.Drivers.Dto;
using ZeroOneSystem.ProductAdjustments;
using ZeroOneSystem.ProductAdjustments.Dto;
using ZeroOneSystem.ProductGroups;
using ZeroOneSystem.ProductGroups.Dto;
using ZeroOneSystem.Products;
using ZeroOneSystem.Products.Dto;
using ZeroOneSystem.Trips;
using ZeroOneSystem.Trips.Dto;
using ZeroOneSystem.Vehicles;
using ZeroOneSystem.Vehicles.Dto;

namespace ZeroOneSystem;

public class ZeroOneSystemApplicationAutoMapperProfile : Profile
{
    public ZeroOneSystemApplicationAutoMapperProfile()
    {
        /* You can configure your AutoMapper mapping configuration here.
         * Alternatively, you can split your mapping configurations
         * into multiple profile classes for a better organization. */

        CreateMap<ProductGroup, ProductGroupDto>();
        CreateMap<ProductGroup, ProductGroupLookupDto>();
        CreateMap<ProductSize, ProductSizeDto>();
        CreateMap<ProductPrice, ProductPriceDto>();
        CreateMap<Product, ProductDto>();
        CreateMap<ProductAdjustment, ProductAdjustmentDto>();
        CreateMap<ProductAdjustmentItem, ProductAdjustmentItemDto>();
        CreateMap<ProductAdjustmentItemDto, ProductAdjustmentItem>();
        CreateMap<Trip, TripDto>();
        CreateMap<Driver, DriverDto>();
        CreateMap<Driver, DriverLookupDto>();
        CreateMap<Vehicle, VehicleDto>();
        CreateMap<Vehicle, VehicleLookupDto>();
    }
}
