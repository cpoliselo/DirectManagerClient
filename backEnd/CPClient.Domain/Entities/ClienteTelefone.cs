using System;
using System.Collections.Generic;
using System.Text;

namespace CPClient.Domain.Entities
{
    public class ClienteTelefone : BaseEntity
    {
        public string DDD { get; set; }

        public string Numero { get; set; }

        public int ClienteId { get; set; }

        public int TelefoneTipoId { get; set; }

        public virtual TelefoneTipo TelefoneTipo { get; set; }

        public virtual Cliente Cliente { get; set; }
    }
}

