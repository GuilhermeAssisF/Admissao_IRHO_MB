$(document).ready(function () {
  var atividade = getWKNumState();

  // --- INÍCIO DA ALTERAÇÃO: LÓGICA DO BOTÃO DE ANEXO ---
  $("#btnIrParaAnexos").on("click", function (e) {
    e.preventDefault(); // Previne qualquer comportamento padrão do botão

    try {
      // Seletor mais robusto que busca diretamente pelo link da aba de anexos
      var $anexosTab = window.parent.$('a[href="#attachments"]');

      if ($anexosTab.length > 0) {
        // Encontrou pelo href, clica nele
        $anexosTab.click();
      } else {
        // Se falhar, tenta o método antigo por posição (fallback)
        window.parent.$("#workflowView-tab").find("li").eq(1).find("a").click();
      }
    } catch (err) {
      console.error("Erro ao tentar mudar para a aba Anexos:", err);
      alert("Não foi possível navegar para a aba 'Anexos'. Por favor, clique manualmente.");
    }
  });
  // --- FIM DA ALTERAÇÃO ---

  // --- INÍCIO: Lógica condicional novos campos ---

  // Função para UP Front
  function toggleUpFrontTipo() {
    if ($("#cpUpFront").val() == "sim") {
      $("#divUpFrontTipo").show();
    } else {
      $("#divUpFrontTipo").hide();
      // Limpa seleção apenas em modo de edição
      if (atividade == 0 || atividade == 1 || atividade == 41) {
        $("input[name='cpUpFrontTipo']").prop("checked", false);
      }
    }
  }

  // Função para Hiring Bonus
  function toggleHiringBonusTipo() {
    if ($("#cpHiringBonus").val() == "sim") {
      $("#divHiringBonusTipo").show();
    } else {
      $("#divHiringBonusTipo").hide();
      // Limpa seleção apenas em modo de edição
      if (atividade == 0 || atividade == 1 || atividade == 41) {
        $("input[name='cpHiringBonusTipo']").prop("checked", false);
      }
    }
  }

  // Função para Bonus
  function toggleBonusTipo() {
    var valor = $("#cpBonusValor").val();
    // Verifica se o valor não é vazio, 0,00 ou 0.00
    if (valor != "" && valor != "0,00" && valor != "0.00" && valor != null) {
      $("#divBonusTipo").show();
    } else {
      $("#divBonusTipo").hide();
      // Limpa seleção apenas em modo de edição
      if (atividade == 0 || atividade == 1 || atividade == 41) {
        $("input[name='cpBonusTipo']").prop("checked", false);
      }
    }
  }

  // Dispara as funções no carregamento da página (para modo de visão e edição)
  toggleUpFrontTipo();
  toggleHiringBonusTipo();
  toggleBonusTipo();

  // --- FIM: Lógica condicional novos campos ---

  // --- INÍCIO: Lógica de visualização de campos por Etapa ---
  if (atividade == 0 || atividade == 1 || atividade == 41) {

    // Oculta campos da seção "Dados do Colaborador"

    // Oculta "Está Recebendo Seguro Desemprego?"
    $("#TxtSegDesemprego").closest(".col-md-4").hide();

    // Oculta "Cor/Raça"
    $("#CORRACA").closest(".col-md-6").hide();

    // Oculta "Nacionalidade"
    $("#NACIONALIDADE").closest(".col-md-6").hide();

    // Oculta "Estado Natal"
    $("#ESTADO").closest(".col-md-6").hide();

    // Oculta "Naturalidade"
    $("#txtNaturalidade").closest(".col-md-6").hide();

    // Oculta "Sexo"
    $("#txtSexo").closest(".col-md-6").hide();

    // Oculta "Estado Civil"
    $("#txtEstadoCivil").closest(".col-md-6").hide();

    // Oculta "Escolaridade"
    $("#txtEscolaridade").closest(".col-md-6").hide();

    // Oculta "Tipo Sanguíneo"
    $("#TipoSanguineo").closest(".col-md-6").hide();

    // Oculta o painel inteiro de "Dependentes" e "Filiação"
    $('a[href="#dados_pessoais"]').closest('.panel.panel-default').hide();


    // Oculta o painel "Deficiências"
    $('h3.panel-title:contains("Deficiências")').closest('.panel.panel-default').hide();

    // Oculta o painel "Documentos"
    $('h3.panel-title:contains("Documentos")').closest('.panel.panel-default').hide();

    // Oculta o painel "Dados Bancários"
    $('h3.panel-title:contains("Dados Bancários")').closest('.panel.panel-default').hide();

    // Oculta o painel "Endereço"
    $('.fluigicon-home').closest('.panel.panel-default').hide();

    // --- Modificações no Painel "Contato" ---

    // 2. Marca "E-mail de Contato" como obrigatório (adiciona asterisco)
    var $labelEmail = $("#txtEmail").closest(".form-group").find("label");
    $labelEmail.html($labelEmail.html() + ' <span style="color:red;">*</span>');

    // --- Oculta campos da seção "Dados da Lotação" ---

    // Oculta "Fechamento da Vaga"
    $("#txtAdmissao").closest(".col-md-2").hide();

    // Oculta "Início das Atividades"
    $("#txtInicioAdmissao").closest(".col-md-2").hide();

    // Oculta "Fim Período de Experiência"
    $("#txtInicioExperiencia").closest(".col-md-2").hide();

    // Oculta "Sindicato"
    $("#Sind").closest(".col-md-6").hide();

    // Oculta "Índice do Horário de Trabalho"
    $("#TxtIndi").closest(".col-md-6").hide();

    // Oculta "Motivo de Admissão"
    $("#TxtMotADM").closest(".col-md-6").hide();

    // Oculta "Situação do FGTS"
    $("#TxtSitFGTS").closest(".col-md-6").hide();

    // Oculta "Banco de Pagamento FGTS"
    $("#BANCFGTS").closest(".col-md-6").hide();

    // Oculta "Vínculo da RAIS"
    $("#TxtVINCRais").closest(".col-md-6").hide();

    // Oculta "Situação da RAIS"
    $("#TxtSITRais").closest(".col-md-6").hide();

    // Oculta "Contribuição Sindical"
    $("#TxtContSind").closest(".col-md-6").hide();

    // Oculta o painel "Informe a chapa do Colaborador"
    $("#TxtChapa").closest('.panel.panel-default').hide();

    // Oculta o painel "Preenchimento da Área RH"
    // Selecionamos pelo ID de um campo interno, como 'txtNvHiera', para evitar
    // problemas com o acento no título do painel ('&Aacute;')
    $("#txtNvHiera").closest('.panel.panel-default').hide();

    // --- OCULTA ABA VALE TRANSPORTE NESSAS ETAPAS ---
    $('a[href="#dados_VT"]').parent('li').hide();

    // --- INÍCIO NOVAS ALTERAÇÕES: Oculta campos antigos de "Informações Gerais" ---
    $("#cpTpRecrutamento").closest(".row").hide(); // Oculta Tipo de Recrutamento e Contratação
    $("#ValeAlim").closest(".row").hide(); // Oculta Vale Alimentação, Cesta, VT (select) e Marca Ponto
    $("#Planodonto").closest(".row").hide(); // Oculta Plano Odonto, Saúde e Conta Salário
    $("#CatPonto").closest(".row").hide(); // Oculta Categoria Ponto e Substituição
    $("#AddInsul").closest(".row").hide(); // Oculta Insalubridade, Periculosidade e Gratificação
    $("#AuxMoradia").closest(".row").hide(); // Oculta Aux Moradia e Crédito Combustível
    // --- FIM NOVAS ALTERAÇÕES ---
  }
  // --- FIM: Lógica de visualização de campos por Etapa ---

  Compartilhados.expandePainel(atividade);
  Compartilhados.destacaAprovacoes();
  Compartilhados.destacaParecer();
  Compartilhados.camposObrigatorio();

  if (atividade !== 41 && $("#cpReaberturaChamado").val() == "") {
    $("#divReabertura").hide();
  }

  letras();
  Numeros();
  FormataData();

  if (atividade == "1" || atividade == "0" || atividade == "41") {

    // --- GATILHOS PARA NOVOS CAMPOS ---
    $("#cpUpFront").on("change", toggleUpFrontTipo);
    $("#cpHiringBonus").on("change", toggleHiringBonusTipo);
    // Usamos 'blur' para campos de valor, que é disparado quando o usuário sai do campo
    $("#cpBonusValor").on("blur", toggleBonusTipo);
    // --- FIM GATILHOS ---

    //data de nascimento dependente
    $(document).on("click", ".openPicker", function () {
      $(this).closest(".input-group").find("input").datepicker("show");
    });

    loadDatepicker("DataNascimentoDep", true);

    //add processos de pagamento
    $("#btnAddItem").click(function () {
      var index = wdkAddChild("tbItens");
      $("#cpQtdLinhas").val(index);
      //aviso das regras de RG
      FLUIGC.popover(".bs-docs-popover-hover", {
        trigger: "hover",
        placement: "auto",
      });

      createPickerDinamico("cpDataNascimentoDep___" + index, true);
    });

    $("#btnAddVT").click(function () {
      var indexRCM = wdkAddChild("tbVT");
      $("#cpQtdLinhasVt").val(indexRCM);
      //aviso das regras de RG
      FLUIGC.popover(".bs-docs-popover-hover", {
        trigger: "hover",
        placement: "auto",
      });

      $(".Numeros").keypress(function () {
        tecla = event.keyCode;
        if (tecla >= 48 && tecla <= 57) {
          return true;
        } else {
          return false;
        }
      });
      // Aplica a máscara APENAS nos campos da nova linha que foi adicionada
      // Usamos jQuery para segurança e a vírgula para manter consistência
      jQuery("#txtTarifa___" + indexRCM).maskMoney({ decimal: ",", thousands: "", precision: 2 });
      jQuery("#txtValorTotal___" + indexRCM).maskMoney({ decimal: ",", thousands: "", precision: 2 });

      $("#txtNumViagensVt___" + indexRCM).attr("readonly", true);
    });

    jQuery("input.telefone")
      .mask("(99) 9999-9999?9")
      .focusout(function (event) {
        var target, phone, element;
        target = event.currentTarget ? event.currentTarget : event.srcElement;
        phone = target.value.replace(/\D/g, "");
        element = $(target);
        element.unmask();
        if (phone.length > 10) {
          element.mask("(99) 99999-999?9");
        } else {
          element.mask("(99) 9999-9999?9");
        }
      });

    //add Dependente
    $(document).on("click", ".buscaDependente", function (ev) {
      var $row = $(ev.target).closest("tr"),
        campos = $row.find("input"),
        codParentesco = campos.get(2).id,
        txtParentescoDepen = campos.get(3).id;
      ZoomParentesco(codParentesco, txtParentescoDepen, $row);
    });

    $(document).on("click", ".buscaLinhaTarifa", function (ev) {
      var $row = $(ev.target).closest("tr"),
        campos = $row.find("input"),
        txtLinhaVt = campos.get(0).id,
        txtCodVt = campos.get(1).id,
        txtTarifa = campos.get(2).id,
        txtNumViagensVt = campos.get(3).id,
        txtValorTotal = campos.get(4).id;
      ZoomLinhaTarifa(
        txtLinhaVt,
        txtCodVt,
        txtTarifa,
        txtNumViagensVt,
        txtValorTotal,
        $row
      );
    });

    //estados
    $("#addEstadoNatal").click(function () {
      var a = this.id;
      var ZoomEstado = ZoomBuscaEstado(a);
      ZoomEstado.Abrir();
    });
    $("#addUfIdentidade").click(function () {
      var a = this.id;
      var ZoomEstado = ZoomBuscaEstado(a);
      ZoomEstado.Abrir();
    });
    $("#addUfTitulo").click(function () {
      var a = this.id;
      var ZoomEstado = ZoomBuscaEstado(a);
      ZoomEstado.Abrir();
    });
    $("#addUfCTPS").click(function () {
      var a = this.id;
      var ZoomEstado = ZoomBuscaEstado(a);
      ZoomEstado.Abrir();
    });
    $("#addEstadoCNH").click(function () {
      var a = this.id;
      var ZoomEstado = ZoomBuscaEstado(a);
      ZoomEstado.Abrir();
    });
    $("#addEstado").click(function () {
      var a = this.id;
      var ZoomEstado = ZoomBuscaEstado(a);
      ZoomEstado.Abrir();
    });
    ////municipio
    $("#addNaturalidade").click(function () {
      var a = this.id;
      var ZoomMunicipio = ZoomBuscaMunicipio(a);
      ZoomMunicipio.Abrir();
    });
    $("#addMunicipio").click(function () {
      var a = this.id;
      var ZoomMunicipio = ZoomBuscaMunicipio(a);
      ZoomMunicipio.Abrir();
    });
    //logradouro
    $("#addTipoLogradouro").click(function () {
      var ZoomLogradouro = ZoomBuscaLogradouro();
      ZoomLogradouro.Abrir();
    });
    //bairro
    $("#addTipoBairro").click(function () {
      var ZoomBairro = ZoomBuscaBairro();
      ZoomBairro.Abrir();
    });
    //nacionalidade
    $("#addNacionalidade").click(function () {
      var a = this.id;
      var ZoomPais = ZoomBuscaPais(a);
      ZoomPais.Abrir();
    });
    //pais
    $("#addPais").click(function () {
      var a = this.id;
      var ZoomPais = ZoomBuscaPais(a);
      ZoomPais.Abrir();
    });
    //secao
    $("#addSecao").click(function () {
      var ZoomSecao = ZoomBuscaSecao();
      ZoomSecao.Abrir();
    });
    //Estado Civil
    $("#addEstadoCivil").click(function () {
      var ZoomEstCivil = ZoomBuscaEstCivil();
      ZoomEstCivil.Abrir();
    });
    //Escolaridade
    $("#addEscolaridade").click(function () {
      var ZoomEscolaridade = ZoomBuscaEscolaridade();
      ZoomEscolaridade.Abrir();
    });
    //funcao
    $("#addFuncao").click(function () {
      var Coligada = $("#txtCodcoligada").val();
      if (Coligada != "") {
        var ZoomFuncoes = ZoomBuscaFuncoes();
        ZoomFuncoes.Abrir();
      } else {
        window.parent.FLUIGC.message.alert({
          message: "Antes de selecionar a função,preencha o departamento!",
          title: "Erro",
          label: "Ok",
        });
      }
    });
    //Banco
    $("#addBanco").click(function () {
      var a = this.id;
      var ZoomBanco = ZoomBuscaBanco(a);
      ZoomBanco.Abrir();
    });
    //Banco FGTS
    $("#addBancoFGTS").click(function () {
      var a = this.id;
      var ZoomBanco = ZoomBuscaBanco(a);
      ZoomBanco.Abrir();
    });
    //agencia
    $("#addAgencia").click(function () {
      var ZoomAgencia = ZoomBuscaAgencia();
      ZoomAgencia.Abrir();
    });
    //sindicato
    $("#addSindicato").click(function () {
      var Coligada = $("#txtCodcoligada").val();
      if (Coligada != "") {
        var ZoomSindicato = ZoomBuscaSindicato();
        ZoomSindicato.Abrir();
      } else {
        window.parent.FLUIGC.message.alert({
          message: "Antes de selecionar o sindicato,preencha o departamento!",
          title: "Erro",
          label: "Ok",
        });
      }
    });
    //Horario
    $("#addHorario").click(function () {
      var Coligada = $("#txtCodcoligada").val();
      if (Coligada != "") {
        var ZoomHorario = ZoomBuscaHorario();
        ZoomHorario.Abrir();
      } else {
        window.parent.FLUIGC.message.alert({
          message: "Antes de selecionar o horario,preencha o departamento!",
          title: "Erro",
          label: "Ok",
        });
      }
    });
    //Ind Horario
    $("#addIndHorario").click(function () {
      var Coligada = $("#txtCodcoligada").val();
      if (Coligada != "") {
        var ZoomIndHor = ZoomBuscaIndHor();
        ZoomIndHor.Abrir();
      } else {
        window.parent.FLUIGC.message.alert({
          message: "Antes de selecionar o indice,preencha o departamento!",
          title: "Erro",
          label: "Ok",
        });
      }
    });
    //Sit Rais
    $("#addSitRAIS").click(function () {
      var ZoomSitRais = ZoomBuscaSitRais();
      ZoomSitRais.Abrir();
    });
    //Vinc Rais
    $("#addVincRais").click(function () {
      var ZoomVinRais = ZoomBuscaVinRais();
      ZoomVinRais.Abrir();
    });
    //TIPO ADMISSAO
    $("#addTPADM").click(function () {
      var ZoomTPTAdmissao = ZoomBuscaTPTAdmissao();
      ZoomTPTAdmissao.Abrir();
    });
    //TIPO Sanguineo
    $("#addTipoSanguineo").click(function () {
      var ZoomTPSangue = ZoomBuscaTPSangue();
      ZoomTPSangue.Abrir();
    });
    //Plano Odontologico
    $("#addPlanoOdonto").click(function () {
      var ZoomPlanOdonto = ZoomBuscaPlanOdonto();
      ZoomPlanOdonto.Abrir();
    });
    //Plano Saude
    $("#addPlanoSaude").click(function () {
      var ZoomPlanoSaude = ZoomBuscaPlanoSaude();
      ZoomPlanoSaude.Abrir();
    });
    //motivo adm
    $("#addMOTADM").click(function () {
      var Coligada = $("#txtCodcoligada").val();
      if (Coligada != "") {
        var ZoomMTAdmissao = ZoomBuscaMTAdmissao();
        ZoomMTAdmissao.Abrir();
      } else {
        window.parent.FLUIGC.message.alert({
          message: "Antes de selecionar o motivo,preencha o departamento!",
          title: "Erro",
          label: "Ok",
        });
      }
    });
  }

  if (atividade == "1" || atividade == "0" || atividade == "41") {
    //money
    jQuery(".money").maskMoney({ decimal: ",", thousands: "", precision: 2 });

    $(".Jornada").mask("999:99");

    if (!$("#TxtSitFGTS").val()) {
      $("#TxtSitFGTS").val("1");
    }

    ContrSindical();
    criaDatepickers();

    //BUSCA DATA CNH
    $("#buscarDataCNH").click(function () {
      $("#DTVENCHABILIT").datepicker("show");
    });
    //DATA EMISSAO CNH
    $("#buscarEmissaoCNH").click(function () {
      $("#DTEMISSAOCNH").datepicker("show");
    });
    //DATA PRIMEIRA CNH
    $("#buscarPrimCNH").click(function () {
      $("#DTEmPrimCNH").datepicker("show");
    });
    //DATA CERT RESERVISTA
    $("#buscarCertReser").click(function () {
      $("#DtCERTIFRESERV").datepicker("show");
    });

    //-------
    //BUSCA DATA EMISSAO RIC
    $("#buscarEmRic").click(function () {
      $("#DtEmRIC").datepicker("show");
    });
    //DATA CHEGADA AO BRASIL
    $("#buscarChegBrasil").click(function () {
      $("#DtChegBras").datepicker("show");
    });
    //DATA RNE
    $("#buscarDtRNE").click(function () {
      $("#DTRNE").datepicker("show");
    });

    //BUSCA DATA EMISSAO RIC
    $("#buscarDtCart").click(function () {
      $("#dtDataEmissaoCartTrab").datepicker("show");
    });
    //DATA CHEGADA AO BRASIL
    $("#buscarDtTitul").click(function () {
      $("#DTTITELEITOR").datepicker("show");
    });
    //DATA RNE
    $("#buscarIdent").click(function () {
      $("#DTEMISSAOIDENT").datepicker("show");
    });
    //BUSCA DATA EMISSAO RIC
    $("#buscarNasc").click(function () {
      $("#dtDataNascColaborador").datepicker("show");
    });
    //DATA CHEGADA AO BRASIL
    $("#buscarAdmissao").click(function () {
      $("#txtAdmissao").datepicker("show");
    });
    //DATA EMISSAO TITULO
    $("#buscarDTTITULO").click(function () {
      $("#DTTITELEITOR").datepicker("show");
    });
    //DATA EMISSAO IDENTIDADE
    $("#buscariDENTIDADE").click(function () {
      $("#DTEMISSAOIDENT").datepicker("show");
    });
    //DATA DE NASCIMENTO
    $("#buscaDtNascim").click(function () {
      $("#dtDataNascColaborador").datepicker("show");
    });
    //DATA EMISSAO CART TRAB
    $("#buscarEmCartTrab").click(function () {
      $("#dtDataEmissaoCartTrab").datepicker("show");
    });
    //INICIO DE TRAB
    $("#buscarInicioAdm").click(function () {
      $("#txtInicioAdmissao").datepicker("show");
    });
    //DATA
    $("#BuscaDtRH").click(function () {
      $("#txtDataRH").datepicker("show");
    });
    //filiacao mae
    $("#buscaDtNascim2").click(function () {
      $("#txtDtNascDepen2").datepicker("show");
    });
    //filiacao pai
    $("#buscaDtNascim3").click(function () {
      $("#txtDtNascDepen3").datepicker("show");
    });
    //VALIDACPF
    $("#cpfcnpj").change(function () {
      CarregaCPF();
    });
    //Fim Experiência
    $("#buscarExperiencia").click(function () {
      $("#txtInicioExperiencia").datepicker("show");
    });
  }

});

