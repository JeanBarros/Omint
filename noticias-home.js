ExecuteOrDelayUntilScriptLoaded(function () { GetNoticias() }, "SP.js");


function GetNoticias() {

	var ctx = new SP.ClientContext.get_current();
	var web = ctx.get_web();
	var lists = web.get_lists();
	ctx.load(lists);
	var list = lists.getByTitle("Noticias");
	var camlQuery = new SP.CamlQuery();
	camlQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name='Habilitada' /><Value Type='Boolean'>1</Value></Eq></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query><RowLimit>3</RowLimit></View>");

	itemCollection = list.getItems(camlQuery);
	ctx.load(itemCollection);

	ctx.executeQueryAsync(Function.createDelegate(this,this.onSuccess2),Function.createDelegate(this,this.onFailed));
	} 
	function onSuccess2(sender, args) {  
	                                    
	 if (itemCollection.get_count() > 0) {
            var enumerator = itemCollection.getEnumerator();
            while (enumerator.moveNext()) {
                currentListItems = enumerator.get_current();
                
                var tituloCategoria = currentListItems.get_item("Categoria").get_lookupValue();
				var thumbNoticia = currentListItems.get_item("ImagemMiniatura");
				
				$(".box-noticias-home").append("<div class='resumoNoticia'><a href=/Paginas/Noticia.aspx?IDNoticia=" + currentListItems.get_item("ID") +'>' 
				+ '<img class="imagemNoticia" src="' + thumbNoticia.$2_1 + '">'
				+ '<div><span>' + tituloCategoria + '</span><p>' 
				+ currentListItems.get_item("Title") + '</p></div></a></div>');
            }
        }	                               
	}
	    function onFailed(sender, args) {
	        console.log("Something went Wrong");
	}