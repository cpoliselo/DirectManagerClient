using System;
using System.Collections.Generic;
using System.Text;

namespace CPClient.Domain.Entities
{
    public class RedeSocialTipo : BaseEntity
    {
        public string Descricao { get; set; }
        
        public virtual ICollection<ClienteRedeSocial> ClienteRedeSocial { get; set; }

    }
}

