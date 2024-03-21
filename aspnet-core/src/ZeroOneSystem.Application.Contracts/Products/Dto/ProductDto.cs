using System;
using Volo.Abp.Application.Dtos;
using ZeroOneSystem.Enums.Common;
using ZeroOneSystem.Enums.Products;

namespace ZeroOneSystem.Products.Dto
{
    public class ProductDto : CreationAuditedEntityDto<Guid>
    {
        public string Code { get; set; } = string.Empty;
        public string NameEn { get; set; } = string.Empty;
        public string NameCn { get; set; } = string.Empty;
        public string ProductGroupCodeName { get; set; } = string.Empty;
        public Uom Uom { get; set; }
        public int QuantityPr { get; set; }
        public int QuantityPa { get; set; }
        public int QuantityRu { get; set; }
        public int QuantityRn { get; set; }
        public string ProductQuantities { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public Status Status { get; set; }
        public string Owner { get; set; } = string.Empty;
        public Guid ProductGroupId { get; set; }

        public ProductSizeDto ProductSize { get; set; } = new();
        public ProductPriceDto ProductPrice { get; set; } = new();
    }
}
