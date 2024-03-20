using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace ZeroOneSystem.Drivers
{
    public interface IDriverRepository : IRepository<Driver, Guid>
    {
        Task<List<Driver>> GetListAsync(int skipCount, int maxResultCount, string sorting = nameof(Driver.DriverName), string? filter = null);
    }
}
