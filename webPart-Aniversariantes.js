$(document).ready(function(){
    OcultarWebPart()    
});

window.onload = function() {

    ExibirAniversariantes()
    $("#MSOZoneCell_WebPartWPQ5").addClass("resumoAniversario");
}

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
        var [dia, mes] = diaMes_aniversario.split(' ');

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

    $(".box-aniversariantes-home").css("visibility","visible")
    $("#loadingArea").css("display","none")    
}

function OcultarWebPart(){    

    // A webpart de aniversariantes faz o carregamento de todos os itens antes de filtrá-los
    // Exibe todos os colaboradores, independente do mês de aniversário
    // Oculta a webpart até que o carregamento e filtragem esteja totalmente concluída.
    $(".box-aniversariantes-home").css("visibility","hidden")
    $(".sb-content").append("<div id='loadingArea'>Carregando...</div>")
    $("#loadingArea").css({'padding' : '10px', 'font-weight' : 'bold'})
}