// PARAMETROS

//var UrlRoot = "https://gzduaik.sharepoint.com";
var UrlRoot = "https://sennitltda.sharepoint.com/sites/omint/";


// FUNCÕES ÚTIL

function manageQueryStringParameter(paramToRetrieve) {
    var params = document.URL.split("?")[1].split("&");
    var strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == paramToRetrieve) {
            return singleParam[1];
        }
    }
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