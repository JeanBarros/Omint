ExecuteOrDelayUntilScriptLoaded(function () { GetAniver() }, "SP.js");
$.getScript('/_layouts/15/SP.UserProfiles.js', function(){})  

function GetAniver() {

	var dataCorrente2 = new Date();
	var d = new Date();
	var mesatual = d.getMonth()+1;
	var diaatual = d.getDate();	
	
	if(mesatual < 10){
	mesatual = "0"+ mesatual;
	}
	
	if(diaatual < 10){
	diaatual = "0"+ diaatual;
	}
	var ctxBirth = new SP.ClientContext.get_current();
	var webBirth = ctxBirth.get_web();
	var listsBirth = webBirth.get_lists();
	ctxBirth.load(listsBirth);
	var listBirth = listsBirth.getByTitle("Colaboradores");
	var camlQueryBirth = new SP.CamlQuery();
	camlQueryBirth.set_viewXml("<View><Query><Where><And><Eq><FieldRef Name='mes' /><Value Type='Calculated'>"+mesatual+"</Value></Eq><Geq><FieldRef Name='dia' /><Value Type='Calculated'>"+diaatual+"</Value></Geq></And></Where><OrderBy><FieldRef Name='mes' Ascending='True' /><FieldRef Name='dia' Ascending='True' /></OrderBy></Query><ViewFields><FieldRef Name='Title' /><FieldRef Name='email' /><FieldRef Name='mes' /><FieldRef Name='dia' /></ViewFields><QueryOptions /><RowLimit>10</RowLimit></View>");

	itemCollectionBirth = listBirth.getItems(camlQueryBirth);
	ctxBirth.load(itemCollectionBirth);

	ctxBirth.executeQueryAsync(Function.createDelegate(this,this.onSuccess),Function.createDelegate(this,this.onFailed));
	} 
	function onSuccess(sender, args) 
	{  
	                                    
	 if (itemCollectionBirth.get_count() > 0) 
	 {
            var enumerator = itemCollectionBirth.getEnumerator();
            while (enumerator.moveNext()) 
            {
                currentListItems = enumerator.get_current();
                
                var titulo = currentListItems.get_item("Title");
                var email = currentListItems.get_item("email");
                var aniver = currentListItems.get_item("dia") + "/" + currentListItems.get_item("mes"); 
                
                var loginName = email.match(/^([^@]*)@/)[1]; 
				var url = "https://omintbr-my.sharepoint.com:443/Person.aspx?accountname=i%3A0%23%2Ef%7Cmembership%7C"+email;
				var imagem = "https://omintbr-my.sharepoint.com:443/User%20Photos/Imagens%20de%20Perfil/"+loginName+"_omint_com_br_MThumb.jpg";
				//var imagem = "https://omintbr.sharepoint.com/SiteAssets/people.jpg";				
                
				$(".box-aniversariantes-home").append("<div class='resumoAniversario'><a href=" + url + " >" 
				+ "<img onerror='this.src=\"https://omintbr.sharepoint.com/SiteAssets/people.jpg\";'"
				+ "class='imagemColaborador' src='"+imagem+"'/>" 
				+ "<div class='nomeColaborador'>" + titulo + '</div>' +  "<div class='dataAniversario'>" + aniver + "<br> Dar parabéns!</div></a></div>");	
            }
		}
	}
	    function onFailed(sender, args) 
	    {
	        console.log("Something went Wrong: ");
	} 
	
		  
	
     
