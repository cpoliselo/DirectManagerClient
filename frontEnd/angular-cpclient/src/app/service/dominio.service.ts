import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Cliente } from '../class/cliente';
import { TelefoneTipo } from '../class/telefoneTipo';
import { RedeSocialTipo } from '../class/redeSocialTipo';
import { EnderecoTipo } from '../class/enderecoTipo';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
};

@Injectable({
  providedIn: 'root'
})
export class DominioService {
  url = "https://localhost:44351";
  urlTelefoneTipo = this.url + '/api/telefonetipo';
  urlRedeSocialTipo = this.url + '/api/redesocialtipo'
  urlEnderecoTipo = this.url + '/api/enderecotipo'

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getAllTelefoneTipo(): Observable<TelefoneTipo[]> {
    let token = localStorage.getItem("jwt");
    const httpHeader = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      })
    };

    return this.http.get<TelefoneTipo[]>(this.urlTelefoneTipo, httpHeader)
      .pipe(
        tap(_ => { this.log('fetched telefoneTipo'); }),
        catchError(this.handleError('getAllTelefoneTipo', []))
      );
  }

  getAllEnderecoTipo(): Observable<EnderecoTipo[]> {
    let token = localStorage.getItem("jwt");
    const httpHeader = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      })
    };

    return this.http.get<EnderecoTipo[]>(this.urlEnderecoTipo, httpHeader)
      .pipe(
        tap(_ => { this.log('fetched enderecoTipo'); }),
        catchError(this.handleError('getAllEnderecoTipo', []))
      );
  }

  getAllRedeSocialTipo(): Observable<RedeSocialTipo[]> {
    let token = localStorage.getItem("jwt");
    const httpHeader = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      })
    };
    return this.http.get<RedeSocialTipo[]>(this.urlRedeSocialTipo, httpHeader)
      .pipe(
        tap(_ => { this.log('fetched redeSocialTipo'); }),
        catchError(this.handleError('getAllRedeSocialTipo', []))
      );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
