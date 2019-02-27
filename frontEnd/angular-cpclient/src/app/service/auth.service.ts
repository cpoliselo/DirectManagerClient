import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlAuth = 'https://localhost:44333/api/Auth'; 
  credentials = {userName:"adminJWT",password:"def@123"}

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getToken() {
    var tokenAtual = localStorage.getItem("jwt");
    if (tokenAtual && !this.jwtHelper.isTokenExpired(tokenAtual)){
        console.log("Token Ok");
        console.log(tokenAtual);
        return tokenAtual;
      }
      else
      {
          console.log("Token Expirado")
    //npm install angular2-jwt --save
    return this.http.Post(this.urlAuth, this.credentials, httpOptions)
    .subscribe(response => {
        let token = (<any>response).token;
        localStorage.setItem("jwt", token)})
      .pipe(
        tap(_ => {this.log('fetched telefoneTipo'); console.log(_)}),
        catchError(this.handleError('getAllTelefoneTipo', []))
      );
  }
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
