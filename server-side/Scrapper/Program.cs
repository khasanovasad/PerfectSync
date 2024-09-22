using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using OpenQA.Selenium;
using Newtonsoft.Json;
using AngleSharp;
using System.Text.RegularExpressions;

namespace Scrapper;

class Program
{
    static async Task Main(string[] args)
    {
        // await DomTutHelper.GetDomTutLinks();
        var obj = new ParseDomTutData();
        await obj.ParseAllAvailableDomTutOpenings();
    }
}

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
    public string DeveloperName { get; set; }
    public string Url { get; set; }
}

public class ParseDomTutData
{
    private readonly List<string> _links = new List<string>();

    public ParseDomTutData(string filePath = "./domtut_links.txt")
    {
        try
        {
            _links.AddRange(File.ReadAllLines(filePath).ToList());
        }
        catch { }
    }

    public async Task ParseAllAvailableDomTutOpenings()
    {
        int maxConcurrency = 15; // Limit the number of concurrent tasks
        SemaphoreSlim semaphore = new SemaphoreSlim(maxConcurrency);

        var list = new List<DomTutData>();
        var tasks = new List<Task<DomTutData>>();

        try
        {
            foreach (var link in _links)
            {
                tasks.Add(Task.Run(async () =>
                {
                    // Wait for the semaphore to allow this task to run
                    await semaphore.WaitAsync();
                    try
                    {
                        return await GetSingleDomTutDataAngleSharp(link);
                    }
                    finally
                    {
                        // Release the semaphore once the task is complete
                        semaphore.Release();
                    }
                }));
            }

            var listList = await Task.WhenAll(tasks);
            list.AddRange(listList);
        }
        finally
        {
            string json = JsonConvert.SerializeObject(list, Newtonsoft.Json.Formatting.Indented);
            File.WriteAllText("./json_domtut_data.json", json);
        }
    }
    public async Task<DomTutData> GetSingleDomTutDataAngleSharp(string link)
    {
        var obj = new DomTutData { Url = link };

        try
        {
            using var httpClient = new HttpClient();
            var response = await httpClient.GetStringAsync(link);

            // Set up AngleSharp configuration
            var config = Configuration.Default;
            var context = BrowsingContext.New(config);
            var document = await context.OpenAsync(req => req.Content(response));

            // Price
            try
            {
                var priceElement = document.QuerySelector("span.price");
                obj.Price = priceElement?.TextContent.Trim();
            }
            catch { }

            // Developer Name
            try
            {
                var developerElement = document.QuerySelector("span.author");
                obj.DeveloperName = developerElement?.TextContent.Split(':')[1].Trim();
            }
            catch { }

            // Class
            try
            {
                var classElement = document.QuerySelector("div:contains('Uy-joy sinfi:') + div");
                obj.Class = classElement?.TextContent.Trim();
            }
            catch { }

            // Walls
            try
            {
                var wallsElement = document.QuerySelector("div:contains('Material:') + div");
                obj.Walls = wallsElement?.TextContent.Trim();
            }
            catch { }

            // Level
            try
            {
                var levelElement = document.QuerySelector("div:contains('Qavat:') + div");
                obj.Level = levelElement?.TextContent.Trim().Split(' ').Last().Trim();
            }
            catch { }

            // Rooms
            try
            {
                var roomsElement = document.QuerySelector("h1[itemprop='name']");
                obj.Rooms = roomsElement?.TextContent[0].ToString();
            }
            catch { }

            // Capacity
            try
            {
                var capacityElement = document.QuerySelector("h1[itemprop='name']");
                obj.Capacity = capacityElement?.TextContent.Split(',')[1].Trim();
            }
            catch { }

            // City
            try
            {
                var cityElement = document.QuerySelector("b:contains('Shahar:') + span");
                obj.City = cityElement?.TextContent.Trim();
            }
            catch { }

            // Province
            try
            {
                var provinceElement = document.QuerySelector("b:contains('Tuman:') + span");
                obj.Province = provinceElement?.TextContent.Trim();
            }
            catch { }

            // Street
            try
            {
                var streetElement = document.QuerySelector("b:contains('Manzil:') + span");
                obj.Street = streetElement?.TextContent.Trim();
            }
            catch { }

            // Latitude & Longitude
            try
            {
                var anchorTags = document.QuerySelectorAll("a");
                var coordinatePattern = new Regex(@"\d{2}\.\d+,\d{2}\.\d+");

                foreach (var anchorTag in anchorTags)
                {
                    if (anchorTag.TextContent.Trim() == "Google Xaritalarda oching")
                    {
                        // Use the regex to find the coordinates in the href value
                        var match = coordinatePattern.Match(anchorTag.OuterHtml);

                        if (match.Success)
                        {
                            string coordinates = match.Value;
                            string[] latLong = coordinates.Split(',');
                            obj.Latitude = latLong[0];
                            obj.Longitude = latLong[1];
                            break;
                        }
                    }
                }
            }
            catch { }

            // Rating
            try
            {
                var ratingElement = document.QuerySelector("div.rating-score");
                obj.DomTutRating = ratingElement?.TextContent.Split('/')[0].Trim() + "/5";
            }
            catch { }

            Console.WriteLine(obj.Url);
            return obj;

        }
        catch (Exception ex)
        {
            Console.WriteLine("Error occurred: " + ex.Message);
            return obj;
        }
    }

