using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using ZeroOneSystem.EntityFrameworkCore;

namespace ZeroOneSystem.Products
{
    public class ProductRepository
        : EfCoreRepository<ZeroOneSystemDbContext, Product, Guid>, IProductRepository
    {
        public ProductRepository(IDbContextProvider<ZeroOneSystemDbContext> dbContextProvider)
            : base(dbContextProvider) { }

        public async Task<List<Product>> GetListAsync(int skipCount, int maxResultCount, string sorting = "Code", string? filter = null)
        {
            var dbSet = await GetDbSetAsync();

            var product = await dbSet
                .WhereIf(!filter.IsNullOrEmpty(), x => x.Code.Contains(filter))
                .OrderBy(sorting)
                .Skip(skipCount)
                .Take(maxResultCount)
                .ToListAsync();

            return product;
        }
    }
}
