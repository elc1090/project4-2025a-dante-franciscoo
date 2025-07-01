using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApiBackend.Models.Entities
{
    [Table("Tags")] 
    public class Tag
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int id {get;set;}

        [Column("name",TypeName = "varchar(55)")]
        public required string name {get; set;}

        [Column("description",TypeName = "text")]
        public required string description {get; set;}
    }
}