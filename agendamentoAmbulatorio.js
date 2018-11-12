var agendamentoConflitante = false;
var currentUser;
var nomeUsuarioLogado;
var emailUsuarioLogado;

// Executa depois que a página está totalmente carregada 
$( window ).load(function() { 
	
	$("#txtlocal input").attr("value","Ambulatório");
	$("#txtlocal input").attr('readonly', true);
	
	var profissionalSelecionado = $(".listaProfissionais option:selected").text();
	    
	$(".listaFuncoes select").change(function(){
		//CarregarAbasProfissionais();
    }); 
    
	$(".dataInicioAgendamento .ms-dttimeinput select").change(function(){
		VerificarAgendamentos() 
    });
    
	$(".dataFinalAgendamento .ms-dttimeinput select").change(function(){
		VerificarAgendamentos()  
    });
    
    // Chama o método depois de carregar o perfil do usuário logado
    ConsultarRamalColaborador();
     
});

// Executa igual o "(document).ready()"
ExecuteOrDelayUntilScriptLoaded(function() { 
        
     VerificarAgendamentos()     
     CarregarAbasProfissionais();
     ObterUsuarioLogado();          
                
}, "SP.js");

// Obtém o usuario logado
function ObterUsuarioLogado(){

	var contextUser = new SP.ClientContext.get_current();  
    var webUser = contextUser.get_web();  
    currentUser = webUser.get_currentUser();  
    contextUser.load(currentUser); 
       
    contextUser.executeQueryAsync(onSuccessMethod, onRequestFail);    
}

function onSuccessMethod(sender, args) {  
    
  	nomeUsuarioLogado = currentUser.get_title();
  	emailUsuarioLogado = currentUser.get_email();
  		
	return emailUsuarioLogado    
}  
  
// This function runs if the executeQueryAsync call fails.  
function onRequestFail(sender, args) {  
	console.log("Algo deu errado");  
}

// Manipula as informações sobre as funções disponíveis
// Os dados são recuperados da lista "Profissionais BemEstar" através da CamlQuery
function ConsultarRamalColaborador() {	

	var ctxcolaborador = new SP.ClientContext.get_current();
	var webcol = ctxcolaborador.get_web();
	var listscol = webcol.get_lists();
	ctxcolaborador.load(listscol);
  	
	var listcol = listscol.getByTitle("Colaboradores");
	var camlQueryCol = new SP.CamlQuery();
	
	if(emailUsuarioLogado != "")
	camlQueryCol.set_viewXml("<View><Query><Where><Eq><FieldRef Name='email' /><Value Type='Text'>" + emailUsuarioLogado + "</Value></Eq></Where></Query></View>");
	else 
	{
	    $("#txtsolicitante input").attr("value",nomeUsuarioLogado);	    
		$("#txtsolicitante input").attr('readonly', true);
		
		return
	}

	itemCollectioncolaborador = listcol.getItems(camlQueryCol);
	ctxcolaborador.load(itemCollectioncolaborador);

	ctxcolaborador.executeQueryAsync(Function.createDelegate(this,this.onSuccess2),Function.createDelegate(this,this.onFailed));
}

function onSuccess2(sender, args) {  
	                                    
	if (itemCollectioncolaborador.get_count() > 0) 
	{
	    var enumeratorcolaborador = itemCollectioncolaborador.getEnumerator();
	    var ramal;
	    
	    while (enumeratorcolaborador.moveNext()) 
	    {
	        currentListItemscolaborador = enumeratorcolaborador.get_current();
	        
	        ramal = currentListItemscolaborador.get_item("ramal");
	    }
	    
	    if(ramal != null)	    		    		    
	    	$("#txtsolicitante input").attr("value",(nomeUsuarioLogado + " - Ramal: " + ramal)); 	    	    
		else 
		{
		    $("#txtsolicitante input").attr("value",nomeUsuarioLogado);	    
			$("#txtsolicitante input").attr("disabled","disabled");
		}
	}	                               
}

