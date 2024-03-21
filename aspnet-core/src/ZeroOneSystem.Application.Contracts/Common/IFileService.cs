using System.Threading.Tasks;

namespace ZeroOneSystem.Common
{
    public interface IFileService<TContainer>
    {
        Task<string> UploadAsync(string fileName, string fileContent);
        Task<string> GetBase64ContentAsync(string fileName);
        Task DeleteAsync(string fileName);
    }
}
