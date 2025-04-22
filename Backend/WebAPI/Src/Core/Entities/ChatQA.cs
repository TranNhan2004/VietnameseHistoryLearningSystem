namespace Core.Entities;

public class ChatQA
{
    public Guid Id { get; }
    public Guid ChatHistoryId { get; set; }
    public required string Question { get; set; }
    public required string Answer { get; set; }
    public required bool Like { get; set; }
    public required bool Dislike { get; set; }
    public required DateTime CreatedAt { get; set; }
}