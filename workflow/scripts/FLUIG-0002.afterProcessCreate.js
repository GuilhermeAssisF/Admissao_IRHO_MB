function afterProcessCreate(processId){
    hAPI.setCardValue("idProcessoFluig", processId);

    try {
        // 1. Recupera dados do formulário
        var nomeCandidato = hAPI.getCardValue("txtNomeColaborador");
        var emailCandidato = hAPI.getCardValue("txtEmail");
        
        // Dados do Exame (baseados nos campos do seu HTML)
        var dataExame = hAPI.getCardValue("cpDataHoraExame");     // Campo ID: cpDataHoraExame
        var localExame = hAPI.getCardValue("cpNomeClinica");      // Campo ID: cpNomeClinica
        var enderecoExame = hAPI.getCardValue("cpEnderecoClinica"); // Campo ID: cpEnderecoClinica

        // Link do Portal (Substitua pela URL real do seu portal público)
        var linkPortal = "https://montebravo147803.fluig.cloudtotvs.com.br:2500/portal/1/DigteDpfAdIniciar"; 

        // 2. Validação básica
        if (emailCandidato != null && emailCandidato != "") {
            
            // 3. Parâmetros para o template HTML
            var parametros = new java.util.HashMap();
            parametros.put("NOME_CANDIDATO", nomeCandidato);
            parametros.put("DATA_EXAME", dataExame);
            parametros.put("LOCAL_EXAME", localExame);
            parametros.put("ENDERECO_EXAME", enderecoExame);
            parametros.put("LINK_ADMISSAO", linkPortal);
            
            // Assunto do E-mail
            parametros.put("subject", "Bem-vindo(a) à Monte Bravo - Processo de Admissão: " + nomeCandidato);

            // 4. Destinatários
            var destinatarios = new java.util.ArrayList();
            destinatarios.add(emailCandidato);

            // 5. Envio (Usando o código do template criado no painel)
            notifier.notify("admin", destinatarios, "TPL_ADMISSAO_CANDIDATO", parametros);
            
            log.info(">>> Admissão: E-mail enviado para candidato " + nomeCandidato + " (" + emailCandidato + ")");
        } else {
            log.warn(">>> Admissão: E-mail do candidato não preenchido. Notificação cancelada.");
        }

    } catch (e) {
        log.error(">>> Admissão: Erro ao enviar e-mail para candidato: " + e);
    }
}