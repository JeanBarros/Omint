﻿var postBack = false

var agendamentoDuplicado = false;

$( window ).load(function() { 

	//checkCookie();
	
	RemoverItensDuplicados ();
	LimparDropDownProfissionais();	
	VerificarAgendamentos();  
	
	var profissionalSelecionado = $(".listaProfissionais option:selected").text();
	$("#ispostback:text").val(profissionalSelecionado);
    
	$(".listaFuncoes select").change(function(){
		// Se não houver postback, a variável é atualizada
		postBack = false
		CarregarDropDownProfissionais();         
		
    }); 
    
	$(".dataInicioAgendamento .ms-dttimeinput select").change(function(){
		VerificarAgendamentos()        
		
    });   
});

ExecuteOrDelayUntilScriptLoaded(function() {  
        
     VerificarAgendamentos() 
     
    // A função "ExecuteOrDelayUntilScriptLoaded" gera post back
    // Então o valor da variável é alterado para true
    postBack = true
    
    CarregarDropDownProfissionais();    
           
}, "SP.js");

// Manipula as informações sobre as funções disponíveis
// Os dados são recuperados da lista "Profissionais BemEstar" através da CamlQuery
function CarregarDropDownProfissionais() {	

	var ctx = new SP.ClientContext.get_current();
	var web = ctx.get_web();
	var lists = web.get_lists();
	ctx.load(lists);
	var list = lists.getByTitle("Profissionais BemEstar");
	var camlQuery = new SP.CamlQuery();
	//camlQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name='ID' /><Value Type='Counter'>" + idProfissional + "</Value></Eq></Where></Query></View>");	
	camlQuery.set_viewXml("<View></View>");

	itemCollection = list.getItems(camlQuery);
	ctx.load(itemCollection);

	ctx.executeQueryAsync(Function.createDelegate(this,this.onSuccess),Function.createDelegate(this,this.onFailed));
}

function onSuccess(sender, args) {  
	                                    
if (itemCollection.get_count() > 0) {

		var funcaoDoProfissional = [];
		var contFuncao = 0;
		
		var idDoProfissional = [];
		var contID = 0;
		
		var nomeDoProfissional = [];
		var contNome = 0;
		
		var arrFuncoes = [];
		
		var funcaoSelecionada = $(".listaFuncoes option:selected").text();
		
		var enumerator = itemCollection.getEnumerator();
		
        while (enumerator.moveNext()) {
            currentListItems = enumerator.get_current();
			
			funcaoDoProfissional[contFuncao] = currentListItems.get_item("Fun_x00e7__x00e3_o");	
			contFuncao += 1;
			
			idDoProfissional[contID] = currentListItems.get_item("ID");	
			contID += 1;		
            
            nomeDoProfissional[contNome] = currentListItems.get_item("Title");
			contNome += 1;

            //$(".detalhesDoProfissional").empty();
            
            //$(".detalhesDoProfissional li").append(currentListItems.get_item("Title"));
            
	        /*$(".detalhesDoProfissional").append('<li>' + currentListItems.get_item("Title") 
	        + '&nbsp; &nbsp;' + currentListItems.get_item("ID") 
	        + '<img src=' + currentListItems.get_item("Foto").$1_1 + '></li>');	*/						        					
        }
        
        // Adiciona no array o nome da função retornada da lista de profissionais através da CamlQuery
        // Mais de um profissional pode executar a mesma função
        for (i = 0; i < funcaoDoProfissional.length; i++) {
    		
    		arrFuncoes[i] = funcaoDoProfissional[i];
    		//$(".detalhesDoProfissional").append('<li>' + funcaoDoProfissional[i] + '</li>');     					  		
		}
		
		// Remove os itens que não sejam iguais a função selecionada no dropDown de funções	   
	   	var totalFuncoes = arrFuncoes.length;
	   
	    for (i = 0; i < totalFuncoes; i++){
		   for (j = 0; j < arrFuncoes.length; j++) {
	    		
	    		if (arrFuncoes[j] != funcaoSelecionada)
	    			arrFuncoes.splice(j, 1);
			}
			
			if (arrFuncoes.length == 1)
	    		break;
		 }
		
		
		// Compara a função selecionada com as funções da lista de profissionais
	   	// então retorna o nome dos profissionais coincidentes
	   	for (i = 0; i < funcaoDoProfissional.length; i++) {
    		if (funcaoSelecionada == funcaoDoProfissional[i]){
    		
    			var profissional = nomeDoProfissional[i];
    			
    			if(postBack != true)
    			$(".listaProfissionais select").append('<option value="' + (i + 1) + '">' + profissional + '</option>');

    			
				/*$('.listaProfissionais option').each(function() {    					
					if(!this.selected) {
						$(".listaProfissionais select").append('<option value="' + (i + 1) + '">' + profissional + '</option>');
					}
				});*/
    		}
    	}	      
	}                    
} // Final
	    
