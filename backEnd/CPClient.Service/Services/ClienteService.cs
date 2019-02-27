using CPClient.Data.Interfaces;
using CPClient.Domain.Entities;
using System.Collections.Generic;
using System.Linq;
using CPClient.Service.Interfaces;
using FluentValidation;
using System;

namespace CPClient.Service.Services
{
    public class ClienteService : IClienteService
    {
        private IRepositoryWrapper _repoWrapper;

        public ClienteService(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }

        public bool Put(Cliente obj)
        {            
            return _repoWrapper.Cliente.Update(obj);
        }

        public bool Post(Cliente obj)
        {
            obj.DataCriacao = System.DateTime.Now;
            obj.Ativo = true;

            obj.Telefones.ToList().ForEach(x => { x.DataCriacao = System.DateTime.Now; x.Ativo = true; });
            obj.Enderecos.ToList().ForEach(x => { x.DataCriacao = System.DateTime.Now; x.Ativo = true; });
            obj.RedesSociais.ToList().ForEach(x => { x.DataCriacao = System.DateTime.Now; x.Ativo = true; });

            return _repoWrapper.Cliente.Insert(obj);

        }

        public IList<Cliente> Get()
        {
            var clientes = _repoWrapper.Cliente.Select();

            return clientes;
        }

        public bool Delete(Cliente obj)
        {
            if (obj.Id == 0)
                throw new ArgumentException("Cliente não existe");


            return _repoWrapper.Cliente.Delete(obj);
        }

        public Cliente Get(int id)
        {
            var cliente = _repoWrapper.Cliente.Select(id);

            return cliente;
        }



    }
}
