using ChatroomApi.Models;
using Microsoft.AspNetCore.Mvc;
using System;
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
            bool isExistingUser = _context.Users.Any(u => u.Username == user.Username);

            if (isExistingUser)
            {
                var existingUser = _context.Users.Single(u => u.Username == user.Username);

                var lastUserMessage = _context.RoomMessages.Where(m => m.Username == user.Username).OrderBy(p => p.PostDate).Last();

                var currentTime = DateTime.UtcNow;

                var isActiveUser = (currentTime - lastUserMessage.PostDate).TotalMinutes < 30 || (currentTime - existingUser.EntryTime).TotalMinutes < 30;

                if (isActiveUser)
                {
                    return Ok(new { success = false, message = "User with that username is active in the chatroom" });
                }
                else
                {
                    RemoveUser(user.Username);
                }
            }

            _context.Add(user);
            _context.SaveChanges();
            return Ok(new { success = true });
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
