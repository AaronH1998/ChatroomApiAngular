using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace ChatroomApi.Models
{
    public class ChatroomHub : Hub
    {
        public async Task SendMessage(RoomMessage message)
        {
            await Clients.All.SendAsync("sendmessage", message);
        }

        public async Task AddUser(User user)
        {
            await Clients.All.SendAsync("adduser", user);
        }

    }
}
