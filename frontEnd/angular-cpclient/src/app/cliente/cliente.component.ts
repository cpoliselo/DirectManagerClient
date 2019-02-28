import { Component, OnInit, ViewChild, Inject, TemplateRef } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { ClienteService } from '../service/cliente.service';
import { DominioService } from '../service/dominio.service';
import { AuthService } from '../service/auth.service';
import { Cliente } from '../class/cliente';
import { TelefoneTipo } from '../class/telefoneTipo';
import { EnderecoTipo } from '../class/enderecoTipo';
import { RedeSocialTipo } from '../class/redeSocialTipo';
import { NumberValidator } from '../class/validator';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ngxLoadingAnimationTypes, NgxLoadingComponent } from '../../../projects/ngx-loading/src/public_api';

const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
const PrimaryRed = '#dd0031';
const SecondaryBlue = '#006ddd';


// import { NgBrazilValidators } from 'ng-brazil';
// import { utilsBr, fakerBr } from 'js-brasil';

export interface MessageData {
  message: string;
}

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' }
  ],
})

export class ClienteComponent implements OnInit {
  @ViewChild('ngxLoading') ngxLoadingComponent: NgxLoadingComponent;
  @ViewChild('customLoadingTemplate') customLoadingTemplate: TemplateRef<any>;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  public primaryColour = PrimaryWhite;
  public secondaryColour = SecondaryGrey;
  public coloursEnabled = false;
  public loadingTemplate: TemplateRef<any>;
  public config = { animationType: ngxLoadingAnimationTypes.none, primaryColour: this.primaryColour, secondaryColour: this.secondaryColour, tertiaryColour: this.primaryColour, backdropBorderRadius: '3px' };
  displayedColumns: string[] = ['id', 'Nome', 'dataNascimento', 'cpf', 'rg', 'edit', 'delete'];
  dataSaved = false; s
  clienteForm: any;
  allclientes: Observable<Cliente[]>;
  listCliente: Cliente[];
  allTelefoneTipo: Observable<TelefoneTipo[]>;
  listTelefoneTipo: TelefoneTipo[];
  allEnderecoTipo: Observable<EnderecoTipo[]>;
  listEnderecoTipo: EnderecoTipo[];
  allRedeSocialTipo: Observable<RedeSocialTipo[]>;
  listRedeSocialTipo: RedeSocialTipo[];
  clienteIdUpdate = null;
  massage = null;
  step = 0;
  loadEdit: any;
  dataSource = new MatTableDataSource(this.listCliente);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  messageConfirmation: string;
  submitted = false;

