using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace ZeroOneSystem.Data;

/* This is used if database provider does't define
 * IZeroOneSystemDbSchemaMigrator implementation.
 */
public class NullZeroOneSystemDbSchemaMigrator : IZeroOneSystemDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