// Manipula as informações sobre as funções disponíveis
// Os dados são recuperados da lista "Profissionais BemEstar" através da CamlQuery
function CarregarAbasProfissionais() {	

	var ctx = new SP.ClientContext.get_current();
	var web = ctx.get_web();
	var lists = web.get_lists();
	ctx.load(lists);
	var list = lists.getByTitle("Profissionais");
	var camlQuery = new SP.CamlQuery();
	camlQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name='Categoria' /><Value Type='Choice'>Ambulatório</Value></Eq></Where><OrderBy><FieldRef Name='diaDaSemana' Ascending='True' /></OrderBy></Query></View>");

	itemCollection = list.getItems(camlQuery);
	ctx.load(itemCollection);

	ctx.executeQueryAsync(Function.createDelegate(this,this.onSuccess),Function.createDelegate(this,this.onFailed));
}

function onSuccess(sender, args) {  
	                                
var contNome = 0;
    
if (itemCollection.get_count() > 0) {

		var funcaoDoProfissional = [];
		var contFuncao = 0;
				
		var nomeDoProfissional = [];		
		
		var funcaoSelecionada = $(".listaFuncoes option:selected").text();
		
		var enumerator = itemCollection.getEnumerator();
		
        while (enumerator.moveNext()) {
            currentListItems = enumerator.get_current();
            
            funcaoDoProfissional[contFuncao] = currentListItems.get_item("Fun_x00e7__x00e3_o");	
			contFuncao += 1;		
            
            contNome += 1;
						
			$('#tabs ul').append('<li><a href="#tabs-' + contNome + '">' + currentListItems.get_item("Title") + '</a></li>');	
			
			$('#conteudoAba').append('<div id="tabs-' + contNome + '">' + '<table style="width: 885px" cellspacing="0" cellpadding="5" border="0">'
			+'<tr><td style="width:180px"><img width="130 px" src=' + currentListItems.get_item("Foto").$1_1 + '>' + '</td>'
			+'<td id="funcao" style="font-weight:bold">' + currentListItems.get_item("Fun_x00e7__x00e3_o") + '</td></tr>'
			+'<tr><td style="border-bottom: solid 1px #9bcde6">Serviços</td>'
			+'<td style="background-color:#9bcde6; border-bottom: solid 1px #ffffff">' + currentListItems.get_item("Servi_x00e7_os") + '</td></tr>'
			+'<tr><td style="border-bottom: solid 1px #9bcde6">Dia de atendimento</td>'
			+'<td id="diaAtendimento" style="background-color:#9bcde6; border-bottom: solid 1px #ffffff">' + currentListItems.get_item("Dias_x0020_de_x0020_atua_x00e7__") + 			'</td></tr>'
			+'<tr><td style="border-bottom: solid 1px #9bcde6">Horário de atendimento</td>'
			+'<td style="background-color:#9bcde6; border-bottom: solid 1px #ffffff">' + currentListItems.get_item("Hora_x0020_inicial_x0020_atendim") + '</td></tr>' 
			+'<tr><td style="border-bottom: solid 1px #9bcde6">Duração do serviço</td>'
			+'<td style="background-color:#9bcde6">' + currentListItems.get_item("Dura_x00e7__x00e3_o_x0020_do_x00") + '</td></tr>'
			+'<tr><td colspan="2" style="border: solid 1px #9bcde6; padding-top:10px">' + currentListItems.get_item("Descri_x00e7__x00e3_o") + '</td></tr></table></div>');
        }
        
        // Carrega as abas com o conteúdo retornado pela consula CAML
        $( function() {
		    $( "#tabs" ).tabs();
		  } );
				  
		// Carrega os dados que foram enviados via QueryString
		CarregarQueryString()
			  
		// Define o valor inicial do atributo SRC do iframe quando a págia é carregada
		$("#profissionaisBemEstar").attr('src','/Paginas/CalendariosAmbulatorio/' + $('#ui-id-1').text().trim().replace(/\s/g, "-") + '.aspx');
		
		var nomeDoProfissional = $('#ui-id-1').text()
		
		if(nomeDoProfissional == "Karina Nascimento")
		{
			var inicioAtendimento = "08:30"
			var finalAtendimento = "16:30"				
			var duracaoServico = 40
		}
		
		// Define os dados a serem passados via QueryString para a primeira Aba selecionada ao carregar a pagina 
		CriarQueryString($('#ui-id-1').text(), $('#tabs-1 #funcao').text(), 1, "Segunda-feira", inicioAtendimento, finalAtendimento, duracaoServico)

		// Atualiza o dropdown de profissionais e funções com o nome do profissional na aba clicada
		$("#tabs ul li").click(function(){
			
			var indxAbaSelecionada = $(this).index() + 1;
			
			// Armazena o nome, a função e o dia de atendimento do profissinal nas variáveis
			nomeDoProfissional = $('#ui-id-' + indxAbaSelecionada + '').text()
			var funcaoDoProfissional = $('#tabs-' + indxAbaSelecionada + ' #funcao').text()
			var diaAtendimento = $('#tabs-' + indxAbaSelecionada + ' #diaAtendimento').text()
			
			$(".listaProfissionais option").remove(); 
			$(".listaProfissionais select").prepend('<option value="' + indxAbaSelecionada + '">' + nomeDoProfissional + '</option>');
			
			$(".listaFuncoes option").remove(); 
			$(".listaFuncoes select").prepend('<option value="' + indxAbaSelecionada + '">' + funcaoDoProfissional + '</option>');
			
			if(nomeDoProfissional == "Karina Nascimento")
			{
				inicioAtendimento = "08:30"
				finalAtendimento = "16:30"				
				duracaoServico = 40
			}
			
			CriarQueryString(nomeDoProfissional, funcaoDoProfissional, indxAbaSelecionada, diaAtendimento, inicioAtendimento, finalAtendimento, duracaoServico)
			
			// Modifica o valor do link "Adicionar" no calendário para enviar os dados via QueryString - O Formulário abre em uma nova aba ao invés da modal padrão
			$("#ctl00_ctl47_g_1c0b2aba_7186_4cf2_bfad_7a607aa69c21_ctl01_ctl00_ctl00 a").attr("href", "javascript:void(0), EnviarDados()");
			
			$("#profissionaisBemEstar").attr('src','/Paginas/CalendariosAmbulatorio/' + $('#ui-id-' + indxAbaSelecionada + '').text().trim().replace(/\s/g, "-") + '.aspx'); 
			
	    });   
	}                    
} // Final
	    
