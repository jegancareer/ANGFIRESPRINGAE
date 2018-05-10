App.RollChords = function($scope){

	$scope.buildChords = function(y,m) {

	//$scope.countries=$scope.countriesGrouped[y].values[m].values;
	$scope.countries=$scope.countriesGrouped;
	////removed sorting countries
	$scope.export_countries=$scope.countries.slice(0,parseInt($scope.countries.length/2));
	////removed sorting countries	
	$scope.import_countries=$scope.countries.slice(parseInt($scope.countries.length/2),$scope.countries.length);

    var  import_matrix = [],
        export_matrix = [];

    $scope.e_buf_indexByName=$scope.e_indexByName;
    $scope.i_buf_indexByName=$scope.i_indexByName;

    $scope.e_indexByName=[];
    $scope.e_nameByIndex=[];
    $scope.i_indexByName=[];
    $scope.i_nameByIndex=[];
    n = 0;

    // Compute a unique index for each package name
    totalExports=0;
    $scope.export_countries.forEach(function(d) {
        totalExports+= Number(d.Imports);
        d = d.Country;
        if (!(d in $scope.e_indexByName)) {
        	$scope.e_nameByIndex[n] = d;
        	$scope.e_indexByName[d] = n++;
        }
    });

    $scope.export_countries.forEach(function(d) {
        var source = $scope.e_indexByName[d.Country],
            row = export_matrix[source];
        if (!row) {
            row = export_matrix[source] = [];
            for (var i = -1; ++i < n;) row[i] = 0;
        }
        row[$scope.e_indexByName[d.Country]]= d.Imports;
    });

    // Compute a unique index for each country name.
    n=0;
    totalImports=0;
    $scope.import_countries.forEach(function(d) {
        totalImports+= Number(d.Imports);
        d = d.Country;
        if (!(d in $scope.i_indexByName)) {
        	$scope.i_nameByIndex[n] = d;
        	$scope.i_indexByName[d] = n++;
        }
    });

    $scope.import_countries.forEach(function(d) {
        var source = $scope.i_indexByName[d.Country],
            row = import_matrix[source];
        if (!row) {
            row = import_matrix[source] = [];
            for (var i = -1; ++i < n;) row[i] = 0;
        }
        row[$scope.i_indexByName[d.Country]]= d.Imports;
    });

    var exportRange=$scope.angleRange*(totalExports/(totalExports + totalImports));
    var importRange=$scope.angleRange*(totalImports/(totalExports + totalImports));
    $scope.export_chord.startAngle(-(exportRange/2))
        .endAngle((exportRange/2));

    $scope.import_chord.startAngle(180-(importRange/2))
        .endAngle(180+(importRange/2));

    $scope.import_chord.matrix(import_matrix);
    $scope.export_chord.matrix(export_matrix);

    var ec_groups = $scope.export_chord.groups();
    var ec_chords = $scope.export_chord.chords();
    ec_groups.sort(function(a,b) { return a.index - b.index; });
    ec_chords.sort(function(a,b) { return a.source.index - b.source.index; });
    for (var i=0; i < ec_groups.length; i++) {
        var d={}
        var g=ec_groups[i];
        var c=ec_chords[i];
        d.index=i;
        d.angle= (g.startAngle + g.endAngle) / 2;
        d.label = $scope.e_nameByIndex[g.index];
        d.exports= c.source.value;

        // create a new object instead of overwriting
        // overwriting changes the data bound to d3 objects, which is not what
        // we want
        $scope.e_labels[i] = {};
        $scope.e_labels[i].angle = d.angle;
        $scope.e_labels[i].label = d.label;
        $scope.e_labels[i].index = i;
        $scope.e_labels[i].exports = d.exports;

        $scope.e_chords[i] = {};
        $scope.e_chords[i].index = i;
        $scope.e_chords[i].label = d.label;
        $scope.e_chords[i].source = c.source;
        $scope.e_chords[i].target = c.target;
        $scope.e_chords[i].exports = d.exports;
    }

    var ic_groups = $scope.import_chord.groups();
    var ic_chords = $scope.import_chord.chords();
    ic_groups.sort(function(a,b) { return a.index - b.index; });
    ic_chords.sort(function(a,b) { return a.source.index - b.source.index; });
    for (var i=0; i < ic_groups.length; i++) {
        var d={}
        var g=$scope.import_chord.groups()[i];
        var c=$scope.import_chord.chords()[i];
        d.index=i;
        d.angle= (g.startAngle + g.endAngle) / 2;
        d.label = $scope.i_nameByIndex[g.index];
        d.imports = c.source.value;

        // create a new object instead of overwriting
        // overwriting changes the data bound to d3 objects, which is not what
        // we want
        $scope.i_labels[i] = {};
        $scope.i_labels[i].angle = d.angle;
        $scope.i_labels[i].label = d.label;
        $scope.i_labels[i].imports = d.imports;
        $scope.i_labels[i].index = i;

        $scope.i_chords[i] = {};
        $scope.i_chords[i].index = i;
        $scope.i_chords[i].label = d.label;
        $scope.i_chords[i].source = c.source;
        $scope.i_chords[i].target = c.target;
        $scope.i_chords[i].imports = d.imports;
    }

    function getFirstIndex(index,indexes) {
        for (var i=0; i < $scope.topCountryCount; i++) {
            var found=false;
            for (var y=index; y < indexes.length; y++) {
                if (i==indexes[y]) {
                    found=true;
                }
            }
            if (found==false) {
                return i;
                //  break;
            }
        }
        //      console.log("no available indexes");
    }

    function getLabelIndex(name) {
        for (var i=0; i < $scope.topCountryCount; i++) {
            if (e_buffer[i].label==name) {
                return i;
                //   break;
            }
        }
        return -1;
    }

	}
}

