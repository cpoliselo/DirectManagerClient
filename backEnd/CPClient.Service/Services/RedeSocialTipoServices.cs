using CPClient.Data.Interfaces;
using CPClient.Domain.Entities;
using CPClient.Service.Interfaces;
using System;
using System.Collections.Generic;

namespace CPClient.Service.Services
{
    public class RedeSocialTipoServices : IRedeSocialTipoService
    {
        private IRepositoryWrapper _repoWrapper;

        public RedeSocialTipoServices(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }

        public bool Post(RedeSocialTipo obj)
        {
            var clientes = _repoWrapper.RedeSocialTipo.Insert(obj);

            return true;
        }

        public bool Put(RedeSocialTipo obj)
        {
            var retorno = _repoWrapper.RedeSocialTipo.Update(obj);

            return retorno;
        }

        public IList<RedeSocialTipo> Get()
        {
            var retorno = _repoWrapper.RedeSocialTipo.Select();

            return retorno;
        }

        public bool Delete(RedeSocialTipo obj)
        {
            if (obj.Id == 0)
                throw new ArgumentException("Rede Social não existe");

            return _repoWrapper.RedeSocialTipo.Delete(obj);
        }

        public RedeSocialTipo Get(int id)
        {
            var tipo = _repoWrapper.RedeSocialTipo.Select(id);

            return tipo;
        }
    }
}
