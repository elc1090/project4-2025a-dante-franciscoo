using System.Threading.Tasks;

namespace WebApiBackend.Services.IAService
{
    public interface IIAService
    {
        Task<string> GetAIResponse(string userPrompt);
    }
}