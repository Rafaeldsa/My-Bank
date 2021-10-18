import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-caixa-eletronico',
  templateUrl: './caixa-eletronico.component.html',
  styleUrls: ['./caixa-eletronico.component.css']
})
export class CaixaEletronicoComponent implements OnInit {
  deposito = "deposito";
  saque = "saque";
  transferencia = "transferencia";
  operacao = "deposito";

  trocaOperacao: boolean = true;

  constructor() { }

  ngOnInit(): void { }

  alterarOperacao(flag: boolean) {
    this.trocaOperacao = flag;
  }

}
