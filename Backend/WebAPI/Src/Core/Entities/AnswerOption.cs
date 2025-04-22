using System.Data.Common;

namespace Core.Entities;

public class AnswerOption
{
    public Guid Id { get; }
    public Guid QuestionId { get; set; }
    public required string Content { get; set; }
    public required bool IsCorrect { get; set; }
}