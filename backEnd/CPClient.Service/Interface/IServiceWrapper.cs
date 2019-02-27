using CPClient.Domain.Entities;
using CPClient.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace CPClient.Service.Interfaces
{
    public interface IServiceWrapper
    {
        IRedeSocialTipoService RedeSocialTipoService { get; }
        IEnderecoTipoService EnderecoTipoService { get; }
        ITelefoneTipoService TelefoneTipoService { get; }
        IClienteService ClienteService { get; }
    }
}

