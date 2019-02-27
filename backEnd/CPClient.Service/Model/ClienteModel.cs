using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CPClient.Service.Model
{
    public partial class ClienteModel
    {
        [Key]
        public int Id { get; set; }
        public string NomeCompleto { get; set; }
        public string CPF { get; set; }
        public string Rg { get; set; }
        public DateTime DataNascimento { get; set; }

        public virtual ICollection<ClienteEnderecoModel> Enderecos { get; set; }

        public virtual ICollection<ClienteTelefoneModel> Telefones { get; set; }

        public virtual ICollection<ClienteRedeSocialModel> RedesSociais { get; set; }
    }
}
