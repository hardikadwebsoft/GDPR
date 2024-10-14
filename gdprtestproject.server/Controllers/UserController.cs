using Microsoft.AspNetCore.Mvc;
using NewAngular.Server.Model;
using newangular.Services.IRepository;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserRepository _userRepository;

    public UserController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    
    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<User>> GetUserById(string id)
    {
        var user = await _userRepository.GetUserByIdAsync(id);
        if (user == null)
        {
            return NotFound(); 
        }
        return Ok(user);
    }


    [HttpPost("Signup")]
    public async Task<IActionResult> SignUp(User user)
    {
        if (user == null)
        {
            return BadRequest("User data is required.");
        }
        if (string.IsNullOrEmpty(user.Id) || !ObjectId.TryParse(user.Id, out _))
        {
            user.Id = ObjectId.GenerateNewId().ToString();
        }
        try
        {
            await _userRepository.AddUserAsync(user);
            return Ok(user);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "An error occurred while creating the user.");
        }
    }

    [HttpPut("Update/{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateUser(string id, User user)
    {
        var existingUser = await _userRepository.GetUserByIdAsync(id);
        if (existingUser == null)
        {
            return NotFound();
        }
        await _userRepository.UpdateUserAsync(id, user);
        return Ok(existingUser);
    }


    [HttpPut("Delete/{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteUser(string id, User user)
    {
        var existingUser = await _userRepository.GetUserByIdAsync(id);
        if (existingUser == null)
        {
            return NotFound(); 
        }
        await _userRepository.DeleteUserAsync(id, user);
        return Ok(existingUser);
    }
}
