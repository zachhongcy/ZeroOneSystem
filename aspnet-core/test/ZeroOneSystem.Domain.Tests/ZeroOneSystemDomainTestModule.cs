using Volo.Abp.Modularity;

namespace ZeroOneSystem;

[DependsOn(
    typeof(ZeroOneSystemDomainModule),
    typeof(ZeroOneSystemTestBaseModule)
)]
public class ZeroOneSystemDomainTestModule : AbpModule
{

}
