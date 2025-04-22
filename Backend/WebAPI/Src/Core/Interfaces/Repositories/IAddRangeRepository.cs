namespace Core.Interfaces.Repositories;

public interface IAddRangeRepository<T> where T : class
{
    Task AddRangeAsync(IEnumerable<T> entities);
}