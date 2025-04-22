using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public abstract class BaseUser
{
    public Guid Id { get; }

    [Column(TypeName = "VARCHAR(64)")]
    public required string UserName { get; set; }

    [Column(TypeName = "VARCHAR(128)")]
    public required string Email { get; set; }

    [Column(TypeName = "VARCHAR(20)")]
    public required string Password { get; set; }

    [Column(TypeName = "VARCHAR(20)")]
    public required string FirstName { get; set; }

    [Column(TypeName = "VARCHAR(100)")]
    public required string LastName { get; set; }

    [Column(TypeName = "VARCHAR(1024)")]
    public string? AvatarURL { get; set; }

    public required DateOnly DateOfBirth { get; set; }
    public required bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime? LastLogin { get; set; }
}