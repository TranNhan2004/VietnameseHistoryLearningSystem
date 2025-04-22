using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class ChatHistoryConfiguration : IEntityTypeConfiguration<ChatHistory>
{
    public void Configure(EntityTypeBuilder<ChatHistory> builder)
    {
        builder.ToTable("ChatHistories");
        builder.HasKey(entity => entity.Id);
        builder.Property(entity => entity.CreatedAt)
            .HasDefaultValueSql("NOW()")
            .ValueGeneratedOnAdd();

        builder.HasOne<Learner>()
            .WithMany()
            .HasForeignKey(entity => entity.LearnerId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}