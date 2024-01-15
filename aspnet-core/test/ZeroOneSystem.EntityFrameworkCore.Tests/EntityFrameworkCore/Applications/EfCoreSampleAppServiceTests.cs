using ZeroOneSystem.Samples;
using Xunit;

namespace ZeroOneSystem.EntityFrameworkCore.Applications;

[Collection(ZeroOneSystemTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<ZeroOneSystemEntityFrameworkCoreTestModule>
{

}
