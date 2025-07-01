using WebApiBackend.Services.IAService;
using WebApiBackend.DTO.IA;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;


namespace WebApiBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AIApiController : Controller
    {

        private readonly IIAService _IIAService;

        public AIApiController(IIAService IIAService){
            _IIAService = IIAService;
        }

        [Authorize]
        [HttpPost("SendPrompt")]
        public async Task<ActionResult> SendPrompt(OpenAiRequest request)
        {
            
            try
            {
                var response = await _IIAService.GetAIResponse(request.Prompt);
                return Json(new OpenAiResponse { Response = response });
            }
            catch (Exception error)
            {
                return BadRequest(new { message = error.Message });
            }
        }
        
    }
}