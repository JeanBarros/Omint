// O SharePoint usa sua própria função onload
// Aguarda o carregamento do JQuery então depois executa as chamadas aos demais scripts
_spBodyOnLoadFunctionNames.push("CarregarRepeatingTable");

function ExibirAniversariantes(){
    
    // Retorna as datas de aniversário de todos os usuer
    var dataAniversario = $("#Birthday .ms-srch-ellipsis")

    // Get current date
    var dataAtual = new Date();
    // O objeto "Date" inicia a contagem dos meses em Zero
    //Adiciona 1 para contar o mes de janeiro como mês 1
    var mesAtual = dataAtual.getMonth() + 1;

    // Get current date + 30 days
    var dataSubsequente = new Date()
    dataSubsequente.setDate(dataSubsequente.getDate() + 60)
    var mesLimite = dataSubsequente.getMonth() + 1
    var diaLimite = dataSubsequente.getDate()

    for (i=0; i < dataAniversario.length; i++)
    {
        var numeradorId = 0;
            
        // A numeração do id do aniversariante antes da palavra "_peopleContainer" inicia em 2
        // Então é necessário adicionar 2 a variável numeradorId
        numeradorId = i + 2;
        
        // Cada linha contém os dados de um usuário (foto, nome e data) e um ID único
        // Os ids mudam apenas o número antes da palavra "_peopleContainer"   
        // O ID é concatenado com a variável para acessar cada elemento corretamente
        var id_Aniversariante = "#ctl00_ctl49_g_efb1bfa9_c9c9_48ef_9677_34b5c0d3fcf3_csr" + numeradorId + "_peopleContainer"

        console.log(dataAniversario[i].textContent) 
        $(id_Aniversariante).css("display","none")

        var diaMes_aniversario = dataAniversario[i].textContent.trim()
        var aniversario = diaMes_aniversario.split(' '); 
        var dia =  parseInt(aniversario[0])
        var mes = aniversario[1]

        // O objeto "Date" inicia a contagem dos meses em Zero
        //Decresce 1 para contar o mes de janeiro como mês 0
        var anivesario = new Date(dataAtual.getFullYear(), (GetMonthNumber(mes)-1), dia)
        var proximos30Dias = new Date(dataSubsequente.getFullYear(), (mesLimite-1), diaLimite)
        
        /* Exibe todos os aniversariantes do mês atual
        if(mes == GetMonthName(mesAtual))
        {
            $(id_Aniversariante).css("display","block")
        }*/

        // Exibe os aniversariantes do dia atual e dos proximos 30 dias
        if (anivesario >= dataAtual && anivesario <= proximos30Dias)
        {
            $(id_Aniversariante).css("display","block")
        }                
    }

    $(".box-aniversariantes-home").css("visibility","visible")
    $("#loadingArea").css("display","none")    
}

