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

    // Tratamento para INÍCIO ou INÍCIO (SALVO)
    if (form.getFormMode() != "VIEW" && (atividade == 0 || atividade == 1)) {
        var hoje = new Date();
        var dia = hoje.getDate();
        var mes = hoje.getMonth() + 1;
        var ano = hoje.getFullYear();

        if (dia < 10) dia = "0" + dia;
        if (mes < 10) mes = "0" + mes;

        form.setValue("cpDataAbertura", dia + "/" + mes + "/" + ano);

        try {
            var filterColaborador = new java.util.HashMap();
            filterColaborador.put("colleaguePK.colleagueId", getValue("WKUser"));
            var dadosColaborador = getDatasetValues("colleague", filterColaborador);

            if (dadosColaborador != null && dadosColaborador.size() > 0) {
                var loginColaborador = new Array(dadosColaborador.get(0).get("login"));
                var DadosSolicitante = DatasetFactory.getDataset("DS_FLUIG_0006", loginColaborador, null, null);

                if (DadosSolicitante != null && DadosSolicitante.rowsCount > 0) {
                    // DADOS DO SOLICITANTE
                    form.setValue("cpLoginFluig", dadosColaborador.get(0).get("login"));
                    form.setValue("cpNomeSolicitante", DadosSolicitante.getValue(0, "NOME"));
                    form.setValue("cpMatriculaSolicitante", DadosSolicitante.getValue(0, "CHAPA"));
                    form.setValue("cpFuncaoSolicitante", DadosSolicitante.getValue(0, "CARGO"));
                    form.setValue("cpEmpresaSolicitante", DadosSolicitante.getValue(0, "NOMEFANTASIA"));
                    form.setValue("cpDepartamentoObraSolicitante", DadosSolicitante.getValue(0, "SECAO"));
                    form.setValue("cpSolicitanteColigada", DadosSolicitante.getValue(0, "CODCOLIGADA"));
                    form.setValue("cpEstadoSolicitante", DadosSolicitante.getValue(0, "UF_SECAO"));
                }
            }
        } catch (e) {
            log.error("Erro ao buscar dados do solicitante: " + e);
        }

        form.setValue("TxtCodSITRais", "1");
        form.setValue("TxtSITRais", "Ativ. normal c/ remun., lic. remun. c/ dir. integr.");
        form.setValue("TxtCodVINCRais", "1");
        form.setValue("TxtVINCRais", "Contr. trab., expr. OU tácito p/ prazo indet");
    }

    // Função auxiliar para buscar nome do usuário com segurança
    function getColleagueName(userId) {
        var filter = new java.util.HashMap();
        filter.put("colleaguePK.colleagueId", userId);
        var colaborador = getDatasetValues("colleague", filter);
        if (colaborador != null && colaborador.size() > 0) {
            return colaborador.get(0).get("colleagueName");
        }
        return userId;
    }

    // Preenchimento de responsáveis por atividade
    if (atividade == 7) {
        form.setValue("cpRespGestor", getColleagueName(getValue("WKUser")));
    }
    if (atividade == 8) {
        form.setValue("cpRespDiretor", getColleagueName(getValue("WKUser")));
    }
    if (atividade == 74) {
        form.setValue("cpRespRH", getColleagueName(getValue("WKUser")));
    }
    if (atividade == 89) {
        form.setValue("cpAnalistaBPO", getColleagueName(getValue("WKUser")));
    }
    if (atividade == 97) {
        form.setValue("cpRespKIT", getColleagueName(getValue("WKUser")));
    }

    // --- TRATATIVA PARA PROBLEMAS DAS DATAS (CORRIGIDO PARA EVITAR ERRO NULLPOINTER) ---
    var formatoInput = new java.text.SimpleDateFormat("yyyy-MM-dd");
    var formatoOutput = new java.text.SimpleDateFormat("dd/MM/yyyy");

    // Função helper para converter data apenas se o valor existir e contiver "-"
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
    
    // Observação: Os nomes de variáveis do seu código original (ex: "DatAdm", "Nasc") 
    // estavam sendo usados como NOME DO CAMPO no setValue (ex: form.setValue("DatAdm", ...)).
    // Isso criava campos novos não mapeados no HTML. 
    // A função acima (converterDataIsoParaBr) corrige o valor NO PRÓPRIO CAMPO original, 
    // que é o comportamento padrão esperado para corrigir datas vindas do Mobile ou de integrações.
}