    public DomTutData GetSingleDomTutData(ChromeDriver driver, string link)
    {
        driver.Navigate().GoToUrl(link);

        DomTutHelper.WaitForPageLoad(driver);
        DomTutHelper.WaitForAjax(driver);

        var obj = new DomTutData();

        obj.Url = link;
        try
        {
            obj.Price = driver.FindElement(By.CssSelector("span.price")).Text;
        }
        catch { }

        try
        {
            obj.DeveloperName = driver.FindElement(By.CssSelector("span.author")).Text.Split(':')[1].Trim();
        }
        catch { }

        try
        {
            obj.Class = driver.FindElement(By.XPath("//div[@class='row prop-tag']/div[2]")).Text;
        }
        catch { }

        try
        {
            obj.Walls = driver.FindElement(By.XPath("//div[@class='row prop-tag']/div[10]")).Text;
        }
        catch { }

        try
        {
            obj.Level = driver.FindElement(By.XPath("//div[@class='row prop-tag']/div[14]")).Text.Split(' ').Last();
        }
        catch { }

        try
        {
            obj.Rooms = driver.FindElement(By.XPath("//h1[@itemprop='name']")).Text[0].ToString();
        }
        catch { }

        try
        {
            obj.Capacity = driver.FindElement(By.XPath("//h1[@itemprop='name']")).Text.Split(',')[1].ToString().Trim();
        }
        catch { }

        try
        {
            obj.City = driver.FindElement(By.XPath("//b[contains(text(),'Shahar:')]/following-sibling::span")).Text;
        }
        catch { }

        try
        {
            obj.Province = driver.FindElement(By.XPath("//b[contains(text(),'Tuman:')]/following-sibling::span")).Text;
        }
        catch { }

        try
        {
            obj.Street = driver.FindElement(By.XPath("//b[contains(text(),'Manzil:')]/following-sibling::span")).Text;
        }
        catch { }

        #region l&l
        try
        {
            IWebElement googleMapsLink = driver.FindElement(By.XPath("//a[contains(@href, 'google.com/maps')]"));

            string hrefValue = googleMapsLink.GetAttribute("href");

            Uri uri = new Uri(hrefValue);
            string query = uri.Query;
            var queryParams = System.Web.HttpUtility.ParseQueryString(query);
            string coordinates = queryParams["daddr"];

            string[] latLong = coordinates.Split(',');
            obj.Latitude = latLong[0];
            obj.Longitude = latLong[1];
        }
        catch { }
        #endregion
        #region rating
        try
        {
            IWebElement ratingElement = driver.FindElement(By.CssSelector("div.rating-score"));

            string ratingText = ratingElement.Text;

            obj.DomTutRating = ratingText.Split('/')[0].Trim() + "/5";
        }
        catch { }
        #endregion

        return obj;
    }
}

public class DomTutHelper
{
    public static async Task GetDomTutLinks()
    {
        const string mainUrl = "https://domtut.uz/uz/filter/search?negotiate=false&p={0}";

        var listOfLinks = new List<string>();

        var driver = new ChromeDriver();

        int lastIndex = 0;

        try
        {
            for (int i = 0; i < 1; i++)
            {
                var list = new List<string>();
                var currentUrl = String.Format(mainUrl, i + 1);

                driver.Navigate().GoToUrl(currentUrl);

                WaitForPageLoad(driver);
                WaitForAjax(driver);
                WaitForJavaScriptCondition(driver, "return window.customVariable == true;");

                var elements = driver.FindElements(By.TagName("a"));
                foreach (var element in elements)
                {
                    list.Add(element.GetAttribute("href"));
                }

                list = list.Where(x => !String.IsNullOrEmpty(x) && x.StartsWith("https://domtut.uz/uz/nedvizhimost/")).ToList();
                listOfLinks.AddRange(list);

                lastIndex = i;
            }
        }
        catch { /* nothing */ }
        finally
        {
            driver.Quit();

            Console.WriteLine("LastIndex: " + lastIndex);
            File.WriteAllLines("./domtut_links.txt", listOfLinks);
        }

    }

    public static void WaitForPageLoad(IWebDriver driver)
    {
        WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
        wait.Until(driver => ((IJavaScriptExecutor)driver).ExecuteScript("return document.readyState").ToString() == "complete");
    }

    public static void WaitForAjax(IWebDriver driver)
    {
        WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
        wait.Until(driver => (bool)((IJavaScriptExecutor)driver).ExecuteScript("return jQuery.active == 0"));
    }

    public static void WaitForJavaScriptCondition(IWebDriver driver, string script)
    {
        try
        {
            WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
            wait.Until(driver => (bool)((IJavaScriptExecutor)driver).ExecuteScript(script));
        }
        catch (Exception ex)
        {
            // nothing 
        }
    }
}
