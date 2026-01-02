/*
GESTOR - 7
DIRETOR - 8
CORREÇÃO - 41
ADMISSAO - 74
VALIDA KIT - 97
GERAR KIT - 89
*/
function displayFields(form, customHTML) {
    form.setShowDisabledFields(true);
    form.setHidePrintLink(true);

    /* Funcoes anexadas ao formulario no momento da redenrizacao da ficha */
    customHTML.append("<script>function getWKNumState(){ return " + getValue("WKNumState") + "; }</script>");
    customHTML.append("<script>function getTodayDate(){ return " + new java.util.Date().getTime() + "; }</script>");
    customHTML.append("<script>function getFormMode(){ return '" + form.getFormMode() + "'; }</script>");
    customHTML.append("<script>function getUser(){ return '" + getValue("WKUser") + "'; }</script>");
    customHTML.append("<script>function getCompany(){ return " + getValue("WKCompany") + "; }</script>");

    var atividade = parseInt(getValue("WKNumState"));

    // -------------------------------------------------------------------------------------------------
    // LÓGICA DE STAGING (HIDRATAÇÃO DOS DADOS) - Executa apenas na etapa Validar Kit (97)
    // -------------------------------------------------------------------------------------------------
    if (atividade == 97) {
        var cpfAtual = form.getValue("cpfcnpj");

        // Se CPF estiver vazio, assume que veio da Widget Staging e precisa buscar os dados
        if (cpfAtual == "" || cpfAtual == null) {
            log.info(">>> ADMISSAO: Iniciando hidratação de dados do Staging para a solicitação " + getValue("WKNumProces"));
            
            var idSolicitacao = getValue("WKNumProces");
            
            // IMPORTANTE: Use o nome exato do dataset que você criou para ler o formulário de staging
            // Se você seguiu o passo a passo, o nome deve ser algo como 'ds_frm_candidato_staging' ou o nome que deu na exportação.
            // Vou usar 'ds_frm_candidato_staging' como exemplo. Confirme no seu painel de controle.
            var nomeDatasetStaging = "ds_frm_candidato_staging"; 
            
            var c1 = DatasetFactory.createConstraint("ref_id_solicitacao", idSolicitacao, idSolicitacao, ConstraintType.MUST);
            var dsStage = DatasetFactory.getDataset(nomeDatasetStaging, null, [c1], null);

            if (dsStage != null && dsStage.rowsCount > 0) {
                try {
                    var jsonRaw = dsStage.getValue(0, "json_dados_completos");
                    var dados = JSON.parse(jsonRaw);

                    // Preenche campos principais (Mapeamento JSON -> Formulário)
                    if(dados.txtNomeColaborador) form.setValue("txtNomeColaborador", dados.txtNomeColaborador);
                    if(dados.cpfcnpj) form.setValue("cpfcnpj", dados.cpfcnpj);
                    if(dados.cpfcnpjValue) form.setValue("cpfcnpjValue", dados.cpfcnpjValue);
                    if(dados.dtDataNascColaborador) form.setValue("dtDataNascColaborador", dados.dtDataNascColaborador);
                    
                    if(dados.txtEmail) form.setValue("txtEmail", dados.txtEmail);
                    if(dados.txtCELULAR) form.setValue("txtCELULAR", dados.txtCELULAR);
                    if(dados.txtTELEFONE) form.setValue("txtTELEFONE", dados.txtTELEFONE);
                    if(dados.txtTElCont) form.setValue("txtTElCont", dados.txtTElCont);

                    // Endereço
                    if(dados.txtCEP) form.setValue("txtCEP", dados.txtCEP);
                    if(dados.txtRUA) form.setValue("txtRUA", dados.txtRUA);
                    if(dados.txtNUMERO) form.setValue("txtNUMERO", dados.txtNUMERO);
                    if(dados.txtCOMPLEMENTO) form.setValue("txtCOMPLEMENTO", dados.txtCOMPLEMENTO);
                    if(dados.txtBAIRRO) form.setValue("txtBAIRRO", dados.txtBAIRRO);
                    if(dados.txtNOMEMUNICIPIO) form.setValue("txtNOMEMUNICIPIO", dados.txtNOMEMUNICIPIO);
                    if(dados.txtNOMECODETD) form.setValue("txtNOMECODETD", dados.txtNOMECODETD); // Estado

                    // Bancários
                    if(dados.BancoPAgto) form.setValue("BancoPAgto", dados.BancoPAgto);
                    if(dados.AgPagto) form.setValue("AgPagto", dados.AgPagto);
                    if(dados.ContPagto) form.setValue("ContPagto", dados.ContPagto);
                    if(dados.TipodeContPagto) form.setValue("TipodeContPagto", dados.TipodeContPagto);

                    // Opções
                    if(dados.ValeTransp) form.setValue("ValeTransp", dados.ValeTransp);
                    if(dados.AssistMedica) form.setValue("TxtIncMedica", (dados.AssistMedica == "Sim" ? "1" : "0")); // Ajuste conforme seu select

                    // Documentos (Base64 ocultos)
                    if(dados.cand_foto_base64) form.setValue("cand_foto_base64", dados.cand_foto_base64);
                    // Adicione aqui outros documentos se precisar exibi-los ou processá-los

                    // Tratamento de Dependentes (Pai Filho)
                    // O JSON tem 'json_dependentes' que é um array. O ideal seria ter uma função para adicionar linhas,
                    // mas em displayFields não podemos usar wdkAddChild. 
                    // Solução: Preencher os campos ocultos ou fixos se houver lógica preparada, 
                    // ou deixar para o RH conferir no anexo/JSON. 
                    // Se você mapeou como 'txtNomDepen___1' no JSON, pode tentar setar direto se as linhas existirem, 
                    // mas o formulário web não cria linhas dinamicamente no backend.
                    
                    log.info(">>> ADMISSAO: Dados hidratados com sucesso para a solicitação " + idSolicitacao);

                } catch(e) {
                    log.error(">>> ADMISSAO: Erro ao fazer parse do JSON de Staging: " + e);
                }
            } else {
                log.warn(">>> ADMISSAO: Nenhum registro de Staging encontrado para a solicitação " + idSolicitacao);
            }
        }
    }
    // -------------------------------------------------------------------------------------------------


    // Tratamento para INÍCIO ou INÍCIO (SALVO)
    if (form.getFormMode() != "VIEW" && (atividade == 0 || atividade == 1)) {
        var hoje = new Date();
        var dia = hoje.getDate();
        var mes = hoje.getMonth() + 1;
        var ano = hoje.getFullYear();

        if (dia < 10) dia = "0" + dia;
        if (mes < 10) mes = "0" + mes;

        form.setValue("cpDataAbertura", dia + "/" + mes + "/" + ano);
        
        // Pega dados do usuário logado
        var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
        var dsUser = DatasetFactory.getDataset("colleague", null, [c1], null);
        if (dsUser.rowsCount > 0) {
            form.setValue("cpNomeSolicitante", dsUser.getValue(0, "colleagueName"));
            form.setValue("cpEmailSolicitante", dsUser.getValue(0, "mail"));
        }
    }

    // Controle de Exibição dos Painéis de Aprovação
    var visivel = "block";
    var invisivel = "none";

    // Padrão: Esconde todos os painéis de aprovação
    customHTML.append("<script>");
    customHTML.append("$('#panelAtividade_7').css('display', '" + invisivel + "');");
    customHTML.append("$('#panelAtividade_8').css('display', '" + invisivel + "');");
    customHTML.append("$('#panelAtividade_74').css('display', '" + invisivel + "');");
    customHTML.append("$('#panelAtividade_89').css('display', '" + invisivel + "');");
    customHTML.append("$('#panelAtividade_97').css('display', '" + invisivel + "');");
    customHTML.append("</script>");

    // Mostra painéis conforme a atividade e modo
    if (atividade == 0 || atividade == 4 || atividade == 41) {
        // Início ou Correção: Não mostra aprovações, apenas reabertura se for 41
        if (atividade == 41) {
             // Lógica específica de correção se houver
        }
    }
    
    // Gestor
    if (atividade == 7) {
        customHTML.append("<script>$('#panelAtividade_7').css('display', '" + visivel + "');</script>");
        form.setValue("cpRespGestor", getValue("WKUser"));
    }
    
    // Diretor
    if (atividade == 8) {
        customHTML.append("<script>$('#panelAtividade_7').css('display', '" + visivel + "');</script>"); // Mantém anterior visível
        customHTML.append("<script>$('#panelAtividade_8').css('display', '" + visivel + "');</script>");
        form.setValue("cpRespDiretor", getValue("WKUser"));
    }

    // RH (Admissão)
    if (atividade == 74) {
        customHTML.append("<script>$('#panelAtividade_7').css('display', '" + visivel + "');</script>");
        customHTML.append("<script>$('#panelAtividade_8').css('display', '" + visivel + "');</script>");
        customHTML.append("<script>$('#panelAtividade_97').css('display', '" + visivel + "');</script>"); // Kit vem antes
        customHTML.append("<script>$('#panelAtividade_74').css('display', '" + visivel + "');</script>");
        form.setValue("cpRespRH", getValue("WKUser"));
    }

    // Valida Kit (Atividade onde o RH recebe os dados da Widget)
    if (atividade == 97) {
        // Aqui não mostramos aprovações anteriores pois é a primeira etapa do RH pós-candidato
        customHTML.append("<script>$('#panelAtividade_97').css('display', '" + visivel + "');</script>");
        form.setValue("cpRespKIT", getValue("WKUser"));
    }

    // Analista BPO
    if (atividade == 89) {
        customHTML.append("<script>$('#panelAtividade_74').css('display', '" + visivel + "');</script>");
        customHTML.append("<script>$('#panelAtividade_89').css('display', '" + visivel + "');</script>");
        form.setValue("cpAnalistaBPO", getValue("WKUser"));
    }

    // -------------------------------------------------------------------------------------------------
    // CONVERSÃO DE DATAS (ISO yyyy-mm-dd -> BR dd/mm/yyyy)
    // -------------------------------------------------------------------------------------------------
    var formatoInput = new java.text.SimpleDateFormat("yyyy-MM-dd");
    var formatoOutput = new java.text.SimpleDateFormat("dd/MM/yyyy");

    // Função auxiliar segura para converter data apenas se o valor existir e contiver "-"
    function converterDataIsoParaBr(campo) {
        var valor = form.getValue(campo);
        if (valor != null && valor.indexOf("-") > 0) {
            try {
                var dataObj = formatoInput.parse(valor);
                var dataFormatada = formatoOutput.format(dataObj);
                form.setValue(campo, dataFormatada);
            } catch (e) {
                log.error("Erro ao converter data do campo " + campo + ": " + e);
            }
        }
    }

    // Lista de campos de data para converter
    var camposData = [
        "txtAdmissao",
        "dtDataNascColaborador",
        "DTEMISSAOIDENT",
        "DTTITELEITOR",
        "dtDataEmissaoCartTrab",
        "DTVENCHABILIT",
        "DTEMISSAOCNH",
        "DtEmRIC",
        "DTRNE",
        "DtChegBras",
        "DTEmPrimCNH",
        "TxtDtContSind"
    ];

    // Executa a conversão segura para todos os campos
    for (var i = 0; i < camposData.length; i++) {
        converterDataIsoParaBr(camposData[i]);
    }
}