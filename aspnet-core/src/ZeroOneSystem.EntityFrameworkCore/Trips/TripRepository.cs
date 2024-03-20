using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using ZeroOneSystem.EntityFrameworkCore;

namespace ZeroOneSystem.Trips
{
    public class TripRepository
        : EfCoreRepository<ZeroOneSystemDbContext, Trip, Guid>, ITripRepository
    {
        public TripRepository(IDbContextProvider<ZeroOneSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public async Task<List<Trip>> GetListAsync(int skipCount, int maxResultCount, string sorting = nameof(Trip.TripNo), string? filter = null)
        {
            var dbSet = await GetDbSetAsync();

            var trips = await dbSet
                .WhereIf(!filter.IsNullOrEmpty(), x => x.TripNo.Contains(filter))
                .OrderBy(sorting)
                .Skip(skipCount)
                .Take(maxResultCount)
                .ToListAsync();

            return trips;
        }
    }
}
