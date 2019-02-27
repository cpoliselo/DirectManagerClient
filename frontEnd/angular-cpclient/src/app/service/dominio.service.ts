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
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DominioService {
  urlTelefoneTipo = 'https://localhost:44333/api/telefonetipo'; 
  urlRedeSocialTipo = 'https://localhost:44333/api/redesocialtipo'
  urlEnderecoTipo = 'https://localhost:44333/api/enderecotipo'

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getAllTelefoneTipo(): Observable<TelefoneTipo[]> {
    return this.http.get<TelefoneTipo[]>(this.urlTelefoneTipo)
      .pipe(
        tap(_ => {this.log('fetched telefoneTipo'); console.log(_)}),
        catchError(this.handleError('getAllTelefoneTipo', []))
      );
  }

  getAllEnderecoTipo(): Observable<EnderecoTipo[]> {
    return this.http.get<EnderecoTipo[]>(this.urlEnderecoTipo)
      .pipe(
        tap(_ => {this.log('fetched enderecoTipo'); console.log(_)}),
        catchError(this.handleError('getAllEnderecoTipo', []))
      );
  }

  getAllRedeSocialTipo(): Observable<RedeSocialTipo[]> {
    return this.http.get<RedeSocialTipo[]>(this.urlRedeSocialTipo)
      .pipe(
        tap(_ => {this.log('fetched redeSocialTipo'); console.log(_)}),
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
