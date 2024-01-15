using System;
using Volo.Abp.Application.Dtos;

namespace ZeroOneSystem.ProductGroups.Dto
{
    public class ProductGroupLookupDto : EntityDto<Guid>
    {
        public string ShortCode { get; set; }
        public string Name { get; set; }
        public string CodeName { get; set; }
    }
}
