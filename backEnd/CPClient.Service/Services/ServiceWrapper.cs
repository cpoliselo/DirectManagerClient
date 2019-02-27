using CPClient.Domain.Entities;
using CPClient.Data.Interfaces;
using CPClient.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CPClient.Service.Interfaces;

namespace CPClient.Service.Services
{
    public class ServiceWrapper : IServiceWrapper
    {
        private IRepositoryWrapper _repoWrapper;
        private IRedeSocialTipoService _redeSocialTipoService;
        private ITelefoneTipoService _telefoneTipoService;
        private IEnderecoTipoService _enderecoTipoService;
        private IClienteService _clienteService;

        public IClienteService ClienteService
        {
            get
            {
                if (_clienteService == null)
                {
                    _clienteService = new ClienteService(_repoWrapper);
                }

                return _clienteService;
            }
        }
        public IEnderecoTipoService EnderecoTipoService
        {
            get
            {
                if (_enderecoTipoService == null)
                {
                    _enderecoTipoService = new EnderecoTipoService(_repoWrapper);
                }

                return _enderecoTipoService;
            }
        }

        public ITelefoneTipoService TelefoneTipoService
        {
            get
            {
                if (_telefoneTipoService == null)
                {
                    _telefoneTipoService = new TelefoneTipoService(_repoWrapper);
                }

                return _telefoneTipoService;
            }
        }

        public IRedeSocialTipoService RedeSocialTipoService
        {
            get
            {
                if (_redeSocialTipoService == null)
                {
                    _redeSocialTipoService = new RedeSocialTipoServices(_repoWrapper);
                }

                return _redeSocialTipoService;
            }
        }      

        public ServiceWrapper(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }
    }

}
