using AutoMapper;
using CPClient.Data.Interfaces;
using CPClient.Domain.Entities;
using CPClient.Service.Interfaces;
using CPClient.Service.Model;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace CPClient.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RedeSocialTipoController : ControllerBase
    {
        private IRepositoryWrapper _repoWrapper;
        private IServiceWrapper _serviceWrapper;

        public RedeSocialTipoController(IRepositoryWrapper repoWrapper, IServiceWrapper serviceWrapper)
        {
            _repoWrapper = repoWrapper;
            _serviceWrapper = serviceWrapper;
        }

        // GET api/values
        [HttpGet]
        public List<RedeSocialTipoModel> Get()
        {
            var redeSocial = _serviceWrapper.RedeSocialTipoService.Get();

            var resultado = Mapper.Map<IEnumerable<RedeSocialTipo>, IEnumerable<RedeSocialTipoModel>>(redeSocial);

            return resultado.ToList();
        }

    }
}
