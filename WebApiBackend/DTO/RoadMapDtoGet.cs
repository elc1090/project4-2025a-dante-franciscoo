using WebApiBackend.Models.Entities;

namespace WebApiBackend.DTO.RoadMap
{
    public class RoadMapDtoGet
    {
        public required int id { get; set; }
        public required int userid { get; set; }
        public List<Tag> Tags { get; } = [];
        public required string name { get; set; }
        public required string roadmap { get; set; }
    }
}