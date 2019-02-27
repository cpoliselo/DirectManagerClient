using CPClient.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace CPClient.Data.Interfaces
{
    public interface IRepositoryWrapper 
    {
        IRedeSocialTipoRepository RedeSocialTipo { get; }
        ITelefoneTipoRepository TelefoneTipo { get; }
        IClienteRepository Cliente { get; }
        IEnderecoTipoRepository EnderecoTipo { get; }
    }
}

