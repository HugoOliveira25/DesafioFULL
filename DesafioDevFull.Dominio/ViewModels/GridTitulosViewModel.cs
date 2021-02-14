namespace DesafioDevFull.Dominio.ViewModels
{
    public class GridTitulosViewModel
    {
        public int Numero { get; set; }
        public string NomeDevedor { get; set; }
        public int NumeroParcelas { get; set; }
        public decimal ValorOriginal { get; set; }
        public int DiasEmAtraso { get; set; }
        public decimal ValorAtualizadoHoje { get; set; }
    }
}
