using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class CommentConfiguration : IEntityTypeConfiguration<Comment>
{
    public void Configure(EntityTypeBuilder<Comment> builder)
    {
        builder.ToTable("Comments");
        builder.HasKey(entity => entity.Id);
        builder.Property(entity => entity.CreatedAt)
            .HasDefaultValueSql("NOW()")
            .ValueGeneratedOnAdd();

        builder.HasOne<BaseUser>()
            .WithMany()
            .HasForeignKey(entity => entity.BaseUserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne<Lesson>()
            .WithMany()
            .HasForeignKey(entity => entity.LessonId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}