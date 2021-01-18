// YOUR CODE HERE!
$(document).ready(function() {
    // from data.js
    var tableData = data;
    console.log(tableData)

});

function buildTableString(data) {
    // JQUERY creates an HTML string
    var tbody = $("#ufo-table>tbody");
    //clear table
    tbody.empty();

    //append data
    data.forEach(function(row) {
        var newRow = "<tr>"
            // loop through each Object (dictionary)
        Object.entries(row).forEach(function([key, value]) {
            // set the cell data
            newRow += `<td>${value}</td>`
        });

        //append to table
        newRow += "</tr>";
        tbody.append(newRow);
    });
}