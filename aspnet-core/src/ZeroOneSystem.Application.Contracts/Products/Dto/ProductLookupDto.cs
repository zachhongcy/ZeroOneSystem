using System;
using Volo.Abp.Application.Dtos;

namespace ZeroOneSystem.Products.Dto
{
    public class ProductLookupDto : EntityDto<Guid>
    {
        public string Name { get; set; }
    }
}
