using NewAngular.Server.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace newangular.Services.IRepository
{
    public interface IAccountRepository
    {
        Task<User> LoginAsync(string email, string password);
    }
}
