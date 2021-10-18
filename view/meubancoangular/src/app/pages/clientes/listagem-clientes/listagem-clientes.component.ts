import { Component, OnInit } from '@angular/core';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listagem-clientes',
  templateUrl: './listagem-clientes.component.html',
  styleUrls: ['./listagem-clientes.component.css'],
})
export class ListagemClientesComponent implements OnInit {
  clientes: ICliente[] = [];
  loading = false;
  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.loading = true;
    this.clienteService.listarTodosClientes().subscribe((dados: ICliente[]) => {
      this.loading = false;
      this.clientes = dados;
    });
  }

  confirmar(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não conseguirá reverter!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.remover(id).subscribe(
          (result) => {
            Swal.fire('Deletado!', 'O cliente foi deletado.', 'success');
            this.listar();
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }
}
