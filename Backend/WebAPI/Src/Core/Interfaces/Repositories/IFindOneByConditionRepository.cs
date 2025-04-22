using System.Linq.Expressions;

namespace Core.Interfaces.Repositories;

public interface IFindOneByConditionRepository<T> where T : class
{
    Task<T?> FindOneByConditionAsync(Expression<Func<T, bool>> condition);
}