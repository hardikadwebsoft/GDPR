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
    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<User> _usersCollection;

        public UserRepository(MongoDbService mongoDbService)
        {
            // Use MongoDbService to get the "Users" collection
            _usersCollection = mongoDbService.GetCollection<User>("User");
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _usersCollection.Find(user => true).ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(string id)
        {
            return await _usersCollection.Find(user => user.Id == id).FirstOrDefaultAsync();
        }

        public async Task AddUserAsync(User user)
        {
            await _usersCollection.InsertOneAsync(user);
        }

        public async Task UpdateUserAsync(string id, User user)
        {
            // Retrieve the existing user from the database
            var existingUser = await _usersCollection.Find(u => u.Id == id).FirstOrDefaultAsync();

            if (existingUser != null)
            {
                // Update only the fields that are passed in the user object
                existingUser.FirstName = user.FirstName ?? existingUser.FirstName;
                existingUser.LastName = user.LastName ?? existingUser.LastName;
                existingUser.Email = user.Email ?? existingUser.Email;
                existingUser.Password = user.Password ?? existingUser.Password;
                existingUser.IsConsent = user.IsConsent; // Assuming IsConsent will always be provided

                // Replace the updated document in the database
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
