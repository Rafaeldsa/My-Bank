import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemClientesComponent } from './clientes/listagem-clientes/listagem-clientes.component';
import { CadastroEdicaoClientesComponent } from './clientes/cadastro-edicao-clientes/cadastro-edicao-clientes.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { ClienteService } from '../services/cliente.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListagemContasComponent } from './contas/listagem-contas/listagem-contas.component';
import { CadastroEdicaoContasComponent } from './contas/cadastro-edicao-contas/cadastro-edicao-contas.component';
import { CaixaEletronicoComponent } from './caixa/caixa-eletronico/caixa-eletronico.component';
import { FormOperacaoComponent } from './caixa/form-operacao/form-operacao.component';
import { ModalExtratoComponent } from './modal-extrato/modal-extrato.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    ListagemClientesComponent,
    CadastroEdicaoClientesComponent,
    ListagemContasComponent,
    CadastroEdicaoContasComponent,
    CaixaEletronicoComponent,
    FormOperacaoComponent,
    ModalExtratoComponent,
  ],
  providers: [ClienteService],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
})
export class PagesModule {}
