package com.indracompany.treinamento.model.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OperacaoDTO {

    @JsonFormat(pattern="dd/MM/yyyy  HH:mm")
    private LocalDateTime dataHora;

    private char tpOperacao;

    private double valor;

    private String observacao;

}