var createPickerDinamico = function (elementId, isVencimento) {
  var options = {
    showOn: "button",
    changeMonth: true,
    changeYear: true,
  };

  if (isVencimento) {
    options.onSelect = function (selectedDate) {
      $(document).trigger("vencimentoSelecionado", selectedDate);
    };
  }

  $("#" + elementId).datepicker(options);
};

var loadDatepicker = function (className, isVencimento) {
  $("." + className).each(function () {
    if (this.id.indexOf("___") > -1) {
      createPickerDinamico(this.id, isVencimento);
    }
  });
};

var criaDatepickers = function () {
  $("#txtInicioExperiencia").datepicker({
    showOn: "button",
    showButtonPanel: "true",
    changeMonth: "true",
    changeYear: "true",
    showOtherMonths: "true",
    selectOtherMonths: "true",
    onSelect: function () {
      $(document).trigger("dataSelecionada");
    },
    minDate: 0,
  });

  $("#txtDataRH").datepicker({
    showOn: "button",
    showButtonPanel: "true",
    changeMonth: "true",
    changeYear: "true",
    showOtherMonths: "true",
    selectOtherMonths: "true",
    onSelect: function () {
      $(document).trigger("dataSelecionada");
    },
    minDate: 0,
  });

  $("#txtInicioAdmissao").datepicker({
    showOn: "button",
    showButtonPanel: "true",
    changeMonth: "true",
    changeYear: "true",
    showOtherMonths: "true",
    selectOtherMonths: "true",
    onSelect: function () {
      $(document).trigger("dataSelecionada");
    },
    minDate: 0,
  });

  $("#dtDataEmissaoCartTrab").datepicker({
    showOn: "button",
    showButtonPanel: "true",
    changeMonth: "true",
    changeYear: "true",
    showOtherMonths: "true",
    selectOtherMonths: "true",
    onSelect: function () {
      $(document).trigger("dataSelecionada");
    },
    maxDate: 0,
  });

  $("#DTVENCHABILIT").datepicker({
    showOn: "button",
    showButtonPanel: "true",
    changeMonth: "true",
    changeYear: "true",
    showOtherMonths: "true",
    selectOtherMonths: "true",
    onSelect: function () {
      $(document).trigger("dataSelecionada");
    },
  });

  $("#DTEMISSAOCNH").datepicker({
    showOn: "button",
    showButtonPanel: "true",
    changeMonth: "true",
    changeYear: "true",
    showOtherMonths: "true",
    selectOtherMonths: "true",
    onSelect: function () {
      $(document).trigger("dataSelecionada");
    },
    maxDate: 0,
  });

  $("#DTTITELEITOR").datepicker({
    showOn: "button",
    showButtonPanel: "true",
    changeMonth: "true",
    changeYear: "true",
    showOtherMonths: "true",
    selectOtherMonths: "true",
    onSelect: function () {
      $(document).trigger("dataSelecionada");
    },
    maxDate: 0,
  });

  $("#DTEmPrimCNH").datepicker({
    showOn: "button",
    showButtonPanel: "true",
    changeMonth: "true",
    changeYear: "true",
    showOtherMonths: "true",
    selectOtherMonths: "true",
    onSelect: function () {
      $(document).trigger("dataSelecionada");
    },
    maxDate: 0,
  });

  $("#DtCERTIFRESERV").datepicker({
    showOn: "button",
    showButtonPanel: "true",
    changeMonth: "true",
    changeYear: "true",
    showOtherMonths: "true",
    selectOtherMonths: "true",
    onSelect: function () {
      $(document).trigger("dataSelecionada");
    },
    maxDate: 0,
  });

  $("#DtEmRIC").datepicker({
    showOn: "button",
    showButtonPanel: "true",
    changeMonth: "true",
    changeYear: "true",
    showOtherMonths: "true",
    selectOtherMonths: "true",
    onSelect: function () {
      $(document).trigger("dataSelecionada");
    },
    maxDate: 0,
  });

  $("#DtChegBras").datepicker({
    showOn: "button",
    showButtonPanel: "true",
    changeMonth: "true",
    changeYear: "true",
    showOtherMonths: "true",
    selectOtherMonths: "true",
    onSelect: function () {
      $(document).trigger("dataSelecionada");
    },
    maxDate: 0,
  });

  $("#DTRNE").datepicker({
    showOn: "button",
    showButtonPanel: "true",
    changeMonth: "true",
    changeYear: "true",
    showOtherMonths: "true",
    selectOtherMonths: "true",
    onSelect: function () {
      $(document).trigger("dataSelecionada");
    },
    maxDate: 0,
  });

  $("#dtDataEmissaoCartTrab").datepicker({
    showOn: "button",
    showButtonPanel: "true",
    changeMonth: "true",
    changeYear: "true",
    showOtherMonths: "true",
    selectOtherMonths: "true",
    onSelect: function () {
      $(document).trigger("dataSelecionada");
    },
    maxDate: 0,
  });

  $("#DTTITELEITOR").datepicker({
    showOn: "button",
    showButtonPanel: "true",
    changeMonth: "true",
    changeYear: "true",
    showOtherMonths: "true",
    selectOtherMonths: "true",
    onSelect: function () {
      $(document).trigger("dataSelecionada");
    },
    maxDate: 0,
  });

  $("#DTEMISSAOIDENT").datepicker({
    showOn: "button",
    showButtonPanel: "true",
    changeMonth: "true",
    changeYear: "true",
    showOtherMonths: "true",
    selectOtherMonths: "true",
    onSelect: function () {
      $(document).trigger("dataSelecionada");
    },
    maxDate: 0,
  });

  $("#dtDataNascColaborador").datepicker({
    showOn: "button",
    showButtonPanel: "true",
    changeMonth: "true",
    changeYear: "true",
    showOtherMonths: "true",
    selectOtherMonths: "true",
    onSelect: function () {
      $(document).trigger("dataSelecionada");
    },
    maxDate: 0,
  });

  $("#txtDtNascDepen2").datepicker({
    showOn: "button",
    showButtonPanel: "true",
    changeMonth: "true",
    changeYear: "true",
    showOtherMonths: "true",
    selectOtherMonths: "true",
    onSelect: function () {
      $(document).trigger("dataSelecionada");
    },
    maxDate: 0,
  });

  $("#txtDtNascDepen3").datepicker({
    showOn: "button",
    showButtonPanel: "true",
    changeMonth: "true",
    changeYear: "true",
    showOtherMonths: "true",
    selectOtherMonths: "true",
    onSelect: function () {
      $(document).trigger("dataSelecionada");
    },
    maxDate: 0,
  });

  $("#txtAdmissao").datepicker({
    showOn: "button",
    showButtonPanel: "true",
    changeMonth: "true",
    changeYear: "true",
    showOtherMonths: "true",
    selectOtherMonths: "true",
    onSelect: function () {
      $(document).trigger("dataSelecionada");
    },
  });
};

