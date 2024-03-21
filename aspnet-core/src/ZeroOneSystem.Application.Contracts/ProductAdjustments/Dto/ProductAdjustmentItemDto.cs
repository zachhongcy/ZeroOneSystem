using System;
using ZeroOneSystem.Enums.Products;

namespace ZeroOneSystem.ProductAdjustments.Dto
{
    [Serializable]
    public class ProductAdjustmentItemDto
    {
        public string ItemCode { get; set; } = string.Empty;
        public string? Description { get; set; }
        public Uom Uom { get; set; }
        public int Quantity { get; set; }
        public decimal SubTotal { get; set; }
        public decimal UnitCost { get; set; }
    }
}
