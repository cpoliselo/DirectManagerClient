using System;
using System.Collections.Generic;
using System.Text;

namespace CPClient.Domain.Entities
{
    public class ClienteEndereco : BaseEntity
    {
        public string Logradouro { get; set; }

        public string Numero { get; set; }

        public string Complemento { get; set; }

        public string Bairro { get; set; }

        public string CidadeUf { get; set; }
        
        public int CEP { get; set; }

        public int ClienteId { get; set; }

        public int EnderecoTipoId { get; set; }

        public virtual EnderecoTipo EnderecoTipo { get; set; }

        public virtual Cliente Cliente { get; set; }
    }
}

