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
   public class TelefoneTipoRepository : BaseRepository<TelefoneTipo>, ITelefoneTipoRepository
    {
        public TelefoneTipoRepository(SqlContext repositoryContext)
             : base(repositoryContext)
        {
        }
    }
}
