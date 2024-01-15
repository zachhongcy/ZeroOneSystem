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

        public async Task<string> UploadAsync(IRemoteStreamContent file)
        {
            if (file.FileName.IsNullOrEmpty())
            {
                return string.Empty;
            }

            var hashedFileName = GenerateHashedFileName(file.FileName);

            var stream = file.GetStream();

            if (stream.Length <= 0)
            {
                return string.Empty;
            }

            await _container.SaveAsync(hashedFileName, stream);

            return hashedFileName;
        }

        public async Task<byte[]?> GetContentAsync(string fileName)
        {
            return fileName.IsNullOrEmpty()
                ? null
                : await _container.GetAllBytesOrNullAsync(fileName);
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
