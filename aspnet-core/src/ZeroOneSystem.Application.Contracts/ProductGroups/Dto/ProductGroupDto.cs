using System;
using Volo.Abp.Application.Dtos;
using ZeroOneSystem.Enums.Common;

namespace ZeroOneSystem.ProductGroups.Dto
{
    public class ProductGroupDto : CreationAuditedEntityDto<Guid>
    {
        public string Name { get; set; } = string.Empty;
        public string ShortCode { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public Status Status { get; set; }
        public bool IsForSales { get; set; }
    }
}
