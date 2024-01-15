using ZeroOneSystem.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace ZeroOneSystem.Permissions;

public class ZeroOneSystemPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(ZeroOneSystemPermissions.GroupName);
        //Define your own permissions here. Example:
        //myGroup.AddPermission(ZeroOneSystemPermissions.MyPermission1, L("Permission:MyPermission1"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<ZeroOneSystemResource>(name);
    }
}
