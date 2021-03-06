﻿ExecuteOrDelayUntilScriptLoaded(function () { GetEventos() }, "SP.js");


function GetEventos() {

	var dataCorrente = new Date();
	
	var ctxEvnts = new SP.ClientContext.get_current();
	var webEvnts = ctxEvnts.get_web();
	var listsEvnts = webEvnts.get_lists();
	ctxEvnts.load(listsEvnts);
	var listEvnts = listsEvnts.getByTitle("Agenda");
	var camlQueryEvnts = new SP.CamlQuery();
	camlQueryEvnts.set_viewXml("<View><Query><Where><Geq><FieldRef Name='EventDate' /><Value IncludeTimeValue='TRUE' Type='DateTime'>" + dataCorrente.toISOString() + "</Value></Geq></Where><OrderBy><FieldRef Name='EventDate' Ascending='True' /></OrderBy></Query><RowLimit>3</RowLimit></View>");

	itemCollectionEvnts = listEvnts.getItems(camlQueryEvnts);
	ctxEvnts.load(itemCollectionEvnts);

	ctxEvnts.executeQueryAsync(Function.createDelegate(this,this.onSuccess),Function.createDelegate(this,this.onFailed));
	} 
	function onSuccess(sender, args) {  
	                                    
	 if (itemCollectionEvnts.get_count() > 0) {
            var enumerator = itemCollectionEvnts.getEnumerator();
            while (enumerator.moveNext()) {
                currentListItems = enumerator.get_current();
                
                var titulo = currentListItems.get_item("Title"); 
                var local = currentListItems.get_item("Location");
                
                var dataInicio = currentListItems.get_item("EventDate").toLocaleDateString();
                var dataFim = currentListItems.get_item("EndDate").toLocaleDateString();
                
                // Remove os "segundos (00:00)" da data retornada e aplica o padrão (HH:MM)
                var horaInicio = currentListItems.get_item("EventDate").toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
                var horaFim = currentListItems.get_item("EndDate").toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}); 
									
				$(".box-eventos-home").append("<div class='resumoEvento'><a href=/Lists/Agenda/DispForm.aspx?ID=" 
		        + currentListItems.get_item("ID") + '&ContentTypeId=0x01020050DB1FA5989659489EDA6065F847A61B' +'><span>' + titulo + '</span>'
				+ '<p>Local: ' + local
				+ '<br> De: ' + dataInicio + ' até ' + dataFim
				+ '<br> Horário: ' + horaInicio + ' às ' + horaFim
				+ '</p></a></div>');
            }
        }	                               
	}
	    function onFailed(sender, args) {
	        console.log("Something went Wrong");
	}