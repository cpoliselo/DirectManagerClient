import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

import { Cliente } from '../class/cliente';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', })
};

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  urlProd = 'https://localhost:44351/api/cliente'

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private authService: AuthService) { }

  getAllCliente(): Observable<Cliente[]> {
    let token = localStorage.getItem("jwt");
    const httpHeader = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      })
    };

    return this.http.get<Cliente[]>(this.urlProd, httpHeader)
      .pipe(
        tap(_ => { this.log('fetched clientes'); }),
        catchError(this.handleError('getClientes', []))
      );
  }

  getClienteById(clienteId: number): Observable<Cliente> {
    let token = localStorage.getItem("jwt");
    const httpHeader = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      })
    };
    const url = `${this.urlProd}/${clienteId}`;
    return this.http.get<Cliente>(url, httpHeader).pipe(
      tap(_ => this.log(`fetched Cliente id=${clienteId}`)),
      catchError(this.handleError<Cliente>(`getClienteById id=${clienteId}`))
    );
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    let token = localStorage.getItem("jwt");
    const httpHeader = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      })
    };
    return this.http.post<Cliente>(this.urlProd, cliente, httpHeader).pipe(
      tap((newCliente: Cliente) => this.log(`added Cliente w/ id=${newCliente.id}`)),
      catchError(this.handleError<Cliente>('createCliente'))
    );
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    let token = localStorage.getItem("jwt");
    const httpHeader = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      })
    };
    return this.http.put<Cliente>(this.urlProd, cliente, httpHeader).pipe(
      tap(_ => this.log(`updated Cliente id=${cliente.id}`)),
      catchError(this.handleError<Cliente>(`getClienteById id=${cliente.id}`))
    );
  }

  deleteClienteById(clienteid: number): Observable<number> {
    let token = localStorage.getItem("jwt");
    const httpHeader = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      })
    };
    const url = `${this.urlProd}/${clienteid}`;
    return this.http.delete<number>(url, httpHeader)
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
