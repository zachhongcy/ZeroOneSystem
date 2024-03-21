using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using ZeroOneSystem.EntityFrameworkCore;

namespace ZeroOneSystem.ProductGroups
{
    public class ProductGroupRepository
        : EfCoreRepository<ZeroOneSystemDbContext, ProductGroup, Guid>, IProductGroupRepository
    {
        public ProductGroupRepository(IDbContextProvider<ZeroOneSystemDbContext> dbContextProvider) 
            : base(dbContextProvider) { }

        public async Task<List<ProductGroup>> GetListAsync(int skipCount, int maxResultCount, string sorting = nameof(ProductGroup.Name), string? filter = null)
        {
            var dbSet = await GetDbSetAsync();

            var productGroups = await dbSet
                .WhereIf(!filter.IsNullOrEmpty(), x => x.Name.Contains(filter))
                .OrderBy(sorting)
                .Skip(skipCount)
                .Take(maxResultCount)
                .ToListAsync();

            return productGroups;
        }
    }
}
