namespace Core.Entities;

public class Comment
{
    public Guid Id { get; }
    public Guid BaseUserId { get; set; }
    public Guid LessonId { get; set; }
    public required string Content { get; set; }
    public required DateTime CreatedAt { get; set; }
    public required DateTime UpdatedAt { get; set; }
}