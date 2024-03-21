using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;

namespace ZeroOneSystem.ProductAdjustments.Dto
{
    public class ProductAdjustmentDto : CreationAuditedEntityDto<Guid>
    {
        public string DocumentNo { get; set; } = string.Empty;
        public DateTime DocumentDate { get; set; }
        public string? Description { get; set; }
        public decimal TotalCost { get; set; }
        public ICollection<ProductAdjustmentItemDto> ProductAdjustmentItems { get; set; } = [];
    }
}
