using System;
using System.Collections.Generic;

namespace ZeroOneSystem.ProductAdjustments.Dto
{
    [Serializable]
    public class CreateProductAdjustmentDto
    {
        public string DocumentNo { get; set; } = string.Empty;
        public DateTime DocumentDate { get; set; }
        public string? Description { get; set; }
        public decimal TotalCost { get; set; }
        public ICollection<ProductAdjustmentItemDto> ProductAdjustmentItems { get; set; } = [];
    }
}
