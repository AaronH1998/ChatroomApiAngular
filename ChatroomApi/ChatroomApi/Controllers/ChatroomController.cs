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
        PurpleTuesdayChatroomContext _context;
        public ChatroomController(PurpleTuesdayChatroomContext context)
        {
            _context = context;
        }
        [HttpGet]
        public List<RoomMessage> GetMessages()
        {
            return _context.RoomMessage.ToList();
        }

        [HttpPost]
        public IActionResult SendMessage(RoomMessage message)
        {
            _context.RoomMessage.Add(message);
            _context.SaveChanges();
            return Ok();
        }
    }
}
