using System;
using Volo.Abp;

namespace ZeroOneSystem.Products
{
    public class ProductSize
    {
        public string Type { get; protected set; }
        public decimal Height { get; protected set; }
        public decimal Length { get; protected set; }
        public decimal Width { get; protected set; }
        public decimal Thickness { get; protected set; }
        public string Remark { get; protected set; }

        protected ProductSize() { }

        internal ProductSize(
            string type,
            decimal height,
            decimal length,
            decimal width,
            decimal thickness,
            string remark)
        {
            Type = type;
            Height = height;
            Length = length;
            Width = width;
            Thickness = thickness;
            Remark = remark;
        }

        public static ProductSize Create(
            string type,
            decimal height,
            decimal length,
            decimal width,
            decimal thickness,
            string remark)
        {
            if (!IsValidProductSize(height, length, width, thickness))
            {
                throw new ArgumentException("Unable to add product size with invalid value.");
            }

            Check.NotNullOrEmpty(type, nameof(type));

            return new ProductSize(type, height, length, width, thickness, remark);
        }

        public void Update(
            string type,
            decimal height,
            decimal length,
            decimal width,
            decimal thickness,
            string remark)
        {
            if (!IsValidProductSize(height, length, width, thickness))
            {
                throw new ArgumentException("Unable to add product size with invalid value.");
            }

            Check.NotNullOrEmpty(type, nameof(type));

            Type = type;
            Height = height;
            Length = length;
            Width = width;
            Thickness = thickness;
            Remark = remark;
        }

        private static bool IsValidProductSize(
            decimal height,
            decimal length,
            decimal width,
            decimal thickness)
        {
            return height > 0 && length > 0 && width > 0 && thickness > 0;
        }
    }
}
