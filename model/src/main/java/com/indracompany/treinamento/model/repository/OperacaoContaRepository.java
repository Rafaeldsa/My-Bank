package com.indracompany.treinamento.model.repository;


import com.indracompany.treinamento.model.entity.ContaBancaria;
import com.indracompany.treinamento.model.entity.OperacaoConta;

import java.util.List;

public interface OperacaoContaRepository extends GenericCrudRepository<OperacaoConta, Long>{

    List<OperacaoConta> findByConta(ContaBancaria conta);

}
