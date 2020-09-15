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

        PurpleTuesdayChatroomContext context;

        public UsersController(PurpleTuesdayChatroomContext _context)
        {
            context = _context;
        }
        [HttpGet]
        public List<User> GetUsers()
        {
            return context.Users.ToList();
        }

        [HttpPost]
        public IActionResult AddUser(User user)
        {
            bool isExistingUser = context.Users.Any(u => u.Username == user.Username);

            if (isExistingUser)
            {
                bool isActiveUser;
                var existingUser = context.Users.Single(u => u.Username == user.Username);
                var currentTime = DateTime.UtcNow;

                if (!context.RoomMessages.Any(m => m.Username == user.Username))
                {
                    isActiveUser = (currentTime - existingUser.EntryTime).TotalMinutes < 30;
                }
                else
                {
                    var lastUserMessage = context.RoomMessages.Where(m => m.Username == user.Username).OrderBy(p => p.PostDate).Last();

                    isActiveUser = (currentTime - lastUserMessage.PostDate).TotalMinutes < 30 || (currentTime - existingUser.EntryTime).TotalMinutes < 30;
                }

                if (isActiveUser)
                {
                    return Ok(new { success = false, message = "User with that username is active in the chatroom" });
                }
                else
                {
                    RemoveUser(user.Username);
                }
            }

            context.Add(user);
            context.SaveChanges();
            return Ok(new { success = true });
        }

        [HttpDelete("{username}")]
        public IActionResult RemoveUser(string username)
        {
            if (context.Users.Any(u => u.Username == username))
            {
                context.Remove(context.Users.First(u => u.Username == username));
                context.SaveChanges();
            }

            return Ok();
        }
    }
}
