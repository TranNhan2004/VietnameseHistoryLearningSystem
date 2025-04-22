using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class LessonRepository : BaseRepository<Lesson>
{
    public LessonRepository(DbContext dbContext) : base(dbContext) { }
}