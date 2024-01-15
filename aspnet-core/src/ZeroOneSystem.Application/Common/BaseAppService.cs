using Volo.Abp.Application.Services;
using Volo.Abp.Guids;
using ZeroOneSystem.Localization;

namespace ZeroOneSystem.Common
{
    public abstract class BaseAppService : ApplicationService
    {
        protected readonly IGuidGenerator _guidGenerator;

        public BaseAppService(IGuidGenerator guidGenerator)
        {
            _guidGenerator = guidGenerator;
            LocalizationResource = typeof(ZeroOneSystemResource);
        }
    }
}