var Conta = function (indice) {
  var a = indice.name;
  a = a.replace("txtNumViagensVt___", "").replace("txtTarifa___", "");
  var v = "#" + "txtTarifa___" + a;
  var valor = $(v).val();
  var vi = "#" + "txtNumViagensVt___" + a;
  var viagens = $(vi).val();

  $("#txtValorTotal___" + a).val(calcula(valor, viagens));
};
var calcula = function (valor, viagens) {
  if (valor == "") valor = 0;
  if (viagens == "") viagens = 0;
  var resulta = valor * viagens;
  return resulta;
};

//somente letras
function letras() {
  $(".nome").keypress(function () {
    tecla = event.keyCode;
    if (tecla >= 48 && tecla <= 57) {
      return false;
    } else {
      return true;
    }
  });
}

//somente Numeros
function Numeros() {
  $(".Numeros").keypress(function () {
    tecla = event.keyCode;
    if (tecla >= 48 && tecla <= 57) {
      return true;
    } else {
      return false;
    }
  });
}

function FormataData() {
  $(".cpData").datepicker({
    inline: true,
    dateFormat: "dd/mm/yy",
    dayNames: [
      "Domingo",
      "Segunda",
      "Ter\u00E7a",
      "Quarta",
      "Quinta",
      "Sexta",
      "S\u00E1bado",
      "Domingo",
    ],
    dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S", "D"],
    dayNamesShort: [
      "Dom",
      "Seg",
      "Ter",
      "Qua",
      "Qui",
      "Sex",
      "S\u00E1b",
      "Dom",
    ],
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Mar\u00E7o",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    monthNamesShort: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    changeYear: true,
    changeMonth: true,
    yearRange: "c-100:c+10",
    maxDate: 0,
  });
}

