using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class LearnerRepository : BaseRepository<Learner>
{
    public LearnerRepository(DbContext dbContext) : base(dbContext) { }
}