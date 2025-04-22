using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class LearnerContestAnswerRepository : BaseRepository<LearnerContestAnswer>
{
    public LearnerContestAnswerRepository(DbContext dbContext) : base(dbContext) { }
}