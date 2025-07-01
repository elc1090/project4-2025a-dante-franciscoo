using Microsoft.IdentityModel.Tokens;
using Microsoft.IdentityModel.JsonWebTokens;
using WebApiBackend.Models.Entities;
using System.Text;
using System.Security.Claims;

namespace WebApiBackend.Services.Auth
{
    public class TokenProvider(IConfiguration Configuration)
    {
        public string Create(User user)
        {
            string secretKey = Configuration["token:key"]!;
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    [
                        new Claim(JwtRegisteredClaimNames.Sub, user.id.ToString()),
                        new Claim(JwtRegisteredClaimNames.Email, user.email)
                    ]),
                    Expires = DateTime.UtcNow.AddMinutes(Configuration.GetValue<int>("Jwt:ExperitionInMinutes")),
                    SigningCredentials = credentials,
                    Issuer = Configuration["Jwt:Issuer"],
                    Audience = Configuration["Jwt:Audience"]
            };

            var handler = new JsonWebTokenHandler();

            string token =  handler.CreateToken(tokenDescriptor);

            return token;
        }
    }
}