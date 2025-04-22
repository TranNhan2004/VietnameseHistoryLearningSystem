using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class HasStudiedRepository : BaseRepository<HasStudied>
{
    public HasStudiedRepository(DbContext dbContext) : base(dbContext) { }
}