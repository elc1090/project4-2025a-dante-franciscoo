namespace WebApiBackend.DTO.RoadMap
{
    public class RoadMapDtoPost
    {
        public required int userid { get; set; }
        public required string name { get; set; }
        public required string roadmap { get; set; }
    }
}