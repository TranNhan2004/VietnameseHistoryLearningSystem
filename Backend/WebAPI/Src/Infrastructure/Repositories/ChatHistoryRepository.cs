using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class ChatHistoryRepository : BaseRepository<ChatHistory>
{
    public ChatHistoryRepository(DbContext dbContext) : base(dbContext) { }
}