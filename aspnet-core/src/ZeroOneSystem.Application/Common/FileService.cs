using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.BlobStoring;
using Volo.Abp.Content;
using Volo.Abp.Guids;

namespace ZeroOneSystem.Common
{
    public class FileService<TContainer> : IFileService<TContainer> where TContainer : class
    {
        private readonly IBlobContainer<TContainer> _container;
        private readonly IGuidGenerator _guidGenerator;

        public FileService(
            IBlobContainer<TContainer> container,
            IGuidGenerator guidGenerator)
        {
            _container = container;
            _guidGenerator = guidGenerator;
        }

        public async Task<string> UploadAsync(string fileName, string fileContent)
        {
            var hashedFileName = GenerateHashedFileName(fileName);

            var contentBytes = Convert.FromBase64String(fileContent);

            using var memoryStream = new MemoryStream(contentBytes);
            await _container.SaveAsync(hashedFileName, memoryStream);

            return hashedFileName;
        }

        public async Task<string> GetBase64ContentAsync(string fileName)
        {
            if (fileName.IsNullOrEmpty())
            {
                return string.Empty;
            }

            var contentBytes = await _container.GetAllBytesOrNullAsync(fileName);

            if (contentBytes == null)
            {
                return string.Empty;
            }

            return Convert.ToBase64String(contentBytes);
        }

        public async Task DeleteAsync(string fileName)
        {
            await _container.DeleteAsync(fileName);
        }

        private string GenerateHashedFileName(string fileName)
        {
            var extension = Path.GetExtension(fileName).ToLower();

            var fileNameBuilder = new StringBuilder()
                .Append(_guidGenerator.Create())
                .Append('_')
                .Append(fileName);

            var hashed = SHA256.HashData(Encoding.UTF8.GetBytes(fileNameBuilder.ToString()));

            var hashedBuilder = new StringBuilder();
            foreach (var b in hashed)
            {
                hashedBuilder.Append(b.ToString("x2"));
            }
            hashedBuilder.Append(extension);

            return hashedBuilder.ToString();
        }
    }
}
