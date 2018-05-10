App.RollProperty = function($scope, $routeParams, $firebaseObject){
	
$scope.initialize = function (prgcount, totalChordCount) {
	//progress bar count and name of progress display
    for (var i=0; i < prgcount; i++) {
        var o={};
        o.index=i;
        o.month=$scope.monthsMap[i % 12];
        o.year=$scope.baseYear + Math.floor(i/12);
        $scope.months.push(o);
    }

    $scope.createVerticalGradient('svg','gradient1',[
        {offset:'0%', 'stop-color':'#00AC6B'},
        {offset: '40%', 'stop-color':'#FFFFFF', 'stop-opacity':'0' },
        {offset: '60%', 'stop-color':'#FFFFFF', 'stop-opacity':'0' },
        {offset:'100%','stop-color':'#9B001C'}]);
	
    $scope.gradientGroup.transition().select("rect").delay($scope.delay*1.5).attr("width",12);
    $scope.dGroup.transition().selectAll("text").delay($scope.delay*1.5).style("font-size","10px");
}

$scope.run = function () {
	$scope.fetchData($scope.fireDataJsonObj, $scope.fireTotalFetchCount);	
	$scope.update(0,$scope.fireInitPrgrCount);
	document.getElementsByClassName("secondLabel")[0].innerHTML=$scope.fireHtmlcont;
}	


var starCountRef = firebase.database().ref('RollProperty/'+$routeParams.id);
starCountRef.on('value', function(snapshot) {
updateRollProperty(snapshot);
});

function updateRollProperty(snapshot) {	
	//alert(' - '+ JSON.stringify(snapshot.val()));
	$scope.fireName ='anonymous';
	$scope.firePrgrCount= 100;
	$scope.fireTotalFetchCount=10; 
	$scope.fireTotalPplCount=10; 
	////$scope.fireInitPrgrCount=0;
	//$scope.fireDataJsonObj="resources/d4/data/ustrade_2000-2014.csv";
	joinerArray = snapshot.child("joiners").val();
	$scope.fireDataJsonObj=[]
	Object.keys(joinerArray).forEach(function(key) {
	    value = joinerArray[key];
	    console.log(value + "-" + key);
	    rolmen = {"year":"2001","CTY_CODE":"city1","CTYNAME":""+value,"id":"1"};
	    $scope.fireDataJsonObj.push(rolmen);
	});
	$scope.fireHtmlcont=snapshot.child("totalJoined").val();	
	$scope.run();	
}

//Default
if ($scope.fireDataJsonObj == undefined) {
	$scope.fireName ='anonymous';
	$scope.firePrgrCount= 100; //looping progress bar
	$scope.fireTotalFetchCount=5;// //
	$scope.fireTotalPplCount=5; 
	$scope.fireInitPrgrCount=$scope.fireTotalPplCount-2;
	//$scope.fireDataJsonObj="resources/d4/data/ustrade_2000-2015.csv";
	$scope.fireDataJsonObj=[
		{"year":"2001","CTY_CODE":"city1","CTYNAME":"ELMNZ E","id":"1"},
		{"year":"2001","CTY_CODE":"city2","CTYNAME":"ELMNZ L","id":"1"},
		{"year":"2001","CTY_CODE":"city3","CTYNAME":"ELMNZ M","id":"1"},
		{"year":"2001","CTY_CODE":"city4","CTYNAME":"ELMNZ N","id":"1"},
		{"year":"2001","CTY_CODE":"city5","CTYNAME":"ELMNZ Z","id":"1"},
		{"year":"2001","CTY_CODE":"city6","CTYNAME":"ELMNZ I","id":"1"}];
}
	$scope.fireHtmlcont=Object.keys($scope.fireDataJsonObj).length;//+" Joined.";
	$scope.initialize($scope.firePrgrCount, $scope.fireTotalPplCount);

	$scope.run();
}