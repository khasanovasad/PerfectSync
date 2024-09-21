namespace REScore.API;

public class RequestDto
{
    public string Latitude { get; set; }
    public string Longitude { get; set; }
    public string Area {  get; set; }
    public string Price {  get; set; }
    public string Level { get; set; }
    public string Rooms { get; set; }
}

public class ResponseDto
{
    public string Score { get; set; }
}
