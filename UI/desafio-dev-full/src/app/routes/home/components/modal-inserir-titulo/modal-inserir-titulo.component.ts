import { takeUntil } from 'rxjs/operators';
import { ParcelaModel } from './../Models/ParcelaModel';
import { GridTituloService } from './../grid-titulos/grid.service';
import { ModalInserirTituloService } from './modal-inserir-titulo.service';
import { TituloModel } from './../Models/TituloModel';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { GridTitulosViewModel } from '../ViewModels/GridTitulosViewModel';

@Component({
  selector: 'app-modal-inserir-titulo',
  templateUrl: './modal-inserir-titulo.component.html',
  styleUrls: ['./modal-inserir-titulo.component.css']
})
export class ModalInserirTituloComponent implements OnInit {

  @Input() modalOpen;
  @Output() closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onTitulos: EventEmitter<GridTitulosViewModel[]> = new EventEmitter<GridTitulosViewModel[]>();
  modalParcelaOpen: boolean;
  formGroup: FormGroup;
  model: TituloModel;
  titulos: TituloModel[];
  parcelas: ParcelaModel[] = [];
  subject$: Subject<void> = new Subject();

  constructor(private fb: FormBuilder, private modalInserirTituloService: ModalInserirTituloService, private gridService: GridTituloService) { }



  ngOnInit(): void {

    this.model = new TituloModel();

    this.formGroup = this.fb.group({
      Numero: [this.model.Numero, Validators.required],
      NomeDevedor: [this.model.NomeDevedor, Validators.required],
      CpfDevedor: [this.model.CpfDevedor, [Validators.required,
      Validators.pattern(/^(\d{3}\.){2}\d{3}\-\d{2}$/),
      Validators.minLength(14),
      Validators.maxLength(14)]],
      PercentualJuros: [this.model.PercentualJuros, [Validators.required, Validators.min(0.01), Validators.max(100)]],
      PercentualMulta: [this.model.PercentualMulta, [Validators.required, Validators.min(0.01), Validators.max(100)]],
    });

    this.formGroup.controls['Numero'].valueChanges.subscribe(numero => this.model.Numero = numero);
    this.formGroup.controls['NomeDevedor'].valueChanges.subscribe(nome => this.model.NomeDevedor = nome);
    this.formGroup.controls['CpfDevedor'].valueChanges.subscribe(cpf => this.model.CpfDevedor = cpf);
    this.formGroup.controls['PercentualJuros'].valueChanges.subscribe(pJuros => this.model.PercentualJuros = pJuros);
    this.formGroup.controls['PercentualMulta'].valueChanges.subscribe(pMulta => this.model.PercentualMulta = pMulta);

  }

  closeModal() {
    this.modalOpen = false;
    this.closed.emit(this.modalOpen);
  }

  async onSave() {
    this.modalInserirTituloService.inserirTitulo(this.model).pipe(takeUntil(this.subject$)).subscribe(
      data => {
        console.log(data)
        this.gridService.obterContas().pipe(takeUntil(this.subject$)).subscribe(data => {
          this.onTitulos.emit(data)
        });
      },
    );
    this.modalOpen = false;
    this.closed.emit(this.modalOpen);
  }

  isOpen() {

    this.modalParcelaOpen = true;
  }

  handleClosed(event) {
    this.modalParcelaOpen = event;
  }

  handleParcelas(e) {
    debugger;
    this.model.Parcelas.push(e);
  }

  getCpfCnpjMask(): string {
    return '000.000.000-00';
  }

  ngOnDestroy(): void {
    this.subject$.next();
    this.subject$.complete();

  }

}
