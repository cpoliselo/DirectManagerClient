// https://github.com/bozoh/ng-br-tools/blob/master/src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClienteService } from './service/cliente.service';
import { DominioService } from './service/dominio.service';
import { AuthService } from './service/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { JwtModule } from '@auth0/angular-jwt';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';

import { NgxLoadingModule } from '../../projects/ngx-loading/src/public_api';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import {
  MatButtonModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatCardModule, MatSidenavModule, MatFormFieldModule,
  MatInputModule, MatTooltipModule, MatToolbarModule, MatExpansionModule, MatFormFieldControl, MatSelectModule, MatDividerModule, MatTableModule, MatPaginatorModule,
  MatProgressSpinnerModule, MatDialogModule
} from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteComponent, DialogMessage } from './cliente/cliente.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './service/message.service';
// import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { TextMaskModule } from 'angular2-text-mask';

import {
  NgBrToolsModule, CEP_SERVICE,
  CepServiceFactory, ESTADO_SERVICE,
  EstadoServiceFactory
} from 'ng-br-tools';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    MessagesComponent,
    DialogMessage
  ],
  imports: [
    NgxLoadingModule.forRoot({}),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        }
      }
    }),
    // MomentDateAdapter,
    MatDialogModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    ScrollingModule,
    NgBrToolsModule,
    TextMaskModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatToolbarModule,
    AppRoutingModule,
    HttpClientModule,
    MatDividerModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )
    // ,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataTelefoneService, { dataEncapsulation: false }
    // )
  ],
  entryComponents: [DialogMessage],
  providers: [HttpClientModule, ClienteService, DominioService, MatDatepickerModule, MessageService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
