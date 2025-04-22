using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class HasStudiedConfiguration : IEntityTypeConfiguration<HasStudied>
{
    public void Configure(EntityTypeBuilder<HasStudied> builder)
    {
        builder.ToTable("HasStudieds");
        builder.HasKey(entity => entity.Id);
        builder.HasIndex(entity => new { entity.LessonId, entity.LearnerId }).IsUnique();

        builder.HasOne<Learner>()
            .WithMany()
            .HasForeignKey(entity => entity.LearnerId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne<Lesson>()
            .WithMany()
            .HasForeignKey(entity => entity.LessonId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}