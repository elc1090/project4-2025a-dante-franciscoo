using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApiBackend.Models.Entities
{
    [Table("roadmap")]
    public class RoadMap
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("roadmap_id")]
        public int id {get;set;}

        
        [ForeignKey("User")]
        [Column("user_id")]
        public int userid {get; set;}
        public virtual User? User {get; set;}

        [Required(ErrorMessage = "Title is required.")]
        [Column("title",TypeName = "varchar(55)")]
        public required string name {get; set;}

        public List<Tag> Tags { get; } = [];

        [Required(ErrorMessage = "RoadMap is required.")]
        [Column("roadmap",TypeName = "text")]
        public required string roadmap {get; set;}
    }
}