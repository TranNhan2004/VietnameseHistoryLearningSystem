using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class QuestionConfiguration : IEntityTypeConfiguration<Question>
{
    public void Configure(EntityTypeBuilder<Question> builder)
    {
        builder.ToTable("Questions");
        builder.HasKey(entity => entity.Id);

        builder.HasOne<Lesson>()
            .WithMany()
            .HasForeignKey(entity => entity.LessonId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}