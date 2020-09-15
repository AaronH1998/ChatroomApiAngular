using ChatroomApi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace ChatroomApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatroomController : ControllerBase
    {
        PurpleTuesdayChatroomContext context;

        public ChatroomController(PurpleTuesdayChatroomContext _context)
        {
            context = _context;
        }
        [HttpGet]
        public List<RoomMessage> GetMessages()
        {
            return context.RoomMessages.ToList();
        }
        [HttpPost]
        public IActionResult SendMessage(RoomMessage message)
        {
            context.RoomMessages.Add(message);
            context.SaveChanges();
            return Ok();
        }
    }
}
