using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebApiBackend.Context;
using WebApiBackend.Services.Auth;
using WebApiBackend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace WebApiBackend.Services.RoadMapService
{
    public class RoadMapService : IRoadMap
    {
        private readonly RoadMapContext _context;
        
        public RoadMapService(RoadMapContext context)
        {
            _context = context;
        }

        public async Task CriarRoadMap(RoadMap newRoadMap){
            
            _context.RoadMap.Add(newRoadMap);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception error)
            {
                throw new ArgumentException(error.Message);
            }

            _context.ChangeTracker.Clear();
        }

        public async Task<List<RoadMap>> ObterRoadMap(){

            List<RoadMap> roadmaps = new List<RoadMap>();

            try
            {
                //roadmaps = await _context.RoadMap.Include(roadmaps => roadmaps.Tags).ToListAsync();
                roadmaps = await _context.RoadMap.ToListAsync();
                _context.ChangeTracker.Clear();
            }
            catch (Exception error)
            {
                throw new ArgumentException(error.Message);
            }

            return roadmaps;
        }

        public async Task<RoadMap> ObterRoadMapPorId(int id){
            
            RoadMap? roadmap = await _context.RoadMap.AsNoTracking().FirstOrDefaultAsync(x => x.id == id);
            _context.ChangeTracker.Clear();

            ArgumentNullException.ThrowIfNull(roadmap);

            return roadmap;
        }

        public async Task EditarRoadMap(int id, RoadMap editedRoadMap, string user_id){

            RoadMap? EditRoadMap = await _context.RoadMap.AsNoTracking().FirstOrDefaultAsync(x => x.id == id);
                
            ArgumentNullException.ThrowIfNull(EditRoadMap);
            
            if(EditRoadMap!.userid.ToString() != user_id){
                throw new ArgumentException("User does not have authorization");
            }
            
            try
            {
                _context.RoadMap.Update(editedRoadMap);

                await _context.SaveChangesAsync();
                _context.ChangeTracker.Clear();
            }
            catch (DbUpdateConcurrencyException error)
            {
                throw new ArgumentException(error.Message);
            }
        }

        public async Task DeletarRoadMap(int id, string user_id){
            
            RoadMap? RoadMapDelete = await _context.RoadMap.FindAsync(id);

            ArgumentNullException.ThrowIfNull(RoadMapDelete);

            if(RoadMapDelete.userid.ToString() != user_id){
                System.Console.Write(user_id);
                throw new ArgumentException("User does not have authorization");
            }
            
            try
            {
                _context.RoadMap.Remove(RoadMapDelete);

                await _context.SaveChangesAsync();
                _context.ChangeTracker.Clear();
            }
            catch (Exception error)
            {
                throw new ArgumentException(error.Message);
            }
        }
    }
}