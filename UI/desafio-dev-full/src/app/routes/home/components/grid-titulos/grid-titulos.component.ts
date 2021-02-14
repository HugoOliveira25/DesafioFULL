import { GridTituloService } from './grid.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-grid-titulos',
  templateUrl: './grid-titulos.component.html',
  styleUrls: ['./grid-titulos.component.css']
})
export class GridTitulosComponent implements OnInit {

  titulos: any[] = [];
  modalOpen: boolean;
  subject$: Subject<void> = new Subject();

  constructor(private gridService: GridTituloService) { }

  ngOnInit(): void {

    this.gridService.obterContas().pipe(takeUntil(this.subject$)).subscribe(
      data => this.titulos = data
    );

  }

  isOpen() {

    this.modalOpen = true;
  }

  handleClosed(event) {

    this.modalOpen = event;
  }

  handleTitulos(e) {
    this.titulos = e;
  }

  ngOnDestroy(): void {
    this.subject$.next();
    this.subject$.complete();

  }

}
