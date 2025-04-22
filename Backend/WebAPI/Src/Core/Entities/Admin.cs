using Core.Enums;

namespace Core.Entities;

public class Admin : BaseUser
{
    public required AdminLevelType AdminLevel { get; set; }
}