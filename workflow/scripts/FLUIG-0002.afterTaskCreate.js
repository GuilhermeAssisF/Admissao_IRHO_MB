/*function afterTaskCreate(colleagueId){
	
	var Dia =hAPI.getCardValue("txtDiaLimiteProc");; 
	var Mes =hAPI.getCardValue("txtMesLimiteProc"); 
	var Ano =hAPI.getCardValue("txtAnoLimiteProc"); 
	var mesCerto=Mes-1;
	

	
	 var nrProxAtividade = getValue("WKNextState");
	    if (nrProxAtividade == "18"){ //atividade entre paralelas
	 
	        var data = new Date();
	        var numEmpresa = getValue("WKCompany");
	     
	        //seta o dia, m?s (Janeiro ? 0) e ano
	        data.setDate(Dia);
	        data.setMonth(mesCerto);
	        data.setFullYear(Ano);
	        
	        // Recupera o numero da solicita??o
	        var numProcesso = getValue("WKNumProces");
	     
	        // Seta o prazo para as 18:00
	        hAPI.setDueDate(numProcesso, hAPI.getActualThread(numEmpresa, numProcesso, nrProxAtividade), colleagueId, data, 64800);
}
	    
		 var nrProxAtividade = getValue("WKNextState");
		    if (nrProxAtividade == "66"){ //atividade entre paralelas
		 
		        var data = new Date();
		        var numEmpresa = getValue("WKCompany");
		     
		        //seta o dia, m?s (Janeiro ? 0) e ano
		        data.setDate(Dia);
		        data.setMonth(mesCerto);
		        data.setFullYear(Ano);
		        
		        // Recupera o numero da solicita??o
		        var numProcesso = getValue("WKNumProces");
		     
		        // Seta o prazo para as 18:00
		        hAPI.setDueDate(numProcesso, hAPI.getActualThread(numEmpresa, numProcesso, nrProxAtividade), colleagueId, data, 64800);
	}
}*/