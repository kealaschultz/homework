// from data.js
var tbody = d3.select("tbody");
 // Table
function renderTable(ufodata){
	ufodata.forEach((tableData) => {
  	var row = tbody.append("tr");
  	Object.entries(tableData).forEach(([key, value]) => {
    var cell = row.append("td");
    cell.text(value);
});
  });
};

// Date Filter
	var time = data;

	var submit = d3.select("#filter-btn");

	renderTable(time);

	submit.on("click", function() {

		d3.event.preventDefault();

		var inputElement = d3.select("#datetime");

		var inputValue = inputElement.property("value");
		console.log(inputValue);
  		console.log(time);

		var filteredData = time.filter(filterdata => filterdata.datetime === inputValue);
		console.log(filteredData);

		// Clear filter
		tbody.html('');

		renderTable(filteredData);
	});
