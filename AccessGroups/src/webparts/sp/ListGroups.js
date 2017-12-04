var url = "https://salkeiz.sharepoint.com";
var listID = "0"
var listname = "";
var arrResults = [];
var table = $('<table></table>').addClass('foo'); // Use with writeTable
var headerRow = $('<tr></tr>').addClass('headerBar');
headerRow.append($('<th>&nbsp;</th><th>Name</th>'));


//$('#ResultsTableC2').append('<tr><td>David C. Pettit</td></tr>');

// Read SharePoint List(s) with AJAX
function getListItem(url, listname) {
    // Getting our list items
    $.ajax({
        url: url + "/_api/web/sitegroups/getbyname('" + listname + "')/users",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        async: false,
        success: function(data) {
            for (i = 0; i < data.d.results.length; i++) {
                arrResults[arrResults.length] = data.d.results[i]; // Add results object to global array
            } // End for
        },
        error: function(data) {
            $('#ErrorResults').append('<tr><td>Error: ' + data.error + '</td></tr>');
        },
    }); // End of AJAX

} // End of getListItem

function getGroupID(url, listname){
    $.ajax({
        url: url + "/_api/web/sitegroups/getbyname('" + listname + "')",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        async: false,
        success: function(data) {
            listID = data.d.Id;
            $('#IDResults').append(listID);
        },
        error: function(data) {
            $('#ErrorResults').append('Error: ' + data.error);
        },
    }); // End of AJAX(2)
} // End of getGroupID

// Write out active list items for testing
function objectWrite(myObj) {
    if(myObj.length > 0){
        table.append(headerRow);
        for (var i = 0; i < myObj.length; i++) {
            var row = $('<tr></tr>').addClass('bar');
            row.append($('<td></td>').text("" +
                i), /*$('</td><td>').text("" +
                myObj[i].Id),*/ $('</td><td>').text("" +
                myObj[i].Title)/*, $('</td><td>').text("" +
                myObj[i].Email)*/, $('</td>'));
            table.append(row);
        } // End for
    } else {
        var row = $('<tr><td>Select the pencil icon and enter a group name.</td></tr>');
        table.append(row);
    }
    $('#ResultsTable').append(table);
};

function clearContents(){
    arrResults = [];
    table = $('<table></table>').addClass('foo'); // Use with writeTable
    headerRow = $('<tr></tr>').addClass('headerBar');
    headerRow.append($('<th>&nbsp;</th><th>Name</th>'));
    table.append(headerRow);
};

var myList = window.myList || {};

myList.init = function(url,listName){
    clearContents();
    if(listName != "Set Me") {
        getListItem(url, listName);
        getGroupID(url, listName);
    } 
        objectWrite(arrResults);
};

myList.id = function(url,listName){
    if(listName != "Set Me") {
        getGroupID(url, listName);
    }
        return listID;
};

module.exports = myList;

/* NOTE: Place this where you want the results table
<div id="ResultsTableC2"></div>
*/
