// PARAMETROS

//var UrlRoot = "https://gzduaik.sharepoint.com";
$(document).ready(function() {
$(".box-aniversariantes-home").html("Aguardo carregando...");

if (SP.ClientContext != null) {  
  SP.SOD.executeOrDelayUntilScriptLoaded(getAllUsers, 'SP.js');  
}  
else {  
  SP.SOD.executeFunc('sp.js', null, getAllUsers);  
}  

var users = [];
var userProfileProperties = [];

function getAllUsers() {

        //Textbox value containing search term

 //       var searchTerm = "SPS-Birthday > '2000-01-01'";
       var searchTerm = "PreferredName:'Maria'";
  //            var searchTerm = "SPS-Birthday:' 12/05/2018 00:00:00'";


        clientContext = new SP.ClientContext.get_current();


        //Building Keyword query for the search
        var keywordQuery = new Microsoft.SharePoint.Client.Search.Query.KeywordQuery(clientContext);
        keywordQuery.set_queryText(searchTerm);
        keywordQuery.set_sourceId("B09A7990-05EA-4AF9-81EF-EDFAB16C4E31");
        keywordQuery.set_rowLimit(5);
        keywordQuery.set_trimDuplicates(false);


        var searchExecutor = new Microsoft.SharePoint.Client.Search.Query.SearchExecutor(clientContext);
        results = searchExecutor.executeQuery(keywordQuery);

        clientContext.executeQueryAsync(onQuerySuccess, onQueryError);
 
 
    }
    
function onQuerySuccess() {


       $.each(results.m_value.ResultTables[0].ResultRows, function () {
            users.push(this.AccountName);
		//	 alert(this.AccountName)
        });
 
        fetchProfilePropertiesForUsers();
 
    }
    
    
     function fetchProfilePropertiesForUsers() {
 
        var peopleManager = new SP.UserProfiles.PeopleManager(clientContext);
 
        var profilePropertyNames = ["PreferredName", "PictureURL", "SPS-Birthday", "SPS-ResourceSID"];
 
        for (var i = 0; i < users.length; i++) {
            var userProfilePropertiesForUser = new SP.UserProfiles.UserProfilePropertiesForUser(clientContext, users[i], profilePropertyNames);
            userProfileProperties[i] = peopleManager.getUserProfilePropertiesFor(userProfilePropertiesForUser);
        }
 
        clientContext.executeQueryAsync(onSuccess, onQueryError);
    }
    
    
     function onSuccess() {
         
         var imgprf=""
         
        
        var html = "";
        for (var i = 0; i < userProfileProperties.length; i++) {
        
         imgprf= userProfileProperties[i][1];
         preload(imgprf);
         console.log(imgprf);
 
           html += "<div class='row'><div class='col-md-12'><div class='itemBox'><div class='profile '><div class='floatL'><img src='" + imgprf + "' href='#' /></div><div class='floatR'><span><b>" + userProfileProperties[i][0] + "</b></span></br><span>" + convertData(userProfileProperties[i][2]) + "<br/><a href='https://www.yammer.com/omint.com.br/#/users/"+ userProfileProperties[i][3] +"'>Dar Parabéns!</a></span></div></div></div></div></div>";
            
 
        }
 
        $(".box-aniversariantes-home").html(html);
 
    }
    
    
    function onQueryError(sender, args) {
        alert(args.get_message());
    }
});
    
// FUNCÕES ÚTIL


function convertDateforArray(date) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();

    var mmChars = mm.split('');
    var ddChars = dd.split('');

    return yyyy + '' + (mmChars[1] ? mm : "0" + mmChars[0]) + '' + (ddChars[1] ? dd : "0" + ddChars[0]);
}


			var images = new Array()
			function preload() {
				for (i = 0; i < preload.arguments.length; i++) {
					images[i] = new Image()
					images[i].src = preload.arguments[i]
				}
			}
			

function convertData(date) {
    var dateObject = new Date(date);
    var mm = (dateObject.getMonth() + 1).toString();
    var dd = dateObject.getDate().toString();

    var mmChars = mm.split('');
    var ddChars = dd.split('');

    return (ddChars[1] ? dd : "0" + ddChars[0]) + '/' + (mmChars[1] ? mm : "0" + mmChars[0]);
}

function OnGetListItemFailure(sender, args) {
    console.log('Error:' + args.get_message());
}