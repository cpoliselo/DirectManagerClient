using System;
using System.Collections.Generic;
using System.Text;

namespace CPClient.Domain.Entities
{
    public abstract class BaseEntity
    {
        public virtual int Id { get; set; }
        public virtual DateTime DataCriacao { get; set; }
        public virtual DateTime? DataAtualizacao { get; set; }
        public virtual bool Ativo { get; set; }
    }
}