//VALIDACAO DE CPF
function validar(obj) {
  // recebe um objeto
  var s = obj.value.replace(/\D/g, "");
  var tam = s.length;

  // se for CPF
  if (tam < 12) {
    if (!validaCPF(s) && $("#cpfcnpj").val().trim() != "") {
      alert("'" + s + "' N\u00e3o \u00e9 um CPF v\u00e1lido!");
      $("#cpfcnpj").val("");
      obj.select(); // se quiser selecionar o campo em quest?o
      return false;
    }
  }

  // DEFININDO AS REGRAS DE VALIDACAO DO CPF
  function validaCPF(s) {
    if (
      s == "11111111111" ||
      s == "22222222222" ||
      s == "33333333333" ||
      s == "44444444444" ||
      s == "55555555555" ||
      s == "66666666666" ||
      s == "77777777777" ||
      s == "88888888888" ||
      s == "99999999999" ||
      s == "00000000000"
    ) {
      return false;
    }
    var c = s.substr(0, 9);
    var dv = s.substr(9, 2);
    var d1 = 0;
    for (var i = 0; i < 9; i++) {
      d1 += c.charAt(i) * (10 - i);
    }
    if (d1 == 0) return false;
    d1 = 11 - (d1 % 11);
    if (d1 > 9) d1 = 0;
    if (dv.charAt(0) != d1) {
      return false;
    }
    d1 *= 2;
    for (var i = 0; i < 9; i++) {
      d1 += c.charAt(i) * (11 - i);
    }
    d1 = 11 - (d1 % 11);
    if (d1 > 9) d1 = 0;
    if (dv.charAt(1) != d1) {
      return false;
    }
    return true;
  }
}

function PegaValorData() {
  var DtNasc = $("#dtDataNascColaborador").val();
  $("#dtDataNascColaboradorValue").val(DtNasc);
}

var formatarData = function (data) {
  if (data == "" || data == null) {
    return "";
  }
  if (data.indexOf("T") > -1) {
    data = data.substr(0, data.indexOf("T"));
  }
  var arrData = data.split("-");
  // Verifica se a data já não está no formato correto (evita erro de split)
  if (arrData.length === 1 && data.indexOf("/") > -1) {
    return data;
  }
  return arrData[2] + "/" + arrData[1] + "/" + arrData[0];
};

/**
 * Função Auxiliar para desbloquear campos de endereço após a consulta
 */
function desbloquearCamposEndereco() {
  // Adapte para os campos de endereço do seu formulário 14154
  $("#txtRUA").prop("readonly", false);
  $("#txtBAIRRO").prop("readonly", false);
  $("#txtNUMERO").prop("readonly", false);
  $("#txtCOMPLEMENTO").prop("readonly", false);
}

/**
 * Função "Coordenadora": Busca os dados completos na folha de pagamento
 */
