using MediatR;
using System.Text;
using System.Text.Json;

namespace REScore.API.Handlers
{
    public class AQI : IRequest<double>
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }

    public class AQIHandler : IRequestHandler<AQI, double>
    {
        public async Task<double> Handle(AQI request, CancellationToken cancellationToken)
        {
            string url = string.Format(@"https://api.waqi.info/feed/geo:{0};{1}/?token=bfcd7e1804620ab88c3fedca2277e56dab05d10e", request.Latitude, request.Longitude);

            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync(url);

                response.EnsureSuccessStatusCode();

                string responseData = await response.Content.ReadAsStringAsync();

                using (JsonDocument document = JsonDocument.Parse(responseData))
                {
                    JsonElement root = document.RootElement;
                    JsonElement elements = root.GetProperty("data").GetProperty("forecast").GetProperty("daily").GetProperty("pm25");

                    int allPm25 = 0;
                    int count = 0;
                    foreach (JsonElement element in elements.EnumerateArray())
                    {
                        allPm25 += element.GetProperty("avg").GetInt32();
                        count++;
                    }

                    return allPm25 / count;
                }
            }
        }
    }
}
