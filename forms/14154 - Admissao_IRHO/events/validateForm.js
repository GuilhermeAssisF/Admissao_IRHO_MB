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

    // DADOS DO COLABORADOR
    if (form.getValue("cpfcnpj") == "") msg += "CPF." + "<br>";
    if (form.getValue("txtNomeColaborador") == "") msg += "Nome Colaborador." + "<br>";
    if (form.getValue("dtDataNascColaborador") == "") msg += "Data de Nascimento do Colaborador." + "<br>";

    // DADOS DE CONTATO
    if (form.getValue("txtEmail") == "") msg += "E-mail de Contato." + "<br>";
    if (form.getValue("txtCELULAR") == "") msg += "Celular." + "<br>";
    if (form.getValue("txtTELEFONE") == "") msg += "Telefone." + "<br>";
    if (form.getValue("txtTElCont") == "") msg += "Telefone de Contato." + "<br>";

    // DADOS DA CONTRATAÇÃO
    if (form.getValue("IDDESC_EMPRESAFILIAL") == "") msg += "Empresa - Filial." + "<br>";
    if (form.getValue("descricaoJornada") == "") msg += "Jornada de Admissão." + "<br>";
    if (form.getValue("FUN_ADMISSAO") == "") msg += "Data de Admissão." + "<br>";
    if (form.getValue("FUN_TPADMISSAO_IDDESC_AD") == "") msg += "Tipo de Admissão." + "<br>";
    if (form.getValue("FUN_SECAO_IDDESC_AD") == "") msg += "Seção." + "<br>";
    if (form.getValue("FUN_IDDESCFUN") == "") msg += "Função." + "<br>";
    if (form.getValue("FUN_VLRSALARIO") == "") msg += "Salário." + "<br>";
    if (form.getValue("FUN_IDDESCTURN") == "") msg += "Turno de Trabalho." + "<br>";
    if (form.getValue("FUN_SEQTURN_IDDESC_AD") == "") msg += "Sequência do Turno." + "<br>";
    if (form.getValue("FUN_TPJORNADA") == "") msg += "Tipo de Jornada." + "<br>";

    // INFORMAÇÕES GERAIS (EXAME/RH)
    if (form.getValue("cpDataHoraExame") == "") msg += "Data e Hora do exame médico do candidato." + "<br>";
    if (form.getValue("cpEnderecoClinica") == "") msg += "Endereço da Clinica do exame médico." + "<br>";
    if (form.getValue("cpNomeClinica") == "") msg += "Nome da Clínica do exame médico." + "<br>";
    if (form.getValue("cpEmailCandidatoInicio") == "") msg += "Tipo de e-mail que o candidato recebe." + "<br>";

    // Manter validação de segurança para CPF
    if (form.getValue("txtFuncAtivo") == "FUNC_ATIVO")
      msg += "Existem funcionários ativos utilizando o CPF informado, gentileza verificar." + "<br>";
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