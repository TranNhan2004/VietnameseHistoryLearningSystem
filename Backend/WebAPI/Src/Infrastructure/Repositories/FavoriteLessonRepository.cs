using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class FavoriteLessonRepository : BaseRepository<FavoriteLesson>
{
    public FavoriteLessonRepository(DbContext dbContext) : base(dbContext) { }
}