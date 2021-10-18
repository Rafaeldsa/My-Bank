package com.indracompany.treinamento.model.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import com.indracompany.treinamento.model.dto.OperacaoDTO;
import com.indracompany.treinamento.model.entity.OperacaoConta;
import com.indracompany.treinamento.model.repository.OperacaoContaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.dto.ClienteDTO;
import com.indracompany.treinamento.model.dto.TransferenciaBancariaDTO;
import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.entity.ContaBancaria;
import com.indracompany.treinamento.model.repository.ContaBancariaRepository;

@Service
public class ContaBancariaService extends GenericCrudService<ContaBancaria, Long, ContaBancariaRepository>{

	@Autowired
	private ClienteService clienteService;
	
	@Autowired
	private ContaBancariaRepository contaBancariaRepository;

	@Autowired
	private OperacaoContaRepository operacaoContaRepository;

	
	public double consultarSaldo(String agencia, String numeroConta) {
		ContaBancaria c = this.consultarConta(agencia, numeroConta);
		return c.getSaldo();
	}
	
	public ContaBancaria consultarConta(String agencia, String numeroConta) {
		ContaBancaria c = contaBancariaRepository.findByAgenciaAndNumero(agencia, numeroConta);
		if (c == null) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CONTA_INVALIDA);
		}
		return c;
	}

	public List<ContaBancaria> obterContas(String cpf) {
		ClienteDTO dto = clienteService.buscarClientePorCpf(cpf);
		Cliente cliente = clienteService.buscar(dto.getId());
		List<ContaBancaria> contasDoCliente = contaBancariaRepository.findByCliente(cliente);
		return contasDoCliente;
	}
	
	public void depositar(String agencia, String numeroConta, double valor) {
		ContaBancaria conta = this.consultarConta(agencia, numeroConta);
		conta.setSaldo(conta.getSaldo() + valor);
		this.criaOperacao(conta, valor, 'C', "Dinheiro recebido.");
		super.salvar(conta);
	}
	
	public void sacar(String agencia, String numeroConta, double valor) {
		ContaBancaria conta = this.consultarConta(agencia, numeroConta);

		if (conta.getSaldo() < valor) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_SALDO_INEXISTENTE);
		}
		this.criaOperacao(conta, valor, 'D', "Débito feito.");
		conta.setSaldo(conta.getSaldo() - valor);
		super.salvar(conta);
	}

	@Transactional(rollbackOn = Exception.class)
	public void transferir(TransferenciaBancariaDTO dto) {
		if (dto.getAgenciaOrigem().equals(dto.getAgenciaDestino()) 
				&& dto.getNumeroContaOrigem().equals(dto.getNumeroContaDestino())) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CONTA_INVALIDA);
		}

		this.sacar(dto.getAgenciaOrigem(), dto.getNumeroContaOrigem(), dto.getValor());
		this.depositar(dto.getAgenciaDestino(),dto.getNumeroContaDestino(), dto.getValor());
	}


	public void criaOperacao(ContaBancaria conta, double valor, char tipo, String observacao) {
		OperacaoConta operacao = new OperacaoConta();

		LocalDateTime dataHora = LocalDateTime.now();

		operacao.setValor(valor);
		operacao.setTpOperacao(tipo);
		operacao.setDataHora(dataHora);
		operacao.setObservacao(observacao);
		operacao.setConta(conta);

		operacaoContaRepository.save(operacao);
	}

	public List<OperacaoDTO> getExtratoPorDataHora(String agencia, String numeroConta, String inicio, String fim) {

		ContaBancaria c = consultarConta(agencia, numeroConta);
		List<OperacaoConta> operacoes = operacaoContaRepository.findByConta(c);

		DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		LocalDateTime dataInicio = LocalDateTime.parse(inicio, format);
		LocalDateTime dataFim = LocalDateTime.parse(fim, format);

		if (operacoes == null || operacoes.isEmpty()) {
			throw new AplicacaoException(ExceptionValidacoes.ALERTA_NENHUM_REGISTRO_ENCONTRADO);
		}

		List<OperacaoDTO> retorno = new ArrayList<>();
		for (OperacaoConta op: operacoes) {
			if(op.getDataHora().isAfter(dataInicio) && op.getDataHora().isBefore(dataFim)) {
				OperacaoDTO dto = new OperacaoDTO();
				BeanUtils.copyProperties(op, dto);
				retorno.add(dto);
			}
		}
		return retorno;
	}
	
}
