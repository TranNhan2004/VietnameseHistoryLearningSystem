using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class Contest
{
    public Guid Id { get; }

    [Column(TypeName = "VARCHAR(512)")]
    public required string Title { get; set; }

    public required ushort QuestionsNumber { get; set; }
    public required TimeOnly Time { get; set; }
    public required DateOnly StartDate { get; set; }
    public required DateOnly EndDate { get; set; }
    public required DateTime CreatedAt { get; set; }
}