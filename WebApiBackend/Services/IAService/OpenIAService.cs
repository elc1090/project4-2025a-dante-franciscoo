using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace WebApiBackend.Services.IAService
{

    public class OpenIAService : IIAService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private const string apiUrl = "https://openrouter.ai/api/v1/chat/completions";

        public OpenIAService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _apiKey = configuration["OpenAI:ApiKey"]!;

            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_apiKey}");
        }

        public async Task<string> GetAIResponse(string userPrompt)
        {
            var requestBody = new
            {
                model = "deepseek/deepseek-r1-0528-qwen3-8b:free",
                messages = new[]
                {
                    new { role = "user", content = userPrompt }
                }
            };

            var jsonContent = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync(apiUrl, jsonContent);

            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                return $"Erro: {response.StatusCode} - {error}";
            }       

            using var responseStream = await response.Content.ReadAsStreamAsync();
            using var doc = await JsonDocument.ParseAsync(responseStream);

            string? reply = doc.RootElement
                        .GetProperty("choices")[0]
                        .GetProperty("message")
                        .GetProperty("content")
                        .GetString();
            
            if(reply is null){
                throw new ArgumentException("Server Error!");
            }

            return reply;
        }
    }
}
