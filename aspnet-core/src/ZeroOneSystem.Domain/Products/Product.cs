using System;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;
using ZeroOneSystem.Enums.Common;
using ZeroOneSystem.Enums.Products;

namespace ZeroOneSystem.Products
{
    public class Product : FullAuditedAggregateRoot<Guid>
    {
        public string Code { get; protected set; } = string.Empty;
        public string ImageFileName { get; protected set; } = string.Empty;
        public string NameEn { get; protected set; } = string.Empty;
        public string NameCn { get; protected set; } = string.Empty;
        public Uom Uom { get; protected set; }
        public int QuantityPr { get; protected set; }
        public int QuantityPa { get; protected set; }
        public int QuantityRu { get; protected set; }
        public int QuantityRn { get; protected set; }
        public Status Status { get; protected set; }
        public string Location { get; protected set; } = string.Empty;
        public string Owner { get; protected set; } = string.Empty;
        public Guid ProductGroupId { get; protected set; }
        public ProductSize ProductSize { get; protected set; }
        public ProductPrice ProductPrice { get; protected set; }

        protected Product() { }

        internal Product(
            Guid id,
            string code,
            string imageFileName,
            string nameEn,
            string nameCn,
            Uom uom,
            int quantityPr,
            int quantityPa,
            int quantityRu,
            int quantityRn,
            Status status,
            string location,
            string owner,
            Guid productGroupId) : base(id)
        {
            Code = code;
            ImageFileName = imageFileName;
            NameEn = nameEn;
            NameCn = nameCn;
            Uom = uom;
            QuantityPr = quantityPr;
            QuantityPa = quantityPa;
            QuantityRu = quantityRu;
            QuantityRn = quantityRn;
            Status = status;
            Location = location;
            Owner = owner;
            ProductGroupId = productGroupId;
            CreationTime = DateTime.Now;
        }

        public static Product Create(
            Guid id,
            string code,
            string imageFileName,
            string nameEn,
            string nameCn,
            Uom uom,
            int quantityPr,
            int quantityPa,
            int quantityRu,
            int quantityRn,
            Status status,
            string location,
            string owner,
            Guid productGroupId)
        {
            Check.NotNullOrEmpty(code, nameof(code));
            Check.NotNullOrEmpty(nameEn, nameof(nameEn));
            Check.NotNullOrEmpty(nameCn, nameof(nameCn));
            Check.NotNullOrEmpty(location, nameof(location));
            Check.NotNullOrEmpty(owner, nameof(owner));

            return new Product(
                id,
                code,
                imageFileName,
                nameEn,
                nameCn,
                uom,
                quantityPr,
                quantityPa,
                quantityRu,
                quantityRn,
                status,
                location,
                owner,
                productGroupId);
        }

        public void Update(
            string code,
            string imageFileName,
            string nameEn,
            string nameCn,
            Uom uom,
            int quantityPr,
            int quantityPa,
            int quantityRu,
            int quantityRn,
            Status status,
            string location,
            string owner,
            Guid productGroupId)
        {
            Code = Check.NotNullOrEmpty(code, nameof(code));
            ImageFileName = imageFileName;
            NameEn = Check.NotNullOrEmpty(nameEn, nameof(nameEn));
            NameCn = Check.NotNullOrEmpty(nameCn, nameof(nameCn));
            Uom = uom;
            QuantityPr = quantityPr;
            QuantityPa = quantityPa;
            QuantityRu = quantityRu;
            QuantityRn = quantityRn;
            Status = status;
            Location = Check.NotNullOrEmpty(location, nameof(location));
            Owner = Check.NotNullOrEmpty(owner, nameof(owner));
            ProductGroupId = productGroupId;
            LastModificationTime = DateTime.Now;
        }

        public void SetProductSize(
            string type,
            decimal height,
            decimal length,
            decimal width,
            decimal thickness,
            string remark)
        {
            Check.NotNullOrEmpty(type, nameof(type));

            if (ProductSize == null)
            {
                ProductSize = ProductSize.Create(type, height, length, width, thickness, remark);
            }
            else
            {
                ProductSize.Update(type, height, length, width, thickness, remark);
            }
        }

        public void SetProductPrice(
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
            if (ProductPrice == null)
            {
                ProductPrice = ProductPrice.Create(
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
            else
            {
                ProductPrice.Update(
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
        }
    }
}
