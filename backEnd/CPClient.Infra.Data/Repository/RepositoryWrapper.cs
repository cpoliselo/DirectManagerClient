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
    //https://stackoverflow.com/questions/40974378/using-method-of-inherited-interface-with-generic-repository-pattern-unitofwork

    public class RepositoryWrapper : IRepositoryWrapper
    {
        private SqlContext _repoContext;
        private IRedeSocialTipoRepository _redeSocialTipo;
        private ITelefoneTipoRepository _telefoneTipo;
        private IEnderecoTipoRepository _enderecoTipo;
        private IClienteRepository _cliente;

        public IRedeSocialTipoRepository RedeSocialTipo
        {
            get
            {
                if (_redeSocialTipo == null)
                {
                    _redeSocialTipo = new RedeSocialTipoRepository(_repoContext);
                }

                return _redeSocialTipo;
            }
        }

        public IClienteRepository Cliente
        {
            get
            {
                if (_cliente == null)
                {
                    _cliente = new ClienteRepository(_repoContext);
                }

                return _cliente;
            }
        }

        public IEnderecoTipoRepository EnderecoTipo
        {
            get
            {
                if (_enderecoTipo == null)
                {
                    _enderecoTipo = new EnderecoTipoRepository(_repoContext);
                }

                return _enderecoTipo;
            }
        }

        public ITelefoneTipoRepository TelefoneTipo
        {
            get
            {
                if (_telefoneTipo == null)
                {
                    _telefoneTipo = new TelefoneTipoRepository(_repoContext);
                }

                return _telefoneTipo;
            }
        }

        public RepositoryWrapper(SqlContext repositoryContext)
        {
            _repoContext = repositoryContext;
        }
    }

}
