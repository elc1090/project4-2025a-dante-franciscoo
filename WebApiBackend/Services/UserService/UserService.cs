using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using WebApiBackend.Context;
using WebApiBackend.Services.Auth;
using WebApiBackend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace WebApiBackend.Services.UserService
{
    public class UserService : IUser
    {
        private readonly RoadMapContext _context;

        public UserService(RoadMapContext context)
        {
            _context = context;
        }

        public async Task CriarUser(User newUser)
        {
            _context.User.Add(newUser);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception error)
            {
                throw new ArgumentException(error.Message);
            }

            _context.ChangeTracker.Clear();

        }
        
        public async Task<string> Login(User user,IPasswordHasher _passworHasher, TokenProvider tokenProvider)
        {
            User? _user = await _context.User.AsNoTracking().FirstOrDefaultAsync(x => x.email == user.email);
            _context.ChangeTracker.Clear();

            ArgumentNullException.ThrowIfNull(_user);

            bool verified = _passworHasher.Verify(_user.password,user.password);

            if(!verified){
                throw new ArgumentException("senha ou email errados");
            }
                
            return tokenProvider.Create(_user);

        }

        public async Task<string> Register(User user, IPasswordHasher _passworHasher, TokenProvider tokenProvider)
        {
            User? users = await _context.User.AsNoTracking().FirstOrDefaultAsync(x => x.email == user.email);
            _context.ChangeTracker.Clear();
            if(users != null){
                throw new ArgumentException("Esse email já está sendo usado");
            }

            var _user = new User{
                name = user.name,
                email = user.email,
                password = _passworHasher.Hash(user.password)
            };

            _context.User.Add(_user);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception error)
            {
                throw new ArgumentException(error.Message);
            }

            return tokenProvider.Create(_user);
        }

        public async Task<List<User>> ObterUser()
        {
            List<User> user = new List<User>();

            try
            {
                user = await _context.User.ToListAsync();
                _context.ChangeTracker.Clear();
            }
            catch (Exception error)
            {
                throw new ArgumentException(error.Message);
            }

            return user;
        }

        public async Task<User> ObterUserPorId(int id)
        {
            User? user = await _context.User.AsNoTracking().FirstOrDefaultAsync(x => x.id == id);
            _context.ChangeTracker.Clear();

            ArgumentNullException.ThrowIfNull(user);

            return user;
        }

        public async Task EditarUser(int id, User editedUser, string user_id)
        {
            User? EditUser = await _context.User.AsNoTracking().FirstOrDefaultAsync(x => x.id == id);
                
            ArgumentNullException.ThrowIfNull(EditUser);
            
            if(EditUser.id.ToString() != user_id){
                System.Console.Write(user_id);
                throw new ArgumentException("User does not have authorization");
            }

            try
            {
                _context.User.Update(editedUser);

                await _context.SaveChangesAsync();
                _context.ChangeTracker.Clear();
            }
            catch (DbUpdateConcurrencyException error)
            {
                throw new ArgumentException(error.Message);
            }
        }

        public async Task DeletarUser(int id, string user_id)
        {
            User? UserDelete = await _context.User.FindAsync(id);

            ArgumentNullException.ThrowIfNull(UserDelete);

            if(UserDelete.id.ToString() != user_id){
                System.Console.Write(user_id);
                throw new ArgumentException("User does not have authorization");
            }

            _context.User.Remove(UserDelete);
            try
            {
                await _context.SaveChangesAsync();
                _context.ChangeTracker.Clear();
            }
            catch (Exception error)
            {
                throw new ArgumentException(error.Message);
            }
        }
    }
}