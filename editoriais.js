ExecuteOrDelayUntilScriptLoaded(function () { GetEditoriais() }, "SP.js");


function GetEditoriais() {

	var ctx1 = new SP.ClientContext.get_current();
	var web1 = ctx1.get_web();
	var lists1 = web1.get_lists();
	ctx1.load(lists1);
	var listCategoria = lists1.getByTitle("Editoriais");
	var camlQuery1 = new SP.CamlQuery();
		
	itemCollection1 = listCategoria.getItems(camlQuery1);
	ctx1.load(itemCollection1);

	ctx1.executeQueryAsync(Function.createDelegate(this,this.onSuccess),Function.createDelegate(this,this.onFailed));
	} 
	
	function onSuccess(sender, args) {  
	                                    
	 if (itemCollection1.get_count() > 0) {
            var enumerator = itemCollection1.getEnumerator();
            while (enumerator.moveNext()) {
                currentListItems = enumerator.get_current();
                		     	
		        $("#categorias").append('<li><p><a href=/sitepages/Editoriais.aspx?IDCategoria=' 
		        + currentListItems.get_item("ID") +'>' + currentListItems.get_item("Title") + '</a></p></li>');		
            }
        }	                               
	}
	    function onFailed(sender, args) {
	        console.log("Something went Wrong");
	}