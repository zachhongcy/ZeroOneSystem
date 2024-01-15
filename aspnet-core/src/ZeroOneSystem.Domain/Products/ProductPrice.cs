using System;

namespace ZeroOneSystem.Products
{
    public class ProductPrice
    {
        public decimal StandardPurchaseCost { get; protected set; }
        public decimal MinPurchaseCost { get; protected set; }
        public decimal MaxPurchaseCost { get; protected set; }
        public decimal StandardSellingPrice { get; protected set; }
        public decimal SellingPrice2 { get; protected set; }
        public decimal SellingPrice3 { get; protected set; }
        public decimal MinSellingPrice { get; protected set; }
        public decimal MaxSellingPrice { get; protected set; }
        public decimal StandardRentalPrice { get; protected set; }
        public decimal RentalPrice2 { get; protected set; }
        public decimal RentalPrice3 { get; protected set; }
        public decimal MinRentalPrice { get; protected set; }
        public decimal MaxRentalPrice { get; protected set; }

        protected ProductPrice() { }

        internal ProductPrice(
            decimal standardPurchaseCost,
            decimal minPurchaseCost,
            decimal maxPurchaseCost,
            decimal standardSellingPrice,
            decimal sellingPrice2,
            decimal sellingPrice3,
            decimal minSellingPrice,
            decimal maxSellingPrice,
            decimal standardRentalPrice,
            decimal rentalPrice2,
            decimal rentalPrice3,
            decimal minRentalPrice,
            decimal maxRentalPrice)
        {
            StandardPurchaseCost = standardPurchaseCost;
            MinPurchaseCost = minPurchaseCost;
            MaxPurchaseCost = maxPurchaseCost;
            StandardSellingPrice = standardSellingPrice;
            SellingPrice2 = sellingPrice2;
            SellingPrice3 = sellingPrice3;
            MinSellingPrice = minSellingPrice;
            MaxSellingPrice = maxSellingPrice;
            StandardRentalPrice = standardRentalPrice;
            RentalPrice2 = rentalPrice2;
            RentalPrice3 = rentalPrice3;
            MinRentalPrice = minRentalPrice;
            MaxRentalPrice = maxRentalPrice;
        }

        public static ProductPrice Create(
            decimal standardPurchaseCost,
            decimal minPurchaseCost,
            decimal maxPurchaseCost,
            decimal standardSellingPrice,
            decimal sellingPrice2,
            decimal sellingPrice3,
            decimal minSellingPrice,
            decimal maxSellingPrice,
            decimal standardRentalPrice,
            decimal rentalPrice2,
            decimal rentalPrice3,
            decimal minRentalPrice,
            decimal maxRentalPrice)
        {
            if (!IsValidProductPrice(
                standardPurchaseCost,
                minPurchaseCost,
                maxPurchaseCost,
                standardSellingPrice,
                sellingPrice2,
                sellingPrice3,
                minSellingPrice,
                maxSellingPrice,
                standardRentalPrice,
                rentalPrice2,
                rentalPrice3,
                minRentalPrice,
                maxRentalPrice))
            {
                throw new ArgumentException("Unable to add product price with invalid value.");
            }

            return new ProductPrice(
                standardPurchaseCost,
                minPurchaseCost,
                maxPurchaseCost,
                standardSellingPrice,
                sellingPrice2,
                sellingPrice3,
                minSellingPrice,
                maxSellingPrice,
                standardRentalPrice,
                rentalPrice2,
                rentalPrice3,
                minRentalPrice,
                maxRentalPrice);
        }

        public void Update(
            decimal standardPurchaseCost,
            decimal minPurchaseCost,
            decimal maxPurchaseCost,
            decimal standardSellingPrice,
            decimal sellingPrice2,
            decimal sellingPrice3,
            decimal minSellingPrice,
            decimal maxSellingPrice,
            decimal standardRentalPrice,
            decimal rentalPrice2,
            decimal rentalPrice3,
            decimal minRentalPrice,
            decimal maxRentalPrice)
        {
            if (!IsValidProductPrice(
                standardPurchaseCost,
                minPurchaseCost,
                maxPurchaseCost,
                standardSellingPrice,
                sellingPrice2,
                sellingPrice3,
                minSellingPrice,
                maxSellingPrice,
                standardRentalPrice,
                rentalPrice2,
                rentalPrice3,
                minRentalPrice,
                maxRentalPrice))
            {
                throw new ArgumentException("Unable to add product price with invalid value.");
            }

            StandardPurchaseCost = standardPurchaseCost;
            MinPurchaseCost = minPurchaseCost;
            MaxPurchaseCost = maxPurchaseCost;
            StandardSellingPrice = standardSellingPrice;
            SellingPrice2 = sellingPrice2;
            SellingPrice3 = sellingPrice3;
            MinSellingPrice = minSellingPrice;
            MaxSellingPrice = maxSellingPrice;
            StandardRentalPrice = standardRentalPrice;
            RentalPrice2 = rentalPrice2;
            RentalPrice3 = rentalPrice3;
            MinRentalPrice = minRentalPrice;
            MaxRentalPrice = maxRentalPrice;
        }

        private static bool IsValidProductPrice(
            decimal standardPurchaseCost,
            decimal minPurchaseCost,
            decimal maxPurchaseCost,
            decimal standardSellingPrice,
            decimal sellingPrice2,
            decimal sellingPrice3,
            decimal minSellingPrice,
            decimal maxSellingPrice,
            decimal standardRentalPrice,
            decimal rentalPrice2,
            decimal rentalPrice3,
            decimal minRentalPrice,
            decimal maxRentalPrice)
        {
            return standardPurchaseCost >= 0 &&
                minPurchaseCost >= 0 &&
                maxPurchaseCost >= 0 &&
                standardSellingPrice >= 0 &&
                sellingPrice2 >= 0 &&
                sellingPrice3 >= 0 &&
                minSellingPrice >= 0 &&
                maxSellingPrice >= 0 &&
                standardRentalPrice >= 0 &&
                rentalPrice2 >= 0 &&
                rentalPrice3 >= 0 &&
                minRentalPrice >= 0 &&
                maxRentalPrice >= 0;
        }
    }
}
