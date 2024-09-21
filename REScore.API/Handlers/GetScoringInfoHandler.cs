using GeoCoordinatePortable;
using MediatR;
using Newtonsoft.Json;
using System.Data;
using System.Diagnostics;

namespace REScore.API.Handlers
{
    public class GetScoringInfo: IRequest<string>
    {
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string Level {  get; set; }
        public string Rooms {  get; set; }
        public string Price { get; set; }
        public string Capacity { get; set; }
    }

    public class BasicData
    {
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string Level {  get; set; }
        public string Rooms {  get; set; }
        public string Price { get; set; }
        public string Capacity { get; set; }
        public string DistanceFromTheAmirTemurSquare { get; set; }
        public string DomTutRating { get; set; } = "0/5";
        public string Class { get; set; } = "Comfort";
        public string City { get; set; } = "Tashkent";
        public string Walls { get; set; } = "...";
        public string Province { get; set; } = "...";
    }

    public class FeedData
    {
        public BasicData BasicData { get; set; }
        public List<PlaceInfo> PlacesAround { get; set; }
    }

    public class GetScoringInfoHandler : IRequestHandler<GetScoringInfo, string>
    {
        private readonly IMediator _mediator;

        public GetScoringInfoHandler(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task<string> Handle(GetScoringInfo request, CancellationToken cancellationToken)
        {
            var obj = new BasicData { Latitude = request.Latitude, Longitude = request.Longitude, Level = request.Level, Rooms = request.Rooms, Price = request.Price, Capacity = request.Capacity };

            var sCoord = new GeoCoordinate(Convert.ToDouble(obj?.Latitude), Convert.ToDouble(obj?.Longitude));
            var eCoord = new GeoCoordinate(41.3111, 69.2796);
            var distance = sCoord.GetDistanceTo(eCoord).ToString();
            obj.DistanceFromTheAmirTemurSquare = distance;

            var places = new List<PlaceInfo>();
            places.AddRange(await _mediator.Send(new GetSuggestedOpenings { Latitude = Convert.ToDouble(obj.Latitude), Longitude = Convert.ToDouble(obj.Longitude), SearchParameter = "school", SearchParameterName = "amenity", Separator = "=" }));
            places.AddRange(await _mediator.Send(new GetSuggestedOpenings { Latitude = Convert.ToDouble(obj.Latitude), Longitude = Convert.ToDouble(obj.Longitude), SearchParameter = "korzinka", SearchParameterName = "name" , Separator = "~" }));
            places.AddRange(await _mediator.Send(new GetSuggestedOpenings { Latitude = Convert.ToDouble(obj.Latitude), Longitude = Convert.ToDouble(obj.Longitude), SearchParameter = "park", SearchParameterName = "leisure" , Separator = "=" }));
            places.AddRange(await _mediator.Send(new GetSuggestedOpenings { Latitude = Convert.ToDouble(obj.Latitude), Longitude = Convert.ToDouble(obj.Longitude), SearchParameter = "station", SearchParameterName = "railway", Separator = "=" }));
            places.AddRange(await _mediator.Send(new GetSuggestedOpenings { Latitude = Convert.ToDouble(obj.Latitude), Longitude = Convert.ToDouble(obj.Longitude), SearchParameter = "hospital", SearchParameterName = "amenity", Separator = "="}));

            var allInAll = new FeedData { BasicData = obj, PlacesAround = places };

            string toBeWritten = JsonConvert.SerializeObject(allInAll, Newtonsoft.Json.Formatting.Indented);
            string fileName = obj.Latitude.Split('.')[1] + ".json";
            File.WriteAllText(fileName, toBeWritten);

            string pythonFilePath = $"../model/model.py ../REScore.API/{fileName}";
            ProcessStartInfo start = new ProcessStartInfo
            {
                FileName = "python",  // Assuming Python is in the system's PATH
                Arguments = pythonFilePath,  // The Python script to execute
                RedirectStandardOutput = true,  // Capture output
                RedirectStandardError = true,   // Capture error messages
                UseShellExecute = false,  // Required for redirecting streams
                CreateNoWindow = true  // Hide the command window
            };
            using (Process process = Process.Start(start))
            {
                // Read the standard output
                using (System.IO.StreamReader reader = process.StandardOutput)
                {
                    string result = reader.ReadToEnd();
                    if (!string.IsNullOrEmpty(result))
                    {
                        double pricePerSqrm = Convert.ToDouble(result);
                        double totalPrice = pricePerSqrm * Convert.ToDouble(obj.Capacity.Split(' ')[0]);
                        return totalPrice.ToString();
                    }
                }

                // Read the standard error (if any)
                using (System.IO.StreamReader reader = process.StandardError)
                {
                    string errors = reader.ReadToEnd();
                    if (!string.IsNullOrEmpty(errors))
                    {
                        return "ERROR!";
                    }
                }
            }
            return "";
        }
    }
}
