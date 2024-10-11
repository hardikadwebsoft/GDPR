using Microsoft.AspNetCore.Mvc;
using newangular.Model.FormModel;
using newangular.Services.IRepository;
using System.Threading.Tasks;

namespace NewAngular.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _accountRepository;
        public AccountController(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginFormModel loginModel)
        {
            if (loginModel == null || string.IsNullOrEmpty(loginModel.Email) || string.IsNullOrEmpty(loginModel.Password))
            {
                return BadRequest("Email and password are required.");
            }
            var user = await _accountRepository.LoginAsync(loginModel.Email, loginModel.Password);
            if (user == null)
            {
                return Unauthorized("Invalid credentials.");
            }
            return Ok(user);
        }
    }
}
