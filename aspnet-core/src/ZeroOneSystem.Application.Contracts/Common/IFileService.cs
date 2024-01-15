using System.Threading.Tasks;
using Volo.Abp.Content;

namespace ZeroOneSystem.Common
{
    public interface IFileService<TContainer>
    {
        Task<string> UploadAsync(IRemoteStreamContent input);
        Task<byte[]?> GetContentAsync(string fileName);
        Task<string> GetBase64ContentAsync(string fileName);
        Task DeleteAsync(string fileName);
    }
}
