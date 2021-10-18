import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-edicao-clientes',
  templateUrl: './cadastro-edicao-clientes.component.html',
  styleUrls: ['./cadastro-edicao-clientes.component.css']
})
export class CadastroEdicaoClientesComponent implements OnInit {
  formValue: FormGroup = new FormGroup({
    id: new FormControl(null),
    nome: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    observacoes: new FormControl('', Validators.required),
    ativo: new FormControl(true),
  });
  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (Number(id)) {
      this.clienteService.buscarPorId(Number(id)).subscribe(result => {
        this.preencherFormValue(result);
      }, error => {
        console.error(error);
      });
    }
  }

  preencherFormValue(cliente: ICliente) {
    this.formValue =  new FormGroup({
      id: new FormControl(cliente.id),
      nome: new FormControl(cliente.nome, Validators.required),
      cpf: new FormControl(cliente.cpf, Validators.required),
      email: new FormControl(cliente.email, [Validators.required, Validators.email]),
      observacoes: new FormControl(cliente.observacoes, Validators.required),
      ativo: new FormControl(cliente.ativo),
    });
  }

  enviar() {
    const cliente: ICliente = this.formValue.value;
    this.clienteService.cadastrar(cliente).subscribe(result => {
      console.log(result);
      Swal.fire('Cadastrado com sucesso!', 'Sucesso','success')
      this.router.navigate(['/clientes']);
    }, error => {
      console.error(error);
    });
  }
}
