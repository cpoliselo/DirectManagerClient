
using Microsoft.Extensions.Configuration;
using CPClient.Service.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CPClient.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public AuthController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        [HttpGet]
        public string Get()
        {
            return "ok";
        }

        // POST api/auth
        /// <summary>
        /// Inserir Clientes
        /// </summary>
        /// <param name="user"></param>
        [HttpPost, Route("login")]
        public IActionResult Login([FromBody]LoginModel user)
        {

            var urlApp =  Configuration.GetSection("UtilSettings:UrlAPI").Value;

            if (user == null)
            {
                return BadRequest("Invalid client request");
            }

            if (user.userName == "adminJWT" && user.password == "def@123")
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var tokeOptions = new JwtSecurityToken(
                    issuer: urlApp,
                    audience: urlApp,
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signinCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new { Token = tokenString });
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}
