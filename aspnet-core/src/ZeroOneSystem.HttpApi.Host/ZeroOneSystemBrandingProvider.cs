using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace ZeroOneSystem;

[Dependency(ReplaceServices = true)]
public class ZeroOneSystemBrandingProvider : DefaultBrandingProvider
{
    public override string AppName => "ZeroOneSystem";
}
