using System;

namespace ChatroomApi.Models
{
    public partial class RoomMessage
    {
        public int ID { get; set; }
        public string ChatMessage { get; set; }
        public string Username { get; set; }
        public DateTime PostDate { get; set; }
    }
}
