
//SP.SOD.executeOrDelayUntilScriptLoaded(GetLinks(), 'SP.UserProfiles.js', "SP.js");
//SP.SOD.executeFunc('sp.js', 'SP.ClientContext',  GetLinks());

//$(document).ready(function(){  
//    var scriptbase = _spPageContextInfo.webAbsoluteUrl + "/_layouts/15/";
//    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
//       $.getScript(scriptbase + "SP.UserProfiles.js", GetLinks);
//    });
//});


SP.SOD.executeFunc('sp.js','SP.ClientContext',runthiscode);
    function runthiscode()
    {   	
       SP.SOD.executeFunc('SP.UserProfiles.js','SP.UserProfiles',GetLinks());
    }


var currentListItems;
	
	
function GetLinks() {

	var ctx = new SP.ClientContext.get_current();
	var web = ctx.get_web();
	var lists = web.get_lists();
	ctx.load(lists);
	var list = lists.getByTitle("Box");
	var camlQuery = new SP.CamlQuery();
//	camlQuery.set_viewXml("<View></View>");
	camlQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name='Ativo' /><Value Type='Boolean'>1</Value></Eq></Where></Query><ViewFields><FieldRef Name='Title' /><FieldRef Name='Link' /><FieldRef Name='Grupo' /><FieldRef Name='Imagens' /></ViewFields><QueryOptions /></View>");

	itemCollection = list.getItems(camlQuery);
	ctx.load(itemCollection);

	ctx.executeQueryAsync(Function.createDelegate(this,this.onSuccess),Function.createDelegate(this,this.onFailed));
	} 
	function onSuccess(sender, args) {  
	                                    
	    if (itemCollection.get_count() > 0) {
            var enumerator = itemCollection.getEnumerator();
            while (enumerator.moveNext()) {
                currentListItems = enumerator.get_current();              			
				  
				  IsCurrentUserMemberOfGroup('<div class=imgitem align=center><a target=_blank href="' + currentListItems.get_item("Link").get_url()+ '"><img title='+currentListItems.get_item("Title")+' src='+ currentListItems.get_item("Imagens").get_url() +'><br/>'+currentListItems.get_item("Title")+'</a></li></div>',currentListItems.get_item("Grupo").get_lookupValue(), function (isCurrentUserInGroup) {});	                
 		     	     				
            }
        }
                                       
	}
	    function onFailed(sender, args) {
	        alert("Something went Wrong");
}
	
	
	
	
function IsCurrentUserMemberOfGroup(conteudo,groupName, OnComplete) {
 
        var context = new SP.ClientContext.get_current();
        var currentWeb = context.get_web();
 
        var currentUser = context.get_web().get_currentUser();
        context.load(currentUser);
 
        var allGroups = currentWeb.get_siteGroups();
        context.load(allGroups);
 
        var group = allGroups.getByName(groupName);
        context.load(group);
        
        var groupUsers = group.get_users();
        context.load(groupUsers);
 
        context.executeQueryAsync(
                function(sender, args) {
                   var userInGroup = IsUserInGroup(currentUser,group); 
                   if(userInGroup){
                   $("#links").append(conteudo);   
                   }     
                   OnComplete(userInGroup);
                },
                function OnFailure(sender, args) {
                   OnComplete(false);
                }
        );
        
        function IsUserInGroup(user,group)
        {
            var groupUsers = group.get_users();
            var userInGroup = false;
            var groupUserEnumerator = groupUsers.getEnumerator();
            while (groupUserEnumerator.moveNext()) {
                var groupUser = groupUserEnumerator.get_current();
                if (groupUser.get_id() == user.get_id()) {
                    userInGroup = true;
                   
                    break;
                }
            }
            return userInGroup;
        }
}