import { TituloModel } from './../Models/TituloModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ModalInserirTituloService {
    formData: any;
    readonly apiURL: string;

    constructor(private http: HttpClient) {
        this.apiURL = 'https://localhost:5001/api/desafiodevfull';
    }

    inserirTitulo(model: TituloModel): Observable<any> {
        return this.http.post<any[]>(`${this.apiURL}/inserirtitulo`, model);
    }
}