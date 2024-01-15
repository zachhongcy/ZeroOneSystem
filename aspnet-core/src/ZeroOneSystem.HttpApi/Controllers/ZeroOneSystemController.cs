using ZeroOneSystem.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace ZeroOneSystem.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class ZeroOneSystemController : AbpControllerBase
{
    protected ZeroOneSystemController()
    {
        LocalizationResource = typeof(ZeroOneSystemResource);
    }
}
