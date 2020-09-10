using ChatroomApi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace ChatroomApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        PurpleTuesdayChatroomContext _context;
        public UsersController(PurpleTuesdayChatroomContext context)
        {
            _context = context;
        }
        [HttpGet]
        public List<User> GetUsers()
        {
            return _context.Users.ToList();
        }
        [HttpPost]
        public IActionResult AddUser(User user)
        {
            _context.Add(user);
            _context.SaveChanges();
            return Ok();
        }
        [HttpDelete("{username}")]
        public IActionResult RemoveUser(string username)
        {
            if (_context.Users.Any(u => u.Username == username))
            {
                _context.Remove(_context.Users.First(u => u.Username == username));
                _context.SaveChanges();
            }

            return Ok();
        }
    }
}
