using System;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiBackend.Models
{
    public class ServiceResponse<T>
    {
        public T? Dados { get; set; }
        public string Menssagem { get; set; } = string.Empty;
        public bool Sucesso { get; set; } = true;
    }
}