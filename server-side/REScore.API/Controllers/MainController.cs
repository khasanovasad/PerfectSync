using MediatR;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using REScore.API.Handlers;

namespace REScore.API.Controllers;

[ApiController]
[Route("[controller]")]
public class MainController : ControllerBase
{
    private readonly ILogger<MainController> _logger;
    private readonly IMediator _mediator;

    public MainController(ILogger<MainController> logger, IMediator mediator)
    {
        _mediator = mediator;
        _logger = logger;
    }

    [HttpPost("Get1")]
    public async Task<ActionResult> Get([FromBody] RequestDto request)
    {
        var result = await _mediator.Send(new GetScoringInfo{ Latitude = request.Latitude, Longitude = request.Longitude, Capacity = request.Area, Level = request.Level, Price = request.Price, Rooms = request.Rooms });
        return Ok(result);
    }

    [HttpGet("Get2")]
    public async Task<ActionResult> Get([FromQuery] double latitude = 41.3111, [FromQuery] double longitude = 69.2796)
    {
        var result = await _mediator.Send(new GetSuggestedOpenings { Latitude = latitude, Longitude = longitude, SearchParameterName = "amenity", SearchParameter = "pharmacy" });

        return Ok(result);
    }

    [HttpGet("GetAQI")]
    public async Task<ActionResult> GetAQI([FromQuery] double latitude = 41.3111, [FromQuery] double longitude = 69.2796)
    {
        var result = await _mediator.Send(new AQI { Latitude = latitude, Longitude = longitude });

        return Ok(result);
    }
}
