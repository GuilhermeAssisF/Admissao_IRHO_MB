function afterTaskSave(colleagueId, nextSequenceId, userList) {
    // Executa apenas na atividade inicial (0 ou 4) ou na atividade de Correção (41)
    // Adapte os IDs das atividades conforme seu diagrama
    var atividadeAtual = getValue("WKNumState");

    // Verifica se está avançando o processo (não é apenas um "Salvar")
    if (atividadeAtual == 0 || atividadeAtual == 4 || atividadeAtual == 41) {

        // 1. Recupera os dados do formulário
        var nomeColaborador = hAPI.getCardValue("txtNomeColaborador");
        var emailDestino = hAPI.getCardValue("txtEmail");
        var numeroSolicitacao = getValue("WKNumProces");

        // Valida se tem e-mail preenchido
        if (emailDestino != null && emailDestino != "") {

            try {
                // 2. Configuração do E-mail
                // TAMPLE_CODE: Código de um template de e-mail cadastrado no Fluig (Painel de Controle > Templates de E-mail)
                // Se não tiver template, pode usar "TPL_PADRAO_CUSTOM" ou criar um simples via HTML
                var codigoTemplate = "TPL_ADMISSAO_BOASVINDAS"; // Exemplo: Você precisa criar esse template ou usar um existente

                var parametros = new java.util.HashMap();
                parametros.put("NOME_CANDIDATO", nomeColaborador);
                parametros.put("NUM_SOLICITACAO", numeroSolicitacao);
                parametros.put("subject", "Confirmação de Recebimento - Solicitação " + numeroSolicitacao); // Assunto do E-mail

                // 3. Destinatários
                var destinatarios = new java.util.ArrayList();
                destinatarios.add(emailDestino);

                // 4. Envio (notifier)
                // "admin" é o usuário remetente (deve ser um usuário válido no Fluig)
                notifier.notify("admin", codigoTemplate, parametros, destinatarios, "text/html");

                log.info(">>> E-mail de admissão enviado com sucesso para: " + emailDestino);

            } catch (e) {
                log.error(">>> Erro ao enviar e-mail de admissão: " + e);
            }
        }
    }
}