/*

GESTOR - 7
DIRETOR - 8
CORREÇÃO - 41
ADMISSAO - 74
VALIDA KIT - 97
GERAR KIT - 89
*/

function validateForm(form) {
  var atividade = parseInt(getValue("WKNumState"));
  var msg = "";
  var acaoUsuario = getValue("WKCompletTask");
  var dadosRCm = form.getValue("cptbDadosRCM").split(",");
  var ErroColaborador = "";
  var colab = "";
  var DadosRCM = dadosRCm;

  //validando a data de nascimento

  var DAY = 1000 * 60 * 60 * 24 * 365;
  var data1 = form.getValue("cpDataAbertura");
  var data2 = form.getValue("dtDataNascColaborador");

  var nova1 = data1.toString().split("/");

  Nova1 = nova1[1] + "/" + nova1[0] + "/" + nova1[2];

  var nova2 = data2.toString().split("/");

  Nova2 = nova2[1] + "/" + nova2[0] + "/" + nova2[2];

  d1 = new Date(Nova1);
  d2 = new Date(Nova2);

  var days_passed = Math.round((d1.getTime() - d2.getTime()) / DAY);

  var dias = days_passed + 1;

  //fim data de nascimento

  //verifica dados do dependente
  /*	var fieldList = "txtNomDepen,txtDtNascDepen,codParentesco".split(",");
  var detail = getDetailOfMaster(fieldList, form);
	
  if((atividade==1 || atividade==0) && (acaoUsuario == "true")){
    	
      for(var i = 0; i < detail.length; i++){

        if(detail[i]["txtNomDepen"].value.isEmpty()){
          ErroColaborador += "Nome Dependente!"+ "<br/>";
        }
        if(detail[i]["codParentesco"].value.isEmpty()){
          ErroColaborador += "Parentesco do Dependente!"+ "<br/>";
        }
        if((detail[i]["codParentesco"].value=="1" || 
          detail[i]["codParentesco"].value=="3" ||
          detail[i]["codParentesco"].value=="5" ||
          detail[i]["codParentesco"].value=="C" ||
          detail[i]["codParentesco"].value=="D" ||
          detail[i]["codParentesco"].value=="P") && detail[i]["txtDtNascDepen"].value.isEmpty()){
          ErroColaborador += "Data de Nascimento do Dependente!"+ "<br/>";
        }
      	
      }
      msg += ErroColaborador;
  	
  }
*/

  if (
    (atividade == 1 || atividade == 0 || atividade == 41) &&
    acaoUsuario == "true"
  ) {
    if (form.getValue("txtNomeColaborador") == "")
      msg += "Nome Colaborador." + "<br>";
    if (form.getValue("dtDataNascColaborador") == "")
      msg += "Data de Nascimento do Colaborador." + "<br>";
    if (form.getValue("CORRACA") == "") msg += "COR/RA&Ccedil;a." + "<br>";
    if (form.getValue("NACIONALIDADECod") == "")
      msg += "Nacionalidade." + "<br>";
    if (form.getValue("ESTADONatalCod") == "") msg += "Estado Natal." + "<br>";
    if (form.getValue("txtNaturalidadeCod") == "")
      msg += "Naturalidade." + "<br>";
    if (form.getValue("txtSexo") == "0") msg += "Sexo." + "<br>";
    if (form.getValue("txtEstCivilCod") == "") msg += "Estado Civil." + "<br>";
    if (form.getValue("GRAUINSTRUCAOCod") == "")
      msg += "Grau Instru&ccedil;&atilde;o." + "<br>";
    if (form.getValue("DEFICIENTEFISICO") == "")
      msg += "Dificiente F&iacute;sica." + "<br>";
    if (form.getValue("DEFICIENTEAUDITIVO") == "")
      msg += "Deficiente Auditivo." + "<br>";
    if (form.getValue("DEFICIENTEFALA") == "")
      msg += "Deficiente Fala." + "<br>";
    if (form.getValue("DEFICIENTEVISUAL") == "")
      msg += "Deficiente Visual." + "<br>";
    if (form.getValue("DEFICIENTEMENTAL") == "")
      msg += "Deficiente Mental." + "<br>";
    if (form.getValue("DEFICIENTEINTELECTUAL") == "")
      msg += "Deficiente Intelectual." + "<br>";
    if (form.getValue("DEFICIENTEREAB") == "")
      msg += "Deficiente Reabilitada." + "<br>";

    if (form.getValue("READABITADO") == "")
      msg += "Reabilitado ou readaptado?" + "<br>";
    if (form.getValue("PREENCHECOTA") == "") msg += "Preenche cota?" + "<br>";

    if (form.getValue("TipoSanguineo") == "")
      msg += "Tipo Sangu&iacute;neo." + "<br>";
    if (form.getValue("TxtRg") == "") msg += "RG." + "<br>";
    if (form.getValue("UFCARTIDENTIDADE") == "") msg += "UF RG." + "<br>";
    if (form.getValue("ORGAOCARTIDENTIDADE") == "")
      msg += "Org&atilde;o Emissor RG." + "<br>";
    if (form.getValue("DTEMISSAOIDENT") == "")
      msg += "Data Emiss&atilde;o RG." + "<br>";
    if (form.getValue("TITULOELEITOR") == "")
      msg += "T&iacute;tulo de Eleitor." + "<br>";
    if (form.getValue("TITULOELEITOR") == "")
      msg += "Zona do T&iacute;tulo de Eleitor" + "<br>";
    if (form.getValue("DTTITELEITOR") == "")
      msg += "Data Emiss&atilde;o do T&iacute;tulo de Eleitor" + "<br>";
    if (form.getValue("SECAOTITELEITOR") == "")
      msg += "Se&ccedil;&atilde;o do T&iacute;tulo de Eleitor" + "<br>";
    if (form.getValue("UFTITULO") == "")
      msg += "UF do T&iacute;tulo de Eleitor" + "<br>";
    if (form.getValue("txtCartTrab") == "") msg += "CTPS" + "<br>";
    if (form.getValue("txtSerieCart") == "")
      msg += "S&eacute;rie da CTPS" + "<br>";
    if (form.getValue("dtDataEmissaoCartTrab") == "")
      msg += "Data Emiss&atilde;o CTPS" + "<br>";
    if (form.getValue("CODUFCTPS") == "") msg += "UF CTPS" + "<br>";
    if (form.getValue("txtTELEFONE") == "") msg += "Telefone" + "<br>";
    if (form.getValue("txtCELULAR") == "") msg += "Celular" + "<br>";
    if (form.getValue("txtTElCont") == "")
      msg += "Telefone de Contato" + "<br>";
    if (form.getValue("CERTIFRESERV") == "" && form.getValue("txtSexo") == "M")
      msg += "Certificado de Reservista" + "<br>";
    if (
      form.getValue("DtCERTIFRESERV") == "" &&
      form.getValue("txtSexo") == "M"
    )
      msg += "Data Emiss&atilde;o do Certificado de Reservista" + "<br>";
    if (form.getValue("PIS") == "") msg += "PIS" + "<br>";
    if (form.getValue("txtCODTIPORUA") == "")
      msg += "Tipo de Logradouro" + "<br>";
    if (form.getValue("txtRUA") == "") msg += "Logradouro/Rua" + "<br>";
    if (form.getValue("txtNUMERO") == "") msg += "N&uacute;mero" + "<br>";
    if (form.getValue("txtNOMETIPOBAIRRO") == "")
      msg += "Tipo de Bairro" + "<br>";
    if (form.getValue("txtBAIRRO") == "") msg += "Bairro" + "<br>";
    if (form.getValue("txtNOMECODETD") == "") msg += "Estado" + "<br>";
    if (form.getValue("txtCODMUNICIPIO") == "")
      msg += "Munic&iacute;pio" + "<br>";
    if (form.getValue("NomeMae") == "") msg += "Nome M&atilde;e" + "<br>";
    if (form.getValue("NomePai") == "") msg += "Nome Pai" + "<br>";
    if (form.getValue("txtCEP") == "") msg += "CEP" + "<br>";
    if (form.getValue("txtCODPAIS") == "") msg += "Pais" + "<br>";

    // ... (depois das validações de Contato)
    if (form.getValue("IDDESC_EMPRESAFILIAL") == "") msg += "Empresa - Filial." + "<br>";
    if (form.getValue("descricaoJornada") == "") msg += "Jornada de Admissão." + "<br>";
    if (form.getValue("FUN_ADMISSAO") == "") msg += "Data de Admissão." + "<br>";
    //if (form.getValue("FUN_CCIDDESC") == "") msg += "Centro de Custo." + "<br>"; // Remoção obrigatoriedade
    if (form.getValue("FUN_SECAO_IDDESC_AD") == "") msg += "Seção." + "<br>";
    //if (form.getValue("FUN_CATEGORIA_IDDESC_AD") == "") msg += "Categoria Funcionário." + "<br>"; // Remoção obrigatoriedade
    if (form.getValue("FUN_IDDESCFUN") == "") msg += "Função." + "<br>";
    if (form.getValue("FUN_VLRSALARIO") == "") msg += "Salário." + "<br>";
    // if (form.getValue("FUN_TIPOPGTO_IDDESC_AD") == "") msg += "Tipo de Pagamento." + "<br>"; // Remoção obrigatoriedade
    // if (form.getValue("FUN_IDDESCSIND") == "") msg += "Sindicato." + "<br>"; // Remoção obrigatoriedade
    // if (form.getValue("FUN_CATESOCIAL_IDDESC_AD") == "") msg += "Categoria eSocial." + "<br>"; // Remoção obrigatoriedade
    // ... (continuar com as validações de 'cpTpRecrutamento', etc., que já estavam lá)

    if (form.getValue("BancoPAgto") == "")
      msg += "Banco de Pagamento " + "<br>";
    // if ((form.getValue("cpNecTreinamento"))  =="")
    // 	msg += "Necess&aacute;rio treinamento (s)" + "<br>";
    // if (((form.getValue("cpJustTrein"))  =="") && ((form.getValue("cpNecTreinamento"))  =="1"))
    // 	msg += "Justificar caso a resposta acima seja positiva" + "<br>";
    // if ((form.getValue("cpAtendComp"))  =="")
    // 	msg += "Atende a Matriz de Competências." + "<br>";
    // if (((form.getValue("cpJustComp"))  =="") && ((form.getValue("cpAtendComp"))  =="2"))
    // 	msg += "Justificar caso a resposta seja negativa" + "<br>";
    if (form.getValue("AgPagto") == "")
      msg += "Ag&ecirc;ncia de Pagamento " + "<br>";
    if (form.getValue("ContPagto") == "") msg += "Conta de Pagamento " + "<br>";
    if (form.getValue("TipodeContPagto") == "")
      msg += "Tipo de Conta " + "<br>";
    if (form.getValue("FGTSBANPagto") == "") msg += "Banco FGTS " + "<br>";



    if (form.getValue("Substituicao") == "")
      msg += "Substitui&ccedil;&atilde;o" + "<br>";
    if (form.getValue("CatPonto") == "") msg += "Categoria do Ponto" + "<br>";
    if (form.getValue("ContSalBrad") == "")
      msg += "Conta Sal&aacute;rio " + "<br>";
    if (form.getValue("Planodonto") == "")
      msg += "Plano Odontol&oacute;gico " + "<br>";
    if (form.getValue("PlanoSaude") == "")
      msg += "Plano de Sa&uacute;de " + "<br>";
    if (form.getValue("MarcaPonto") == "") msg += "Marca Ponto" + "<br>";
    if (form.getValue("ValeTransp") == "") msg += "Vale Transporte" + "<br>";
    if (form.getValue("ValeAlim") == "")
      msg += "Vale Alimenta&ccedil;&atilde;o" + "<br>";
    if (form.getValue("ValeCesta") == "") msg += "Cesta" + "<br>";
    // if ((form.getValue("ValeRefeicao"))  =="")
    // 	msg += "Vale Refei&ccedil;&atilde;o" + "<br>"
    // if ((form.getValue("TreinRH"))  =="")
    // 	msg += "Atende a matriz de competência" + "<br>"
    if (form.getValue("txtFuncAtivo") == "FUNC_ATIVO")
      msg +=
        "Existem funcionários ativos utilizando o CPF informado, gentileza verificar." +
        "<br>";
    if (
      form.getValue("TxtContSind") == "J" &&
      form.getValue("TxtVlrContSind") == ""
    )
      msg += "Valor da Contribui&ccedil;&atilde;o Sindical" + "<br>";
    if (
      form.getValue("TxtContSind") == "J" &&
      form.getValue("TxtDtContSind") == ""
    )
      msg += "Data da Contribui&ccedil;&atilde;o Sindical" + "<br>";
    if (form.getValue("txtEmail") == "") msg += "E-mail de Contato" + "<br>";
    if (form.getValue("AddCombust") == "")
      msg += "Crédito Combustível" + "<br>";
    if (form.getValue("AuxMoradia") == "") msg += "Auxiliar Moradia" + "<br>";
    if (form.getValue("AddPericulosidade") == "")
      msg += "Adicional Periculosidade" + "<br>";
    if (form.getValue("gratificacao") == "") msg += "Gratificação" + "<br>";
    if (form.getValue("AddInsul") == "")
      msg += "Adicional Insalubridade" + "<br>";
  }
  //gestor
  if (atividade == 7 && acaoUsuario == "true") {
    if (form.getValue("cpAprovacaoGestor") == "0")
      msg += "Aprova&ccedil;&atilde;o." + "<br>";

    if (
      form.getValue("cpAprovacaoGestor") == "2" &&
      form.getValue("cpParecerAprovGestor") == ""
    )
      msg += "Parecer de Reprova&ccedil;&atilde;o." + "<br>";
  }

  //diretor
  if (atividade == 8 && acaoUsuario == "true") {
    if (form.getValue("cpAprovacaoDiretor") == "0")
      msg += "Aprova&ccedil;&atilde;o." + "<br>";

    if (
      form.getValue("cpAprovacaoDiretor") == "2" &&
      form.getValue("cpParecerAprovaDiretor") == ""
    )
      msg += "Parecer de Reprova&ccedil;&atilde;o." + "<br>";
  }
  //reabertura
  if (atividade == 41 && acaoUsuario == "true") {
    if (form.getValue("cpReaberturaChamado") == "")
      msg += "Aprova&ccedil;&atilde;o." + "<br>";

    if (
      form.getValue("cpReaberturaChamado") == "2" &&
      form.getValue("cpReaberturaChamado") == ""
    )
      msg += "Parecer de Reprova&ccedil;&atilde;o." + "<br>";
  }
  //rh
  if (atividade == 74 && acaoUsuario == "true") {
    if (form.getValue("cpAprovacaoRH") == "0")
      msg += "Aprova&ccedil;&atilde;o." + "<br>";

    if (
      form.getValue("cpAprovacaoRH") == "2" &&
      form.getValue("cpParecerAprovaRH") == ""
    )
      msg += "Parecer de Reprova&ccedil;&atilde;o." + "<br>";
  }
  //valida kit
  if (atividade == 97 && acaoUsuario == "true") {
    if (form.getValue("cpAprovacaoKit") == "0")
      msg += "Aprova&ccedil;&atilde;o." + "<br>";

    if (
      form.getValue("cpAprovacaoKit") == "2" &&
      form.getValue("cpParecerAprovaKit") == ""
    )
      msg += "Parecer de Reprova&ccedil;&atilde;o." + "<br>";
  }

  if (atividade == 74 && acaoUsuario == "true") {
    if (form.getValue("txtChapaJaExiste") == "2")
      msg +=
        "Chapa j&aacute; existe na base, gentileza informar outra." + "<br>";
  }

  if (msg != "") {
    throw "<br> ERRO! <br>Campo(s) n&atilde;o informado(s): <br>" + msg;
  }
}