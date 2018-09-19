$(document).ready(function() {

    if(getParameterByName("PageView") == "Shared"){
       $("#s4-bodyContainer").css("width","1800px");
    }

var currentUser;  
// Ensure that the SP.js is loaded  
if (SP.ClientContext != null) {  
  SP.SOD.executeOrDelayUntilScriptLoaded(getCurrentUser, 'SP.js');  
}  
else {  
  SP.SOD.executeFunc('sp.js', null, getCurrentUser);  
}  
   
function getCurrentUser() {  
   context = new SP.ClientContext.get_current();  
   web = context.get_web();  
  currentUser = web.get_currentUser();
  
  context.load(currentUser);  
    
  context.executeQueryAsync(onSuccessMethod, onRequestFail); 
}  
  
function onSuccessMethod(sender, args) {  
  
  var admin = currentUser.get_isSiteAdmin(); 
    
  var title = currentUser.get_title();  
   
  $("#userTitle").text(title);
  
  if(admin){
  
  }
  else
  {
   $("#s4-ribbonrow").remove();
  }
    
}  
  
// This function runs if the executeQueryAsync call fails.  
function onRequestFail(sender, args) {  
 // alert('request failed' + args.get_message() + '\n' + args.get_stackTrace());  
}  
  
  
});



function buscar()
{

var tagg = $('#buscaramais').val();
window.location='https://omintbr.sharepoint.com/search/Paginas/PeopleResults.aspx?k='+tagg

}

$(document).keypress(function(e) {
    if(e.which == 13) {
        buscar();
    }
});



// FUNC�ES �TIL

function getParameterByName(name) {
   name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
   var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
   return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function convertDateforArray(date) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();

    var mmChars = mm.split('');
    var ddChars = dd.split('');

    return yyyy + '' + (mmChars[1] ? mm : "0" + mmChars[0]) + '' + (ddChars[1] ? dd : "0" + ddChars[0]);
}

function convertHora(date) {
    var dateObject = new Date(date);
    var hr = dateObject.getHours().toString();
    var mn = dateObject.getMinutes().toString();

    var hrChars = hr.split('');
    var mnChars = mn.split('');

    return (hrChars[1] ? hr : "0" + hrChars[0]) + ':' + (mnChars[1] ? mn : "0" + mnChars[0]);
}

function convertData(date) {
    var dateObject = new Date(date);
    var yyyy = dateObject.getFullYear().toString();
    var mm = (dateObject.getMonth() + 1).toString();
    var dd = dateObject.getDate().toString();

    var mmChars = mm.split('');
    var ddChars = dd.split('');

    return (ddChars[1] ? dd : "0" + ddChars[0]) + '/' + (mmChars[1] ? mm : "0" + mmChars[0]) + '/' + yyyy;
}

function OnGetListItemFailure(sender, args) {
    console.log('Error:' + args.get_message());
}

// Jean Barros 19/09/18
$(document).ready(function(){	
    
    // Adiciona as classes do fontawesome.com para exibir os icones de setas
	$(".ms-core-listMenu-root li span span .menu-item-text").append('&nbsp;<span class="fa fa-angle-double-right"></span>');
	$(".ms-core-listMenu-root li span span .menu-item-text").css("cursor", "pointer");
	$(".ms-core-listMenu-root li span span .menu-item-text").css("color", "#003763");
	$(".ms-core-listMenu-root li ul").css("display", "none");
    
    // Chama a função para exibir ou mostrar os subitens do menu em cada conjunto de itens específico, de acordo com o indíce do elemento li
    $(".ms-core-listMenu-root li span span .menu-item-text").eq(0).click(function(){ 
        ShowHideSubmenu(0, 1, 2, 1)        
    });
    
    // Chama a função para exibir ou mostrar os subitens do menu em cada conjunto de itens específico, de acordo com o indíce do elemento li
    $(".ms-core-listMenu-root li span span .menu-item-text").eq(1).click(function(){
        ShowHideSubmenu(1, 2, 1, 0)
    });    
    
    function ShowHideSubmenu(menuItemIndex, subItensIndex, subItensOcultos, menuItemRecolhido){

        // Oculta os demais subitens que estiverem expandidos e alterna o icone do menu para indicar o estado de recolhido (>>)
        $(".ms-core-listMenu-root li ul").eq(subItensOcultos).hide();
        $(".ms-core-listMenu-root li span span .menu-item-text span").eq(menuItemRecolhido).removeClass("fa fa-angle-double-down");
        $(".ms-core-listMenu-root li span span .menu-item-text span").eq(menuItemRecolhido).addClass("fa fa-angle-double-right");
        
        // Alterna o incone de seta para baixo ou para a direita conforme o estado do elemento,
        // de acordo com o indíce do elemento li passado como argumento
        if($(".ms-core-listMenu-root li span span .menu-item-text span").eq(menuItemIndex).hasClass('fa-angle-double-right')){
			
			$(".ms-core-listMenu-root li span span .menu-item-text span").eq(menuItemIndex).removeClass("fa fa-angle-double-right");
            $(".ms-core-listMenu-root li span span .menu-item-text span").eq(menuItemIndex).addClass("fa fa-angle-double-down");
            // Exibe subitens específicos no menu lateral, de acordo com o indíce do elemento li passado como argumento
            $(".ms-core-listMenu-root li ul").eq(subItensIndex).show(); 
		}
		else if($(".ms-core-listMenu-root li span span .menu-item-text span").eq(menuItemIndex).hasClass('fa-angle-double-down')){
			
			$(".ms-core-listMenu-root li span span .menu-item-text span").eq(menuItemIndex).removeClass("fa fa-angle-double-down");
            $(".ms-core-listMenu-root li span span .menu-item-text span").eq(menuItemIndex).addClass("fa fa-angle-double-right");
            // Oculta subitens específicos no menu lateral, de acordo com o indíce do elemento li passado como argumento
            $(".ms-core-listMenu-root li ul").eq(subItensIndex).hide(); 
        }        
    }
});