function onFailed(sender, args) {
	console.log("Algo deu errado");
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
            var horaInicio = new Date(currentListItems1.get_item("EventDate"))
            
            // O método get_item() da biblioteca SP.JS recupera o valor da coluna que contém uma data e hora e subtrai uma hora do valor retornado.
            // Para que a checagem entre horários funcione corretamente, é necessáio adicionar "1" a função getHour.
            // A função getMinutes retorna apenas um ZERO qunado o valor é menor que 10 minutos.
			// O operador ternário verifica essa condição e adiciona mais um ZERO, definindo assim o padrão de minutos como :00
            var inicioEventoAgendado = (horaInicio.getHours() + 1) + ":" + (horaInicio.getMinutes() < 10 ? '0' + horaInicio.getMinutes() : horaInicio.getMinutes())
            
            // Armazena o horário final já cadastrado na lista
			var horaFim = new Date(currentListItems1.get_item("EndDate"))			
            var finalEventoAgendado = (horaFim.getHours() + 1) + ":" + (horaFim.getMinutes() < 10 ? '0' + horaFim.getMinutes() : horaFim.getMinutes())
            
            // Verifica se a data de início e fim selecionadas coincidem com algum agendamento já existente na lista 
            if ($('.dataInicioAgendamento input').val() == currentListItems1.get_item("EventDate").toLocaleDateString() &&
            	$('.dataFinalAgendamento input').val() == currentListItems1.get_item("EndDate").toLocaleDateString()){
            	
            	// Armazena na variável o horário de início selecionado no formulário
            	// uma variável para o dropDown de horas e outra para os minutos.
            	var horaInicioSelecionadaDrpDown = $('.dataInicioAgendamento .ms-dttimeinput select').val();
				var horaInicioSelecionadaDrpDown1 = $('.dataInicioAgendamento .ms-dttimeinput select').eq(1).val();
									
				var horaInicioSelecionada =  ConverterStringToDateTime($('.dataInicioAgendamento input').val(), 
				horaInicioSelecionadaDrpDown, horaInicioSelecionadaDrpDown1)
				
				// Armazena na variável o horário de término selecionado no formulário
            	// uma variável para o dropDown de horas e outra para os minutos.
            	var horaTerminoSelecionadaDrpDown = $('.dataFinalAgendamento .ms-dttimeinput select').val();
				var horaTerminoSelecionadaDrpDown1 = $('.dataFinalAgendamento .ms-dttimeinput select').eq(1).val();
									
				var horaTerminoSelecionada =  ConverterStringToDateTime($('.dataFinalAgendamento input').val(), 
				horaTerminoSelecionadaDrpDown, horaTerminoSelecionadaDrpDown1)
				
				// Verifica se para a data selecionada os horários de início e fim coincidem com algum já agendado            	
            	if (horaInicioSelecionada == inicioEventoAgendado){
            		agendamentoConflitante = true;            			
            		return;
            	}            		
            	else if (horaInicioSelecionada <= inicioEventoAgendado && horaTerminoSelecionada >= inicioEventoAgendado){
            		agendamentoConflitante = true;            		
            		return;
            	}
            	else if (horaInicioSelecionada >= inicioEventoAgendado && horaInicioSelecionada <= finalEventoAgendado){
            		agendamentoConflitante = true;
            		return;
            	}
            	else
            		agendamentoConflitante = false;
            }
        }
    }	                               
}

