using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class FavoriteLessonConfiguration : IEntityTypeConfiguration<FavoriteLesson>
{
    public void Configure(EntityTypeBuilder<FavoriteLesson> builder)
    {
        builder.ToTable("FavoriteLessons");
        builder.HasKey(entity => entity.Id);
        builder.HasIndex(entity => new { entity.LessonId, entity.LearnerId }).IsUnique();

        builder.HasOne<Lesson>()
            .WithMany()
            .HasForeignKey(entity => entity.LessonId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne<Learner>()
            .WithMany()
            .HasForeignKey(entity => entity.LearnerId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}