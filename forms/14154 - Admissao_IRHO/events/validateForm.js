function validateForm(form) {
    // --- BYPASS DE INTEGRAÇÃO ---
    // Se quem está movendo é o usuário da Widget, IGNORA validações e permite avançar.
    // Isso evita erro 500 pois os campos estarão vazios nesse momento.
    var usuarioLogado = getValue("WKUser");
    if (usuarioLogado == "widgetpublicadeadmissao") { // Use o login exato do seu usuário integrador
        return; 
    }

    // ... Restante das suas validações normais para o RH ...
    var atividade = parseInt(getValue("WKNumState"));
    // ...

    var acaoUsuario = getValue("WKCompletTask");
    var msg = "";

    // --- FUNÇÃO AUXILIAR DE SEGURANÇA ---
    // Garante que retorna String vazia se o campo for nulo, evitando erro 500
    function getSafeValue(campo) {
        var val = form.getValue(campo);
        if (val == null) return "";
        return new java.lang.String(val).trim(); // Converte para Java String e remove espaços
    }

    // BLINDAGEM: Verifica se o campo existe antes de tentar fazer split
    var cptbDadosRCM = getSafeValue("cptbDadosRCM");
    var dadosRCm = (cptbDadosRCM.indexOf(",") > -1) ? cptbDadosRCM.split(",") : [];

    // BLINDAGEM DE DATAS
    var data1 = getSafeValue("cpDataAbertura");
    var data2 = getSafeValue("dtDataNascColaborador");

    // Só entra no IF se as datas existirem e tiverem barras (evita crash)
    if (data1 != "" && data2 != "" && data1.indexOf("/") > -1 && data2.indexOf("/") > -1) {
        try {
            var nova1 = data1.split("/");
            var Nova1 = nova1[1] + "/" + nova1[0] + "/" + nova1[2];

            var nova2 = data2.split("/");
            var Nova2 = nova2[1] + "/" + nova2[0] + "/" + nova2[2];

            var d1 = new Date(Nova1);
            var d2 = new Date(Nova2);
            var DAY = 1000 * 60 * 60 * 24 * 365;
            var days_passed = Math.round((d1.getTime() - d2.getTime()) / DAY);
            var dias = days_passed + 1;
        } catch (e) {
            log.warn("[validateForm] Erro ao calcular datas: " + e);
        }
    }

    // --- VALIDAÇÕES DO CANDIDATO (Apenas se não for validação de RH/Gestor) ---
    // Atividade 122 é "Aguardando Candidato" (conforme seu log anterior).
    // Adicionei validação segura usando getSafeValue.
    if ((atividade == 1 || atividade == 0 || atividade == 41 || atividade == 122) && acaoUsuario == "true") {
        
        // DADOS DO COLABORADOR
        if (getSafeValue("cpfcnpj") == "") msg += "CPF não informado.<br>";
        if (getSafeValue("txtNomeColaborador") == "") msg += "Nome não informado.<br>";
        
        // Validação de Segurança para CPF (Só se o campo txtFuncAtivo estiver preenchido)
        if (getSafeValue("txtFuncAtivo") == "FUNC_ATIVO") {
             msg += "Existem funcionários ativos utilizando o CPF informado.<br>";
        }
    }
  
    // GESTOR
    if (atividade == 7 && acaoUsuario == "true") {
        if (getSafeValue("cpAprovacaoGestor") == "0") msg += "Aprovação pendente.<br>";
        if (getSafeValue("cpAprovacaoGestor") == "2" && getSafeValue("cpParecerAprovGestor") == "") 
            msg += "Parecer de Reprovação obrigatório.<br>";
    }

    // DIRETOR
    if (atividade == 8 && acaoUsuario == "true") {
        if (getSafeValue("cpAprovacaoDiretor") == "0") msg += "Aprovação pendente.<br>";
        if (getSafeValue("cpAprovacaoDiretor") == "2" && getSafeValue("cpParecerAprovaDiretor") == "")
            msg += "Parecer de Reprovação obrigatório.<br>";
    }

    // REABERTURA
    if (atividade == 41 && acaoUsuario == "true") {
        if (getSafeValue("cpReaberturaChamado") == "") msg += "Ação de reabertura pendente.<br>";
    }

    // RH
    if (atividade == 74 && acaoUsuario == "true") {
        if (getSafeValue("cpAprovacaoRH") == "0") msg += "Aprovação pendente.<br>";
        if (getSafeValue("cpAprovacaoRH") == "2" && getSafeValue("cpParecerAprovaRH") == "")
            msg += "Parecer de Reprovação obrigatório.<br>";
        if (getSafeValue("txtChapaJaExiste") == "2") msg += "Chapa já existe na base.<br>";
    }

    // VALIDA KIT
    if (atividade == 97 && acaoUsuario == "true") {
        if (getSafeValue("cpAprovacaoKit") == "0") msg += "Aprovação pendente.<br>";
        if (getSafeValue("cpAprovacaoKit") == "2" && getSafeValue("cpParecerAprovaKit") == "")
            msg += "Parecer de Reprovação obrigatório.<br>";
    }

    if (msg != "") {
        throw "<br> ERRO DE VALIDAÇÃO: <br>" + msg;
    }
}