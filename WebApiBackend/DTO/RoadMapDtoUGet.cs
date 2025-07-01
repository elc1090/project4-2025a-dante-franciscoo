using WebApiBackend.Models.Entities;

namespace WebApiBackend.DTO.RoadMap
{
    public class RoadMapDtoUGet
    {
        public required int id { get; set; }
        public required int userid { get; set; }
        public required string name { get; set; }
        public List<Tag> Tags { get; } = [];
        public required string roadmap { get; set; }
        public required bool isOwner { get; set; }
    }
}