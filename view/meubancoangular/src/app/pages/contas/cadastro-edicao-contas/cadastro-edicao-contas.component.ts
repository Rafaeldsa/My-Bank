import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICliente } from 'src/app/interfaces/cliente';
import { IConta } from 'src/app/interfaces/conta';
import { IContaRequest } from 'src/app/interfaces/contaRequest';
import { ClienteService } from 'src/app/services/cliente.service';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-edicao-contas',
  templateUrl: './cadastro-edicao-contas.component.html',
  styleUrls: ['./cadastro-edicao-contas.component.css'],
})
export class CadastroEdicaoContasComponent implements OnInit {

  formConta: FormGroup = new FormGroup({
    id: new FormControl(null),
    agencia: new FormControl('', Validators.required),
    numero: new FormControl('', Validators.required),
    saldo: new FormControl('', Validators.required),
    idCliente: new FormControl('', Validators.required),
  });
  constructor(
    private clienteService: ClienteService,
    private contaService: ContasService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  enviar() {
    const contaRequest: IContaRequest = this.formConta.value;

    this.clienteService.buscarPorId(Number(contaRequest.idCliente)).subscribe(
      (result) => {
        const conta: IConta = {
          id: contaRequest.id,
          agencia: contaRequest.agencia,
          numero: contaRequest.numero,
          saldo: contaRequest.saldo,
          cliente: result,
        };
        this.contaService.cadastrar(conta).subscribe(
          (result) => {
            console.log(result);
            Swal.fire('Cadastrado com sucesso!', 'Sucesso', 'success');
            this.router.navigate(['/contas']);
          },
          (error) => {
            console.error(error);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );

  }
}
