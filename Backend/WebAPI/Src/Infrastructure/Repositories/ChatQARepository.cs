using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class ChatQARepository : BaseRepository<ChatQA>
{
    public ChatQARepository(DbContext dbContext) : base(dbContext) { }
}