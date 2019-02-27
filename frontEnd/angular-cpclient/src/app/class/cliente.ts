import { TelefoneTipo } from './telefoneTipo';
import { EnderecoTipo } from './enderecoTipo';
import { RedeSocialTipo } from './redeSocialTipo';

export class Cliente {
  id: number;
  nomeCompleto: string;
  dataNascimento: Date;
  cpf: string;
  rg: string;
  telefones: Array<Telefone>;
  Enderecos: Array<Endereco>;
  redesSociais: Array<RedeSocial>;
}

export class Telefone {
  id: number;
  ddd: string;
  numero: string;
  telefoneTipoId: number;
  TelefoneTipo: TelefoneTipo;
}

export class Endereco {
  id: number;
  logradouro: string;
  numero: string;
  complemento: string;
  cidadeUf: string;
  cep: string;
  enderecoTipoId: number;
  EnderecoTipo: EnderecoTipo;
}

export class RedeSocial {
  id: number;
  url: string;
  redeSocialTipoId: number;
  RedeSocialTipo: RedeSocialTipo;
}