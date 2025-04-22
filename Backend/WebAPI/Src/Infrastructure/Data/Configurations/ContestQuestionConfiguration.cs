using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class ContestQuestionConfiguration : IEntityTypeConfiguration<ContestQuestion>
{
    public void Configure(EntityTypeBuilder<ContestQuestion> builder)
    {
        builder.ToTable("ContestQuestions");
        builder.HasKey(entity => entity.Id);
        builder.HasIndex(entity => new { entity.ContestId, entity.QuestionId }).IsUnique();

        builder.HasOne<Contest>()
            .WithMany()
            .HasForeignKey(entity => entity.ContestId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne<Question>()
            .WithMany()
            .HasForeignKey(entity => entity.QuestionId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}