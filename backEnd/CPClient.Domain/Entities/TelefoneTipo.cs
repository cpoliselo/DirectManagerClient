using System;
using System.Collections.Generic;
using System.Text;

namespace CPClient.Domain.Entities
{
    public class TelefoneTipo : BaseEntity
    {
        public string Descricao { get; set; }
        
        public virtual ICollection<ClienteTelefone> ClienteTelefone { get; set; }

    }
}

