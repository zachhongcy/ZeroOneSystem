using ZeroOneSystem.Samples;
using Xunit;

namespace ZeroOneSystem.EntityFrameworkCore.Domains;

[Collection(ZeroOneSystemTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<ZeroOneSystemEntityFrameworkCoreTestModule>
{

}
