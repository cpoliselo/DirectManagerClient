using System;
using System.Collections.Generic;
using System.Text;

namespace CPClient.Domain.Entities
{
    public class Cliente : BaseEntity
    {
        public string NomeCompleto { get; set; }

        public DateTime DataNascimento { get; set; }

        public string CPF { get; set; }

        public string RG { get; set; }

        public virtual ICollection<ClienteEndereco> Enderecos { get; set; }

        public virtual ICollection<ClienteTelefone> Telefones { get; set; }

        public virtual ICollection<ClienteRedeSocial> RedesSociais { get; set; }
    }
}

