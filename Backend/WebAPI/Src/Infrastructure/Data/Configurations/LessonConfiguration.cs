using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class LessonConfiguration : IEntityTypeConfiguration<Lesson>
{
    public void Configure(EntityTypeBuilder<Lesson> builder)
    {
        builder.ToTable("Lessons");
        builder.HasKey(entity => entity.Id);
        builder.Property(entity => entity.Likes).HasDefaultValue(0);
        builder.Property(entity => entity.Views).HasDefaultValue(0);
        builder.Property(entity => entity.CreatedAt)
            .HasDefaultValueSql("NOW()")
            .ValueGeneratedOnAdd();

        builder.HasOne<HistoricalPeriod>()
            .WithMany()
            .HasForeignKey(entity => entity.HistoricalPeriodId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne<Admin>()
            .WithMany()
            .HasForeignKey(entity => entity.AdminId)
            .OnDelete(DeleteBehavior.Cascade);

    }
}