//PreSaveAction code to validate
function PreSaveAction(itemDuplicado)
{
   if (agendamentoConflitante){
   		alert('Já existe uma reserva para o período selecionado.');   		
   		return false;
   }
   else
   		return true;    
}

var parametros = "";
function CriarQueryString(nome, funcao, indice, DiaDeAtendimento, inicioAtendimento, finalAtendimento, duracaoServico)
{
	// Limpa a variável quando uma aba é clicada para adicionar novo conteúdo nela
	parametros = "";
	
	var data = new Array();
	data[0] = nome
	data[1] = funcao
	data[2] = indice
	data[3] = DiaDeAtendimento
	data[4] = inicioAtendimento
	data[5] = finalAtendimento
	data[6] = duracaoServico
	
	for (i = 0; i < data.length; i++) {
		if (i > 0) {
			parametros += ",";
		}
		parametros += escape(data[i]);
	}
	
	return parametros
}

function EnviarDados(){
	window.location = "https://omintbr.sharepoint.com/Lists/AgendaAmbulatorio/NewFormCustom.aspx?" + parametros;	
}

// inicializa a variável que armazena os dias que o profissional atende
var diasDeAtendimento = ""

// Faz a leitura dos dados fornecidos na QueryString e os armazena nas variáveis
function CarregarQueryString(){
	var query = window.location.search;
	
	if (query.substring(0, 1) == '?'){
		query = query.substring(1);
		//window.history.pushState("data", "title", "/"+window.location.href.substring(window.location.href.lastIndexOf('/') + 1).split("?")[0]);
	}
	
	var data = query.split(','); 
	
	for (i = 0; (i < data.length); i++) {
		data[i] = unescape(data[i]);
	}
		
	// Define o dropdown de profissionais com o nome do profissional na primeira aba sempre que a página for carregada
	$(".listaProfissionais option").remove(); 
	$(".listaProfissionais select").prepend('<option value=' + data[2] + '>' + data[0] + '</option>');
	
	// Define o dropdown de funções com o nome do profissional na primeira aba sempre que a página for carregada
	$(".listaFuncoes option").remove(); 
	$(".listaFuncoes select").prepend('<option value=' + data[2] + '>' + data[1] + '</option>');
	
	// O elemento com index 3 retorna os dias da semana que o profissional atende
	diasDeAtendimento = data[3];
}

// Esta função oculta o calendário nativo e exibe o customizado
$(function() {

    $(".dataInicioAgendamento input").datepicker({
        dateFormat: 'dd/mm/yy',
        dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'],
        dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
        dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
        monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
        monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
        showOn: "button",
        buttonImage: "/SiteAssets/jquery-ui-icons/calendar_25.gif",
        buttonImageOnly: true,        
    });
    
    // oculta calendário nativo 
    $(".ms-dtinput a").css("display","none"); 
      
});

// Executa assim que o documento (arquivo) é criado/atualizado em memória (antes de ser carregado no navegador)
$(document).ready(function(){
	
    $(".ui-datepicker-trigger").click(function(){
		// Envia como argumento os dias da semana atendidos pelo profissional
		DatasDiponiveis(diasDeAtendimento); 
		
			$(".ui-datepicker-header a").click(function(){
			// Envia como argumento os dias da semana atendidos pelo profissional
			DatasDiponiveis(diasDeAtendimento); 		        
	    });    		        
    });
        
});

