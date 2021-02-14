import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GridTituloService {
    formData: any;
    readonly apiURL: string;

    constructor(private http: HttpClient) {
        this.apiURL = 'https://localhost:5001/api/desafiodevfull';
    }

    obterContas(): Observable<any> {
        return this.http.get<any[]>(`${this.apiURL}/obtertitulos`);
    }
}
