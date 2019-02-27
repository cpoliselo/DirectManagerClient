using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace CPClient.Service.AutoMapper.MappingProfile
{
    public static class AutoMapperConfig
    {
        public static void RegisterMappings()
        {
            Mapper.Initialize(x =>
            {
                x.AddProfile<DomainToViewModelMappingProfile>();
                x.AddProfile<ViewModelToDomainMappingProfile>();
            });
        }
    }
}
