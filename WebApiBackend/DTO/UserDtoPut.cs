namespace WebApiBackend.DTO.User
{
    public class UserDtoPut
    {
        public required int id { get; set; }
        public required string name { get; set; }
        public required string email { get; set; }
        public required string password { get; set; }
    }
}