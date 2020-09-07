using System;
using System.Collections.Generic;

namespace ChatroomApi.Models
{
    public partial class RoomMessage
    {
        public int Id { get; set; }
        public string ChatMessage { get; set; }
        public string Username { get; set; }
        public DateTime PostDate { get; set; }
    }
}
