var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

var httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
var DominioService = /** @class */ (function () {
    function DominioService(http, messageService) {
        this.http = http;
        this.messageService = messageService;
        this.urlProdTelefoneTipo = 'https://localhost:44333/api/cliente';
    }
    DominioService.prototype.getAllTelefoneTipo = function () {
        var _this = this;
        return this.http.get(this.urlProdTelefoneTipo)
            .pipe(tap(function (_) { return _this.log('fetched telefoneTipo'); }), catchError(this.handleError('getTelefoneTipo', [])));
    };
    DominioService.prototype.handleError = function (operation, result) {
        var _this = this;
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            _this.log(operation + " failed: " + error.message);
            // Let the app keep running by returning an empty result.
            return of(result);
        };
    };
    DominioService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            MessageService])
    ], DominioService);
    return DominioService;
}());
export { DominioService };