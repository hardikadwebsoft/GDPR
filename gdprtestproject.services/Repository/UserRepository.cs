using GDPRTestProject.Services.Helper;
using MongoDB.Driver;
using newangular.Services.IRepository;
using NewAngular.Server.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace newangular.Services.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<User> _usersCollection;
        public UserRepository(MongoDbService mongoDbService)
        {
            _usersCollection = mongoDbService.GetCollection<User>("User");
        }

        public async Task<User> GetUserByIdAsync(string id)
        {
            return await _usersCollection.Find(user => user.Id == id).FirstOrDefaultAsync();
        }
        public async Task AddUserAsync(User user)
        {
            user.Password = CommonMethod.HashPassword(user.Password);
            await _usersCollection.InsertOneAsync(user);
        }
        public async Task UpdateUserAsync(string id, User user)
        {
            var existingUser = await _usersCollection.Find(u => u.Id == id).FirstOrDefaultAsync();
           
            if (existingUser != null)
            {
                existingUser.FirstName = user.FirstName ?? existingUser.FirstName;
                existingUser.LastName = user.LastName ?? existingUser.LastName;
                existingUser.Email = user.Email ?? existingUser.Email;               
                existingUser.IsConsent = user.IsConsent;

                if (!string.IsNullOrEmpty(user.Password))
                {
                    existingUser.Password = CommonMethod.HashPassword(user.Password);
                }
               
                await _usersCollection.ReplaceOneAsync(u => u.Id == id, existingUser);
            }
        }

       
        public async Task DeleteUserAsync(string id, User user)
        {
            var existingUser = await _usersCollection.Find(u => u.Id == id).FirstOrDefaultAsync();
            if (existingUser != null)
            {
                existingUser.FirstName = "Deleted";
                existingUser.LastName = "User";
                existingUser.Email = "deleted@domain.com";
                existingUser.Password = null;
                existingUser.IsConsent = false;
                await _usersCollection.ReplaceOneAsync(u => u.Id == id, existingUser);
            }
        }
    }
}
