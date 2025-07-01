using System.Security.Cryptography;
using WebApiBackend.Services.Auth;

namespace WebApiBackend.Services.Auth
{
    public class PassworHasher : IPasswordHasher{
        
        private const int SaltSize = 16;
        private const int HashSize = 32;
        private const int Itarations = 1000;

        private readonly HashAlgorithmName Algorithm = HashAlgorithmName.SHA512;

        public string Hash(string password){
            byte[] salt = RandomNumberGenerator.GetBytes(SaltSize);
            byte[] hash = Rfc2898DeriveBytes.Pbkdf2(password,salt,Itarations,Algorithm,HashSize);

            return $"{Convert.ToHexString(hash)}-{Convert.ToHexString(salt)}";
        }

        public bool Verify(string password_hash,string password){
            string[] parts = password_hash.Split('-');
            byte[] salt = Convert.FromHexString(parts[1]);
            byte[] hash = Convert.FromHexString(parts[0]);

            byte[] inputHash = Rfc2898DeriveBytes.Pbkdf2(password,salt,Itarations,Algorithm,HashSize);

            return CryptographicOperations.FixedTimeEquals(hash,inputHash);
        }
    }
}