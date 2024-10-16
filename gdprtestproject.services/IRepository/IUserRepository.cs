﻿using NewAngular.Server.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace newangular.Services.IRepository
{
    public interface IUserRepository 
    {
        Task<User> GetUserByIdAsync(string id);
        Task AddUserAsync(User user);
        Task UpdateUserAsync(string id, User user);
        Task DeleteUserAsync(string id , User user);
    }
}
