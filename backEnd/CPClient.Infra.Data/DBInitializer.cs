using CPClient.Domain.Entities;
using CPClient.Infra.Data.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CPClient.Infra.Data
{
    public static class DbInitializer
    {
        public static void Initialize(SqlContext context)
        {

            if (context.RedeSocialTipo.Any())
            {
                return;
            }

            var RedeSocialTipo = new RedeSocialTipo[]
            {
                 new RedeSocialTipo {
                     Descricao = "Facebook",
                     DataCriacao = System.DateTime.Now,
                     Ativo = true
                 },

                new RedeSocialTipo {
                     Descricao = "Instagran",
                     DataCriacao = System.DateTime.Now,
                     Ativo = true
                 },

                new RedeSocialTipo {
                     Descricao = "LikedIn",
                     DataCriacao = System.DateTime.Now,
                     Ativo = true
                 },

                new RedeSocialTipo {
                     Descricao = "Twitter",
                     DataCriacao = System.DateTime.Now,
                     Ativo = true
                 },

                new RedeSocialTipo {
                     Descricao = "Outra",
                     DataCriacao = System.DateTime.Now,
                     Ativo = true
                 }
            };

            context.AddRange(RedeSocialTipo);

            var TelefoneTipo = new TelefoneTipo[]
           {
                 new TelefoneTipo {
                     Descricao = "Residencial",
                     DataCriacao = System.DateTime.Now,
                     Ativo = true
                 },

                new TelefoneTipo {
                     Descricao = "Celular",
                     DataCriacao = System.DateTime.Now,
                     Ativo = true
                 },

                new TelefoneTipo {
                     Descricao = "Comercial",
                     DataCriacao = System.DateTime.Now,
                     Ativo = true
                 }
           };

            context.AddRange(TelefoneTipo);

            var EnderecoTipo = new EnderecoTipo[]
           {
                 new EnderecoTipo {
                     Descricao = "Residencial",
                     DataCriacao = System.DateTime.Now,
                     Ativo = true
                 },

                new EnderecoTipo {
                     Descricao = "Comercial",
                     DataCriacao = System.DateTime.Now,
                     Ativo = true
                 },

                new EnderecoTipo {
                     Descricao = "Outro",
                     DataCriacao = System.DateTime.Now,
                     Ativo = true
                 }
           };

            context.AddRange(EnderecoTipo);

            context.SaveChanges();
        }
    }
}
