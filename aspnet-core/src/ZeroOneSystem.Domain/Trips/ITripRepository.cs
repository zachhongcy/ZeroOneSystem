using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace ZeroOneSystem.Trips
{
    public interface ITripRepository : IRepository<Trip, Guid>
    {
        Task<List<Trip>> GetListAsync(int skipCount, int maxResultCount, string sorting = nameof(Trip.TripNo), string? filter = null);
    }
}
