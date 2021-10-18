import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IConta } from '../interfaces/conta';
import { IExtratoRequest } from '../interfaces/extrato';
import { IExtratoRetorno } from '../interfaces/extratoRetorno';
import { ISaqueDeposito } from '../interfaces/saque-deposito';
import { ITransferencia } from '../interfaces/transferencia';

@Injectable({
  providedIn: 'root'
})
export class ContasService {
  endpoint = "contas/";
  api = environment.api;
  constructor(private http: HttpClient) {}

  listarTodasContas(): Observable<IConta[]> {
    return this.http.get<IConta[]>(`${this.api}/${this.endpoint}`)
  }

  cadastrar(conta: IConta) {
    return this.http.post(`${this.api}/${this.endpoint}/`, conta);
  }

  buscarPorId(id: number) {
    return this.http.get<IConta>(`${this.api}/${this.endpoint}/${id}`)
  }

  depositar(deposito: ISaqueDeposito) {
    return this.http.post(`${this.api}/${this.endpoint}/deposito/`, deposito);
  }

  sacar(saque: ISaqueDeposito) {
    return this.http.post(`${this.api}/${this.endpoint}/saque/`, saque);
  }

  transferir(transferencia: ITransferencia) {
    return this.http.post(`${this.api}/${this.endpoint}/transferencia/`, transferencia);
  }

  getExtrato(extrato: IExtratoRequest): Observable<IExtratoRetorno[]> {
    return this.http.get<IExtratoRetorno[]>(`${this.api}/${this.endpoint}extrato-data/${extrato.dataInicio}%2000%3A00%3A00/${extrato.dataFim}%2023%3A00%3A00/${extrato.agencia}/${extrato.numeroConta}`);
  }
}
