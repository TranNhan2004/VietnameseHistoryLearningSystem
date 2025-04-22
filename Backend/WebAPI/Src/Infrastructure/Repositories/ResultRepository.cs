using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class ResultRepository : BaseRepository<Result>
{
    public ResultRepository(DbContext dbContext) : base(dbContext) { }
}