using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiBackend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace WebApiBackend.Context
{
    public class RoadMapContext : DbContext
    {
        public RoadMapContext(DbContextOptions<RoadMapContext> options) : base(options){}
        
        public DbSet<RoadMap> RoadMap { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Tag> Tag { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RoadMap>()
            .HasMany(e => e.Tags)
            .WithMany()
            .UsingEntity<Dictionary<string, object>>( // use tipo anônimo ou Dictionary
                "RoadmapTags", // nome da tabela de junção
                r => r.HasOne<Tag>().WithMany().HasForeignKey("tag_id").HasPrincipalKey(t => t.id),
                l => l.HasOne<RoadMap>().WithMany().HasForeignKey("roadmap_id").HasPrincipalKey(r => r.id),
                j =>
                {
                    j.HasKey("roadmap_id", "tag_id");
                    j.ToTable("RoadmapTags"); // opcional, se quiser configurar nome da tabela
                });
        }
    }
}
