using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class Lesson
{
    public Guid Id { get; }
    public Guid HistoricalPeriodId { get; set; }
    public Guid AdminId { get; set; }

    [Column(TypeName = "VARCHAR(1024)")]
    public required string Title { get; set; }

    [Column(TypeName = "VARCHAR(1024)")]
    public string? SlidesURL { get; set; }

    [Column(TypeName = "VARCHAR(1024)")]
    public string? VideoURL { get; set; }

    public required string Content { get; set; }
    public required uint Likes { get; set; }
    public required uint Views { get; set; }
    public required DateTime CreatedAt { get; set; }
    public required DateTime UpdatedAt { get; set; }
}