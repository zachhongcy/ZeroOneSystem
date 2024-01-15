using Volo.Abp.Modularity;

namespace ZeroOneSystem;

public abstract class ZeroOneSystemApplicationTestBase<TStartupModule> : ZeroOneSystemTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
