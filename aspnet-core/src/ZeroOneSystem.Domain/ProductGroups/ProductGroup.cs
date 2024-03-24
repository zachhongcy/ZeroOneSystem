using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;
using ZeroOneSystem.Enums.Common;
using ZeroOneSystem.Products;

namespace ZeroOneSystem.ProductGroups
{
    public class ProductGroup : FullAuditedEntity<Guid>
    {
        public string Name { get; protected set; } = string.Empty;
        public string ShortCode { get; protected set; } = string.Empty;
        public string Description { get; protected set; } = string.Empty;
        public Status Status { get; protected set; }
        public bool IsForSales { get; protected set; }

        public ICollection<Product> Products { get; protected set; }

        protected ProductGroup() { }

        internal ProductGroup(
            Guid id,
            string name,
            string shortCode,
            string description,
            Status status,
            bool isForSales) : base(id)
        {
            Name = name;
            ShortCode = shortCode;
            Description = description;
            Status = status;
            IsForSales = isForSales;
            Products = new Collection<Product>();
            CreationTime = DateTime.Now;
        }

        public static ProductGroup CreateProductGroup(
            Guid id,
            string name,
            string shortCode,
            string description,
            Status status,
            bool isForSales)
        {
            Check.NotNullOrEmpty(name, nameof(name));
            Check.NotNullOrEmpty(shortCode, nameof(shortCode));
            Check.NotNullOrEmpty(description, nameof(description));

            return new ProductGroup(id, name, shortCode, description, status, isForSales);
        }

        public void UpdateProductGroup(
            string name,
            string shortCode,
            string description,
            Status status,
            bool isForSales)
        {
            Name = Check.NotNullOrEmpty(name, nameof(name));
            ShortCode = Check.NotNullOrEmpty(shortCode, nameof(shortCode));
            Description = Check.NotNullOrEmpty(description, nameof(description));
            Status = status;
            IsForSales = isForSales;
            LastModificationTime = DateTime.Now;
        }
    }
}
