using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class AdminRepository : BaseRepository<Admin>
{
    public AdminRepository(DbContext dbContext) : base(dbContext) { }
}