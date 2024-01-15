using System;

namespace ZeroOneSystem.Products.Dto
{
    [Serializable]
    public class ProductPriceDto
    {
        public decimal StandardPurchaseCost { get; set; }
        public decimal MinPurchaseCost { get; set; }
        public decimal MaxPurchaseCost { get; set; }
        public decimal StandardSellingPrice { get; set; }
        public decimal SellingPrice2 { get; set; } = 0;
        public decimal SellingPrice3 { get; set; } = 0;
        public decimal MinSellingPrice { get; set; }
        public decimal MaxSellingPrice { get; set; }
        public decimal StandardRentalPrice { get; set; }
        public decimal RentalPrice2 { get; set; } = 0;
        public decimal RentalPrice3 { get; set; } = 0;
        public decimal MinRentalPrice { get; set; }
        public decimal MaxRentalPrice { get; set; }
    }
}
