using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class HistoricalPeriodRepository : BaseRepository<HistoricalPeriod>
{
    public HistoricalPeriodRepository(DbContext dbContext) : base(dbContext) { }
}