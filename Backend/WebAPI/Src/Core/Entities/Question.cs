namespace Core.Entities;

public class Question
{
    public Guid Id { get; }
    public Guid? LessonId { get; set; }
    public required string Content { get; set; }
}