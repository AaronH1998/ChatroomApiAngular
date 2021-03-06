﻿using Microsoft.EntityFrameworkCore;

namespace ChatroomApi.Models
{
    public partial class PurpleTuesdayChatroomContext : DbContext
    {
        public PurpleTuesdayChatroomContext()
        {
        }

        public PurpleTuesdayChatroomContext(DbContextOptions<PurpleTuesdayChatroomContext> options)
            : base(options)
        {
        }

        public virtual DbSet<RoomMessage> RoomMessages { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RoomMessage>(entity =>
            {

                entity.Property(e => e.ChatMessage)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PostDate).HasColumnType("datetime");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Username).IsRequired().HasMaxLength(10).IsUnicode(false);

                entity.Property(e => e.EntryTime).IsRequired().HasColumnType("datetime");
            });
        }
    }
}
