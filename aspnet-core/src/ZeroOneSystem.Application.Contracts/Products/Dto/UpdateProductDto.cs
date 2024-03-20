using System;
using Volo.Abp.Content;
using ZeroOneSystem.Enums.Common;
using ZeroOneSystem.Enums.Products;

namespace ZeroOneSystem.Products.Dto
{
    [Serializable]
    public class UpdateProductDto
    {
        public string Code { get; set; }
        public string? ImageName { get; set; } = string.Empty;
        public string? ImageContent { get; set; }
        public string NameEn { get; set; }
        public string NameCn { get; set; }
        public Uom Uom { get; set; }
        public int QuantityPr { get; set; }
        public int QuantityPa { get; set; }
        public int QuantityRu { get; set; }
        public int QuantityRn { get; set; }
        public string Location { get; set; }
        public Status Status { get; set; }
        public string Owner { get; set; }
        public Guid ProductGroupId { get; set; }

        public ProductSizeDto ProductSize { get; set; }
        public ProductPriceDto ProductPrice { get; set; }
    }
}