// Bloqueia os dias quem não são atendidos e permite a seleção dos demais
function DatasDiponiveis(diasAtendidos){

	var totalDiasMes = [];
	totalDiasMes = $(".ui-datepicker-calendar tbody tr td")
	
	var diasDisponiveis = [];
	
	// Percorre todos os dias do mês exibido no calendário para formatar uma data no formato (mm/dd/yy)
	// Depois que data é formatada e passada para a função "getDay()", é possível determinar qual é o dia da semana
	for(i=0; i < totalDiasMes.length; i++){
		
		var dia = totalDiasMes[i].textContent // retorna o dia
		var mes = $(".ui-datepicker-month").text() // retorna o mes (nome do mês)
		var ano = $(".ui-datepicker-year").text() // retorna ano
						
		var numeroDoMes = ConverterDatas(mes)
			
		var dataCompleta = numeroDoMes + '/' + dia + '/' + ano;
			
		// obtém o dia da semana, de acordo com a data fornecida
		var d = new Date(dataCompleta);
		var diasDaSemana = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];
		var diaDaSemana = diasDaSemana[d.getDay()];
		
		// Separa os dias de atendimento quando o profissional atende mais de um dia por semana
		var diaAtendido = diasAtendidos.split(','); 
		
		// Perrcorre todos os dias que o profissional atende e desabilita os que estiverem fora
		for (j = 0; j < diaAtendido.length; j++) {
				
			if(diaDaSemana != diaAtendido[j]){		
				$(".ui-datepicker-calendar tbody tr td:eq(" + i + ")").addClass("ui-state-disabled");
			}
			// Quando o profissional atende mais de um dia na semana, é necessário adicionar esses dias em um array
			// Senão, quando o loop iterar pela segunda vez, vai sobrescrever a iteração anterior
			// Um loop adicional será executado para habilitar os dias em que o profissional atua
			else{
			
				diasDisponiveis += i + ',';
			}
		}		
	}// Final
		
	var diaSelecionado = diasDisponiveis.split(',')
	
	// Desbloqueia todos os dias da semana em que o profissional atua.
	for (k = 0; k < diaSelecionado.length; k++) {
	
		if(diaSelecionado[k] != ""){
		
			$(".ui-datepicker-calendar tbody tr td:eq(" + diaSelecionado[k] + ")").removeClass("ui-state-disabled");
			$(".ui-datepicker-calendar tbody tr td:eq(" + diaSelecionado[k] + ")").addClass("ui-state-default");
		}	
	}
}

// Converte o nome do mês para o número equivalente
function ConverterDatas(mes){

	switch(mes) {
	    case "Janeiro":
	        mes = "01"
	        break;
	    case "Fevereiro":
	        mes = "02"
	        break;
	    case "Março":
	        mes = "03"
	        break;
		case "Abril":
	        mes = "04"
	        break;
		case "Maio":
	        mes = "05"
	        break;
	    case "Junho":
	        mes = "06"
	        break;
	    case "Julho":
	        mes = "07"
	        break;
	    case "Agosto":
	        mes = "08"
	        break;
	    case "Setembro":
	        mes = "09"
	        break;
		case "Outubro":
	        mes = "10"
	        break;
		case "Novembro":
	        mes = "11"
	        break;
	    case "Dezembro":
	        mes = "12"
	        break;	        
	}
	
	return mes
}

// Converte strings de data e hora para DateTime em formato UTC
function ConverterStringToDateTime(dataCompleta, horas, minutos){

	var year = dataCompleta.substring(6)	
	// O objeto Date inicia a contagem dos meses em Zero e o valor retornado do formulário inicia em Um
	// A subtração por 1 é necessária é para criar a data corretamente (new Date)
	var month = parseInt(dataCompleta.substring(3,5)) - 1  
	var day = dataCompleta.substring(0, 2)
	
	var hour = parseInt(horas.substring(0,2))
	var min = minutos
	
	var horaCerta = new Date(year,month,day,hour,min)
		
	// A função getMinutes retorna apenas um ZERO qunado o valor é menor que 10 minutos
	// O operador ternário verifica essa condição e adiciona mais um ZERO, definindo assim o padrão de minutos como :00
	return horaCerta.getHours() + ":" + (horaCerta.getMinutes() < 10 ? '0' + horaCerta.getMinutes() : horaCerta.getMinutes()) 
}