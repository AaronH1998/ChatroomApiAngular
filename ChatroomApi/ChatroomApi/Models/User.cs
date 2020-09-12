using System;

namespace ChatroomApi.Models
{
    public partial class User
    {
        public int ID { get; set; }
        public string Username { get; set; }

        public DateTime EntryTime { get; set; }
    }
}
