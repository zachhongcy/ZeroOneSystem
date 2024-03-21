using System;
using Volo.Abp.Application.Dtos;

namespace ZeroOneSystem.ProductGroups.Dto
{
    public class ProductGroupLookupDto : EntityDto<Guid>
    {
        public string ShortCode { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string CodeName { get; set; } = string.Empty;
    }
}
