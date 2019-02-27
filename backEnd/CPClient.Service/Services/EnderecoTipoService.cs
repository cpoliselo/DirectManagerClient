using CPClient.Data.Interfaces;
using CPClient.Domain.Entities;
using CPClient.Service.Interfaces;
using System;
using System.Collections.Generic;

namespace CPClient.Service.Services
{
    public class EnderecoTipoService : IEnderecoTipoService

    {
        private IRepositoryWrapper _repoWrapper;

        public EnderecoTipoService(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }

        public bool Post(EnderecoTipo obj)
        {
            return _repoWrapper.EnderecoTipo.Insert(obj);

        }

        public bool Put(EnderecoTipo obj)
        {
            return _repoWrapper.EnderecoTipo.Update(obj);

        }

        public IList<EnderecoTipo> Get()
        {
            var tipos = _repoWrapper.EnderecoTipo.Select();

            return tipos;
        }

        public bool Delete(EnderecoTipo obj)
        {
            if (obj.Id == 0)
                throw new ArgumentException("Endereço Tipo não existe");

            return _repoWrapper.EnderecoTipo.Delete(obj);
        }

        public EnderecoTipo Get(int id)
        {
            var tipo = _repoWrapper.EnderecoTipo.Select(id);

            return tipo;
        }

    }
}
