using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CPClient.Service.Model
{
    public class ClienteTelefoneModel
    {
        [Key]
        public int Id { get; set; }
        public string DDD { get; set; }
        public string Numero { get; set; }
        public int TelefoneTipoId { get; set; }
        public bool Ativo { get; set; }
    }
}
