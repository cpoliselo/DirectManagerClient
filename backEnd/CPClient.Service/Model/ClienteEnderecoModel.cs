using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CPClient.Service.Model
{
    public class ClienteEnderecoModel
    {
        [Key]
        public int Id { get; set; }
        public string Logradouro { get; set; }

        public string Numero { get; set; }

        public string Complemento { get; set; }

        public string Bairro { get; set; }

        public string CidadeUf { get; set; }

        public int CEP { get; set; }

        public int EnderecoTipoId { get; set; }

    }
}
