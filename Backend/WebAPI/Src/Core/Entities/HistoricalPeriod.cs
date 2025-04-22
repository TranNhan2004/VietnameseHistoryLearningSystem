using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class HistoricalPeriod
{
    public Guid Id { get; }

    [Column(TypeName = "VARCHAR(1024)")]
    public required string Name { get; set; }

    public required uint StartYear { get; set; }
    public required uint EndYear { get; set; }
}