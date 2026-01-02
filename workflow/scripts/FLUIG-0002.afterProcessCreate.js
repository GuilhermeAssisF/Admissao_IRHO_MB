function afterProcessCreate(processId){
    // Grava o número do processo no formulário para referência futura
    hAPI.setCardValue("idProcessoFluig", processId);
    
    log.info(">>> ADMISSAO (AFTER PROCESS CREATE): Iniciando envio de e-mail customizado. ID: " + processId);

    try {
        // 1. RECUPERA DADOS BÁSICOS DO FORMULÁRIO
        var nomeCandidato = hAPI.getCardValue("txtNomeColaborador");
        var emailCandidato = hAPI.getCardValue("txtEmail");
        
        // 2. RECUPERA DADOS DO EXAME MÉDICO (SE HOUVER)
        var dataExame = hAPI.getCardValue("cpDataHoraExame");
        var localExame = hAPI.getCardValue("cpNomeClinica");
        var endExame = hAPI.getCardValue("cpEnderecoClinica");

        // 3. RECUPERA O CONTEÚDO CUSTOMIZADO (DEFINIDO PELO RH NO ZOOM)
        var assuntoEmail = hAPI.getCardValue("hidden_mail_assunto");
        var corpoEmail = hAPI.getCardValue("hidden_mail_corpo");

        log.info(">>> ADMISSAO: Texto recuperado do campo oculto: " + corpoEmail);

        // 4. LÓGICA DE SEGURANÇA / FALLBACK
        // Se por algum motivo o RH não selecionou nada, usa um padrão para não enviar e-mail em branco
        if (corpoEmail == null || corpoEmail == "") {
            log.warn(">>> ADMISSAO: Corpo do e-mail vazio. Usando texto padrão de fallback.");
            corpoEmail = "Olá! Seja bem-vindo(a). Por favor, acesse o portal para enviar seus documentos.";
        } else {
            // Converte as quebras de linha (Enter) do textarea para <br> do HTML
            // O String() garante que não dê erro se vier algo diferente de texto
            corpoEmail = String(corpoEmail).replace(/\n/g, "<br>");
        }

        if (assuntoEmail == null || assuntoEmail == "") {
            assuntoEmail = "Processo de Admissão - Monte Bravo";
        }

        // 5. MONTAGEM DO LINK PÚBLICO
        // Ajuste a URL base conforme o seu ambiente (HML ou PROD)
        var baseUrl = "https://montebravo147803.fluig.cloudtotvs.com.br:2500/portal/1/pagina_candidato";
        var linkPortal = baseUrl + "?id_origem=" + processId; 

        // 6. VALIDAÇÃO E ENVIO
        if (emailCandidato != null && emailCandidato != "") {
            
            // Prepara os parâmetros para o Template HTML
            var parametros = new java.util.HashMap();
            
            // Variáveis Fixas
            parametros.put("NOME_CANDIDATO", nomeCandidato);
            parametros.put("LINK_ADMISSAO", linkPortal);
            
            // Dados do Exame (com tratamento para não ir "null")
            parametros.put("DATA_EXAME", dataExame ? dataExame : "A ser agendado");
            parametros.put("LOCAL_EXAME", localExame ? localExame : "A ser informado");
            parametros.put("ENDERECO_EXAME", endExame ? endExame : "A ser informado");

            // Variável Dinâmica (O Texto do RH)
            parametros.put("CORPO_PERSONALIZADO", corpoEmail);

            // Assunto do E-mail (Requerido pelo Fluig)
            parametros.put("subject", assuntoEmail);
            parametros.put("SUBJECT", assuntoEmail);

            // Lista de Destinatários
            var destinatarios = new java.util.ArrayList();
            destinatarios.add(emailCandidato);

            // Definição do Remetente
            var remetente = "admin"; // Ou o código de um usuário específico de RH

            log.info(">>> ADMISSAO: Tentando enviar e-mail para: " + emailCandidato);
            log.info(">>> Assunto: " + assuntoEmail);

            // DISPARO DO E-MAIL
            // Utiliza sempre o Template Mestre, injetando o texto variável
            notifier.notify(remetente, "TPL_ADMISSAO_MASTER", parametros, destinatarios, "text/html");
            
            log.info(">>> ADMISSAO: E-mail enviado com sucesso!");

        } else {
            log.warn(">>> ADMISSAO: E-mail do candidato não preenchido. Envio cancelado.");
        }

    } catch (e) {
        log.error(">>> ADMISSAO: ERRO AO ENVIAR EMAIL: " + e);
        log.error(e.toString());
    }
}