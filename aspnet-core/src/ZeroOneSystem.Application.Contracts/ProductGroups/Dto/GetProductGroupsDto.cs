using Volo.Abp.Application.Dtos;

namespace ZeroOneSystem.ProductAdjustments.Dto;

public class GetProductGroupsDto : PagedAndSortedResultRequestDto
{
    public string? Filter { get; set; }
}
