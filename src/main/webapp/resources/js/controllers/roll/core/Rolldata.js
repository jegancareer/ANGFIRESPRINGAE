App.RollData = function($scope)
{
	$scope.fetchData= function(dataJsonObj, fetchMax) {

    //d3.csv($scope.fireDataJsonObj, function(csv) {
	  	
        var normalized=[];
		if (fetchMax>Object.keys(dataJsonObj).length) {
			fetchMax=Object.keys(dataJsonObj).length;
		}
		
        for (var y=0; y < fetchMax; y++)  {
            var row=dataJsonObj[y];
                var newRow={};
                newRow.Year=row.year;
                newRow.Country=row.CTYNAME;
                newRow.Month=(y < 10) ? "0" + String(y) : String(y);
                newRow.Imports=Number(row.id);
                newRow.Colorme=row.CTY_CODE;
                normalized.push(newRow);
        }

        //$scope.countriesGrouped = d3.nest().key(function(d) { return d.Year; }).key(function(d) { return d.Month; }).entries(normalized);
        $scope.countriesGrouped = normalized;
        //Sum total deficit for each month
        var totalImport=0;
        //$scope.monthlyImports.push(1000);
	}
}
