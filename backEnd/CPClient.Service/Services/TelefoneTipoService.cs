using CPClient.Data.Interfaces;
using CPClient.Domain.Entities;
using CPClient.Service.Interfaces;
using System;
using System.Collections.Generic;

namespace CPClient.Service.Services
{
    public class TelefoneTipoService : ITelefoneTipoService
    {
        private IRepositoryWrapper _repoWrapper;

        public TelefoneTipoService(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }

        public bool Post(TelefoneTipo obj)
        {
            var retorno = _repoWrapper.TelefoneTipo.Insert(obj);

            return retorno;
        }

        public bool Put(TelefoneTipo obj)
        {
            var retorno = _repoWrapper.TelefoneTipo.Update(obj);

            return retorno;
        }

        public IList<TelefoneTipo> Get()
        {
            var tipos = _repoWrapper.TelefoneTipo.Select();

            return tipos;
        }

        public bool Delete(TelefoneTipo obj)
        {
            if (obj.Id == 0)
                throw new ArgumentException("Telefone Tipo não existe");

            return _repoWrapper.TelefoneTipo.Delete(obj);
        }

        public TelefoneTipo Get(int id)
        {
            var tipo = _repoWrapper.TelefoneTipo.Select(id);

            return tipo;
        }
    }
}
