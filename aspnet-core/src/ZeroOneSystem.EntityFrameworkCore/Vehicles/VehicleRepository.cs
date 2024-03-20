using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using ZeroOneSystem.EntityFrameworkCore;

namespace ZeroOneSystem.Vehicles
{
    public class VehicleRepository
        : EfCoreRepository<ZeroOneSystemDbContext, Vehicle, Guid>, IVehicleRepository
    {
        public VehicleRepository(IDbContextProvider<ZeroOneSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public async Task<List<Vehicle>> GetListAsync(int skipCount, int maxResultCount, string sorting = nameof(Vehicle.VehiclePlate), string? filter = null)
        {
            var dbSet = await GetDbSetAsync();

            var vehicles = await dbSet
                .WhereIf(!filter.IsNullOrEmpty(), x => x.VehiclePlate.Contains(filter))
                .OrderBy(sorting)
                .Skip(skipCount)
                .Take(maxResultCount)
                .ToListAsync();

            return vehicles;
        }
    }
}
