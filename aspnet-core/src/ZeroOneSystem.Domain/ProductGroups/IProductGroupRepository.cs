using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace ZeroOneSystem.ProductGroups
{
    public interface IProductGroupRepository : IRepository<ProductGroup, Guid>
    {
        Task<List<ProductGroup>> GetListAsync(int skipCount, int maxResultCount, string sorting = nameof(ProductGroup.Name), string? filter = null);
    }
}
