using Volo.Abp.Modularity;

namespace ZeroOneSystem;

/* Inherit from this class for your domain layer tests. */
public abstract class ZeroOneSystemDomainTestBase<TStartupModule> : ZeroOneSystemTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
