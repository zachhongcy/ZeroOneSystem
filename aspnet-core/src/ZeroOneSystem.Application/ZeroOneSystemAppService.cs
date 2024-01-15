using ZeroOneSystem.Localization;
using Volo.Abp.Application.Services;

namespace ZeroOneSystem;

/* Inherit your application services from this class.
 */
public abstract class ZeroOneSystemAppService : ApplicationService
{
    protected ZeroOneSystemAppService()
    {
        LocalizationResource = typeof(ZeroOneSystemResource);
    }
}
