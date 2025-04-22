using Core.Entities;
using Infrastructure.Repositories;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Units;

public class BaseUserRepositoryTests
{
    [Fact]
    public async Task GetById_ShouldReturnUser_WhenUserExists()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;

        using var context = new AppDbContext(options);
        var admin = new Admin
        {
            UserName = "Admin1",
            Password = "123456",
            Email = "ABC@gmail.com",
            FirstName = "Admin",
            LastName = "A",
            DateOfBirth = DateOnly.Parse("12/11/2004"),
            IsActive = false,
            AdminLevel = Core.Enums.AdminLevelType.Admin,
        };

        context.Admins.Add(admin);
        context.SaveChanges();

        var repository = new AdminRepository(context);

        // Act
        var result = await repository.GetByIdAsync(admin.Id);
        Console.WriteLine($"{result?.Id}");

        // Assert
        Assert.NotNull(result);
        Assert.Equal(admin.Id, result.Id);
    }

    [Fact]
    public async Task FindAllByCondition_ShouldReturnUser_WhenUserExists()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;

        using var context = new AppDbContext(options);
        var admin = new Admin
        {
            UserName = "Admin1",
            Password = "123456",
            Email = "ABC@gmail.com",
            FirstName = "Admin",
            LastName = "A",
            DateOfBirth = DateOnly.Parse("12/11/2004"),
            IsActive = false,
            AdminLevel = Core.Enums.AdminLevelType.Admin,
        };

        context.Admins.Add(admin);
        context.SaveChanges();

        var repository = new AdminRepository(context);

        // Act
        var result = await repository.FindAllByConditionAsync(
            obj => obj.UserName == admin.UserName && obj.Password == admin.Password
        );
        Console.WriteLine($"{result.First().UserName}");

        // Assert
        Assert.NotNull(result);
    }
}