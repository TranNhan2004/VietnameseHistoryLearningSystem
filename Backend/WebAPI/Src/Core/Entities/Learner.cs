using Core.Enums;

namespace Core.Entities;

public class Learner : BaseUser
{
    public required RankType Rank { get; set; }
    public uint Point { get; set; }
    public uint BestScore { get; set; }
    public uint WorstScore { get; set; }
}