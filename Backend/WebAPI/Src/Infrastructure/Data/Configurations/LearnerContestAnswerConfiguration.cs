using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class LearnerContestAnswerConfiguration : IEntityTypeConfiguration<LearnerContestAnswer>
{
    public void Configure(EntityTypeBuilder<LearnerContestAnswer> builder)
    {
        builder.ToTable("LearnerContestAnswers");
        builder.HasKey(entity => entity.Id);
        builder.HasIndex(
            entity => new { entity.AnswerOptionId, entity.ContestId, entity.LearnerId }
        ).IsUnique();

        builder.HasOne<AnswerOption>()
            .WithMany()
            .HasForeignKey(entity => entity.AnswerOptionId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne<Contest>()
            .WithMany()
            .HasForeignKey(entity => entity.ContestId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne<Learner>()
            .WithMany()
            .HasForeignKey(entity => entity.LearnerId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}