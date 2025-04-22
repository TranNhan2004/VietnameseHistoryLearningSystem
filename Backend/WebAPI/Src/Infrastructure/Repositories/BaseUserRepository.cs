using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class BaseUserRepository : BaseRepository<BaseUser>
{
    public BaseUserRepository(DbContext context) : base(context) { }
}