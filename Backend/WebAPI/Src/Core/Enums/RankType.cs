using System.ComponentModel;

namespace Core.Enums;

public enum RankType
{
    [Description("Sơ cấp")]
    Beginner = 0,    // 0 - 99 points

    [Description("Trung cấp")]
    Intermediate = 1, // 100 - 499 points

    [Description("Cao cấp")]
    Advanced = 2,    // 500 - 999 points

    [Description("Chuyên gia")]
    Expert = 3,      // 1000+ points
}