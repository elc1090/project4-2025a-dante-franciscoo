using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApiBackend.Models.Entities
{
    [Table("users")]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("user_id")]
        public int id {get;set;}

        [Required(ErrorMessage = "Name is required.")]
        [Column("username",TypeName = "varchar(55)")]
        public required string name {get; set;}

        [Required(ErrorMessage = "Email is required.")]
        [Column("email",TypeName = "text")]
        public required string email {get; set;}

        [Required(ErrorMessage = "Password is required.")]
        [Column("password_hash",TypeName = "text")]
        public required string password {get; set;}
    }
}