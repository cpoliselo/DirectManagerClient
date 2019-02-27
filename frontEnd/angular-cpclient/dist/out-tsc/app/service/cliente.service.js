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
var ClienteService = /** @class */ (function () {
    function ClienteService(http, messageService) {
        this.http = http;
        this.messageService = messageService;
        this.url = 'api/clientes';
        this.urlProd = 'https://localhost:44333/api/cliente';
    }
    ClienteService.prototype.getAllCliente = function () {
        var _this = this;
        return this.http.get(this.urlProd)
            .pipe(tap(function (_) { return _this.log('fetched clientes'); }), catchError(this.handleError('getClientes', [])));
    };
    ClienteService.prototype.getClienteById = function (clienteId) {
        var _this = this;
        var url = this.url + "/" + clienteId;
        return this.http.get(url, httpOptions).pipe(tap(function (_) { return _this.log("fetched Cliente id=" + clienteId); }), catchError(this.handleError("getClienteById id=" + clienteId)));
    };
    ClienteService.prototype.createCliente = function (cliente) {
        var _this = this;
        return this.http.post(this.url, cliente, httpOptions).pipe(tap(function (newCliente) { return _this.log("added Cliente w/ id=" + newCliente.id); }), catchError(this.handleError('createCliente')));
    };
    ClienteService.prototype.updateCliente = function (cliente) {
        var _this = this;
        return this.http.put(this.url, cliente, httpOptions).pipe(tap(function (_) { return _this.log("updated Cliente id=" + cliente.id); }), catchError(this.handleError("getClienteById id=" + cliente.id)));
    };
    ClienteService.prototype.deleteClienteById = function (clienteid) {
        var url = this.url + "/" + clienteid;
        return this.http.delete(url, httpOptions);
    };
    ClienteService.prototype.log = function (message) {
        this.messageService.add("HeroService: " + message);
    };
    ClienteService.prototype.handleError = function (operation, result) {
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
    ClienteService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            MessageService])
    ], ClienteService);
    return ClienteService;
}());
export { ClienteService };
//# sourceMappingURL=cliente.service.js.map