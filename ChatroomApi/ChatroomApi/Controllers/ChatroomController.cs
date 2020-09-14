using ChatroomApi.Models;
using ChatroomApi.TimerFeatures;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Linq;

namespace ChatroomApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatroomController : ControllerBase
    {
        PurpleTuesdayChatroomContext context;
        private IHubContext<MessageHub> hub;

        public ChatroomController(PurpleTuesdayChatroomContext _context, IHubContext<MessageHub> _hub)
        {
            context = _context;
            hub = _hub;
        }
        //[HttpGet]
        //public List<RoomMessage> GetMessages()
        //{
        //    return context.RoomMessages.ToList();
        //}
        [HttpGet]
        public IActionResult Get()
        {
            var messages = context.RoomMessages.ToList();
            var timerManager = new TimerManager(() =>
            {
                hub.Clients.All.SendAsync("transfermessages", messages);
            });
            return Ok(new { Message = "Request Completed" });
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
