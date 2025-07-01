using System.Security.Cryptography;

namespace WebApiBackend.Services.Auth
{
    public interface IPasswordHasher
    {
        public string Hash(string password);
        public bool Verify(string password_hash,string password);
    }
}