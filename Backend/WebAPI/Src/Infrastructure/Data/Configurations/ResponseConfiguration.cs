using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class ResponseConfiguration : IEntityTypeConfiguration<Response>
{
    public void Configure(EntityTypeBuilder<Response> builder)
    {
        builder.ToTable("Responses");
        builder.HasKey(entity => entity.Id);
        builder.HasIndex(entity => new { entity.FromCommentId, entity.ToCommentId }).IsUnique();

        builder.HasOne<Comment>()
            .WithMany()
            .HasForeignKey(entity => entity.FromCommentId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne<Comment>()
            .WithMany()
            .HasForeignKey(entity => entity.ToCommentId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}