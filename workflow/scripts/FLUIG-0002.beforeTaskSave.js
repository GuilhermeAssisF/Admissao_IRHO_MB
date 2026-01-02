function beforeTaskSave(colleagueId, nextSequenceId, userList) {
    var atividadeAtual = getValue("WKNumState");
    
    // Supondo que a atividade onde o Candidato devolve seja a 97 (conforme seu JS da widget)
    // Se a widget envia para 97, o evento é disparado AO SAIR de onde o processo estava parado esperando.
    
    log.info(">>> ADMISSAO DIGITAL: beforeTaskSave acionado.");
    log.info(">>> Atividade Atual: " + atividadeAtual);
    log.info(">>> Próxima Atividade: " + nextSequenceId);

    // Tenta ler alguns campos chaves para ver se vieram
    var cpf = hAPI.getCardValue("cpfcnpj");
    var email = hAPI.getCardValue("cand_email");
    var jsonDeps = hAPI.getCardValue("json_dependentes");
    
    log.info(">>> DADOS RECEBIDOS:");
    log.info("   - CPF: " + cpf);
    log.info("   - Email: " + email);
    log.info("   - JSON Dependentes (Tamanho): " + (jsonDeps ? jsonDeps.length : "Vazio"));
    
    // Se quiser ver o conteúdo do JSON no log:
    if (jsonDeps) {
        log.info("   - Conteúdo JSON: " + jsonDeps);
    }
}