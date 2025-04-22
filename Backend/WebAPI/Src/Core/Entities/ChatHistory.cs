using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class ChatHistory
{
    public Guid Id { get; }
    public Guid LearnerId { get; set; }

    [Column(TypeName = "VARCHAR(1024)")]
    public required string Title { get; set; }
    public required DateTime CreatedAt { get; set; }
}