var consultaFuncionario = function (cpf) {
  var myLoading = FLUIGC.loading(window, {
    textMessage: 'Aguarde, procurando informações'
  });
  myLoading.show();

  setTimeout(function () {
    // Adaptado para usar a coligada do seu formulário 14154
    var empresa = $("#cpSolicitanteColigada").val(); //
    var filial = ""; // Deixe em branco ou remova a constraint c2 se não for usar

    // D. Cria as "constraints" (filtros) para o dataset principal
    var c1 = DatasetFactory.createConstraint("id_empresa", empresa, empresa, ConstraintType.MUST);
    // var c2 = DatasetFactory.createConstraint("id_filial", filial, filial, ConstraintType.MUST); // Remova se a filial não for necessária
    var c3 = DatasetFactory.createConstraint("cpf", cpf, cpf, ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint("matricula", "todasEmpresasFiliais", "todasEmpresasFiliais", ConstraintType.MUST);

    // Ajuste a lista de constraints (removi c2, adicione se precisar)
    var constraints = [c1, c3, c4];

    var dsConsultaFuncionario = DatasetFactory.getDataset("ds_dpf_ad_consultaFuncionario", null, constraints, null);

    // --- INÍCIO DA LÓGICA CORRIGIDA ---
    if (dsConsultaFuncionario != null && dsConsultaFuncionario.values && dsConsultaFuncionario.values.length > 0) {
      var error = dsConsultaFuncionario.values[0].ERROR;

      if (error != null && error != "") {
        // Se o erro for "CPF não encontrado", trata como sucesso e busca na Serpro
        if (error == "CPF não encontrado na base") {
          FLUIGC.toast({ title: 'Atenção:', message: 'CPF não encontrado na folha. Buscando em dados externos...', type: 'info' });
          PessoaJaExiste(cpf);
        } else {
          // Se for qualquer outro erro, exibe o erro
          FLUIGC.toast({ title: 'Erro: ', message: error, type: 'warning' });
        }
        // VERIFICA SE O NOME VEIO VAZIO DA CONSULTA INTERNA
      } else if (dsConsultaFuncionario.values[0].FUN_NOME == null || dsConsultaFuncionario.values[0].FUN_NOME == "") {
        // Se o nome está vazio, a consulta interna não foi boa o suficiente.
        // Vamos forçar a busca externa (Serpro)
        FLUIGC.toast({ title: 'Atenção:', message: 'CPF encontrado, mas incompleto. Buscando dados externos...', type: 'info' });
        PessoaJaExiste(cpf);

      } else {
        // A consulta interna foi um sucesso E o nome veio preenchido.
        FLUIGC.toast({ title: 'Atenção: ', message: 'Consulta concluida com sucesso', type: 'success' });
        // Chama a função "Trabalhadora" para preencher os campos
        preencherInfoFuncionario(dsConsultaFuncionario.values[0]);
      }
    } else {
      // dsConsultaFuncionario era null OU .values não existia OU .values.length era 0.
      // NENHUM DADO ENCONTRADO NA BASE INTERNA (Folha de Pagamento).
      // VAMOS TENTAR A BUSCA EXTERNA (API)
      FLUIGC.toast({ title: 'Atenção:', message: 'CPF não encontrado na folha. Buscando em dados externos...', type: 'info' });

      // Chama a função que busca na API
      PessoaJaExiste(cpf);
    }
    // --- FIM DA LÓGICA CORRIGIDA ---

    myLoading.hide();
  }, 300);
};

/**
 * Função "Trabalhadora": Preenche os campos no formulário 14154
 * Esta é a versão ATUALIZADA E CORRIGIDA com o mapeamento "DE-PARA" completo.
 */
var preencherInfoFuncionario = function (info) {

  desbloquearCamposEndereco();

  // --- Início do Mapeamento (DE-PARA) ---
  // Sintaxe: $("#ID_DO_SEU_FORMULÁRIO_NOVO").val( info['NOME_DA_COLUNA_DO_DATASET_ORIGINAL'] );

  // Dados Pessoais
  $("#txtNomeColaborador").val(info['FUN_NOME']);
  $("#dtDataNascColaborador").val(formatarData(info['FUN_NASCIMENTO']));
  $("#CORRACA").val(info['FUN_RACACOR']);
  $("#NACIONALIDADECod").val(info['FUN_NACIONALIDADE']);
  $("#NACIONALIDADE").val(info['FUN_NACIONALIDADE_DESC_AD']); // Campo Descrição
  $("#ESTADONatalCod").val(info['FUN_UFNASCIMENTO']); // No form 1007 é FUN_NATURALIDADE
  $("#ESTADO").val(info['FUN_NATURALIDADE_DESC_AD']); // Campo Descrição
  $("#txtNaturalidadeCod").val(info['FUN_CODMUNASC']);
  $("#txtNaturalidade").val(info['FUN_CODMUNASC_DESC_AD']); // Campo Descrição
  $("#txtSexo").val(info['FUN_SEXO']);
  $("#txtEstCivilCod").val(info['FUN_ESTADOCIV']);
  $("#txtEstadoCivil").val(info['FUN_ESTADOCIV_DESC_AD']); // Campo Descrição
  $("#GRAUINSTRUCAOCod").val(info['FUN_CODGINRAI']);
  $("#txtEscolaridade").val(info['FUN_CODGINRAI_DESC_AD']); // Campo Descrição
  $("#TipoSanguineo").val(info['FUN_TIPOSANG']);

  // Filiação (Campos do formulário 14154 estão na aba Dependentes)
  $("#txtNomDepen2").val(info['FUN_MNOME']); // Campo "Nome Mãe"
  $("#txtNomDepen3").val(info['FUN_PNOME']); // Campo "Nome Pai"

  // Deficiências
  $("#DEFICIENTEFISICO").val(info['FUN_DEFICIENTEFISICO']);
  $("#DEFICIENTEAUDITIVO").val(info['FUN_DEFICIENTEAUDITIVO']);
  $("#DEFICIENTEFALA").val(info['FUN_DEFICIENTEFALA']);
  $("#DEFICIENTEVISUAL").val(info['FUN_DEFICIENTEVISUAL']);
  $("#DEFICIENTEMENTAL").val(info['FUN_DEFICIENTEMENTAL']);
  $("#DEFICIENTEINTELECTUAL").val(info['FUN_DEFICIENTEINTELECTUAL']);

  // Documentos
  $("#TxtRg").val(info['FUN_RG']);
  $("#CODUFCARTIDENTIDADE").val(info['FUN_RGUF']); // Setando o CÓDIGO
  $("#UFCARTIDENTIDADE").val(info['FUN_RGUF']); // Setando a DESCRIÇÃO (que no 1007 é o mesmo valor)
  $("#ORGAOCARTIDENTIDADE").val(info['FUN_RGORG']);
  $("#DTEMISSAOIDENT").val(formatarData(info['FUN_DTRG']));
  $("#TITULOELEITOR").val(info['FUN_TITULOELEITOR']);
  $("#ZONATITELEITOR").val(info['FUN_TITULOELEITOR_ZONA']);
  $("#DTTITELEITOR").val(formatarData(info['FUN_DTTITELEITOR']));
  $("#SECAOTITELEITOR").val(info['FUN_TITULOELEITOR_SECAO']);
  $("#CODUFTITULO").val(info['FUN_ESTELEIT']);
  $("#UFTITULO").val(info['FUN_ESTELEIT']); // Assumindo que o código é a própria UF
  $("#txtCartTrab").val(info['FUN_CARTEIRAPROF']);
  $("#txtSerieCart").val(info['FUN_SERCART']);
  $("#dtDataEmissaoCartTrab").val(formatarData(info['FUN_DTCARTTRAB']));
  $("#CODUFCTPS").val(info['FUN_UFCP']);
  $("#UFCARTTRAB").val(info['FUN_UFCP']); // Assumindo que o código é a própria UF
  $("#CARTMOTORISTA").val(info['FUN_HABILIT']);
  $("#TIPOCARTHABILIT").val(info['FUN_CNHCAT']);
  $("#DTVENCHABILIT").val(formatarData(info['FUN_DTCNHVALID']));
  $("#ORGEMISSORCNH").val(info['FUN_CNHORG']);
  $("#DTEmPrimCNH").val(formatarData(info['FUN_DATAPRIMEIRACNH']));
  $("#CodUFCNH").val(info['FUN_UFCNH']);
  $("#UFCNH").val(info['FUN_UFCNH']); // Assumindo que o código é a própria UF
  $("#PIS").val(info['FUN_PIS']);
  $("#CERTIFRESERV").val(info['FUN_NR_CART_RESERVISTA']);
  $("#DtCERTIFRESERV").val(formatarData(info['DtCERTIFRESERV'])); // Coluna não mapeada, verifique o nome no dataset

  // Endereço
  $("#txtCEP").val(info['FUN_CEP']);
  $("#txtCODTIPORUA").val(info['FUN_TPLOGRADOURO']);
  $("#txtNOMETIPORUA").val(info['FUN_TPLOGRADOURO_DESC_AD']); // Campo Descrição
  $("#txtRUA").val(info['FUN_LOGRADOURODESC']);
  $("#txtNUMERO").val(info['FUN_NUMLOGRADOURO']);
  $("#txtCOMPLEMENTO").val(info['FUN_ENDERECOM']);
  $("#txtBAIRRO").val(info['FUN_BAIRRO']);
  $("#txtCODETD").val(info['FUN_UF']);
  $("#txtNOMECODETD").val(info['FUN_UF']); // Assumindo que o código é a própria UF
  $("#txtCODMUNICIPIO").val(info['FUN_CODIBGE']);
  $("#txtNOMEMUNICIPIO").val(info['FUN_CODIBGE_DESC_AD']); // Campo Descrição
  $("#txtCODPAIS").val(info['FUN_PAIS_ENDERECO']);
  $("#txtPAIS").val(info['FUN_PAIS_ENDERECO_DESC']); // Campo Descrição

  // Contato
  $("#txtTELEFONE").val(info['FUN_TELEFONE']);
  $("#txtCELULAR").val(info['FUN_CELULAR']);
  $("#txtEmail").val(info['FUN_EMAIL']);

  // ** Lógica que faltava do 14154 **
  // Esta função é do seu view.js original, vamos chamá-la.
  VerificaFuncAtivo();
};

/**
 * SUBSTITUIÇÃO DA "PessoaJaExiste"
 * Esta função agora replica a lógica do "getCPF" do processo 1007,
 * consultando o dataset 'ds_dpf_ad_cpf_serpro' (API Externa).
 */
function PessoaJaExiste(cpf) { // Recebe 'cpf' como parâmetro

  // Limpa os campos antes de tentar preencher
  $("#txtNomeColaborador").val("");
  $("#dtDataNascColaborador").val("");

  // Constraints para o 'ds_dpf_ad_cpf_serpro' (baseado no form 1007)
  var c1 = DatasetFactory.createConstraint('cpf', cpf, cpf, ConstraintType.MUST);

  // Tenta obter o número da solicitação para a constraint 'solicitacao'
  var idProcessoFluig = $("#cpNumeroSolicitacao").val();
  if (idProcessoFluig == null || idProcessoFluig == "") {
    // Se ainda não foi salvo (está no início), tenta pegar o WKNumProces
    if (typeof getValue == 'function' && getValue("WKNumProces") > 0) {
      idProcessoFluig = getValue("WKNumProces");
    } else {
      idProcessoFluig = ""; // Envia vazio se não tiver
    }
  }

  var c2 = DatasetFactory.createConstraint('solicitacao', idProcessoFluig, idProcessoFluig, ConstraintType.MUST);
  var c3 = DatasetFactory.createConstraint('tipo', "F", "F", ConstraintType.MUST); // 'F' de Funcionário
  var constraints = [c1, c2, c3];

  try {
    var dsFUN_CPF = DatasetFactory.getDataset("ds_dpf_ad_cpf_serpro", null, constraints, null);

    if (dsFUN_CPF == null || !dsFUN_CPF.values || dsFUN_CPF.values.length == 0) { // Já corrigido
      FLUIGC.toast({ title: 'Atenção:', message: 'CPF não encontrado em nenhuma base de dados.', type: 'warning' });
      jQuery("#txtNomeColaborador").prop("readonly", false); // <-- Mudança aqui
      jQuery("#dtDataNascColaborador").prop("readonly", false); // <-- Mudança aqui
      jQuery("#txtNomeColaborador").focus(); // <-- Mudança aqui
      return;
    }

    // Processa o retorno
    for (var i = 0; i < dsFUN_CPF.values.length; i++) {
      if (dsFUN_CPF.values[i].response_code == "200") {
        if (dsFUN_CPF.values[i].nome_completo != "") {
          var nome = dsFUN_CPF.values[i].nome_completo;
          var dataNascimento = dsFUN_CPF.values[i].dt_nascimento;

          // ESTA É A LINHA DO ERRO, AGORA CORRIGIDA
          jQuery("#txtNomeColaborador").val(nome); // <-- Mudança aqui
          jQuery("#dtDataNascColaborador").val(dataNascimento); // <-- Mudança aqui

          jQuery("#txtNomeColaborador").prop("readonly", true); // <-- Mudança aqui
          jQuery("#dtDataNascColaborador").prop("readonly", true); // <-- Mudança aqui

        } else {
          // ... (resto do código)
        }
      } else if (dsFUN_CPF.values[i].response_code == "422" || dsFUN_CPF.values[i].response_code == "503" || dsFUN_CPF.values[i].response_code == "500") {
        jQuery("#txtNomeColaborador").val(""); // <-- Mudança aqui
        jQuery("#dtDataNascColaborador").val(""); // <-- Mudança aqui
        jQuery("#txtNomeColaborador").prop("readonly", false); // <-- Mudança aqui
        jQuery("#dtDataNascColaborador").prop("readonly", false); // <-- Mudança aqui
        jQuery("#txtNomeColaborador").focus(); // <-- Mudança aqui
        // ... (resto do código)
      } else {
        // ... (resto do código)
      }
    }
  } catch (erro) {
    window.alert("Erro ao consultar o dataset ds_dpf_ad_cpf_serpro: " + erro.message);
  }
}

function CarregaCPF() {
  var CPF = jQuery("#cpfcnpj").val(); // <-- Mudança aqui

  CPF = CPF.replace(/\./g, "").replace(/\-/g, "").trim();

  jQuery("#cpfcnpjValue").val(CPF); // <-- Mudança aqui

  // Nova chamada para a busca completa
  if (CPF.length === 11) {
    consultaFuncionario(CPF);
  }
}

//verifica se o funcionário já está ativo na base pelo CPF
var formateData = function (Data) {
  Data = Data.value.split("/");

  Valor = Data[1] + "/" + Data[0] + "/" + Data[2];
  $("#" + "" + Data.name + "").val(Valor);
};
function VerificaFuncAtivo() {
  var verifica = $("#txtFuncAtivo").val();
  var CodigoPessoaAdm = $("#txtCodigoPessoaAdm").val();

  if (verifica == "FUNC_ATIVO" && CodigoPessoaAdm != "") {
    alert(
      "Existem funcionários ativos utilizando o CPF informado, gentileza verificar."
    );

    $("#cpfcnpj").val("");
  }
}

//VERIFICA CHAPA JA EXISTENTE
function VerificaChapa() {
  var CHAPA = document.getElementById("TxtChapa").value;

  var fields = new Array(CHAPA);

  var CODIGO = 0;

  try {
    var tabela = DatasetFactory.getDataset(
      "ds_verificaChapa",
      fields,
      null,
      null
    );

    if (tabela == null) {
      //throw "N&atilde;o Foram encontrados registros!";
    } else if (tabela.values.length == "0") {
      //throw "N&atilde;o Foram encontrados registros.";
    }

    for (var i = 0; i < tabela.values.length; i++) {
      CODIGO = tabela.values[i].CODIGO.toString();

      document.getElementById("txtChapaJaExiste").value = CODIGO;
      //1 NAO EXISTE 2 EXISTE
    }
  } catch (erro) {
    window.alert(erro);
  }

  //return DIAS;
  return 0;
}

function ContrSindical() {
  var cont = $("#TxtContSind").val();
  if (cont == "J") {
    $(".contrsind").show();
  } else {
    $(".contrsind").hide();
  }
}

//mask celular
function MascaraCelular() {
  var Cel = $("#txtCELULAR").val();
  var qtd = Cel.length;
  $("#txtCELULAR").mask("(99) 99999-9999");
}
//mask tel
function MascaraTelefone() {
  var Cel = $("#txtTELEFONE").val();
  var qtd = Cel.length;
  $("#txtTELEFONE").mask("(99) 9999-9999");
}
//mask contato
function MascaraContato() {
  var Cel = $("#txtTElCont").val();
  var qtd = Cel.length;
  $("#txtTElCont").mask("(99) 99999-9999");
}
//limpacel
function LimpaCel() {
  $("#txtCELULAR").val("");
  $("#txtCELULAR").unmask();
}
//limpatel
function LimpaTel() {
  $("#txtTELEFONE").val("");
  $("#txtTELEFONE").unmask();
}
//limpacont
function LimpaCont() {
  $("#txtTElCont").val("");
  $("#txtTElCont").unmask();
}

///valida pis

var ftap = "3298765432";
var total = 0;
var i;
var resto = 0;
var numPIS = 0;
var strResto = "";

function ChecaPIS() {
  total = 0;
  resto = 0;
  numPIS = 0;
  strResto = "";

  numPIS = pis = $("#PIS").val();

  if (numPIS == "" || numPIS == null) {
    return false;
  }

  for (i = 0; i <= 9; i++) {
    resultado = numPIS.slice(i, i + 1) * ftap.slice(i, i + 1);
    total = total + resultado;
  }

  resto = total % 11;

  if (resto != 0) {
    resto = 11 - resto;
  }

  if (resto == 10 || resto == 11) {
    strResto = resto + "";
    resto = strResto.slice(1, 2);
  }

  if (resto != numPIS.slice(10, 11)) {
    return false;
  }

  return true;
}

function ValidaPis() {
  var pis = $("#PIS").val();

  if (!ChecaPIS(pis)) {
    $("#PIS").val("");
  } else {
  }
}

function ZoomBuscaEstado(a) {
  var ZoomEstado = new Zoom();

  //ZoomEstado.FieldsName = new Array("txtCODETD");
  ZoomEstado.Id = "IDbuscaEstado";
  ZoomEstado.DataSet = "DS_FLUIG_0008";
  ZoomEstado.Titulo = "Buscar Estado";
  ZoomEstado.Linhas = [];
  ZoomEstado.Renderizado = false;

  ZoomEstado.Colunas = [
    { title: "Cod.", name: "CODETD" },
    { title: "Nome", name: "NOME" },
  ];
  ZoomEstado.Retorno = function (retorno) {
    if (a == "addEstadoNatal") {
      $("#ESTADONatalCod").val(retorno[0]);
      $("#ESTADO").val(retorno[1]);
    } else if (a == "addUfIdentidade") {
      $("#CODUFCARTIDENTIDADE").val(retorno[0]);
      $("#UFCARTIDENTIDADE").val(retorno[1]);
    } else if (a == "addUfTitulo") {
      $("#CODUFTITULO").val(retorno[0]);
      $("#UFTITULO").val(retorno[1]);
    } else if (a == "addUfCTPS") {
      $("#CODUFCTPS").val(retorno[0]);
      $("#UFCARTTRAB").val(retorno[1]);
    } else if (a == "addEstadoCNH") {
      $("#CodUFCNH").val(retorno[0]);
      $("#UFCNH").val(retorno[1]);
    } else if (a == "addEstado") {
      $("#txtCODETD").val(retorno[0]);
      $("#txtNOMECODETD").val(retorno[1]);
    }
  };

  return ZoomEstado;
}

function ZoomBuscaMunicipio(a) {
  var ZoomMunicipio = new Zoom();

  if (a == "addNaturalidade") {
    var param = "ESTADONatalCod";
  }
  if (a == "addMunicipio") {
    var param = "txtCODETD";
  }
  ZoomMunicipio.FieldsName = new Array(param);
  ZoomMunicipio.Id = "IDbuscaMunicipio";
  ZoomMunicipio.DataSet = "DS_FLUIG_0007";
  ZoomMunicipio.Titulo = "Buscar Municipio";
  ZoomMunicipio.Linhas = [];
  ZoomMunicipio.Renderizado = false;

  ZoomMunicipio.Colunas = [
    { title: "Cod.", name: "CODMUNICIPIO" },
    { title: "Nome", name: "NOMEMUNICIPIO" },
  ];

  ZoomMunicipio.Retorno = function (retorno) {
    if (a == "addNaturalidade") {
      $("#txtNaturalidadeCod").val(retorno[0]);
      $("#txtNaturalidade").val(retorno[1]);
    }
    if (a == "addMunicipio") {
      $("#txtCODMUNICIPIO").val(retorno[0]);
      $("#txtNOMEMUNICIPIO").val(retorno[1]);
    }
  };

  return ZoomMunicipio;
}

function ZoomBuscaLogradouro() {
  var ZoomLogradouro = new Zoom();

  ZoomLogradouro.Id = "IDbuscaLogradouro";
  ZoomLogradouro.DataSet = "DS_FLUIG_0009";
  ZoomLogradouro.Titulo = "Buscar Logradouro";
  ZoomLogradouro.Linhas = [];
  ZoomLogradouro.Renderizado = false;

  ZoomLogradouro.Colunas = [
    { title: "Cod.", name: "CODIGO" },
    { title: "Nome", name: "DESCRICAO" },
  ];
  ZoomLogradouro.Retorno = function (retorno) {
    $("#txtCODTIPORUA").val(retorno[0]);
    $("#txtNOMETIPORUA").val(retorno[1]);
  };

  return ZoomLogradouro;
}

function ZoomBuscaBairro() {
  var ZoomBairro = new Zoom();

  ZoomBairro.Id = "IDbuscaBairro";
  ZoomBairro.DataSet = "DS_FLUIG_0010";
  ZoomBairro.Titulo = "Buscar Bairro";
  ZoomBairro.Linhas = [];
  ZoomBairro.Renderizado = false;

  ZoomBairro.Colunas = [
    { title: "Cod.", name: "CODIGO" },
    { title: "Nome", name: "DESCRICAO" },
  ];
  ZoomBairro.Retorno = function (retorno) {
    $("#txtCODTIPOBAIRRO").val(retorno[0]);
    $("#txtNOMETIPOBAIRRO").val(retorno[1]);
  };

  return ZoomBairro;
}

function ZoomBuscaPais(a) {
  var ZoomPais = new Zoom();

  ZoomPais.Id = "IDbuscaPais";
  ZoomPais.DataSet = "DS_FLUIG_0011";
  ZoomPais.Titulo = "Buscar Pais";
  ZoomPais.Linhas = [];
  ZoomPais.Renderizado = false;

  ZoomPais.Colunas = [
    { title: "Cod.", name: "IDPAIS" },
    { title: "Id", name: "CODPAIS" },
    { title: "Nome", name: "DESCRICAO" },
  ];
  ZoomPais.Retorno = function (retorno) {
    if (a == "addNacionalidade") {
      $("#NACIONALIDADECod").val(retorno[0]);
      $("#NACIONALIDADE").val(retorno[2]);
    } else if (a == "addPais") {
      $("#txtCODPAIS").val(retorno[0]);
      $("#txtPAIS").val(retorno[2]);
    }
  };

  return ZoomPais;
}

function ZoomBuscaSecao() {
  var ZoomSecao = new Zoom();
  ZoomSecao.FieldsName = new Array("cpLoginFluig");
  ZoomSecao.Id = "IDbuscaSecao";
  ZoomSecao.DataSet = "DS_FLUIG_0012";
  ZoomSecao.Titulo = "Buscar Secao";
  ZoomSecao.Linhas = [];
  ZoomSecao.Renderizado = false;

  ZoomSecao.Colunas = [
    { title: "Descricao.", name: "SECAO" },
    { title: "Codigo", name: "CODSECAO" },
    { title: "CODCOLIGADA", name: "CODCOLIGADA", display: false },
    { title: "COD_DIRETOR", name: "COD_DIRETOR", display: false },
    { title: "NOME_DIRETOR", name: "NOME_DIRETOR", display: false },
    { title: "COD_GESTOR", name: "COD_GESTOR", display: false },
    { title: "NOME_GESTOR", name: "NOME_GESTOR", display: false },
  ];
  ZoomSecao.Retorno = function (retorno) {
    $("#txtUnidadeArea").val(retorno[0]);
    $("#txtCentroCusto").val(retorno[1]);
    $("#txtCodcoligada").val(retorno[2]);
    $("#codDiretor").val(retorno[3]);
    $("#cpRespDiretor").val(retorno[4]);
    $("#codGestor").val(retorno[5]);
    $("#cpRespGestor").val(retorno[6]);
    $("#TxtDiretoriaRH").val(retorno[4]);
    $("#txtGerRH").val(retorno[6]);
  };

  return ZoomSecao;
}
function ZoomBuscaEscolaridade() {
  var ZoomEscolaridade = new Zoom();
  ZoomEscolaridade.Id = "IDbuscaEscolaridade";
  ZoomEscolaridade.DataSet = "DS_FLUIG_0013";
  ZoomEscolaridade.Titulo = "Buscar Escolaridade";
  ZoomEscolaridade.Linhas = [];
  ZoomEscolaridade.Renderizado = false;

  ZoomEscolaridade.Colunas = [
    { title: "Descricao.", name: "DESCRICAO" },
    { title: "Codigo", name: "COD" },
  ];
  ZoomEscolaridade.Retorno = function (retorno) {
    $("#txtEscolaridade").val(retorno[0]);
    $("#GRAUINSTRUCAOCod").val(retorno[1]);
  };

  return ZoomEscolaridade;
}

function ZoomBuscaEstCivil() {
  var ZoomEstCivil = new Zoom();
  ZoomEstCivil.Id = "IDbuscaEstCivil";
  ZoomEstCivil.DataSet = "DS_FLUIG_0014";
  ZoomEstCivil.Titulo = "Buscar EstCivil";
  ZoomEstCivil.Linhas = [];
  ZoomEstCivil.Renderizado = false;

  ZoomEstCivil.Colunas = [
    { title: "Descricao.", name: "DESCRICAO" },
    { title: "Codigo", name: "CODCLIENTE" },
  ];
  ZoomEstCivil.Retorno = function (retorno) {
    $("#txtEstadoCivil").val(retorno[0]);
    $("#txtEstCivilCod").val(retorno[1]);
  };

  return ZoomEstCivil;
}

function ZoomBuscaFuncoes() {
  var ZoomFuncoes = new Zoom();
  ZoomFuncoes.FieldsName = new Array("txtCodcoligada");
  ZoomFuncoes.Id = "IDbuscaFuncoes";
  ZoomFuncoes.DataSet = "DS_FLUIG_0015";
  ZoomFuncoes.Titulo = "Buscar Funcoes";
  ZoomFuncoes.Linhas = [];
  ZoomFuncoes.Renderizado = false;

  ZoomFuncoes.Colunas = [
    { title: "Descricao.", name: "FUNCAO" },
    { title: "Codigo", name: "CODIGO" },
  ];
  ZoomFuncoes.Retorno = function (retorno) {
    $("#txtTipoFuncao").val(retorno[0]);
    $("#txtCodFuncao").val(retorno[1]);
  };

  return ZoomFuncoes;
}
function ZoomBuscaBanco(a) {
  var ZoomBanco = new Zoom();
  ZoomBanco.Id = "IDbuscaBanco";
  ZoomBanco.DataSet = "DS_FLUIG_0016";
  ZoomBanco.Titulo = "Buscar Banco";
  ZoomBanco.Linhas = [];
  ZoomBanco.Renderizado = false;

  ZoomBanco.Colunas = [
    { title: "Descricao.", name: "NOME" },
    { title: "Codigo", name: "NUMBANCO" },
  ];
  ZoomBanco.Retorno = function (retorno) {
    if (a == "addBanco") {
      $("#BancoPAgto").val(retorno[0]);
      $("#txtCodBanPgto").val(retorno[1]);
    } else if (a == "addBancoFGTS") {
      $("#BANCFGTS").val(retorno[0]);
      $("#FGTSBANPagto").val(retorno[1]);
    }
  };

  return ZoomBanco;
}
function ZoomBuscaAgencia() {
  var ZoomAgencia = new Zoom();
  ZoomAgencia.FieldsName = new Array("txtCodBanPgto");
  ZoomAgencia.Id = "IDbuscaAgencia";
  ZoomAgencia.DataSet = "DS_FLUIG_0017";
  ZoomAgencia.Titulo = "Buscar Agencia";
  ZoomAgencia.Linhas = [];
  ZoomAgencia.Renderizado = false;

  ZoomAgencia.Colunas = [
    { title: "Descricao.", name: "NOME" },
    { title: "Codigo", name: "NUMAGENCIA" },
  ];
  ZoomAgencia.Retorno = function (retorno) {
    $("#AgPagto").val(retorno[0]);
    $("#CodAgPagto").val(retorno[1]);
  };

  return ZoomAgencia;
}

function ZoomBuscaSindicato() {
  var ZoomSindicato = new Zoom();
  ZoomSindicato.FieldsName = new Array("txtCodcoligada");
  ZoomSindicato.Id = "IDbuscaSindicato";
  ZoomSindicato.DataSet = "DS_FLUIG_0019";
  ZoomSindicato.Titulo = "Buscar Sindicato";
  ZoomSindicato.Linhas = [];
  ZoomSindicato.Renderizado = false;

  ZoomSindicato.Colunas = [
    { title: "Descricao.", name: "NOME" },
    { title: "Codigo", name: "CODIGO" },
  ];
  ZoomSindicato.Retorno = function (retorno) {
    $("#Sind").val(retorno[0]);
    $("#TxtCodSind").val(retorno[1]);
  };

  return ZoomSindicato;
}

function ZoomBuscaHorario() {
  var ZoomHorario = new Zoom();
  ZoomHorario.FieldsName = new Array("txtCodcoligada");
  ZoomHorario.Id = "IDbuscaHorario";
  ZoomHorario.DataSet = "DS_FLUIG_0018";
  ZoomHorario.Titulo = "Buscar Horario";
  ZoomHorario.Linhas = [];
  ZoomHorario.Renderizado = false;

  ZoomHorario.Colunas = [
    { title: "Descricao.", name: "DESCRICAO" },
    { title: "Codigo", name: "CODIGO" },
  ];
  ZoomHorario.Retorno = function (retorno) {
    $("#TxtHorario").val(retorno[0]);
    $("#TxtCodHor").val(retorno[1]);
  };

  return ZoomHorario;
}

function ZoomBuscaSitRais() {
  var ZoomSitRais = new Zoom();
  ZoomSitRais.Id = "IDbuscaSitRais";
  ZoomSitRais.DataSet = "DS_FLUIG_0020";
  ZoomSitRais.Titulo = "Buscar SitRais";
  ZoomSitRais.Linhas = [];
  ZoomSitRais.Renderizado = false;

  ZoomSitRais.Colunas = [
    { title: "Descricao.", name: "DESCRICAO" },
    { title: "Codigo", name: "CODCLIENTE" },
  ];

  ZoomSitRais.Retorno = function (retorno) {
    $("#TxtSITRais").val(retorno[0]);
    $("#TxtCodSITRais").val(retorno[1]);
  };

  return ZoomSitRais;
}

function ZoomBuscaVinRais() {
  var ZoomVinRais = new Zoom();
  ZoomVinRais.Id = "IDbuscaVinRais";
  ZoomVinRais.DataSet = "DS_FLUIG_0021";
  ZoomVinRais.Titulo = "Buscar VinRais";
  ZoomVinRais.Linhas = [];
  ZoomVinRais.Renderizado = false;

  ZoomVinRais.Colunas = [
    { title: "Descricao.", name: "DESCRICAO" },
    { title: "Codigo", name: "CODCLIENTE" },
  ];

  ZoomVinRais.Retorno = function (retorno) {
    $("#TxtVINCRais").val(retorno[0]);
    $("#TxtCodVINCRais").val(retorno[1]);
  };

  return ZoomVinRais;
}

function ZoomBuscaMTAdmissao() {
  var ZoomMTAdmissao = new Zoom();
  ZoomMTAdmissao.FieldsName = new Array("txtCodcoligada");
  ZoomMTAdmissao.Id = "IDbuscaMTAdmissao";
  ZoomMTAdmissao.DataSet = "DS_FLUIG_0022";
  ZoomMTAdmissao.Titulo = "Buscar Motivo Admissao";
  ZoomMTAdmissao.Linhas = [];
  ZoomMTAdmissao.Renderizado = false;

  ZoomMTAdmissao.Colunas = [
    { title: "Descricao.", name: "DESCRICAO" },
    { title: "Codigo", name: "CODCLIENTE" },
  ];

  ZoomMTAdmissao.Retorno = function (retorno) {
    $("#TxtMotADM").val(retorno[0]);
    $("#TxtCodMotADM").val(retorno[1]);
  };

  return ZoomMTAdmissao;
}
function ZoomBuscaTPTAdmissao() {
  var ZoomTPTAdmissao = new Zoom();
  ZoomTPTAdmissao.Id = "IDbuscaMTAdmissao";
  ZoomTPTAdmissao.DataSet = "DS_FLUIG_0027";
  ZoomTPTAdmissao.Titulo = "Buscar Tipo Admissao";
  ZoomTPTAdmissao.Linhas = [];
  ZoomTPTAdmissao.Renderizado = false;

  ZoomTPTAdmissao.Colunas = [
    { title: "Descricao.", name: "DESCRICAO" },
    { title: "Codigo", name: "CODCLIENTE" },
  ];

  ZoomTPTAdmissao.Retorno = function (retorno) {
    $("#TxtTPADM").val(retorno[0]);
    $("#TxtCodTPADM").val(retorno[1]);
  };

  return ZoomTPTAdmissao;
}
function ZoomBuscaIndHor() {
  var ZoomIndHor = new Zoom();
  ZoomIndHor.FieldsName = new Array("txtCodcoligada", "TxtCodHor");
  ZoomIndHor.Id = "IDbuscaIndHor";
  ZoomIndHor.DataSet = "DS_FLUIG_0023";
  ZoomIndHor.Titulo = "Buscar IndHor";
  ZoomIndHor.Linhas = [];
  ZoomIndHor.Renderizado = false;

  ZoomIndHor.Colunas = [
    { title: "Descricao.", name: "DESCRICAO" },
    { title: "Codigo", name: "INDINICIOHOR" },
  ];

  ZoomIndHor.Retorno = function (retorno) {
    $("#TxtIndi").val(retorno[0]);
    $("#TxtCodIndi").val(retorno[1]);
  };

  return ZoomIndHor;
}

function ZoomBuscaTPSangue() {
  var ZoomTPSangue = new Zoom();
  ZoomTPSangue.Id = "IDbuscaSangue";
  ZoomTPSangue.DataSet = "DS_FLUIG_0033";
  ZoomTPSangue.Titulo = "Buscar Tipo Sanguineo";
  ZoomTPSangue.Linhas = [];
  ZoomTPSangue.Renderizado = false;

  ZoomTPSangue.Colunas = [{ title: "Descricao.", name: "TIPOSANG" }];

  ZoomTPSangue.Retorno = function (retorno) {
    $("#TipoSanguineo").val(retorno[0]);
  };

  return ZoomTPSangue;
}

function ZoomBuscaPlanOdonto() {
  var ZoomPlanOdonto = new Zoom();
  ZoomPlanOdonto.Id = "IDbuscaOdonto";
  ZoomPlanOdonto.DataSet = "DS_FLUIG_0034";
  ZoomPlanOdonto.Titulo = "Buscar Plano Odontologico";
  ZoomPlanOdonto.Linhas = [];
  ZoomPlanOdonto.Renderizado = false;

  ZoomPlanOdonto.Colunas = [
    { title: "Codigo", name: "CODINTERNO" },
    { title: "Descricao", name: "DESCRICAO" },
  ];

  ZoomPlanOdonto.Retorno = function (retorno) {
    $("#CodPlanodonto").val(retorno[0]);
    $("#Planodonto").val(retorno[1]);
  };

  return ZoomPlanOdonto;
}

function ZoomBuscaPlanoSaude() {
  var ZoomPlanoSaude = new Zoom();
  ZoomPlanoSaude.Id = "IDbuscaOdonto";
  ZoomPlanoSaude.DataSet = "DS_FLUIG_0035";
  ZoomPlanoSaude.Titulo = "Buscar Plano Saude";
  ZoomPlanoSaude.Linhas = [];
  ZoomPlanoSaude.Renderizado = false;

  ZoomPlanoSaude.Colunas = [
    { title: "Codigo", name: "CODINTERNO" },
    { title: "Descricao", name: "DESCRICAO" },
  ];

  ZoomPlanoSaude.Retorno = function (retorno) {
    $("#CodPlanoSaude").val(retorno[0]);
    $("#PlanoSaude").val(retorno[1]);
  };

  return ZoomPlanoSaude;
}

var ZoomParentesco = function (codParentesco, txtParentescoDepen, $row) {
  var z = new Zoom();
  z.Id = "IDZoomColabRM";
  //z.FieldsName = new Array("cpCodObraOrig","cpCodEmpOrigem");
  z.DataSet = "DS_FLUIG_0025";
  z.Titulo = "Busca Colaborador";
  z.Colunas = [
    { title: "COD.", name: "CODCLIENTE" },
    { title: "DESCRICAO", name: "DESCRICAO" },
  ];
  z.Retorno = function (retorno) {
    $("#" + codParentesco).val(retorno[0]);
    $("#" + txtParentescoDepen).val(retorno[1]);
    $row
      .find(".infoColaborador, .campoSecao, .infoProdutoUAU, .campoColaborador")
      .val("");
  };
  z.Abrir();
};

var ZoomLinhaTarifa = function (
  txtLinhaVt,
  txtCodVt,
  txtTarifa,
  txtNumViagensVt,
  txtValorTotal,
  $row
) {
  var z = new Zoom();
  z.Id = "IDZoomBenRM";
  z.FieldsName = new Array("txtCodcoligada");
  z.DataSet = "DS_FLUIG_0047";
  z.Titulo = "Busca Linha VT";
  z.Colunas = [
    { title: "NOMELINHA", name: "NOMELINHA" },
    { title: "CODLINHA", name: "CODLINHA" },
    { title: "VALOR", name: "VALOR" },
  ];
  z.Retorno = function (retorno) {
    $("#" + txtLinhaVt).val(retorno[0]);
    $("#" + txtCodVt).val(retorno[1]);
    $("#" + txtTarifa).val(retorno[2]);
    $("#" + txtNumViagensVt)
      .attr("readonly", false)
      .val("");
    $("#" + txtValorTotal).val("");
    $row
      .find(".infoColaborador, .campoSecao, .infoProdutoUAU, .campoColaborador")
      .val("");
  };
  z.Abrir();
};

function fnCustomDelete(oElement) {
  fnWdkRemoveChild(oElement);

  var tableBody = document.getElementById("tbItens");
  var trashButtons = tableBody.getElementsByTagName("tr");
}

function fnCustomDeleteVT(oElement) {
  fnWdkRemoveChild(oElement);

  var tableBody = document.getElementById("tbVT");
  var trashButtons = tableBody.getElementsByTagName("tr");
}

function limpa_formulário_cep() {
  // Limpa valores do formulário de cep.
  $("#txtRUA").val("");
  $("#txtBAIRRO").val("");
  /* $("#cidade").val("");
    $("#uf").val("");
    $("#ibge").val("");*/
}

$(document).ready(function () {
  //Quando o campo cep perde o foco.
  $("#txtCEP").blur(function () {
    //Nova variável "cep" somente com dígitos.
    var cep = $(this).val().replace(/\D/g, "");

    //Verifica se campo cep possui valor informado.
    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {
        //Preenche os campos com "..." enquanto consulta webservice.
        $("#txtRUA").val("...");
        $("#txtBAIRRO").val("...");
        /*   $("#cidade").val("...");
            $("#uf").val("...");
            $("#ibge").val("...");*/

        //Consulta o webservice viacep.com.br/
        $.getJSON(
          "https://viacep.com.br/ws/" + cep + "/json/?callback=?",
          function (dados) {
            if (!("erro" in dados)) {
              //Atualiza os campos com os valores da consulta.
              $("#txtRUA").val(dados.logradouro);
              $("#txtBAIRRO").val(dados.bairro);
              /*  $("#cidade").val(dados.localidade);
                    $("#uf").val(dados.uf);
                    $("#ibge").val(dados.ibge);*/
            } //end if.
            else {
              //CEP pesquisado não foi encontrado.
              limpa_formulário_cep();
              alert("CEP não encontrado.");
            }
          }
        );
      } //end if.
      else {
        //cep é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
      }
    } //end if.
    else {
      //cep sem valor, limpa formulário.
      limpa_formulário_cep();
    }
  });
});
