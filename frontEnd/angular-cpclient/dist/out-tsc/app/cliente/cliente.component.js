var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, ViewChild, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClienteService } from '../service/cliente.service';
import { NumberValidator } from '../class/validator';
var ClienteComponent = /** @class */ (function () {
    function ClienteComponent(formbulider, clienteService, dialog) {
        this.formbulider = formbulider;
        this.clienteService = clienteService;
        this.dialog = dialog;
        this.displayedColumns = ['Nome', 'dataNascimento', 'Cpf', 'Rg', 'edit', 'delete'];
        this.dataSaved = false;
        this.clienteIdUpdate = null;
        this.massage = null;
        this.step = 0;
        this.dataSource = new MatTableDataSource(this.listCliente);
        this.submitted = false;
        this.Phonemask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
        this.CPFmask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
        this.DDDmask = [/\d/, /\d/, /\d/];
    }
    ClienteComponent.prototype.openDialog = function () {
        var dialogRef = this.dialog.open(DialogMessage, {
            width: '250px',
            data: { message: this.messageConfirmation }
        });
    };
    ClienteComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    ClienteComponent.prototype.setStep = function (index) {
        this.step = index;
        if (this.step == 0) {
            this.clienteIdUpdate = null;
            this.createNewForm();
            this.massage = null;
            this.dataSaved = false;
        }
    };
    ClienteComponent.prototype.nextStep = function () {
        this.step++;
    };
    ClienteComponent.prototype.prevStep = function () {
        this.step--;
    };
    ClienteComponent.prototype.ngOnInit = function () {
        this.createNewForm();
        this.loadAllclientes();
    };
    ClienteComponent.prototype.createNewForm = function () {
        this.cleanForm();
        this.clienteForm = this.formbulider.group({
            nomeCompleto: ['', [Validators.required, Validators.minLength(5)]],
            dataNascimento: ['', [Validators.required]],
            RG: ['', [Validators.required]],
            CPF: ['', [Validators.required, NumberValidator, Validators.minLength(11), Validators.maxLength(11)]],
            Telefones: this.formbulider.array([
                this.initTelefones(),
            ]),
            Enderecos: this.formbulider.array([
                this.initEnderecos(),
            ]),
            RedesSociais: this.formbulider.array([
                this.initRedeSociais(),
            ])
        });
        this.loadTelefoneTipo();
        this.loadEnderecoTipo();
        this.loadRedeSocialTipo();
    };
    Object.defineProperty(ClienteComponent.prototype, "f", {
        get: function () { return this.clienteForm.controls; },
        enumerable: true,
        configurable: true
    });
    ClienteComponent.prototype.initRedeSociais = function () {
        return this.formbulider.group({
            URL: ['', [Validators.required]],
            RedeSocialTipoId: [1]
        });
    };
    ClienteComponent.prototype.initTelefones = function () {
        return this.formbulider.group({
            DDD: ['', [Validators.required, NumberValidator, Validators.minLength(2), Validators.maxLength(3)]],
            Numero: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
            TelefoneTipoId: [1]
        });
    };
    ClienteComponent.prototype.initEnderecos = function () {
        return this.formbulider.group({
            Logradouro: ['', [Validators.required]],
            Numero: ['', [Validators.required]],
            Complemento: [''],
            CidadeUf: ['', [Validators.required]],
            CEP: ['', [Validators.required]],
            EnderecoTipoId: [1]
        });
    };
    ClienteComponent.prototype.addTelefone = function () {
        var control = this.clienteForm.controls['Telefones'];
        control.push(this.initTelefones());
    };
    ClienteComponent.prototype.addRedeSocial = function () {
        var control = this.clienteForm.controls['RedesSociais'];
        control.push(this.initRedeSociais());
    };
    ClienteComponent.prototype.addEndereco = function () {
        var control = this.clienteForm.controls['Enderecos'];
        control.push(this.initEnderecos());
    };
    ClienteComponent.prototype.loadTelefoneTipo = function () {
        this.allTelefoneTipo = [
            {
                id: 1,
                Descricao: "Residencial"
            },
            {
                id: 2,
                Descricao: "Celular"
            },
            {
                id: 3,
                Descricao: "Comercial"
            }
        ];
    };
    ClienteComponent.prototype.loadRedeSocialTipo = function () {
        this.allRedeSocialTipo = [
            {
                id: 1,
                Descricao: "Facebook"
            },
            {
                id: 2,
                Descricao: "Instagran"
            },
            {
                id: 3,
                Descricao: "LinkedIn"
            },
            {
                id: 4,
                Descricao: "Outra"
            }
        ];
    };
    ClienteComponent.prototype.loadEnderecoTipo = function () {
        this.allEnderecoTipo = [
            {
                id: 1,
                Descricao: "Residencial"
            },
            {
                id: 2,
                Descricao: "Comercial"
            }
        ];
    };
    ClienteComponent.prototype.loadAllclientes = function () {
        var _this = this;
        this.allclientes = this.clienteService.getAllCliente();
        this.allclientes.subscribe(function (res) {
            _this.dataSource = new MatTableDataSource(res);
            _this.dataSource.paginator = _this.paginator;
        });
    };
    ClienteComponent.prototype.onFormSubmit = function () {
        this.submitted = true;
        // stop here if form is invalid
        if (this.clienteForm.invalid) {
            return;
        }
        this.dataSaved = false;
        var cliente = this.clienteForm.value;
        this.Createcliente(cliente);
        this.clienteForm.reset();
        this.resetForm();
        this.step++;
    };
    ClienteComponent.prototype.loadclienteToEdit = function (clienteId) {
        var _this = this;
        this.clienteService.getClienteById(clienteId).subscribe(function (cliente) {
            _this.loadEdit = cliente;
            _this.patchForm();
            _this.setStep(1);
            _this.massage = null;
            _this.dataSaved = false;
            _this.clienteIdUpdate = cliente.id;
        });
    };
    ;
    ClienteComponent.prototype.patchForm = function () {
        this.cleanForm();
        this.clienteForm.patchValue({
            nomeCompleto: this.loadEdit.nomeCompleto,
            dataNascimento: this.loadEdit.dataNascimento,
            RG: this.loadEdit.RG,
            CPF: this.loadEdit.CPF
        });
        this.setTelefones();
        this.setRedesSociais();
        this.setEnderecos();
    };
    ;
    ClienteComponent.prototype.setTelefones = function () {
        var _this = this;
        var control = this.clienteForm.controls.Telefones;
        this.loadEdit.Telefones.forEach(function (x) {
            control.push(_this.formbulider.group({
                DDD: x.DDD,
                Numero: x.Numero,
                TelefoneTipoId: x.TelefoneTipoId
            }));
        });
    };
    ;
    ClienteComponent.prototype.setRedesSociais = function () {
        var _this = this;
        var control = this.clienteForm.controls.RedesSociais;
        this.loadEdit.RedesSociais.forEach(function (x) {
            control.push(_this.formbulider.group({
                URL: x.URL,
                RedeSocialTipoId: x.RedeSocialTipoId
            }));
        });
    };
    ;
    ClienteComponent.prototype.setEnderecos = function () {
        var _this = this;
        var control = this.clienteForm.controls.Enderecos;
        this.loadEdit.Enderecos.forEach(function (x) {
            control.push(_this.formbulider.group({
                Logradouro: x.Logradouro,
                Numero: x.Numero,
                Complemento: x.Complemento,
                CidadeUf: x.CidadeUf,
                CEP: x.CEP,
                EnderecoTipoId: x.EnderecoTipoId
            }));
        });
    };
    ;
    ClienteComponent.prototype.Createcliente = function (cliente) {
        var _this = this;
        console.log(cliente);
        if (this.clienteIdUpdate == null) {
            this.clienteService.createCliente(cliente).subscribe(function () {
                _this.dataSaved = true;
                _this.messageConfirmation = 'Cliente Cadastrado com sucesso';
                _this.massage = 'Cliente Cadastrado com sucesso';
                _this.openDialog();
                _this.loadAllclientes();
                _this.clienteIdUpdate = null;
                _this.clienteForm.reset();
                _this.resetForm();
            });
        }
        else {
            cliente.id = this.clienteIdUpdate;
            this.clienteService.updateCliente(cliente).subscribe(function () {
                _this.dataSaved = true;
                _this.massage = 'Cliente Atualizado com sucesso';
                _this.messageConfirmation = 'Cliente Atualizado com sucesso';
                _this.openDialog();
                _this.loadAllclientes();
                _this.clienteIdUpdate = null;
                _this.clienteForm.reset();
                _this.resetForm();
            });
        }
    };
    ClienteComponent.prototype.deletecliente = function (id) {
        var _this = this;
        if (confirm("Deseja realmente inativar o cliente ?")) {
            this.clienteService.deleteClienteById(id).subscribe(function () {
                _this.dataSaved = true;
                _this.messageConfirmation = 'Cliente Inativado com sucesso';
                _this.massage = 'Cliente Inativado com sucesso';
                _this.openDialog();
                _this.loadAllclientes();
                _this.clienteIdUpdate = null;
                _this.clienteForm.reset();
                _this.resetForm();
            });
        }
    };
    ClienteComponent.prototype.cleanForm = function () {
        this.clienteForm = this.formbulider.group({
            nomeCompleto: ['', [Validators.required]],
            dataNascimento: ['', [Validators.required]],
            RG: ['', [Validators.required]],
            CPF: ['', [Validators.required]],
            Telefones: this.formbulider.array([]),
            Enderecos: this.formbulider.array([]),
            RedesSociais: this.formbulider.array([])
        });
    };
    ClienteComponent.prototype.resetForm = function () {
        this.setStep(0);
        this.clienteIdUpdate = null;
        this.createNewForm();
        this.massage = null;
        this.dataSaved = false;
    };
    __decorate([
        ViewChild(MatPaginator),
        __metadata("design:type", MatPaginator)
    ], ClienteComponent.prototype, "paginator", void 0);
    ClienteComponent = __decorate([
        Component({
            selector: 'app-cliente',
            templateUrl: './cliente.component.html',
            styleUrls: ['./cliente.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, ClienteService, MatDialog])
    ], ClienteComponent);
    return ClienteComponent;
}());
export { ClienteComponent };
var DialogMessage = /** @class */ (function () {
    function DialogMessage(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        console.log(data.message);
    }
    DialogMessage.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DialogMessage = __decorate([
        Component({
            selector: 'dialogMessage',
            templateUrl: 'dialogMessage.html',
        }),
        __param(1, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [MatDialogRef, Object])
    ], DialogMessage);
    return DialogMessage;
}());
export { DialogMessage };
//# sourceMappingURL=cliente.component.js.map