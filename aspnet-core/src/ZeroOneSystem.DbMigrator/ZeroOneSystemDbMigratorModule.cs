using ZeroOneSystem.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace ZeroOneSystem.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(ZeroOneSystemEntityFrameworkCoreModule),
    typeof(ZeroOneSystemApplicationContractsModule)
    )]
public class ZeroOneSystemDbMigratorModule : AbpModule
{
}
