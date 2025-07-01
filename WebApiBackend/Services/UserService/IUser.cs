using System.Threading.Tasks;
using WebApiBackend.Services.Auth;
using WebApiBackend.Models.Entities;

namespace WebApiBackend.Services.UserService
{
    public interface IUser
    {
        Task CriarUser(User newUser);
        Task<string> Login(User user, IPasswordHasher _passworHasher, TokenProvider tokenProvider);
        Task<string> Register(User user, IPasswordHasher _passworHasher, TokenProvider tokenProvider);
        Task<List<User>> ObterUser();
        Task<User> ObterUserPorId(int id);
        Task EditarUser(int id, User editedUser, string user_id);
        Task DeletarUser(int id, string user_id);
    }
}