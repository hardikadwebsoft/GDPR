using GDPRTestProject.Services.Helper;
using MongoDB.Driver;
using newangular.Services.IRepository;
using NewAngular.Server.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace newangular.Services.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IMongoCollection<User> _usersCollection;

        public AccountRepository(MongoDbService mongoDbService)
        {
            // Use MongoDbService to get the "Users" collection
            _usersCollection = mongoDbService.GetCollection<User>("User");
        }
        public async Task<User> LoginAsync(string email, string password)
        {
            
            // Find user by email
            var user = await _usersCollection.Find(u => u.Email == email).FirstOrDefaultAsync();
            password = CommonMethod.HashPassword(password);
            if (user != null && user.Password == password)
            {
                return user; // Return the user if the password is correct
            }

            return null; // Return null if the user does not exist or the password is incorrect
        }

    }
}
