using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class LearnerLessonAnswerRepository : BaseRepository<LearnerLessonAnswer>
{
    public LearnerLessonAnswerRepository(DbContext dbContext) : base(dbContext) { }
}