using System;
using ZeroOneSystem.Enums.Common;

namespace ZeroOneSystem.ProductGroups.Dto
{
    [Serializable]
    public class UpdateProductGroupDto
    {
        public string Name { get; set; } = string.Empty;
        public string ShortCode { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public Status Status { get; set; }
        public bool IsForSales { get; set; }
    }
}
