using System;
using System.Collections.Generic;
using System.Text;

namespace CPClient.Domain.Entities
{
    public class ClienteRedeSocial : BaseEntity
    {
        public string URL { get; set; }

        public int RedeSocialTipoId { get; set; }

        public int ClienteId { get; set; }

        public virtual RedeSocialTipo RedeSocialTipo { get; set; }

        public virtual Cliente Cliente { get; set; }
    }
}

