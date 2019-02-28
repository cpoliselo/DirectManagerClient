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
    public class TelefoneTipoController : ControllerBase
    {
        private IRepositoryWrapper _repoWrapper;
        private IServiceWrapper _serviceWrapper;


        public TelefoneTipoController(IRepositoryWrapper repoWrapper, IServiceWrapper serviceWrapper, IMapper mapper)
        {
            _repoWrapper = repoWrapper;
            _serviceWrapper = serviceWrapper;
        }

        // GET api/values
        [HttpGet, Authorize]
        public List<TelefoneTipoModel> Get()
        {
            var telefonetipo = _serviceWrapper.TelefoneTipoService.Get();

            var resultado = Mapper.Map<IEnumerable<TelefoneTipo>, IEnumerable<TelefoneTipoModel>>(telefonetipo);

            return resultado.ToList();
        }

    }
}
