using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ZeroOneSystem.Data;
using Volo.Abp.DependencyInjection;

namespace ZeroOneSystem.EntityFrameworkCore;

public class EntityFrameworkCoreZeroOneSystemDbSchemaMigrator
    : IZeroOneSystemDbSchemaMigrator, ITransientDependency
{
    private readonly IServiceProvider _serviceProvider;

    public EntityFrameworkCoreZeroOneSystemDbSchemaMigrator(
        IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task MigrateAsync()
    {
        /* We intentionally resolve the ZeroOneSystemDbContext
         * from IServiceProvider (instead of directly injecting it)
         * to properly get the connection string of the current tenant in the
         * current scope.
         */

        await _serviceProvider
            .GetRequiredService<ZeroOneSystemDbContext>()
            .Database
            .MigrateAsync();
    }
}
