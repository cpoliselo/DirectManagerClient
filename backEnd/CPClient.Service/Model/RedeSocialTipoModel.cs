using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CPClient.Service.Model
{
    public class RedeSocialTipoModel
    {
        [Key]
        public int Id { get; set; }

        public string Descricao { get; set; }
    }
}
