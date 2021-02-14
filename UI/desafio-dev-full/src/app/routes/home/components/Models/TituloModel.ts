import { ParcelaModel } from "./ParcelaModel";

export class TituloModel {
    Numero: number;
    NomeDevedor: string;
    CpfDevedor: string;
    PercentualJuros: number;
    PercentualMulta: number;
    Parcelas: ParcelaModel[] = [];


}