using System.Security.Cryptography;
using System.Text;
using Konscious.Security.Cryptography;
using Core.Interfaces.Services;

namespace Infrastructure.Services;

public class PasswordService : IPasswordService
{
    private const int _saltSize = 16;            // 16 bytes (128-bit) cho salt.
    private const int _hashSize = 32;            // 32 bytes (256-bit) cho hash.
    private const int _iterations = 4;           // Số vòng lặp.
    private const int _memorySize = 16384;       // Dung lượng bộ nhớ 16834 kB (16 MB).
    private const int _degreeOfParallelism = 2;  // Số luồng xử lý.

    public string HashPassword(string password)
    {
        // Tạo salt ngẫu nhiên.
        byte[] salt = new byte[_saltSize];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(salt);
        }

        // Khởi tạo Argon2id với mật khẩu (sau khi chuyển sang byte bằng UTF-8)
        var argon2 = new Argon2id(Encoding.UTF8.GetBytes(password))
        {
            Salt = salt,
            Iterations = _iterations,
            MemorySize = _memorySize,
            DegreeOfParallelism = _degreeOfParallelism
        };

        // Sinh ra hash với độ dài mong muốn.
        byte[] hashBytes = argon2.GetBytes(_hashSize);

        // Mã hoá salt và hash sang Base64.
        string saltBase64 = Convert.ToBase64String(salt);
        string hashBase64 = Convert.ToBase64String(hashBytes);

        return $"{_iterations}.{_memorySize}.{_degreeOfParallelism}.{saltBase64}.{hashBase64}";
    }

    public bool VerifyPassword(string password, string hashedPassword)
    {
        try
        {
            var parts = hashedPassword.Split('.');
            if (parts.Length != 5)
            {
                return false;
            }

            int iterations = int.Parse(parts[0]);
            int memorySize = int.Parse(parts[1]);
            int degreeOfParallelism = int.Parse(parts[2]);
            byte[] salt = Convert.FromBase64String(parts[3]);
            byte[] storedHash = Convert.FromBase64String(parts[4]);

            var argon2 = new Argon2id(Encoding.UTF8.GetBytes(password))
            {
                Salt = salt,
                Iterations = iterations,
                MemorySize = memorySize,
                DegreeOfParallelism = degreeOfParallelism
            };

            byte[] computedHash = argon2.GetBytes(storedHash.Length);
            return CryptographicOperations.FixedTimeEquals(storedHash, computedHash);
        }
        catch
        {
            return false;
        }
    }
}