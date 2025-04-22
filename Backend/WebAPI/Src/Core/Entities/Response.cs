namespace Core.Entities;

public class Response
{
    public Guid Id { get; }
    public Guid FromCommentId { get; set; }
    public Guid ToCommentId { get; set; }
}