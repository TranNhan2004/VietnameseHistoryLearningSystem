using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class LearnerLessonAnswerConfiguration : IEntityTypeConfiguration<LearnerLessonAnswer>
{
    public void Configure(EntityTypeBuilder<LearnerLessonAnswer> builder)
    {
        builder.ToTable("LearnerLessonAnswers");
        builder.HasKey(entity => entity.Id);
        builder.HasIndex(
            entity => new { entity.AnswerOptionId, entity.LessonId, entity.LearnerId }
        ).IsUnique();

        builder.HasOne<AnswerOption>()
            .WithMany()
            .HasForeignKey(entity => entity.AnswerOptionId)
            .OnDelete(DeleteBehavior.Cascade);

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