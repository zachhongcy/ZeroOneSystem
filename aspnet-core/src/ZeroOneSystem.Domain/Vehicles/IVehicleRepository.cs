using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using ZeroOneSystem.ProductGroups;
using ZeroOneSystem.Trips;

namespace ZeroOneSystem.Vehicles
{
    public interface IVehicleRepository : IRepository<Vehicle, Guid>
    {
        Task<List<Vehicle>> GetListAsync(int skipCount, int maxResultCount, string sorting = nameof(Vehicle.VehiclePlate), string? filter = null);
    }
}
