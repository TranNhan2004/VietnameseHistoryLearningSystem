namespace Core.Entities;

public class LearnerLessonAnswer
{
    public Guid Id { get; }
    public Guid AnswerOptionId { get; set; }
    public Guid LessonId { get; set; }
    public Guid LearnerId { get; set; }
}