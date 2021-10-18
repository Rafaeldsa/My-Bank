import { Component, OnInit } from '@angular/core';
import { IConta } from 'src/app/interfaces/conta';
import { ContasService } from 'src/app/services/contas.service';

import { MatDialog } from '@angular/material/dialog';
import { ModalExtratoComponent } from '../../modal-extrato/modal-extrato.component';

@Component({
  selector: 'app-listagem-contas',
  templateUrl: './listagem-contas.component.html',
  styleUrls: ['./listagem-contas.component.css'],
})
export class ListagemContasComponent implements OnInit {
  contas: IConta[] = [];
  loading = false;

  constructor(
    private contaService: ContasService,
    private dialogRef: MatDialog
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.loading = true;
    this.contaService.listarTodasContas().subscribe((dados: IConta[]) => {
      this.loading = false;
      this.contas = dados;
    });
  }

  openModal(nome: string, agencia: string, numeroConta: string) {
    this.dialogRef.open(ModalExtratoComponent, {
      data: {
        nome: nome,
        agencia: agencia,
        numeroConta: numeroConta,
      },
    });
  }
}
