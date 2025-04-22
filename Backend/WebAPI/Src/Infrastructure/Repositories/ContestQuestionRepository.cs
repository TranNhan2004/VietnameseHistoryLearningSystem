using Core.Entities;
using Core.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Infrastructure.Repositories;

public class ContestQuestionRepository : BaseRepository<ContestQuestion>
{
    public ContestQuestionRepository(DbContext dbContext) : base(dbContext) { }
}