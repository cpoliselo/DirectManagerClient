using CPClient.Data.Interfaces;
using CPClient.Infra.Data.Repository;
using CPClient.Service.Interfaces;
using CPClient.Service.Services;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CPClient.WebAPI
{
    public static class Configuration
    {
        public static void ConfigureRepositoryWrapper(this IServiceCollection services)
        {
            services.AddScoped<IRepositoryWrapper, RepositoryWrapper>();
            services.AddScoped<IServiceWrapper, ServiceWrapper>();
        }
    }
}
