using Xunit;

namespace ZeroOneSystem.EntityFrameworkCore;

[CollectionDefinition(ZeroOneSystemTestConsts.CollectionDefinitionName)]
public class ZeroOneSystemEntityFrameworkCoreCollection : ICollectionFixture<ZeroOneSystemEntityFrameworkCoreFixture>
{

}
