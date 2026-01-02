function afterTaskSave(colleagueId, nextSequenceId, userList) {
    var atividadeAtual = getValue("WKNumState");
    var numSolicitacao = getValue("WKNumProces");
    
    log.info("### ADMISSAO DIGITAL [" + numSolicitacao + "]: Iniciando afterTaskSave (Atividade " + atividadeAtual + ")");

    // ---------------------------------------------------------
    // BLOCO 1: CONVERSÃO DE ANEXOS (Vindo da Página Pública)
    // ---------------------------------------------------------
    var origem = hAPI.getCardValue("origem_dados");
    
    if (origem == "pagina_publica") {
        log.info("### ADMISSAO DIGITAL [" + numSolicitacao + "]: Origem pública detectada. Iniciando conversão de anexos.");
        
        // Mapeamento: [Nome do Campo Base64, Nome do Campo NomeArquivo]
        var docsParaProcessar = [
            ["cand_doc_rg_base64",           "cand_doc_rg_nome"],
            ["cand_doc_titulo_base64",       "cand_doc_titulo_nome"],
            ["cand_doc_escolaridade_base64", "cand_doc_escolaridade_nome"],
            ["cand_doc_residencia_base64",   "cand_doc_residencia_nome"],
            ["cand_doc_banco_base64",        "cand_doc_banco_nome"],
            ["cand_doc_nascimento_base64",   "cand_doc_nascimento_nome"],
            ["cand_doc_foto_base64",         "cand_doc_foto_nome"],
            ["cand_doc_casamento_base64",    "cand_doc_casamento_nome"],
            ["cand_doc_dependentes_base64",  "cand_doc_dependentes_nome"]
        ];

        for (var i = 0; i < docsParaProcessar.length; i++) {
            var campoBase64 = docsParaProcessar[i][0];
            var campoNome   = docsParaProcessar[i][1];

            try {
                var base64Content = new String(hAPI.getCardValue(campoBase64));
                var fileName      = hAPI.getCardValue(campoNome);

                if (base64Content != null && base64Content != "" && base64Content != "null") {
                    
                    // Remove cabeçalhos de Data URI (ex: "data:image/png;base64,")
                    if (base64Content.indexOf(",") > -1) {
                        base64Content = base64Content.split(",")[1];
                    }

                    // Decodifica Base64 para Bytes
                    var decodedBytes = java.util.Base64.getDecoder().decode(base64Content);

                    // Cria o anexo no Fluig
                    var attachment = hAPI.newAttachment();
                    attachment.setFileName(fileName);
                    attachment.setPrincipal(true);
                    attachment.setAttach(true); // Exibe na aba anexos
                    attachment.setFilecontent(decodedBytes);

                    hAPI.attachDocument(attachment);
                    
                    log.info("### ADMISSAO DIGITAL [" + numSolicitacao + "]: Anexo " + fileName + " processado.");

                    // Limpa o campo Base64 para não pesar o formulário
                    hAPI.setCardValue(campoBase64, "ANEXADO_AUTOMATICAMENTE");
                }
            } catch (erroDoc) {
                log.error("### ADMISSAO DIGITAL [" + numSolicitacao + "]: Erro ao anexar " + campoNome + ": " + erroDoc);
            }
        }
        
        // Limpa a flag para não rodar de novo se alguém salvar o processo manualmente depois
        hAPI.setCardValue("origem_dados", "processado_fluig");
    }

    // Executa apenas na atividade inicial (0 ou 4) ou Correção (41)
    if (atividadeAtual == 0 || atividadeAtual == 4 || atividadeAtual == 41) {
        var nomeColaborador = hAPI.getCardValue("txtNomeColaborador");
        var emailDestino = hAPI.getCardValue("txtEmail");

        if (emailDestino != null && emailDestino != "") {
            try {
                var codigoTemplate = "TPL_ADMISSAO_BOASVINDAS"; 
                var parametros = new java.util.HashMap();
                parametros.put("NOME_CANDIDATO", nomeColaborador);
                parametros.put("NUM_SOLICITACAO", numSolicitacao);
                parametros.put("subject", "Confirmação de Recebimento - Solicitação " + numSolicitacao);

                var destinatarios = new java.util.ArrayList();
                destinatarios.add(emailDestino);

                notifier.notify("admin", codigoTemplate, parametros, destinatarios, "text/html");
                log.info("### ADMISSAO DIGITAL: E-mail enviado para " + emailDestino);
            } catch (e) {
                log.error("### ADMISSAO DIGITAL: Erro ao enviar e-mail: " + e);
            }
        }
    }
}