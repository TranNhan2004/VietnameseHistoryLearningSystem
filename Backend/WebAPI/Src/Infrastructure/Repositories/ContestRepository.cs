using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class ContestRepository : BaseRepository<Contest>
{
    public ContestRepository(DbContext dbContext) : base(dbContext) { }
}