using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class CommentRepository : BaseRepository<Comment>
{
    public CommentRepository(DbContext dbContext) : base(dbContext) { }
}