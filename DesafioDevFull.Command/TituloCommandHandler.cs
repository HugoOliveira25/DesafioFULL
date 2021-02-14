using DesafioDevFull.Dominio.Interfaces;
using DesafioDevFull.Dominio.Models;
using DesafioDevFull.Dominio.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DesafioDevFull.Command
{
    public class TituloCommandHandler : ITituloCommandHandler
    {
        public async Task<IList<GridTitulosViewModel>> ObterGridTitulos(IList<TituloModel> titulos)
        {
            var gridTitulos = new List<GridTitulosViewModel>();

            foreach (var titulo in titulos)
            {
                var gridTitulo = new GridTitulosViewModel();
                gridTitulo.Numero = titulo.Numero;
                gridTitulo.NomeDevedor = titulo.NomeDevedor;
                var maxDate = titulo.Parcelas.Min(a => a.Vencimento);
                gridTitulo.DiasEmAtraso = (DateTime.Now - maxDate).Days;
                gridTitulo.NumeroParcelas = titulo.Parcelas.Count;
                gridTitulo.ValorOriginal = titulo.Parcelas.Sum(s => s.Valor);
                gridTitulo.ValorAtualizadoHoje = SomarValorAtualizado(titulo.Parcelas, titulo.PercentualJuros, titulo.PercentualMulta);
                gridTitulos.Add(gridTitulo);
            }


            return await Task.FromResult<IList<GridTitulosViewModel>>(gridTitulos);
        }

        private decimal SomarValorAtualizado(IList<ParcelaModel> parcelas, decimal juros, decimal multa)
        {
            decimal valorJuros = 0;
            var j = juros / 100;
            var valorMulta = parcelas.Sum(s => s.Valor) * (multa / 100);

            foreach (var parcela in parcelas)
                valorJuros +=  (j / 30) * (DateTime.Now - parcela.Vencimento).Days * parcela.Valor;

            var total = parcelas.Sum(s => s.Valor) + valorJuros + valorMulta;
            return decimal.Round(total, 2);
        }
    }
}
