using Infrastructure.Services;

namespace Units;

public class PasswordServiceTests
{
    [Fact]
    public void HashPassword_ShouldReturnHash()
    {
        // Arrange
        var service = new PasswordService();
        var result = service.HashPassword("123456");
        Console.WriteLine($"{result}");

        // Assert
        Assert.NotNull(result);
    }

    [Fact]
    public void VerifyPassword_ShouldReturnVerifyResult()
    {
        // Arrange
        var service = new PasswordService();
        var hash = service.HashPassword("123456");
        var result = service.VerifyPassword("123456", hash);
        Console.WriteLine($"{result}");
    }
}