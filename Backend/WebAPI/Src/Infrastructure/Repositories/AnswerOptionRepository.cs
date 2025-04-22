using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using Core.Entities;
using Core.Interfaces.Repositories;

namespace Infrastructure.Repositories;

public class AnswerOptionRepository : BaseRepository<AnswerOption>
{
    public AnswerOptionRepository(DbContext dbContext) : base(dbContext) { }
}