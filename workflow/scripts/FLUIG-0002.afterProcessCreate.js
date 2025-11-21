function afterProcessCreate(processId){
    hAPI.setCardValue("idProcessoFluig", processId);
    
    log.info(">>> ADMISSAO NOVA: Iniciando afterProcessCreate (ID: " + processId + ")");

    try {
        // 1. Obter dados do formulário
        var nomeCandidato = hAPI.getCardValue("txtNomeColaborador");
        var emailCandidato = hAPI.getCardValue("txtEmail");
        
        // Link público (verifique se está correto)
        var linkPortal = "https://montebravo147803.fluig.cloudtotvs.com.br:2500/portal/1/DigteDpfAdIniciar"; 
        
        // 2. DEFINIR O REMETENTE (Conforme descoberto no dataset dpf_configuracoes)
        // Se o "admin" continuar falhando, tente trocar por "adm" ou o seu próprio login para teste.
        var REMETENTE_OFICIAL = "admin"; 

        // 3. Validação
        if (emailCandidato != null && emailCandidato != "") {
            
            // Preparar Parâmetros
            var parametros = new java.util.HashMap();
            parametros.put("NOME_CANDIDATO", nomeCandidato);
            parametros.put("LINK_ADMISSAO", linkPortal);
            
            // Dados do Exame (com tratamento para evitar nulos)
            var dataExame = hAPI.getCardValue("cpDataHoraExame");
            parametros.put("DATA_EXAME", dataExame ? dataExame : "A ser agendado");
            parametros.put("LOCAL_EXAME", hAPI.getCardValue("cpNomeClinica") || "A ser informado");
            parametros.put("ENDERECO_EXAME", hAPI.getCardValue("cpEnderecoClinica") || "A ser informado");

            // Assunto (alguns templates exigem o parametro "subject" minúsculo ou maiúsculo, enviamos os dois)
            var assunto = "Bem-vindo(a) à Monte Bravo - Processo de Admissão";
            parametros.put("subject", assunto);
            parametros.put("SUBJECT", assunto);

            // Destinatários
            var destinatarios = new java.util.ArrayList();
            destinatarios.add(emailCandidato);

            log.info(">>> ADMISSAO NOVA: Tentando enviar e-mail...");
            log.info(">>> Remetente: " + REMETENTE_OFICIAL);
            log.info(">>> Destinatário: " + emailCandidato);
            log.info(">>> Template: TPL_ADMISSAO_CANDIDATO");

            // 4. COMANDO DE ENVIO (MÉTODO IGUAL AO PROCESSO ANTIGO)
            // Ordem: Remetente, Template, Parâmetros, Destinatários, Tipo de Conteúdo
            notifier.notify(REMETENTE_OFICIAL, "TPL_ADMISSAO_CANDIDATO", parametros, destinatarios, "text/html");
            
            log.info(">>> ADMISSAO NOVA: Sucesso! Comando de envio executado.");
        } else {
            log.warn(">>> ADMISSAO NOVA: E-mail do candidato não preenchido. Envio cancelado.");
        }

    } catch (e) {
        log.error(">>> ADMISSAO NOVA: ERRO AO ENVIAR EMAIL: " + e);
        log.error(e.toString());
    }
}