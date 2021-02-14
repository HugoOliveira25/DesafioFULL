import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './routes/home/home.component';
import { GridTitulosComponent } from './routes/home/components/grid-titulos/grid-titulos.component';
import { ModalInserirTituloComponent } from './routes/home/components/modal-inserir-titulo/modal-inserir-titulo.component';
import { ModalInserirParcelaComponent } from './routes/home/components/modal-inserir-parcela/modal-inserir-parcela.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxMaskModule } from 'ngx-mask';


registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GridTitulosComponent,
    ModalInserirTituloComponent,
    ModalInserirParcelaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CurrencyMaskModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
