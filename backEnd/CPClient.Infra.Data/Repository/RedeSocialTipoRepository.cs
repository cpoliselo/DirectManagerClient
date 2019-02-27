using CPClient.Domain.Entities;
using CPClient.Data.Interfaces;
using CPClient.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CPClient.Infra.Data.Repository
{
   public class RedeSocialTipoRepository: BaseRepository<RedeSocialTipo>, IRedeSocialTipoRepository
    {
        public RedeSocialTipoRepository(SqlContext repositoryContext)
             : base(repositoryContext)
        {
        }
    }
}
