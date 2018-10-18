var agendamentoConflitante = false;

// os tipos de conflitos de agenda podem ser por agendamento já realizado para a mesma sala, data e hora
// ou por horário de início selecionado maior ou igual ao horário de término pretendido.
var tipoDeConflito = 0;

$( window ).load(function() { 
	    
	ExibirDetalhesDaSala();
	
	$(".sala select").change(function(){
		ExibirDetalhesDaSala();
		VerificarAgendamentos()        
		
    });
	
	$(".dataInicioAgendamento .ms-dttimeinput select").change(function(){
		VerificarAgendamentos()        
		
    });
    
	$(".dataFinalAgendamento .ms-dttimeinput select").change(function(){
		VerificarAgendamentos()        
		
    });  
});

// Executa o script de verificação quando a página faz postback
ExecuteOrDelayUntilScriptLoaded(function() {          
    
   	VerificarAgendamentos();
           
}, "SP.js");

// Exibe os detalhes sobre a sala selecionada
function ExibirDetalhesDaSala() {

	var nomeDaSala = $(".sala option:selected").text()
	
	var ctx = new SP.ClientContext.get_current();
	var web = ctx.get_web();
	var lists = web.get_lists();
	ctx.load(lists);
	var list = lists.getByTitle("Salas de Reunião");
	var camlQuery = new SP.CamlQuery();
	camlQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name='Title' /><Value Type='Text'>" + nomeDaSala + "</Value></Eq></Where></Query></View>");	

	itemCollection = list.getItems(camlQuery);
	ctx.load(itemCollection);

	ctx.executeQueryAsync(Function.createDelegate(this, this.onSuccess),Function.createDelegate(this,this.onFailed));
} 
	
function onSuccess(sender, args) {  
                                    
 if (itemCollection.get_count() > 0) {
 
        var enumerator = itemCollection.getEnumerator();
        
        while (enumerator.moveNext()) {
        
            currentListItems = enumerator.get_current();
            
            var ramal = currentListItems.get_item("ramal");
            
            if (ramal == null)
            ramal = "Não possui";
            
            $('.sala').children().eq(1).remove();
            
        	$(".sala").append('<td>Localização: ' + currentListItems.get_item("local") + 
        	'<br/> Recursos: ' + currentListItems.get_item("recursos") +
        	'<br/> Capacidade: ' + currentListItems.get_item("capacidade") + 
        	'<br/> Ramal: ' + ramal + '</td>');
        	
			$('.sala td').css("paddingTop", "10px");           					
        }
    }	                               
}
// Final

// Verifica se existem agendamentos reservados para a mesma sala, data e hora selecionada    
function VerificarAgendamentos() {

	var ctx1 = new SP.ClientContext.get_current();
	var web1 = ctx1.get_web();
	var lists1 = web1.get_lists();
	ctx1.load(lists1);
	var list1 = lists1.getByTitle("AgendaSalasdeReuniao");
	var camlQuery1 = new SP.CamlQuery();
	camlQuery1.set_viewXml("<View></View>");	

	itemCollection1 = list1.getItems(camlQuery1);
	ctx1.load(itemCollection1);

	ctx1.executeQueryAsync(Function.createDelegate(this, this.onSuccess1),Function.createDelegate(this,this.onFailed));
}
// 
	
function onSuccess1(sender, args) {  
                                    
 if (itemCollection1.get_count() > 0) {
 
        var enumerator1 = itemCollection1.getEnumerator();
        
        while (enumerator1.moveNext()) {
            
            currentListItems1 = enumerator1.get_current();            
            
            // Verifica se a sala de reunião selecionada já está agendada
            // Em caso postivo continua com o restante das verificações
            if($(".sala option:selected").text() == currentListItems1.get_item("sala").get_lookupValue()){
                            
	            // Verifica se é uma atividade diária, que não inicia ou termina em uma hora específica.
	            if ($('.dataInicioAgendamento .ms-dttimeinput select').length == 0 && 
	            $('.dataFinalAgendamento .ms-dttimeinput select').length == 0)
	            {
	            	if ($('.dataInicioAgendamento input').val() == currentListItems1.get_item("EventDate").toLocaleDateString() &&
		            	$('.dataFinalAgendamento input').val() == currentListItems1.get_item("EndDate").toLocaleDateString())
		            	agendamentoConflitante = true;
		            	tipoDeConflito = 2;
		            	return;
	            }
	            else
	            {	            
		            // Armazena o horário inicial do agendamento já cadastrado na lista
					// Remove os "segundos (00:00)" da data retornada e aplica o padrão (HH:MM)
		            var horaInicio = currentListItems1.get_item("EventDate").toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
		            
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
											
						var horaTerminoSelecionada =  horaTerminoSelecionadaDrpDown + horaTerminoSelecionadaDrpDown1;
						
						// Verifica se para a data selecionada os horários de início e fim coincidem com algum já agendado            	
		            	if (horaInicioSelecionada == horaInicio){
		            		agendamentoConflitante = true; 
		            		tipoDeConflito = 0;           			
		            		return;
		            	}            		
		            	else if (horaInicioSelecionada <= horaInicio && horaTerminoSelecionada >= horaFim){
		            		agendamentoConflitante = true; 	
		            		tipoDeConflito = 0;            		            		
		            		return;
		            	}
		            	else if (horaInicioSelecionada >= horaInicio && horaInicioSelecionada < horaFim){
		            		agendamentoConflitante = true;
		            		tipoDeConflito = 0;
		            		return;
		            	}
		            	else if(horaInicioSelecionada >= horaTerminoSelecionada){
		            		agendamentoConflitante = true;
		            		tipoDeConflito = 1;	            		
		            	}
		            	else
		            		agendamentoConflitante = false;
		            }
        	
        		}
        	}
        	else
        		agendamentoConflitante = false;
     	}
    }	                               
}

function onFailed(sender, args) {
        console.log("Algo deu errado");
}

// Verifica os dados antes de submeter o form
function PreSaveAction(){
   
if($(".sala option:selected").text() == "(Nenhum)"){
   alert('Selecione uma sala');   		
	return false;
}

if (agendamentoConflitante){

	switch(tipoDeConflito){
	  case 0:
	    alert('Já existe uma reserva para o período selecionado.');
	    break
	    
	  case 1:
	    alert("A hora de término deve ser maior que a hora de início");
	    break
	    
	  case 2:
	    alert("Você não pode agendar uma atividade diária para esta data pois já existe uma reserva para o período");
	    break
	}   			
	return false;
}
else
	return true;  
}