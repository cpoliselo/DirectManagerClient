# CPClient
Aplicação para cadastro de clientes.

Ações:
- Cadastro
- Edição
- Consulta
- Inativação

### Tecnologias utilizadas:
- Angular 7
- .NET Core 2.2
- SQL Server
- Entity Core

### SQL Server
- Server: (LocalDb)\\MSSQLLocalDB
- Database: ClienteDB

## CPCliente UI - Front
Responsável pela interface de gerenciamento dos clientes. 

Desenvolvido utilizando Angular 7 com CLI

### Pasta Projeto
frontEnd/angular-cpclient

### Passos para execução
1. Abrir projeto do caminho frontEnd/angular-cpclient pelo VSCode
2. Instalar Angular CLI via terminal 
```
npm install -g @angular/cli
```
3. Rodar comando para restaurar os pacotes via terminal
```
npm install
```
4. Rodar comando para iniciar server via terminal
```
ng serve
```
5. No Browser, acessar a URL http://localhost:4200/

6. Verificar no arquivo "**frontEnd/angular-cpclient/src/app/service/cliente.service.ts**" se a variável "**urlProd**" está apontando corretamente para a URL executada pelo Visual Studio ao iniciar a aplicação de BackEnd

## CPCliente WebAPI - Back End
Responsável pelo processamento das solicitações geradas pelo frontEnd de gerenciamento dos clientes através de API RESTful

Desenvolvido utilizando: 
- .NET Core 2.2
- Entity Core
- JWToken
- Swagger

### Criação DB
Logo ao iniciar projeto serão executadas as migrations e a alimentação das tabelas de domínio

### Documentação das APIs
[Swagger | https://localhost:44351/swagger/index.html]

### Estrutura do Projeto
* Application
    * Camada de Aplicação onde está a API
* Domain
    * Camada de Domínio, responsável pelo mapeamento das entidades
* Service
    * Camada de Serviços, orquestra ações disparadas pela camada de apresentação
* Infra.Data
    * Camada de Infraestrutura, contém toda configuração de acesso a base e migrations

### Entidades
- Cliente
- ClienteTelefone
- ClienteRedeSocial
- ClienteEndereco
- TelefoneTipo
- RedeSocialTipo
- EnderecoTipo
   
