using System.ComponentModel;

namespace Core.Enums;

public enum AdminLevelType
{
    [Description("Siêu quản trị viên")]
    SuperAdmin = 0,

    [Description("Quản trị viên cấp cao")]
    AdvancedAdmin = 1,

    [Description("Quản trị viên")]
    Admin = 2
}