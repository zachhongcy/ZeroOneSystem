using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using ZeroOneSystem.EntityFrameworkCore;

namespace ZeroOneSystem.Drivers
{
    public class DriverRepository
        : EfCoreRepository<ZeroOneSystemDbContext, Driver, Guid>, IDriverRepository
    {
        public DriverRepository(IDbContextProvider<ZeroOneSystemDbContext> dbContextProvider)
            : base(dbContextProvider) { }

        public async Task<List<Driver>> GetListAsync(int skipCount, int maxResultCount, string sorting = nameof(Driver.DriverName), string? filter = null)
        {
            var dbSet = await GetDbSetAsync();

            var drivers = await dbSet
                .WhereIf(!filter.IsNullOrEmpty(), x => x.DriverName.Contains(filter))
                .OrderBy(sorting)
                .Skip(skipCount)
                .Take(maxResultCount)
                .ToListAsync();

            return drivers;
        }
    }
}
