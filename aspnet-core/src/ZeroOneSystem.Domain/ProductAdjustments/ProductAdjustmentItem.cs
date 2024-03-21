using System;
using Volo.Abp;
using ZeroOneSystem.Enums.Products;

namespace ZeroOneSystem.ProductAdjustments
{
    public class ProductAdjustmentItem
    {
        public string ItemCode { get; protected set; } = string.Empty;
        public string Description { get; protected set; } = string.Empty;
        public Uom Uom { get; protected set; }
        public int Quantity { get; protected set; }
        public decimal UnitCost { get; protected set; }
        public decimal SubTotal { get; protected set; }

        protected ProductAdjustmentItem() { }

        internal ProductAdjustmentItem(
            string itemCode,
            string description,
            Uom uom,
            int quantity,
            decimal unitCost)
        {
            ItemCode = itemCode;
            Description = description;
            Uom = uom;
            Quantity = quantity;
            UnitCost = unitCost;
            SubTotal = unitCost * quantity;
        }

        public static ProductAdjustmentItem Create(string itemCode, string description, Uom uom, int quantity, decimal unitCost)
        {
            Check.NotNullOrEmpty(itemCode, nameof(itemCode));

            return new ProductAdjustmentItem(itemCode, description, uom, quantity, unitCost);
        }

        public void Update(string itemCode, string description, Uom uom, int quantity, decimal unitCost)
        {
            ItemCode = Check.NotNullOrEmpty(itemCode, nameof(itemCode));
            Description = description;
            Uom = uom;
            Quantity = quantity;
            UnitCost = unitCost;
            SubTotal = unitCost * quantity;
        }

        public bool IsNotUpdated(string description, Uom uom, int quantity, decimal unitCost)
        {
            return Description.Equals(description, StringComparison.OrdinalIgnoreCase)
                && Uom == uom
                && Quantity == quantity
                && UnitCost == unitCost;
        }
    }
}
