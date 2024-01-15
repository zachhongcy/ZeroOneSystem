using Volo.Abp.Settings;

namespace ZeroOneSystem.Settings;

public class ZeroOneSystemSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(ZeroOneSystemSettings.MySetting1));
    }
}
