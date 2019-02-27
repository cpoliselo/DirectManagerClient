using AutoMapper;
using CPClient.Domain.Entities;
using CPClient.Service.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace CPClient.Service.AutoMapper.MappingProfile
{
    public class DomainToViewModelMappingProfile : Profile
    {
        public DomainToViewModelMappingProfile()
        {
            CreateMap<TelefoneTipoModel, TelefoneTipo>();
            CreateMap<EnderecoTipoModel, EnderecoTipo>();
            CreateMap<RedeSocialTipoModel, RedeSocialTipo>();
            CreateMap<ClienteModel, Cliente>();
            CreateMap<ClienteTelefoneModel, ClienteTelefone>();
            CreateMap<ClienteRedeSocialModel, ClienteRedeSocial>();
            CreateMap<ClienteEnderecoModel, ClienteEndereco>();
        }
    }
}
