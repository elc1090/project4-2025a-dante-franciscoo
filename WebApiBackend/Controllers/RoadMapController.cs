using System;
using System.Collections.Generic;
using System.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using WebApiBackend.Models.Entities;
using WebApiBackend.Services.RoadMapService;
using WebApiBackend.DTO.RoadMap;
using WebApiBackend.Context;

namespace WebApiBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoadMapController : ControllerBase
    {

        private readonly IRoadMap _IRoadMap;
        private readonly IMapper _IMapper;

        public RoadMapController(IRoadMap IRoadMap,IMapper IMapper)
        {
            _IRoadMap = IRoadMap;
            _IMapper = IMapper;
        }


        [HttpGet("GetRoadMap")]
        public async Task<ActionResult<List<RoadMapDtoGet>>> GetRoadMap()
        {
            List<RoadMap> roadmaps;
            try{
                roadmaps = await _IRoadMap.ObterRoadMap();
            }
            catch(Exception error){
                return BadRequest(new { message = error.Message });
            }

            List<RoadMapDtoGet> serviceResponse = _IMapper.Map<List<RoadMapDtoGet>>(roadmaps);

            return Ok(serviceResponse);
        }

        [Authorize]
        [HttpPost("PostRoadMap")]
        public async Task<ActionResult<RoadMap>> PostRoadMap(RoadMapDtoPost roadmap)
        { 
            if(roadmap == null){
                return BadRequest("No Roadmap provided");
            }

            RoadMap roadmap_add = _IMapper.Map<RoadMap>(roadmap);
            
            try
            {
                await _IRoadMap.CriarRoadMap(roadmap_add);
            }catch(Exception error)
            {
                return BadRequest(new { message = error.Message });
            }

            return CreatedAtAction(nameof(GetRoadMapbyId), new { id = roadmap_add.id }, roadmap_add);
        }

        [HttpGet("GetRoadMap/{id}")]
        public async Task<ActionResult<RoadMapDtoUGet>> GetRoadMapbyId(int id)
        {
            var user_id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if( user_id is null){
                return Forbid("invalid access!");
            }

            RoadMap roadmap;
            try
            {
                roadmap = await _IRoadMap.ObterRoadMapPorId(id);
            }
            catch (Exception error)
            {
                return BadRequest(new { message = error.Message });
            }

            RoadMapDtoUGet ServiceResponse = _IMapper.Map<RoadMapDtoUGet>(roadmap);

            if(ServiceResponse.userid.ToString() == user_id){
                ServiceResponse.isOwner = true;
            }

            return Ok(ServiceResponse);
        }

        [Authorize]
        [HttpGet("TestClaims")]
        public IActionResult TestClaims()
        {
            return Ok(User.Claims.Select(c => new { c.Type, c.Value }));
        }

        [Authorize]
        [HttpPut("PutRoadMap/{id}")]
        public async Task<IActionResult> PutRoadMap(int id,RoadMapDtoPut roadmap)
        {
            var user_id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (user_id is null)
            {
                return Forbid("invalid access!");  
            }

            if (roadmap is null)
            {
                return BadRequest("No Roadmap provided");
            }

            if(id != roadmap.id){
                return BadRequest();
            }

            RoadMap roadMap = _IMapper.Map<RoadMap>(roadmap);

            try
            {
                await _IRoadMap.EditarRoadMap(id,roadMap,user_id!);
            }
            catch (Exception error)
            {
                return BadRequest(new { message = error.Message });
            }

            return NoContent();
        }

        [Authorize]
        [HttpDelete("DeleteRoadMap/{id}")]
        public async Task<IActionResult> DeleteRoadMap(int id)
        {
            var user_id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (user_id is null)
            {
                return Forbid("invalid access!");  
            }

            try
            {
                await _IRoadMap.DeletarRoadMap(id,user_id!);
            }
            catch (Exception error)
            {
                return BadRequest(new { message = error.Message });
            }

            return NoContent();
        }
    }
}