  constructor(private formbulider: FormBuilder,
    private clienteService: ClienteService,
    private dominioService: DominioService,
    private authService: AuthService,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogMessage, {
      width: '250px',
      data: { message: this.messageConfirmation }
    });

  }

  public Phonemask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  public CPFmask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  public DDDmask = [/\d/, /\d/, /\d/]


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setStep(index: number) {
    this.step = index;
    if (this.step == 0) {
      this.clienteIdUpdate = null;
      this.createNewForm();
      this.massage = null;
      this.dataSaved = false;
    }
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  ngOnInit() {
    this.loading = true;
    this.authService.getToken()
    this.createNewForm();
    this.loadAllclientes();
  }

  createNewForm() {
    this.cleanForm();

    this.clienteForm = this.formbulider.group({
      nomeCompleto: ['', [Validators.required, Validators.minLength(5)]],
      dataNascimento: ['', [Validators.required]],
      rg: ['', [Validators.required]],
      cpf: ['', [Validators.required, NumberValidator, Validators.minLength(11), Validators.maxLength(11)]],
      telefones: this.formbulider.array([
        this.initTelefones(),
      ]),
      enderecos: this.formbulider.array([
        this.initEnderecos(),
      ]),
      redesSociais: this.formbulider.array([
        this.initRedeSociais(),
      ])

    });
    this.loadTelefoneTipo();
    this.loadEnderecoTipo();
    this.loadRedeSocialTipo();
  }



  get f() { return this.clienteForm.controls; }

  initRedeSociais() {
    return this.formbulider.group({
      url: ['', [Validators.required]],
      redeSocialTipoId: [1]
    });
  }

  initTelefones() {
    return this.formbulider.group({
      ddd: ['', [Validators.required, NumberValidator, Validators.minLength(2), Validators.maxLength(3)]],
      numero: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
      telefoneTipoId: [1]
    });
  }

  initEnderecos() {
    return this.formbulider.group({
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: [''],
      cidadeUf: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      enderecoTipoId: [1]
    });
  }

  addTelefone() {
    const control = <FormArray>this.clienteForm.controls['telefones'];
    control.push(this.initTelefones());
  }

  addRedeSocial() {
    const control = <FormArray>this.clienteForm.controls['redesSociais'];
    control.push(this.initRedeSociais());
  }

  addEndereco() {
    const control = <FormArray>this.clienteForm.controls['enderecos'];
    control.push(this.initEnderecos());
  }

  loadTelefoneTipo() {
    this.allTelefoneTipo = this.dominioService.getAllTelefoneTipo();
    this.allTelefoneTipo.subscribe(res => {
      this.listTelefoneTipo = res;
    });
  }

  loadRedeSocialTipo() {
    this.allRedeSocialTipo = this.dominioService.getAllRedeSocialTipo();
    this.allRedeSocialTipo.subscribe(res => {
      this.listRedeSocialTipo = res;
    });
  }

  loadEnderecoTipo() {
    this.allEnderecoTipo = this.dominioService.getAllEnderecoTipo();
    this.allEnderecoTipo.subscribe(res => {
      this.listEnderecoTipo = res;
    });
  }

  loadAllclientes() {
    this.allclientes = this.clienteService.getAllCliente();
    this.allclientes.subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });

  }
  onFormSubmit() {
    this.loading = true;
    this.submitted = true;

    // stop here if form is invalid
    if (this.clienteForm.invalid) {
      return;
    }

    this.dataSaved = false;
    const cliente = this.clienteForm.value;
    this.Createcliente(cliente);
    this.clienteForm.reset();
    this.resetForm();
    this.step++;
  }

  loadclienteToEdit(clienteId: number) {
    this.loading = true;
    this.authService.getToken();
    this.clienteService.getClienteById(clienteId).subscribe(cliente => {
      this.loadEdit = cliente;
      this.patchForm();
      this.setStep(1);
      this.massage = null;
      this.dataSaved = false;
      this.clienteIdUpdate = cliente.id;
      this.loading = false;
    });

  };

  patchForm() {
    this.cleanForm();
    this.clienteForm.patchValue({
      nomeCompleto: this.loadEdit.nomeCompleto,
      dataNascimento: this.loadEdit.dataNascimento,
      rg: this.loadEdit.rg,
      cpf: this.loadEdit.cpf
    });
    this.setTelefones()
    this.setRedesSociais()
    this.setEnderecos()

  };

  setTelefones() {
    let control = <FormArray>this.clienteForm.controls.telefones;
    this.loadEdit.telefones.forEach(x => {
      control.push(this.formbulider.group({
        ddd: x.ddd,
        numero: x.numero,
        telefoneTipoId: x.telefoneTipoId
      }))
    })
  };

  setRedesSociais() {
    let control = <FormArray>this.clienteForm.controls.redesSociais;
    this.loadEdit.redesSociais.forEach(x => {
      control.push(this.formbulider.group({
        url: x.url,
        redeSocialTipoId: x.redeSocialTipoId
      }))
    })
  };

  setEnderecos() {
    let control = <FormArray>this.clienteForm.controls.enderecos;
    this.loadEdit.enderecos.forEach(x => {
      control.push(this.formbulider.group({
        logradouro: x.logradouro,
        numero: x.numero,
        complemento: x.complemento,
        cidadeUf: x.cidadeUf,
        cep: x.cep,
        enderecoTipoId: x.enderecoTipoId
      }))
    })
  };

  Createcliente(cliente: Cliente) {
    this.authService.getToken();
    if (this.clienteIdUpdate == null) {
      this.clienteService.createCliente(cliente).subscribe(
        () => {
          this.dataSaved = true;
          this.messageConfirmation = 'Cliente Cadastrado com sucesso';
          this.massage = 'Cliente Cadastrado com sucesso';
          this.setStep(0);
          this.openDialog();
          this.loadAllclientes();
          this.clienteIdUpdate = null;
          this.clienteForm.reset();
          this.resetForm();
        }
      );
    } else {
      cliente.id = this.clienteIdUpdate;
      this.clienteService.updateCliente(cliente).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Cliente Atualizado com sucesso';
        this.messageConfirmation = 'Cliente Atualizado com sucesso';
        this.setStep(0);
        this.openDialog();
        this.loadAllclientes();
        this.clienteIdUpdate = null;
        this.clienteForm.reset();
        this.resetForm();
      });
    }

  }

  deletecliente(id: number) {
    this.loading = true;
    this.authService.getToken();
    if (confirm("Deseja realmente inativar o cliente ?")) {
      this.clienteService.deleteClienteById(id).subscribe(() => {
        this.dataSaved = true;
        this.messageConfirmation = 'Cliente Inativado com sucesso';
        this.massage = 'Cliente Inativado com sucesso';
        this.setStep(0);
        this.openDialog();
        this.loadAllclientes();
        this.clienteIdUpdate = null;
        this.clienteForm.reset();
        this.resetForm();
      });
    }
  }

  cleanForm() {
    this.clienteForm = this.formbulider.group({
      nomeCompleto: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      rg: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      telefones: this.formbulider.array([]),
      enderecos: this.formbulider.array([]),
      redesSociais: this.formbulider.array([])
    });
  }

  resetForm() {
    this.setStep(0);
    this.clienteIdUpdate = null;
    this.createNewForm();
    this.massage = null;
    this.dataSaved = false;
  }
}

@Component({
  selector: 'dialogMessage',
  templateUrl: 'dialogMessage.html',
})
export class DialogMessage {

  constructor(
    public dialogRef: MatDialogRef<DialogMessage>,
    @Inject(MAT_DIALOG_DATA) public data: MessageData) {
    console.log(data.message);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

