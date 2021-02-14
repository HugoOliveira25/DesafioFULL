import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ParcelaModel } from './../Models/ParcelaModel';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-modal-inserir-parcela',
  templateUrl: './modal-inserir-parcela.component.html',
  styleUrls: ['./modal-inserir-parcela.component.css']
})
export class ModalInserirParcelaComponent implements OnInit {

  @Input() modalParcelaOpen;
  @Input() gridParcelas: ParcelaModel[];
  @Output() closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onParcela: EventEmitter<ParcelaModel> = new EventEmitter<ParcelaModel>();
  model: ParcelaModel;
  formGroup: FormGroup;
  parcelaJaCadastrada: boolean;


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.model = new ParcelaModel();

    this.formGroup = this.fb.group({
      Numero: [this.model.Numero, [Validators.required, Validators.min(1)]],
      Valor: [this.model.Valor, [Validators.required, Validators.min(0.01)]],
      Vencimento: [this.model.Vencimento, Validators.required],
    });

  }

  closeModal() {
    this.modalParcelaOpen = false;
    this.closed.emit(this.modalParcelaOpen);
  }

  onSave() {
    this.model.Numero = this.formGroup.controls['Numero'].value;
    this.model.Valor = this.formGroup.controls['Valor'].value;
    this.model.Vencimento = this.formGroup.controls['Vencimento'].value;
    if (this.validarParcelaInserida(this.model))
      return;
    this.onParcela.emit(this.model);
    this.modalParcelaOpen = false;
    this.closed.emit(this.modalParcelaOpen);
    this.limparCampos();
  }

  ngOnDestroy(): void {

  }

  limparCampos() {

    this.formGroup.controls['Numero'].setValue(0);
    this.formGroup.controls['Valor'].setValue(0);
    this.formGroup.controls['Vencimento'].setValue(null);
    this.model = new ParcelaModel();
  }

  validarParcelaInserida(parcela: ParcelaModel): boolean {
    var parcela = this.gridParcelas.find(f => f.Numero == parcela.Numero);
    if (parcela !== undefined) {
      this.parcelaJaCadastrada = true;
      return this.parcelaJaCadastrada;
    }

  }

}
