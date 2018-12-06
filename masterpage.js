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

$(document).ready(function(){	
    
    // Menu lateral - Jean Barros 03/10/18

    // Adiciona as classes do fontawesome.com para exibir os icones de setas
	$("#ctl00_PlaceHolderLeftNavBar_QuickLaunchNavigationManager li span span .menu-item-text").append('&nbsp;<span class="fa fa-angle-double-right"></span>');
	$("#ctl00_PlaceHolderLeftNavBar_QuickLaunchNavigationManager li span span .menu-item-text").css("cursor", "pointer");
	$("#ctl00_PlaceHolderLeftNavBar_QuickLaunchNavigationManager li span span .menu-item-text").css("color", "#003763");
    $(".ms-core-listMenu-root li ul").css("display", "none");
    
    // Formulários (Dispform.Aspx)
    // Chama a função para exibir ou mostrar os subitens do menu em cada conjunto de itens específico, 
    // de acordo com o indíce do elemento li
    $("#zz10_V4QuickLaunchMenu li span span .menu-item-text").eq(0).click(function(){ 
        // Verifica se o menu lateral é de um subsite - Alguns implementa o evento "onclilck" na div
        if($('#ctl00_PlaceHolderLeftNavBar_QuickLaunchNavigationManager div').attr("onclick"))            
            ShowHideSubmenu(0, 2, 3, 1)        
        else
            ShowHideSubmenu(0, 1, 2, 1)
    });

    // Chama a função para exibir ou mostrar os subitens do menu em cada conjunto de itens específico, 
    // de acordo com o indíce do elemento li
    $("#zz10_V4QuickLaunchMenu li span span .menu-item-text").eq(1).click(function(){
        if($('#ctl00_PlaceHolderLeftNavBar_QuickLaunchNavigationManager div').attr("onclick"))
            ShowHideSubmenu(1, 3, 2, 0)
        else
            ShowHideSubmenu(1, 2, 1, 0)            
    });
    
    // Home
    // Chama a função para exibir ou mostrar os subitens do menu em cada conjunto de itens específico, 
    // de acordo com o indíce do elemento li
   $("#zz11_V4QuickLaunchMenu li span span .menu-item-text").eq(0).click(function(){ 
        // Verifica se o menu lateral é de um subsite - Alguns implementa o evento "onclilck" na div
        if($('#ctl00_PlaceHolderLeftNavBar_QuickLaunchNavigationManager div').attr("onclick"))            
            ShowHideSubmenu(0, 2, 3, 1)        
        else
            ShowHideSubmenu(0, 1, 2, 1)
    });
    
    // Chama a função para exibir ou mostrar os subitens do menu em cada conjunto de itens específico, 
    // de acordo com o indíce do elemento li
   $("#zz11_V4QuickLaunchMenu li span span .menu-item-text").eq(1).click(function(){
        if($('#ctl00_PlaceHolderLeftNavBar_QuickLaunchNavigationManager div').attr("onclick"))
            ShowHideSubmenu(1, 3, 2, 0)
        else
            ShowHideSubmenu(1, 2, 1, 0)            
    });    

    // subsite 1
    $("#zz12_V4QuickLaunchMenu li span span .menu-item-text").eq(0).click(function(){ 
        // Verifica se o menu lateral é de um subsite - Alguns implementa o evento "onclilck" na div
        if($('#ctl00_PlaceHolderLeftNavBar_QuickLaunchNavigationManager div').attr("onclick"))            
        ShowHideSubmenu(0, 1, 2, 1)
        
        else
        ShowHideSubmenu(0, 2, 3, 1)            
    });
    
    // Chama a função para exibir ou mostrar os subitens do menu em cada conjunto de itens específico, 
    // de acordo com o indíce do elemento li
   $("#zz12_V4QuickLaunchMenu li span span .menu-item-text").eq(1).click(function(){
        if($('#ctl00_PlaceHolderLeftNavBar_QuickLaunchNavigationManager div').attr("onclick"))
        ShowHideSubmenu(1, 2, 1, 0)
        else
        ShowHideSubmenu(1, 3, 2, 0)
                        
    });

    // subsite 2

    $("#zz14_V4QuickLaunchMenu li span span .menu-item-text").eq(0).click(function(){ 
        // Verifica se o menu lateral é de um subsite - Alguns implementa o evento "onclilck" na div
        if($('#ctl00_PlaceHolderLeftNavBar_QuickLaunchNavigationManager div').attr("onclick"))            
        ShowHideSubmenu(0, 2, 3, 1)            
        
        else
        ShowHideSubmenu(0, 1, 2, 1)
        
    });
    
    // Chama a função para exibir ou mostrar os subitens do menu em cada conjunto de itens específico, 
    // de acordo com o indíce do elemento li
   $("#zz14_V4QuickLaunchMenu li span span .menu-item-text").eq(1).click(function(){
        if($('#ctl00_PlaceHolderLeftNavBar_QuickLaunchNavigationManager div').attr("onclick"))
        ShowHideSubmenu(1, 3, 2, 0)
        
        else
        ShowHideSubmenu(1, 2, 1, 0)
        
                        
    });
    
    //Específico para os submenus que aparecem quando estiver navegando nas páginas de configurações do SharePoint 
        /*$("#zz12_V4QuickLaunchMenu li span span .menu-item-text").eq(0).click(function(){ 
            // Verifica se o menu lateral é de um subsite - Alguns implementa o evento "onclilck" na div
            ShowHideSubmenu(0, 2, 3, 1)                                   
        });
        
        $("#zz12_V4QuickLaunchMenu li span span .menu-item-text").eq(1).click(function(){
            ShowHideSubmenu(1, 3, 2, 0)
        });*/
    // Final
    
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
    // Final

    // Modal - Jean Barros 28/11/18
    //$('#zz11_RootAspMenu li a').eq(3)
    $('.ms-core-listMenu-root li a:contains(Fala que a gente escuta)').removeAttr("href");
    $('.ms-core-listMenu-root li a:contains(Fala que a gente escuta)').css("cursor", "pointer")
            
    $('.ms-core-listMenu-root li a:contains(Fala que a gente escuta)').click(function(){					    
            
            $("#modal-formOuvidoria").css("display","block");
            $("#modal-formOuvidoria").empty();
            $("#modal-formOuvidoria").append("<div id='loadingBox'>Carregando...</div>");    		
            
            // Adiciona o bot�o para fechar o modal
            $("#modal-formOuvidoria").append("<div class='btn-closeModal fa fa-window-close'></div>");
            
            // Carrega o formul�rio na div
            $("#modal-formOuvidoria").append("<embed src='https://www.omint.com.br/ouvidoria/popup.aspx?_dc=1382127107908' width='600' height='517' />");
            
            $(".btn-closeModal").click(function(){
		        $("#modal-formOuvidoria").empty();
    			$("#modal-formOuvidoria").css("display","none");
		    });
		     
	});		
    // Final
});