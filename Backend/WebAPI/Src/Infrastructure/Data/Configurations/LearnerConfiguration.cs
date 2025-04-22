using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class LearnerConfiguration : IEntityTypeConfiguration<Learner>
{
    public void Configure(EntityTypeBuilder<Learner> builder)
    {
        builder.ToTable("Learner");
    }
}