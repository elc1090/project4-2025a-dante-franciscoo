namespace WebApiBackend.DTO.RoadMap
{
    public class RoadMapDtoPut
    {
        public required int id { get; set; }
        public required int userid { get; set; }
        public required string name { get; set; }
        public required string roadmap { get; set; }
    }
}