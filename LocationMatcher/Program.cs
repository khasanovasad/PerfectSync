using Newtonsoft.Json;
using System.Text;
using System.Text.Json;
using System.Device.Gpio;
using GeoCoordinatePortable;
using System.Linq.Expressions;
using System.Collections.Generic;

namespace LocationMatcher;

class Program
{
    public class DomTutData
    {
        public string Price { get; set; }
        public string Class { get; set; }
        public string Walls { get; set; }
        public string Level { get; set; }
        public string Rooms { get; set; }
        public string Capacity { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string Street { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }
        public string DomTutRating { get; set; }
        public string Url { get; set; }
        public string DistanceFromTheAmirTemurSquare { get; set; }
    }

    public class AllInData
    {
        public DomTutData BasicData {  get; set; }
        public List<PlacesAround> PlacesAround { get; set; }
    }

    public class PlacesAround
    {
        public string Type { get; set; }
        public string Name { get; set; }
        public string Longitude { set; get; }
        public string Latitude { set; get; }
        public string Distance { set; get; }

    }

    public static void NormalizeData(List<DomTutData> list)
    {
        list.ForEach(x =>
        {
            if (x.Class == "Biznes")
            {
                x.Class = "Business";
            }

            if (x.Class == "Qulaylik")
            {
                x.Class = "Comfort";
            }

            if (x.Walls == "G'isht")
            {
                x.Walls = "Bricks";
            }

            if (x.Walls == "gaz bloki")
            {
                x.Walls = "Aerated concrete";
            }

            if (x.Walls == "Keramoblok")
            {
                x.Walls = "Hollow bricks";
            }

            if (x.Walls == "Ko'pikli blok")
            {
                x.Walls = "Aerated concrete";
            }

            if (x.Walls == "shlakli blok")
            {
                x.Walls = "Aerated concrete";
            }
        });
    }

    public static async Task<AllInData> EnrichData(DomTutData data)
    {
        try
        {
            var latitude = data.Latitude;
            var longitude = data.Longitude;
            const string radius = "1000";

            string query = @$"[out:json];
(
node[""amenity""=""school""](around:{radius},{latitude},{longitude});
node[""railway""=""station""](around:{radius},{latitude},{longitude});
node[""amenity""=""hospital""](around:{radius},{latitude},{longitude});
node[""name""~""Korzinka""](around:{radius},{latitude},{longitude});
way[""name""~""Korzinka""](around:{radius},{latitude},{longitude});
relation[""name""~""Korzinka""](around:{radius},{latitude},{longitude});
node[""name""~""Macro""](around:{radius},{latitude},{longitude});
way[""name""~""Macro""](around:{radius},{latitude},{longitude});
relation[""name""~""Macro""](around:{radius},{latitude},{longitude});
node[""leisure""=""park""](around:{radius},{latitude},{longitude});
way[""leisure""=""park""](around:{radius},{latitude},{longitude});
relation[""leisure""=""park""](around:{radius},{latitude},{longitude});
node[""landuse""=""recreation_ground""](around:{radius},{latitude},{longitude});
way[""landuse""=""recreation_ground""](around:{radius},{latitude},{longitude});
relation[""landuse""=""recreation_ground""](around:{radius},{latitude},{longitude});
);
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

                    var placesAround = new List<PlacesAround>();

                    foreach (JsonElement element in elements.EnumerateArray())
                    {
                        string lat = string.Empty;
                        string lon = string.Empty;
                        string type = string.Empty;
                        string name = string.Empty;
                        string distance = string.Empty;

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
                            var sCoord = new GeoCoordinate(Convert.ToDouble(data.Latitude), Convert.ToDouble(data.Longitude));
                            var eCoord = new GeoCoordinate(Convert.ToDouble(lat), Convert.ToDouble(lon));
                            distance = sCoord.GetDistanceTo(eCoord).ToString();
                        }
                        placesAround.Add(new PlacesAround { Latitude = lat, Longitude = lon, Name = name, Type = type, Distance = distance });
                    }

                    return new AllInData { BasicData = data, PlacesAround = placesAround.Where(x => !string.IsNullOrEmpty(x.Latitude) && !string.IsNullOrEmpty(x.Longitude)).ToList() };
                }
            }
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error occured: {e.Message}");
            return new AllInData();
        }
    }

    static async Task Main(string[] args)
    {
        string json1 = File.ReadAllText("./enriched_json_data2.json");
        List<AllInData> datas1 = JsonConvert.DeserializeObject<List<AllInData>>(json1);

        foreach (var data in datas1)
        {
            var sCoord = new GeoCoordinate(Convert.ToDouble(data.BasicData?.Latitude), Convert.ToDouble(data.BasicData?.Longitude));
            var eCoord = new GeoCoordinate(41.3111, 69.2796);
            var distance = sCoord.GetDistanceTo(eCoord).ToString();

            if (data.BasicData != null)
            {
                data.BasicData.DistanceFromTheAmirTemurSquare = distance;
            }
        }

        string toBeWritten = JsonConvert.SerializeObject(datas1, Newtonsoft.Json.Formatting.Indented);
        File.WriteAllText("./enriched_json_data3.json", toBeWritten);

        /*
        string json2 = File.ReadAllText("./normalized_json_data.json");
        List<DomTutData> datas2 = JsonConvert.DeserializeObject<List<DomTutData>>(json2);

        foreach (var data1 in datas1)
        {
            var found = datas2.FirstOrDefault(x => x.Url == data1.BasicData?.Url);

            if (found != null)
            {
                data1.BasicData = found;
            }
        }

        string toBeWritten = JsonConvert.SerializeObject(datas1, Newtonsoft.Json.Formatting.Indented);
        File.WriteAllText("./enriched_json_data2.json", toBeWritten);
        */

        /*
        // removing duplicates
        datas = datas.DistinctBy(x => x.Url).ToList();

        NormalizeData(datas);
        string ff = JsonConvert.SerializeObject(datas, Newtonsoft.Json.Formatting.Indented);
        File.WriteAllText("./normalized_json_data.json", ff);
        return;

        try
        {
            int maxConcurrency = 10; // Limit the number of concurrent tasks
            SemaphoreSlim semaphore = new SemaphoreSlim(maxConcurrency);
            var tasks = new List<Task<AllInData>>();

            foreach (var data in datas)
            {
                tasks.Add(Task.Run(async () =>
                {
                    await semaphore.WaitAsync();
                    try
                    {
                        Console.WriteLine(data.Url);
                        return await EnrichData(data);
                    }
                    finally
                    {
                        semaphore.Release();
                    }
                }));

            }

            var allInData = await Task.WhenAll(tasks);

            string toBeWritten = JsonConvert.SerializeObject(allInData, Newtonsoft.Json.Formatting.Indented);
            File.WriteAllText("./enriched_json_data.json", toBeWritten);
        }
        finally
        {
        }

        */
    }
}
