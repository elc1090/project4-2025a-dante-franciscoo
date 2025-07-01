using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApiBackend.Services.Auth;
using WebApiBackend.Models.Entities;

namespace WebApiBackend.Services.RoadMapService
{
    public interface IRoadMap
    {
        Task CriarRoadMap(RoadMap newRoadMap);
        Task<List<RoadMap>> ObterRoadMap();
        Task<RoadMap> ObterRoadMapPorId(int id);
        Task EditarRoadMap(int id, RoadMap editedRoadMap, string user_id);
        Task DeletarRoadMap(int id, string user_id);
    }
}