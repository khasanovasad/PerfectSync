namespace REScore.API;

public class RequestDto
{
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string WallType {  get; set; }
    public string Class {  get; set; }
    public int Level { get; set; }
}

public class ResponseDto
{
    public string Score { get; set; }
}
