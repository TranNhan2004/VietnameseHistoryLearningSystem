using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class ResponseRepository : BaseRepository<Response>
{
    public ResponseRepository(DbContext dbContext) : base(dbContext) { }
}