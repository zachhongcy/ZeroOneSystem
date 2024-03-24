using Volo.Abp.Account;
using Volo.Abp.AutoMapper;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;
using Volo.Abp.BlobStoring.FileSystem;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.BlobStoring;
using ZeroOneSystem.Common;
using Volo.Abp;

namespace ZeroOneSystem;

[DependsOn(
    typeof(ZeroOneSystemDomainModule),
    typeof(AbpAccountApplicationModule),
    typeof(ZeroOneSystemApplicationContractsModule),
    typeof(AbpIdentityApplicationModule),
    typeof(AbpPermissionManagementApplicationModule),
    typeof(AbpTenantManagementApplicationModule),
    typeof(AbpFeatureManagementApplicationModule),
    typeof(AbpSettingManagementApplicationModule)
    )]
[DependsOn(typeof(AbpBlobStoringFileSystemModule))]
    public class ZeroOneSystemApplicationModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpAutoMapperOptions>(options =>
        {
            options.AddMaps<ZeroOneSystemApplicationModule>();
        });

        context.Services.AddSingleton(typeof(IFileService<>), typeof(FileService<>));

        var hostingEnvironment = context.Services.GetAbpHostEnvironment();

        Configure<AbpBlobStoringOptions>(options =>
        {
            options.Containers.ConfigureDefault(container =>
            {
                container.UseFileSystem(fs =>
                {
                    if (hostingEnvironment.IsDevelopment())
                    {
                        fs.BasePath = "C:\\ZeroOneSystem";
                    }
                    else
                    {
                        fs.BasePath = "ZeroOneSystem";
                    }
                });
            });
        });
    }
}
