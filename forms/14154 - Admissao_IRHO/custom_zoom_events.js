/* custom_zoom_events.js - Versão "Blindada" contra conflitos */

console.log(">>> Carregando scripts customizados de Zoom (Modo Extensão)...");

// 1. Salva a função antiga (que cuida da Empresa/Filial) numa variável
var beforeZoomItemSelected = window.setSelectedZoomItem;
var beforeZoomItemRemoved = window.removedZoomItem;

// 2. Redefine a função principal
window.setSelectedZoomItem = function(selectedItem) {

    // A) Primeiro, chama a lógica antiga (se ela existir)
    // Isso garante que o filtro de Empresa/Filial continue funcionando
    if (typeof beforeZoomItemSelected === "function") {
        beforeZoomItemSelected(selectedItem);
    }

    // B) Agora, aplica a NOVA lógica (Template de E-mail)
    if (selectedItem.inputId == "cpEmailCandidatoInicio") {
        console.log("--- ZOOM EMAIL SELECIONADO ---");
        
        var corpoTexto = selectedItem["mail_corpo"];
        var assuntoTexto = selectedItem["mail_assunto"];

        $("#hidden_mail_assunto").val(assuntoTexto);
        $("#hidden_mail_corpo").val(corpoTexto);

        console.log("Assunto carregado:", assuntoTexto);
    }
}

// 3. Faz o mesmo para a função de remover item
window.removedZoomItem = function(removedItem) {

    // A) Chama a lógica antiga
    if (typeof beforeZoomItemRemoved === "function") {
        beforeZoomItemRemoved(removedItem);
    }

    // B) Nova lógica
    if (removedItem.inputId == "cpEmailCandidatoInicio") {
        $("#hidden_mail_assunto").val("");
        $("#hidden_mail_corpo").val("");
        console.log("--- ZOOM EMAIL REMOVIDO: Campos limpos ---");
    }
}