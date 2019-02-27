import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Cliente } from './class/Cliente';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const clientes = [
      {
        id: 1,
        nomeCompleto: "teste",
        dataNascimento: "2/21/2019",
        CPF: "39191138884",
        RG: "0",
        Telefones: [{ DDD: "11", Numero: "984492959", TelefoneTipoId: 2 }, { DDD: "11", Numero: "35911848", TelefoneTipoId: 1 }],
        Enderecos: [{ Logradouro: "teste", Numero: "teste", Complemento: "teste", CidadeUf: "teste", CEP: "teste", EnderecoTipoId: 1 },
        { Logradouro: "teste 2", Numero: "teste", Complemento: "teste", CidadeUf: "teste", CEP: "teste", EnderecoTipoId: 2 }],
        RedesSociais: [{ URL: "Facebook.com", RedeSocialTipoId: 1 }]
      },
      {
        id: 2,
        nomeCompleto: "teste 2",
        dataNascimento: "2/21/2019",
        CPF: "teste",
        RG: "0",
        Telefones: [{ DDD: "11", Numero: "984492959", TelefoneTipoId: 2 }],
        Enderecos: [{ Logradouro: "teste", Numero: "teste", Complemento: "teste", CidadeUf: "teste", CEP: "teste", EnderecoTipoId: 1 }],
        RedesSociais: [{ URL: "Facebook.com", RedeSocialTipoId: 1 }, { URL: "Instagran.com", RedeSocialTipoId: 2 }, { URL: "Blablabla.com", RedeSocialTipoId: 4 }]
      }
    ];
    return { clientes };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the clientes  array is empty,
  // the method below returns the initial number (11).
  // if the clientes  array is not empty, the method below returns the highest
  // hero id + 1.
  genId(clientes: Cliente[]): number {
    console.log(clientes.length);
    return clientes.length > 0 ? Math.max(...clientes.map(hero => hero.id)) + 1 : 1;
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/