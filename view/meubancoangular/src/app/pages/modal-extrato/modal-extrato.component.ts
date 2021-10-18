import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IExtratoRequest } from 'src/app/interfaces/extrato';
import { IExtratoRetorno } from 'src/app/interfaces/extratoRetorno';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-extrato',
  templateUrl: './modal-extrato.component.html',
  styleUrls: ['./modal-extrato.component.css'],
})
export class ModalExtratoComponent implements OnInit {
  showTable = false;
  operacoes: IExtratoRetorno[] = [];

  nome;
  agencia;
  numeroConta;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialog,
    private contaService: ContasService
  ) {
    this.nome = data.nome;
    this.agencia = data.agencia;
    this.numeroConta = data.numeroConta;
  }
  formExtrato: FormGroup = new FormGroup({
    agencia: new FormControl(this.data.agencia, Validators.required),
    numeroConta: new FormControl(this.data.numeroConta, Validators.required),
    dataInicio: new FormControl('', Validators.required),
    dataFim: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  buscarExtrato() {
    if (
      new Date(this.formExtrato.value.dataInicio) >
      new Date(this.formExtrato.value.dataFim)
    ) {
      alert('Data de inicio não pode ser maior que a final!');
      return;
    }
    const extrato: IExtratoRequest = this.formExtrato.value;
    this.contaService.getExtrato(extrato).subscribe(
      (result: IExtratoRetorno[]) => {
        this.operacoes = result;
        this.showTable = true;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
