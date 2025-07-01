using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApiBackend.Models.Entities;
using WebApiBackend.Models;
using WebApiBackend.DTO.User;
using WebApiBackend.Context;
using WebApiBackend.Services.UserService;
using WebApiBackend.Services.Auth;


namespace WebApiBackend.Controllers
{
    namespace WebApiBackend.Controllers
    {
    
        using Microsoft.AspNetCore.Mvc;
    
        [Route("api/[controller]")]
        [ApiController]
        public class UserController : ControllerBase
        {
            private readonly IUser _IUser;
            private readonly IMapper _mapper;

            public UserController(IUser IUser,IMapper mapper)
            {
                _IUser = IUser;
                _mapper = mapper;
            }

            [HttpGet("GetUser")]
            public async Task<ActionResult<List<UserDtoGet>>> GetUser()
            {
                List<User> user;
                try
                {
                    user = await _IUser.ObterUser();
                }
                catch (Exception error)
                {
                    return BadRequest(new { message = error.Message });
                }
                List<UserDtoGet> serviceResponse = _mapper.Map<List<UserDtoGet>>(user);

                return Ok(serviceResponse);
            }
            
            [HttpGet("GetUser/{id}")]
            public async Task<ActionResult<UserDtoGet>> GetUserbyId(int id)
            {
                User _user;
                try
                {
                    _user = await _IUser.ObterUserPorId(id);
                }
                catch (Exception error)
                {
                    return BadRequest(new { message = error.Message });

                }

                UserDtoGet ServiceResponse = _mapper.Map<UserDtoGet>(_user);

                return Ok(ServiceResponse);
            }
            

            [HttpPost("Register")]
            public async Task<ActionResult<string>> LoginUser(UserDtoReg user,[FromServices] IPasswordHasher _passworHasher,[FromServices] TokenProvider tokenProvider)
            {
                if(user is null){
                    return BadRequest("No User provided");
                }

                User user_reg = _mapper.Map<User>(user);
                string token;

                try
                {
                    token = await _IUser.Register(user_reg, _passworHasher, tokenProvider);
                }
                catch (Exception error)
                {
                    return BadRequest(new { message = error.Message });
                }

                return token;
            }

            [HttpPost("Login")]
            public async Task<ActionResult<string>> LoginUser(UserDtoLog user,[FromServices] IPasswordHasher _passworHasher,[FromServices] TokenProvider tokenProvider)
            {
                if(user is null){
                    return BadRequest("No User provided");
                }

                User _user = _mapper.Map<User>(user);

                return await _IUser.Login(_user, _passworHasher, tokenProvider);
            }

            [Authorize]
            [HttpPut("PutUser/{id}")]
            public async Task<IActionResult> EditUser(int id, UserDtoPut user)
            {
                var user_id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (user_id is null)
                {
                    return Forbid("invalid access!");  
                }

                if (user is null)
                {
                    return BadRequest("Empty User");
                }

                if(id != user.id){
                    return BadRequest();
                }

                User user_edit = _mapper.Map<User>(user);

                try
                {
                    await _IUser.EditarUser(id,user_edit,user_id);
                }
                catch (Exception error)
                {
                    return BadRequest(new { message = error.Message });
                }

                return NoContent();
            }

            [Authorize]
            [HttpDelete("DeleteUser/{id}")]
            public async Task<IActionResult> DeleteUser(int id)
            {
                var user_id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (user_id is null)
                {
                    return Forbid("invalid access!");  
                }

                try
                {
                    await _IUser.DeletarUser(id,user_id);
                }
                catch (Exception error)
                {
                    return BadRequest(new { message = error.Message });
                }

                return NoContent();
            }
        }
    }
}