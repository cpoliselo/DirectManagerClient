using AutoMapper;
using CPClient.Data.Interfaces;
using CPClient.Domain.Entities;
using CPClient.Service.Interfaces;
using CPClient.Service.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace CPClient.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnderecoTipoController : ControllerBase
    {
        private IRepositoryWrapper _repoWrapper;
        private IServiceWrapper _serviceWrapper;

        public EnderecoTipoController(IRepositoryWrapper repoWrapper, IServiceWrapper serviceWrapper)
        {
            _repoWrapper = repoWrapper;
            _serviceWrapper = serviceWrapper;
        }

        // GET api/values
        [HttpGet, Authorize]
        public List<EnderecoTipoModel> Get()
        {
            var enderecoTipo = _serviceWrapper.EnderecoTipoService.Get();

            var resultado = Mapper.Map<IEnumerable<EnderecoTipo>, IEnumerable<EnderecoTipoModel>>(enderecoTipo);

            return resultado.ToList();
        }

    }
}
