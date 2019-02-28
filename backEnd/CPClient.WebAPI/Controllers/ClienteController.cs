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
using System.Web.Http;

namespace CPClient.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private IRepositoryWrapper _repoWrapper;
        private IServiceWrapper _serviceWrapper;


        public ClienteController(IRepositoryWrapper repoWrapper, IServiceWrapper serviceWrapper, IMapper mapper)
        {
            _repoWrapper = repoWrapper;
            _serviceWrapper = serviceWrapper;
        }

        // GET api/cliente
        /// <summary>
        /// Retorna todos os clientes.
        /// </summary>
        /// <returns></returns>
        // GET api/values
        //[HttpGet]
        [HttpGet, Authorize]
        public ActionResult<List<ClienteModel>> Get()
        {
            try
            {
                var clientes = _serviceWrapper.ClienteService.Get().Where(x => x.Ativo);

                var clientesRetorno = Mapper.Map<IEnumerable<Cliente>, IEnumerable<ClienteModel>>(clientes);

                clientesRetorno.ToList().ForEach(x =>
                {
                    x.Telefones.Where(y => !y.Ativo).ToList().ForEach(z => { x.Telefones.Remove(z); });
                    x.Enderecos.Where(y => !y.Ativo).ToList().ForEach(z => { x.Enderecos.Remove(z); });
                    x.RedesSociais.Where(y => !y.Ativo).ToList().ForEach(z => { x.RedesSociais.Remove(z); });
                });

                return clientesRetorno.ToList();
            }
            catch
            { return BadRequest(); }
        }

        // GET api/cliente/5
        /// <summary>
        /// Retorna cliente por Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}"), Authorize]
        public ActionResult<ClienteModel> Get(int id)
        {
            try
            {
                var cliente = _serviceWrapper.ClienteService.Get(id);

                if (cliente != null)
                {

                    var resultado = Mapper.Map<Cliente, ClienteModel>(cliente);

                    resultado.Telefones.Where(y => !y.Ativo).ToList().ForEach(z => { resultado.Telefones.Remove(z); });
                    resultado.Enderecos.Where(y => !y.Ativo).ToList().ForEach(z => { resultado.Enderecos.Remove(z); });
                    resultado.RedesSociais.Where(y => !y.Ativo).ToList().ForEach(z => { resultado.RedesSociais.Remove(z); });

                    return resultado;
                }
                else
                    return NotFound();
            }
            catch
            { return BadRequest(); }
        }

        // POST api/cliente
        /// <summary>
        /// Inserir Clientes
        /// </summary>
        /// <param name="clienteModel"></param>
        [HttpPost, Authorize]
        public ActionResult Add([FromBody]ClienteModel clienteModel)
        {
            try
            {
                var cliente = Mapper.Map<ClienteModel, Cliente>(clienteModel);
                if (cliente != null)
                {
                    cliente.Telefones = Mapper.Map<ICollection<ClienteTelefoneModel>, ICollection<ClienteTelefone>>(clienteModel.Telefones);
                    cliente.RedesSociais = Mapper.Map<ICollection<ClienteRedeSocialModel>, ICollection<ClienteRedeSocial>>(clienteModel.RedesSociais);
                    cliente.Enderecos = Mapper.Map<ICollection<ClienteEnderecoModel>, ICollection<ClienteEndereco>>(clienteModel.Enderecos);

                    if (_serviceWrapper.ClienteService.Post(cliente))
                        return Ok();
                    else
                        return BadRequest();
                }
                else
                    return NotFound();
            }

            catch
            { return BadRequest(); }
        }

        // DELETE api/values/5
        /// <summary>
        /// Inativar Clientes
        /// </summary>
        /// <remarks>Essa API irá inativar o cliente.</remarks>
        /// <param name="id"></param>
        [HttpDelete("{id}"), Authorize]
        public ActionResult Delete(int id)
        {
            try
            {
                var cliente = _serviceWrapper.ClienteService.Get(id);
                if (cliente != null)
                {
                    if (_serviceWrapper.ClienteService.Delete(cliente))
                        return Ok();
                    else
                        return BadRequest();
                }
                else
                    return NotFound();

            }
            catch
            { return BadRequest(); }
        }

        // PUT api/values/5
        /// <summary>
        /// Atualizar Clientes
        /// </summary>
        /// <param name="clienteModel"></param>
        [HttpPut, Authorize]
        public ActionResult Put([FromBody]ClienteModel clienteModel)
        {
            try
            {
                var cliente = _serviceWrapper.ClienteService.Get(clienteModel.Id);

                if (cliente != null)
                {
                    cliente.NomeCompleto = clienteModel.NomeCompleto;
                    cliente.DataNascimento = clienteModel.DataNascimento;
                    cliente.CPF = clienteModel.CPF;
                    cliente.RG = clienteModel.Rg;

                    cliente.Telefones.Where(x => x.Ativo).ToList().ForEach(x => { x.DataAtualizacao = System.DateTime.Now; x.Ativo = false; });
                    Mapper.Map<ICollection<ClienteTelefoneModel>, ICollection<ClienteTelefone>>(clienteModel.Telefones).ToList().ForEach(x =>
                        {
                            x.Ativo = true;
                            x.DataCriacao = System.DateTime.Now;
                            cliente.Telefones.Add(x);
                        });

                    cliente.RedesSociais.Where(x => x.Ativo).ToList().ForEach(x => { x.DataAtualizacao = System.DateTime.Now; x.Ativo = false; });
                    Mapper.Map<ICollection<ClienteRedeSocialModel>, ICollection<ClienteRedeSocial>>(clienteModel.RedesSociais).ToList().ForEach(x =>
                    {
                        x.Ativo = true;
                        x.DataCriacao = System.DateTime.Now;
                        cliente.RedesSociais.Add(x);
                    });

                    cliente.Enderecos.Where(x => x.Ativo).ToList().ForEach(x => { x.DataAtualizacao = System.DateTime.Now; x.Ativo = false; });
                    Mapper.Map<ICollection<ClienteEnderecoModel>, ICollection<ClienteEndereco>>(clienteModel.Enderecos).ToList().ForEach(x =>
                    {
                        x.Ativo = true;
                        x.DataCriacao = System.DateTime.Now;
                        cliente.Enderecos.Add(x);
                    });

                    if (_serviceWrapper.ClienteService.Put(cliente))
                        return Ok();
                    else
                        return BadRequest();
                }
                else
                    return NotFound();

            }
            catch
            { return BadRequest(); }
        }

    }
}
