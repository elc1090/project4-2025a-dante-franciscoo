namespace WebApiBackend.DTO.User
{
    public class UserDtoReg
    {
        public required string name { get; set; }
        public required string email { get; set; }
        public required string password { get; set; }
    }
}