$(document).ready(function() {

    if(getParameterByName("PageView") == "Shared"){
       $("#s4-bodyContainer").css("width","1800px");
    }

ShowHideSubItensMenuLateral();

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



// FUNCÕES ÚTIL

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

/* Oculta ou Exibe subitens no menu lateral - Jean Barros 18/07/18*/
function ShowHideSubItensMenuLateral(){
	var textoMenu = $("#ctl00_PlaceHolderLeftNavBar_QuickLaunchNavigationManager li span span .menu-item-text").text(); 
	$("#ctl00_PlaceHolderLeftNavBar_QuickLaunchNavigationManager li span span .menu-item-text").html(textoMenu + '&nbsp;&nbsp;');
	$("#ctl00_PlaceHolderLeftNavBar_QuickLaunchNavigationManager li span span .menu-item-text").append('<span class="fa fa-angle-double-down"></span>');
	$("#ctl00_PlaceHolderLeftNavBar_QuickLaunchNavigationManager li span span .menu-item-text").css("cursor", "pointer");
	$("#ctl00_PlaceHolderLeftNavBar_QuickLaunchNavigationManager li ul").css("display", "none");
	
	$("#ctl00_PlaceHolderLeftNavBar_QuickLaunchNavigationManager li span span .menu-item-text").click(function(){ 		
		$("#ctl00_PlaceHolderLeftNavBar_QuickLaunchNavigationManager li ul").toggle(); 
	});    
}

