using MediatR;
using System.Text;
using System.Text.Json;
using GeoCoordinatePortable;

namespace REScore.API.Handlers
{
    public class GetSuggestedOpenings : IRequest<PlaceInfo[]>
    {
        public string SearchParameterName {  get; set; }
        public string SearchParameter {  get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Separator { get; set; }
    }

    public class PlaceInfo
    {
        public string Type { get; set; }
        public string Name { get; set; }
        public string Distance { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
    
    }

    public class GetSuggestedOpeningsHandler : IRequestHandler<GetSuggestedOpenings, PlaceInfo[]>
    {
        async Task<PlaceInfo[]> IRequestHandler<GetSuggestedOpenings, PlaceInfo[]>.Handle(GetSuggestedOpenings request, CancellationToken cancellationToken)
        {
            string searchParameterName = request.SearchParameterName;
            string searchParameter = request.SearchParameter;
            double latitude = request.Latitude;
            double longitude = request.Longitude;
            double radius = 1000;

            string query = @$"[out:json];
(
node[""{searchParameterName}""{request.Separator}""{searchParameter}""](around:{radius},{latitude},{longitude});
way[""{searchParameterName}""{request.Separator}""{searchParameter}""](around:{radius},{latitude},{longitude});
relation[""{searchParameterName}""{request.Separator}""{searchParameter}""](around:{radius},{latitude},{longitude}););
out body;";

            string apiUrl = "http://overpass-api.de/api/interpreter";
            HttpContent content = new StringContent(query, Encoding.UTF8, "application/x-www-form-urlencoded");

            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response = await client.PostAsync(apiUrl, content);

                response.EnsureSuccessStatusCode();

                string responseData = await response.Content.ReadAsStringAsync();

                using (JsonDocument document = JsonDocument.Parse(responseData))
                {
                    JsonElement root = document.RootElement;
                    JsonElement elements = root.GetProperty("elements");

                    var placesAround = new List<PlaceInfo>();
                    foreach (JsonElement element in elements.EnumerateArray())
                    {
                        string lat = string.Empty;
                        string lon = string.Empty;
                        string type = string.Empty;
                        string name = string.Empty;
                        string distance = string.Empty;
                        string address = string.Empty;

                        try
                        {
                            lat = element.GetProperty("lat").GetDouble().ToString();
                            lon = element.GetProperty("lon").GetDouble().ToString();
                        }
                        catch { }


                        try
                        {
                            if (element.GetProperty("tags").TryGetProperty("railway", out var railway))
                            {
                                name = element.GetProperty("tags").GetProperty("alt_name").GetString();
                            }
                            else
                            {
                                name = element.GetProperty("tags").GetProperty("name").GetString();
                            }
                        }
                        catch { }

                        try
                        {
                            if (element.GetProperty("tags").TryGetProperty("amenity", out var school) && school.GetString() == "school")
                            {
                                type = "school";
                            }
                            if (element.GetProperty("tags").TryGetProperty("leisure", out var leisure) && leisure.GetString() == "park")
                            {
                                type = "park";
                            }
                            if (element.GetProperty("tags").TryGetProperty("shop", out var shop) && shop.GetString() == "supermarket")
                            {
                                type = "supermarket";
                            }
                        }
                        catch { }

                        if (!string.IsNullOrEmpty(lat) && !string.IsNullOrEmpty(lon))
                        {
                            var sCoord = new GeoCoordinate(Convert.ToDouble(latitude), Convert.ToDouble(longitude));
                            var eCoord = new GeoCoordinate(Convert.ToDouble(lat), Convert.ToDouble(lon));
                            distance = sCoord.GetDistanceTo(eCoord).ToString();
                            placesAround.Add(new PlaceInfo { Latitude = lat, Longitude = lon, Name = name, Type = type, Distance = distance });
                        }
                    }
                    return placesAround.ToArray();

                }
            }
        }
    }
}
