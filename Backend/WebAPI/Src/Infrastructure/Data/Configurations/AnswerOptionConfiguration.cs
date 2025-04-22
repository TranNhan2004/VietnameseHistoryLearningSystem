using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class AnswerOptionConfiguration : IEntityTypeConfiguration<AnswerOption>
{
    public void Configure(EntityTypeBuilder<AnswerOption> builder)
    {
        builder.ToTable("AnswerOptions");
        builder.HasKey(entity => entity.Id);

        builder.HasOne<Question>()
            .WithMany()
            .HasForeignKey(entity => entity.QuestionId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}