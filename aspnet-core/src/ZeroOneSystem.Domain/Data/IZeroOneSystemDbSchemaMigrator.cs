using System.Threading.Tasks;

namespace ZeroOneSystem.Data;

public interface IZeroOneSystemDbSchemaMigrator
{
    Task MigrateAsync();
}
