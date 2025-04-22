using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class BaseUserConfiguration : IEntityTypeConfiguration<BaseUser>
{
    public void Configure(EntityTypeBuilder<BaseUser> builder)
    {
        builder.ToTable("BaseUsers");
        builder.HasKey(entity => entity.Id);
        builder.HasIndex(entity => entity.UserName).IsUnique();
        builder.HasIndex(entity => entity.Email).IsUnique();
        builder.Property(entity => entity.CreatedAt)
            .HasDefaultValueSql("NOW()")
            .ValueGeneratedOnAdd();
    }
}