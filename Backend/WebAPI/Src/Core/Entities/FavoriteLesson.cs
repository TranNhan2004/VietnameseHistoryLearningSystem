namespace Core.Entities;

public class FavoriteLesson
{
    public Guid Id { get; }
    public Guid LessonId { get; set; }
    public Guid LearnerId { get; set; }
}