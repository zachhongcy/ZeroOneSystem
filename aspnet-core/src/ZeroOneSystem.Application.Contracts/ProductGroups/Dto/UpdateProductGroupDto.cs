using System;
using ZeroOneSystem.Enums.Common;

namespace ZeroOneSystem.ProductGroups.Dto
{
    [Serializable]
    public class UpdateProductGroupDto
    {
        public string Name { get; set; }
        public string ShortCode { get; set; }
        public string Description { get; set; }
        public Status Status { get; set; }
        public bool IsForSales { get; set; }
    }
}
