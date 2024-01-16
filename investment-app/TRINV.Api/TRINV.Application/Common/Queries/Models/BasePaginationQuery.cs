using System.ComponentModel.DataAnnotations;

namespace TRINV.Application.Common.Queries.Models;

public abstract class BasePaginationQuery
{
    [Range(1, int.MaxValue, ErrorMessage = "PageSize is required")]
    public int PageSize { get; set; } = 10;
    [Range(1, int.MaxValue, ErrorMessage = "PageNumber is required")]
    public int PageNumber { get; set; } = 1;
    public bool CalculateCount { get; set; }
}
