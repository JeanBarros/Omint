$(document).ready(function(){

    $(".ms-acal-month").css("pointer-events", "none")
    
    $(".ms-acal-summary-itemrow td div").mouseover(function(){
        //ocultarLink()
    }); 
    
	$(".ms-acal-vlink a").css("display","none")   
});

function ocultarLink(){

	//$(".ms-acal-vlink a").attr("href", "https://omintbr.sharepoint.com/Lists/AgendaSalaBemEstar/NewFormCustom.aspx", "target='_blank'")
	$(".ms-acal-vlink a").css("display","none")
}