using AutoMapper;
using CPClient.Domain.Entities;
using CPClient.Service.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace CPClient.Service.AutoMapper.MappingProfile
{
    public class ViewModelToDomainMappingProfile : Profile
    {
        public ViewModelToDomainMappingProfile()
        {
            CreateMap<TelefoneTipo, TelefoneTipoModel>();
            CreateMap<EnderecoTipo, EnderecoTipoModel>();
            CreateMap<RedeSocialTipo, RedeSocialTipoModel>();
            CreateMap<Cliente, ClienteModel>();
            CreateMap<ClienteTelefone, ClienteTelefoneModel>();
            CreateMap<ClienteRedeSocial, ClienteRedeSocialModel>();
            CreateMap<ClienteEndereco, ClienteEnderecoModel>();
        }
    }
}
