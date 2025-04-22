namespace Core.Entities;

public class LearnerContestAnswer
{
    public Guid Id { get; }
    public Guid AnswerOptionId { get; set; }
    public Guid ContestId { get; set; }
    public Guid LearnerId { get; set; }
}