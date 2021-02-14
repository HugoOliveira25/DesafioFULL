using DesafioDevFull.Dominio.Models;
using DesafioDevFull.Dominio.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DesafioDevFull.Dominio.Interfaces
{
    public interface ITituloCommandHandler
    {
        Task<IList<GridTitulosViewModel>> ObterGridTitulos(IList<TituloModel> titulos);
    }
}
