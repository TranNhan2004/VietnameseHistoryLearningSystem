using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class QuestionRepository : BaseRepository<Question>
{
    public QuestionRepository(DbContext dbContext) : base(dbContext) { }
}