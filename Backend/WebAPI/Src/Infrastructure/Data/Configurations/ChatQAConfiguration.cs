using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class ChatQAConfiguration : IEntityTypeConfiguration<ChatQA>
{
    public void Configure(EntityTypeBuilder<ChatQA> builder)
    {
        builder.ToTable("ChatQAs");
        builder.HasKey(entity => entity.Id);

        builder.Property(entity => entity.Like).HasDefaultValue(false);
        builder.Property(entity => entity.Dislike).HasDefaultValue(false);
        builder.Property(entity => entity.CreatedAt)
            .HasDefaultValueSql("NOW()")
            .ValueGeneratedOnAdd();

        builder.HasOne<ChatHistory>()
            .WithMany()
            .HasForeignKey(entity => entity.ChatHistoryId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}