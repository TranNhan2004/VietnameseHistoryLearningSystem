namespace Core.Entities;

public class Result
{
    public Guid Id { get; }
    public Guid ContestId { get; set; }
    public Guid LearnerId { get; set; }
    public required TimeOnly Time { get; set; }
    public required ushort CorrectAnswersNumber { get; set; }
    public required uint Score { get; set; }
}