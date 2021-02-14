using DesafioDevFull.Dominio.Interfaces;
using DesafioDevFull.Dominio.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DesafioDevFull.Controllers
{
    [Route("api/desafiodevfull")]
    [ApiController]
    public class DesafioDevFullController : ControllerBase
    {
        private readonly ITituloCommandHandler tituloCommandHandler;

        private static IList<TituloModel> Titulos { get; set; } = new List<TituloModel>();

        public DesafioDevFullController(ITituloCommandHandler tituloCommandHandler)
        {
            this.tituloCommandHandler = tituloCommandHandler;
        }

        [HttpGet("obtertitulos")]
        public async Task<IActionResult> ObterTitulos()
        {
            var titulos = await tituloCommandHandler.ObterGridTitulos(Titulos);
            return Ok(titulos);
        }

        [HttpPost("inserirtitulo")]
        public async Task<IActionResult> InserirTitulo([FromBody]TituloModel tituloModel)
        {
            var titulo = await Task.FromResult<TituloModel>(tituloModel);

            Titulos.Add(titulo);
             
            return Ok(titulo);

        }
    }
}
