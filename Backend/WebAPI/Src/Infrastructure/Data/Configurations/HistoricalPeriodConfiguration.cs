using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class HistoricalPeriodConfiguration : IEntityTypeConfiguration<HistoricalPeriod>
{
    public void Configure(EntityTypeBuilder<HistoricalPeriod> builder)
    {
        builder.ToTable("HistoricalPeriods");
        builder.HasKey(entity => entity.Id);
    }
}