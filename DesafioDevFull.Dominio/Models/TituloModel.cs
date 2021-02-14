using System.Collections.Generic;

namespace DesafioDevFull.Dominio.Models
{
    public class TituloModel
    {
        public int Numero { get; set; }
        public string NomeDevedor { get; set; }
        public string CpfDevedor { get; set; }
        public decimal PercentualJuros { get; set; }
        public decimal PercentualMulta { get; set; }
        public IList<ParcelaModel> Parcelas { get; set; }
    }
}
