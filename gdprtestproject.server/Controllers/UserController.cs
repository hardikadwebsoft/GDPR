using Microsoft.AspNetCore.Mvc;
using NewAngular.Server.Model;
using newangular.Services.IRepository;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;
using static System.Runtime.InteropServices.JavaScript.JSType;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserRepository _userRepository;

    public UserController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [HttpGet]
    public async Task<IEnumerable<User>> GetAllUsers()
    {
        return await _userRepository.GetAllUsersAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUserById(string id)
    {
        var user = await _userRepository.GetUserByIdAsync(id);
        if (user == null)
        {
            return NotFound(); // Returns a 404 Not Found response if the user doesn't exist
        }
        return Ok(user); // Return the Profile object as JSON
    }


    [HttpPost("Signup")]
    public async Task<IActionResult> SignUp(User user)
    {
        if (user == null)
        {
            return BadRequest("User data is required."); // Return a 400 Bad Request if user is null
        }

        if (string.IsNullOrEmpty(user.Id) || !ObjectId.TryParse(user.Id, out _))
        {
            user.Id = ObjectId.GenerateNewId().ToString(); // Automatically generate new ObjectId if invalid
        }

        try
        {
            await _userRepository.AddUserAsync(user);
            return Ok(user); // Return the user object as JSON
        }
        catch (Exception ex)
        {
            // Log the exception (ex) here if needed
            return StatusCode(500, "An error occurred while creating the user."); // Return a 500 Internal Server Error
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(string id, User user)
    {
        var existingUser = await _userRepository.GetUserByIdAsync(id);
        if (existingUser == null)
        {
            return NotFound(); // Return 404 if the user does not exist
        }

        // Update the user properties as needed, for example:
        existingUser.FirstName = user.FirstName;
        existingUser.LastName = user.LastName;
        existingUser.Email = user.Email;
        existingUser.Password = user.Password;
        existingUser.IsConsent = user.IsConsent;

        await _userRepository.UpdateUserAsync(existingUser); // Update with existingUser instead of user

        return Ok(existingUser); // Return the updated user in JSON format
    }


    [HttpPut("Delete/{id}")]
    public async Task<IActionResult> DeleteUser(string id)
    {
        var existingUser = await _userRepository.GetUserByIdAsync(id);
        if (existingUser == null)
        {
            return NotFound(); // Return 404 if the user does not exist
        }

        existingUser.FirstName = "Deleted";
        existingUser.LastName = "User";
        existingUser.Email = "deleted@domain.com";
        existingUser.Password = null ;
        existingUser.IsConsent = false;

        await _userRepository.UpdateUserAsync(existingUser); // Update with existingUser instead of user

        return Ok(existingUser);

    }

    

}
