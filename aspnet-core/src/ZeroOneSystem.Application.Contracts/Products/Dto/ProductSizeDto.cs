using System;

namespace ZeroOneSystem.Products.Dto
{
    [Serializable]
    public class ProductSizeDto
    {
        public string Type { get; set; }
        public decimal Height { get; set; }
        public decimal Length { get; set; }
        public decimal Width { get; set; }
        public decimal Thickness { get; set; }
        public string? Remark { get; set; }
    }
}
