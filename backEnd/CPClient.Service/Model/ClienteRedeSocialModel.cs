using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CPClient.Service.Model
{
    public class ClienteRedeSocialModel
    {
        [Key]
        public int Id { get; set; }
        public string URL { get; set; }
        public int RedeSocialTipoId { get; set; }
        public bool Ativo { get; set; }
    }
}
