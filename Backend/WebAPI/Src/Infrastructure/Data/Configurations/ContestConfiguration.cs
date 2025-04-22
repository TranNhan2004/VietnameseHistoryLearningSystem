using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class ContestConfiguration : IEntityTypeConfiguration<Contest>
{
    public void Configure(EntityTypeBuilder<Contest> builder)
    {
        builder.ToTable(
            name: "Contests",
            t => t.HasCheckConstraint("CONTESTS_CHECK_END_DATE__GTE__START_DATE", "\"EndDate\" >= \"StartDate\"")
        );
        builder.HasKey(entity => entity.Id);
        builder.Property(entity => entity.CreatedAt)
            .HasDefaultValueSql("NOW()")
            .ValueGeneratedOnAdd();
    }
}