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
        var hostingEnvironment = context.Services.GetAbpHostEnvironment();

        var basePath = hostingEnvironment.IsDevelopment()
            ? "C:\\ZeroOneSystem"
            : "/images";

        Configure<AbpAutoMapperOptions>(options =>
        {
            options.AddMaps<ZeroOneSystemApplicationModule>();
        });

        context.Services.AddSingleton(typeof(IFileService<>), typeof(FileService<>));

        Configure<AbpBlobStoringOptions>(options =>
        {
            options.Containers.ConfigureDefault(container =>
            {
                container.UseFileSystem(fs =>
                {
                    fs.BasePath = basePath;
                });
            });
        });
    }
}
