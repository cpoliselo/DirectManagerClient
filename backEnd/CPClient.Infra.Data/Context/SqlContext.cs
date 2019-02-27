using CPClient.Domain.Entities;
using Microsoft.EntityFrameworkCore;
//using CPClient.Infra.Data.Mapping;

namespace CPClient.Infra.Data.Context
{
    public class SqlContext : DbContext
    {
        public SqlContext(DbContextOptions<SqlContext> options) : base(options)
        {

        }

        public SqlContext()
        {
        }
        public DbSet<Cliente> Cliente { get; set; }
        public DbSet<ClienteEndereco> ClienteEndereco { get; set; }
        public DbSet<ClienteRedeSocial> ClienteRedeSocial { get; set; }
        public DbSet<ClienteTelefone> ClienteTelefone { get; set; }
        public DbSet<TelefoneTipo> TelefoneTipo { get; set; }
        public DbSet<EnderecoTipo> EnderecoTipo { get; set; }
        public DbSet<RedeSocialTipo> RedeSocialTipo { get; set; }
        public DbSet<Auth> Auth { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}
