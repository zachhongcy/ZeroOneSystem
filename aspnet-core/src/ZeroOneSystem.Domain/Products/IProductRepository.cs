using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace ZeroOneSystem.Products
{
    public interface IProductRepository : IRepository<Product, Guid>
    {
        Task<List<Product>> GetListAsync(int skipCount, int maxResultCount, string sorting = nameof(Product.Code), string? filter = null);
    }
}
