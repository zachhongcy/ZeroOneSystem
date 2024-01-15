using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;
using ZeroOneSystem.Enums.Products;

namespace ZeroOneSystem.ProductAdjustments
{
    public class ProductAdjustment : FullAuditedAggregateRoot<Guid>
    {
        public string DocumentNo { get; protected set; }
        public DateTime DocumentDate { get; protected set; }
        public string Description { get; protected set; }
        public ICollection<ProductAdjustmentItem> ProductAdjustmentItems { get; protected set; }

        protected ProductAdjustment() { }

        internal ProductAdjustment(
            Guid id, 
            string documentNo,
            DateTime documentDate, 
            string description) : base(id)
        {
            DocumentNo = documentNo;
            DocumentDate = documentDate;
            Description = description;
            ProductAdjustmentItems = new Collection<ProductAdjustmentItem>();
        }

        public static ProductAdjustment Create(
            Guid id,
            string documentNo,
            DateTime documentDate,
            string description)
        {
            Check.NotNullOrEmpty(documentNo, nameof(documentNo));

            return new ProductAdjustment(id, documentNo, documentDate, description);
        }

        public void Update(DateTime documentDate, string description)
        {
            DocumentDate = documentDate;
            Description = description;
        }

        public void AddProductAdjustmentItem(
            string itemCode,
            string description,
            Uom uom,
            int quantity,
            decimal unitCost)
        {
            if (quantity < 0)
            {
                throw new ArgumentException("Unable to add Product Adjustment Item: Invalid quantity");
            }

            if (unitCost < 0)
            {
                throw new ArgumentException("Unable to add Product Adjustment Item: Invalid unit cost");
            }

            var isProductAdjustmentItemExists = ProductAdjustmentItems.Any(x => x.ItemCode == itemCode);

            if (isProductAdjustmentItemExists)
            {
                throw new ArgumentException("Unable to add Product Adjustment Item: Duplicate item");
            }

            var productAdjustmentItem = ProductAdjustmentItem.Create(
                itemCode,
                description,
                uom,
                quantity,
                unitCost);

            ProductAdjustmentItems.Add(productAdjustmentItem);
        }

        public void RemoveProductAdjustmentItem(string itemCode)
        {
            ProductAdjustmentItems.RemoveAll(x => x.ItemCode == itemCode);
        }

        public void UpdateProductAdjustmentItem(
            string itemCode,
            string description,
            Uom uom,
            int quantity,
            decimal unitCost)
        {
            if (quantity < 0)
            {
                throw new ArgumentException("Unable to add Product Adjustment Item: Invalid quantity");
            }

            if (unitCost < 0)
            {
                throw new ArgumentException("Unable to add Product Adjustment Item: Invalid unit cost");
            }

            var productAdjustmentItem = ProductAdjustmentItems.FirstOrDefault(x => x.ItemCode == itemCode)
                ?? throw new ArgumentException($"Unable to find Product Adjustment Items with Item Code = {itemCode}");

            if (productAdjustmentItem.IsNotUpdated(description, uom, quantity, unitCost))
            {
                return;
            }

            ProductAdjustmentItems.Remove(productAdjustmentItem);

            productAdjustmentItem.Update(itemCode, description, uom, quantity, unitCost);

            ProductAdjustmentItems.Add(productAdjustmentItem);
        }
    }
}