function onFailed(sender, args) {
        console.log("Algo deu errado");
}

// Remove valores duplicados do dropdown de funções
function RemoverItensDuplicados () {
	
    var usedNames = {};
	$(".listaFuncoes option").each(function () {
	    if(usedNames[this.text]) {
	        $(this).remove();
	    } 
	    else {
	        usedNames[this.text] = this.value;
	    }
	});
}

// Remove todos os itens do dropDown que será populado dinamicamente 
//com os profissionais relacionados a função escolhida
function LimparDropDownProfissionais () {
	$(".listaProfissionais option").remove(); 
	$(".listaProfissionais select").prepend('<option value="0"> (Nenhum) </option>');
}

function VerificarAgendamentos() {

	var ctx1 = new SP.ClientContext.get_current();
	var web1 = ctx1.get_web();
	var lists1 = web1.get_lists();
	ctx1.load(lists1);
	var list1 = lists1.getByTitle("AgendaSalaBemEstar");
	var camlQuery1 = new SP.CamlQuery();
	camlQuery1.set_viewXml("<View></View>");	

	itemCollection1 = list1.getItems(camlQuery1);
	ctx1.load(itemCollection1);

	ctx1.executeQueryAsync(Function.createDelegate(this, this.onSuccess1),Function.createDelegate(this,this.onFailed));
} 
	
function onSuccess1(sender, args) {  
                                    
 if (itemCollection1.get_count() > 0) {
        var enumerator1 = itemCollection1.getEnumerator();
        while (enumerator1.moveNext()) {
            
            currentListItems1 = enumerator1.get_current();
                            
            // Armazena o horário inicial do agendamento já cadastrado na lista
			// Remove os "segundos (00:00)" da data retornada e aplica o padrão (HH:MM)
            var horaInicio = currentListItems1.get_item("EventDate").toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});;
            
            // Armazena o horário final já cadastrado na lista
			// Remove os "segundos (00:00)" da data retornada e aplica o padrão (HH:MM)
            var horaFim = currentListItems1.get_item("EndDate").toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
            
            // Verifica se a data de início e fim selecionadas coincidem com algum agendamento já existente na lista 
            if ($('.dataInicioAgendamento input').val() == currentListItems1.get_item("EventDate").toLocaleDateString() &&
            	$('.dataFinalAgendamento input').val() == currentListItems1.get_item("EndDate").toLocaleDateString()){
            	
            	// Armazena na variável o horário de início selecionado no formulário
            	// uma variável para o dropDown de horas e outra para os minutos.
            	var horaInicioSelecionadaDrpDown = $('.dataInicioAgendamento .ms-dttimeinput select').val();
				var horaInicioSelecionadaDrpDown1 = $('.dataInicioAgendamento .ms-dttimeinput select').eq(1).val();
									
				var horaInicioSelecionada =  horaInicioSelecionadaDrpDown + horaInicioSelecionadaDrpDown1;
				
				// Armazena na variável o horário de término selecionado no formulário
            	// uma variável para o dropDown de horas e outra para os minutos.
            	var horaTerminoSelecionadaDrpDown = $('.dataFinalAgendamento .ms-dttimeinput select').val();
				var horaTerminoSelecionadaDrpDown1 = $('.dataFinalAgendamento .ms-dttimeinput select').eq(1).val();
									
				var horarioTerminoSelecionada =  horaTerminoSelecionadaDrpDown + horaTerminoSelecionadaDrpDown1;
				
				// Verifica se para a data selecionada os horários de início e fim coincidem com algum já agendado            	
            	if (horaInicioSelecionada == horaInicio && horarioTerminoSelecionada == horaFim){
            			agendamentoDuplicado = true;
            			return;
            		}
            	else
            		agendamentoDuplicado = false;
            }
        }
    }	                               
}

//PreSaveAction code to validate
function PreSaveAction(itemDuplicado)
{
   if (agendamentoDuplicado){
   		alert ('Já existe uma reserva de agendamento para a mesma data e horário');
   		return false;
   }
   else
   		return true;
    
}