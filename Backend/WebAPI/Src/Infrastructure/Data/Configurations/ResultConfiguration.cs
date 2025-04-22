using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class ResultConfiguration : IEntityTypeConfiguration<Result>
{
    public void Configure(EntityTypeBuilder<Result> builder)
    {
        builder.ToTable("Results");
        builder.HasKey(entity => entity.Id);
        builder.HasIndex(entity => new { entity.ContestId, entity.LearnerId }).IsUnique();

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