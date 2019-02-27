using System;
using System.Collections.Generic;
using System.Text;

namespace CPClient.Domain.Entities
{
    public class EnderecoTipo : BaseEntity
    {
        public string Descricao { get; set; }
        
        public virtual ICollection<ClienteEndereco> ClienteEndereco { get; set; }

    }
}

