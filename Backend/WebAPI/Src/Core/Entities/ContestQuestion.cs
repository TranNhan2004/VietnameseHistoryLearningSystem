using System.Drawing;

namespace Core.Entities;

public class ContestQuestion
{
    public Guid Id { get; }
    public Guid ContestId { get; set; }
    public Guid QuestionId { get; set; }
    public required ushort Point { get; set; }
}