function CarregarRepeatingTable(){

    // A webpart de aniversariantes faz o carregamento de todos os itens antes de filtrá-los
    // Exibe todos os colaboradores, independente do mês de aniversário
    // Oculta a webpart até que o carregamento e filtragem esteja totalmente concluída.
    /*$(".box-aniversariantes-home").css("visibility","hidden")
    $(".sb-content").append("<div id='loadingArea'>Carregando...</div>")
    $("#loadingArea").css({'padding' : '10px', 'font-weight' : 'bold'})*/

    var { horariosDisponiveis, i } = CarregarHorariosDisponiveis();    
    
	  // define the data you want captured in the repeating field
	  var fields = [{type:"choice",label:"Dias de atuação",choices:["Selecione", "Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira", "Sexta-feira"]},
                  {type:"choice",label:"Hora inicial",choices:[horariosDisponiveis][0]},
                  {type:"choice",label:"Hora final",choices:[horariosDisponiveis][0]},
	              {type:"choice",label:"Serviço",choices:["Selecione", "Costureira","Design de Sobrancelha","Manicure","Massagem", "Naturologia", "Sapateiro"]}
	             ];
	             
	  // find and hide the text area
	  var textarea = document.querySelector("[title=\"Dados de agendamento\"]");
	  // textarea.style.display = "none"; // uncomment this line to hide the text area
	  // create a new container for your repeating field
	  
	  var repeatingData = [];
	  var container = document.createElement("div");
      textarea.parentNode.appendChild(container);
      
	  // add a button for adding new rows
	  var addButton = document.createElement("input"); 
	  addButton.setAttribute("type","button");
	  addButton.value = "Add row";
	  addButton.addEventListener("click",function(){addRow();});
	  textarea.parentNode.appendChild(addButton);
      
      // get the existing data, if any
      var existing = JSON.parse(textarea.value);
      
	  for(var i = 0; i < existing.length; i++){
	    addRow(existing[i]);
      }
      
	  function addRow(data){

	    if(typeof data === "undefined"){
	      data = {};
        }
        
	    repeatingData.push(data);
	    var last = repeatingData.length-1;
        var index = last;
        
	    if(last > 0){index = repeatingData[index-1]["data-id"] + 1;}
        
        repeatingData[last]["data-id"] = index;
	    var row = document.createElement("div");   
	    row.setAttribute("data-id",index);
	    row.style.border = "1px solid black";
	    row.style.margin = "2px"; row.style.padding = "2px";
        
        for(var i = 0; i < fields.length; i++){
	      var field = fields[i];
	      var lbl = document.createElement("span");
	      lbl.insertAdjacentHTML("beforeend",field.label+": ");
	      row.appendChild(lbl);
	      switch(field.type){
	          case "text":      
	            var txt = document.createElement("input");
	            txt.setAttribute("type","text");
	            if(data[field.label]){
	               txt.value = data[field.label];
	            }
	            (function(label){
	              txt.addEventListener("keyup",function(){
	                getRecord(index)[label]=this.value;
	                updateTextArea();});
	            })(field.label);
	            row.appendChild(txt);
	            break;
	          case "choice":
	            var sel = document.createElement("select");
	            for(var j = 0; j < field.choices.length; j++){
	              var option = document.createElement("option");
	              option.value = field.choices[j];
	              option.appendChild(document.createTextNode(field.choices[j]));
	              sel.appendChild(option);
	            }
	            if(data[field.label]){
	               sel.value = data[field.label];
	            }
	            (function(label){
	              sel.addEventListener("change",function(){
	                getRecord(index)[label]=this.value;
	                updateTextArea();});
	            })(field.label);
	            row.appendChild(sel);
	            break;
	      }
	      row.appendChild(document.createElement("br"));
	    }
            var remove = document.createElement("a");
            remove.href = "return false;";
            row.appendChild(remove);
            remove.innerHTML = "remove";    
            remove.addEventListener("click",function(event){
            event.preventDefault(); 
            repeatingData.splice(getRecordIndex(index),1); 
            container.removeChild(row); 
            updateTextArea();
            return false;});
            container.appendChild(row);
            updateTextArea();
        }
      
        function getRecord(i){
        return repeatingData[getRecordIndex(i)];
        }
        
        function getRecordIndex(i){
            for(var j = 0; j < repeatingData.length; j++){
                if(repeatingData[j]["data-id"] == i){
                return j;
            }
        }
    return -1;
    }
    
    function updateTextArea(){
        textarea.value = JSON.stringify(repeatingData);
    }
}

// Horários disponíveis
function CarregarHorariosDisponiveis() {
    var hours, minutes;
    var horariosDisponiveis = ["Selecione"];
    // hora inicial e final contadas em minutos
    // adiciona os intervalos de 15 minutos
    for (var i = 480; i <= 1080; i += 15) {
        hours = Math.floor(i / 60);
        minutes = i % 60;
        if (hours < 10) {
            hours = '0' + hours; // Adicionao um zero à esquerda das horas menores que 10
        }
        if (minutes < 10) {
            minutes = '0' + minutes; // Adicionao um zero à esquerda dos minuntos
        }
        var horarioSelecionado = hours + ':' + minutes;
        horariosDisponiveis.push(horarioSelecionado);
    }    
    return { horariosDisponiveis, i };
}

// Converte o nome do mês para o número equivalente
function GetMonthNumber(numeroMes){
    switch(numeroMes) {
        case "January": numeroMes = 01
            break;
        case "February": numeroMes = 02 
            break;
        case "March": numeroMes = 03 
            break;
        case "April": numeroMes = 04
            break;
        case "May": numeroMes = 05 
            break;
        case "June": numeroMes = 06 
            break;
        case "July": numeroMes = 07 
            break;
        case "August": numeroMes = 08 
            break;
        case "September": numeroMes = 09 
            break;
        case "October": numeroMes = 10 
            break;
        case "November": numeroMes = 11
            break;
        case "December": numeroMes = 12
            break;	        
    }        
    return numeroMes
}

// Converte o numero do mês para o nome equivalente
function GetMonthName(nomeMes){
    switch(nomeMes) {
        case 01: nomeMes = "January"
            break;
        case 02: nomeMes = "February"
            break;
        case 03: nomeMes = "March"
            break;
        case 04: nomeMes = "April"
            break;
        case 05: nomeMes = "May"
            break;
        case 06: nomeMes = "June"
            break;
        case 07: nomeMes = "July"
            break;
        case 08: nomeMes = "August"
            break;
        case 09: nomeMes = "September"
            break;
        case 10: nomeMes = "October"
            break;
        case 11: nomeMes = "November"
            break;
        case 12: nomeMes = "December"
            break;	        
    }        
    return nomeMes
}  

window.onload = function() {

    ExibirAniversariantes()
    $("#MSOZoneCell_WebPartWPQ5").addClass("resumoAniversario");
}