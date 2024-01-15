using Volo.Abp.Modularity;

namespace ZeroOneSystem;

[DependsOn(
    typeof(ZeroOneSystemApplicationModule),
    typeof(ZeroOneSystemDomainTestModule)
)]
public class ZeroOneSystemApplicationTestModule : AbpModule
{

}
