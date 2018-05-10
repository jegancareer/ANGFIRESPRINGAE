App.RollProperty = function($scope, $firebaseObject){
	
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

var starCountRef = firebase.database().ref('RollProperty/1');
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
	$scope.fireDataJsonObj=[
		{"year":"2001","CTY_CODE":"city1","CTYNAME":"new Cityname1","id":"1"},
		{"year":"2001","CTY_CODE":"city2","CTYNAME":"Cityname2","id":"1"},
		{"year":"2001","CTY_CODE":"city3","CTYNAME":"Cityname3","id":"1"},
		{"year":"2001","CTY_CODE":"city4","CTYNAME":"Cityname4","id":"1"},
		{"year":"2001","CTY_CODE":"city5","CTYNAME":"Cityname5","id":"1"},
		{"year":"2001","CTY_CODE":"city6","CTYNAME":"Cityname6","id":"1"},
		{"year":"2001","CTY_CODE":"city7","CTYNAME":"Cityname7","id":"1"},
		{"year":"2001","CTY_CODE":"city8","CTYNAME":"Cityname8","id":"1"},
		{"year":"2001","CTY_CODE":"city9","CTYNAME":"Cityname9","id":"1"},
		{"year":"2001","CTY_CODE":"city00","CTYNAME":"Cityname0","id":"1"},
		{"year":"2001","CTY_CODE":"22city5","CTYNAME":"Cityname11","id":"1"},
		{"year":"2001","CTY_CODE":"333city6","CTYNAME":"Cityname622","id":"1"}];
	$scope.fireHtmlcont="0 Joined.";	
	$scope.run();	
}
//Default
$scope.fireName ='anonymous';
$scope.firePrgrCount= 100; //looping progress bar
$scope.fireTotalFetchCount=5;// //
$scope.fireTotalPplCount=5; 
$scope.fireInitPrgrCount=$scope.fireTotalPplCount-2;
//$scope.fireDataJsonObj="resources/d4/data/ustrade_2000-2015.csv";
$scope.fireDataJsonObj=[
	{"year":"2001","CTY_CODE":"city1","CTYNAME":"Cityname1","id":"1"},
	{"year":"2001","CTY_CODE":"city2","CTYNAME":"Cityname2","id":"1"},
	{"year":"2001","CTY_CODE":"city3","CTYNAME":"Cityname3","id":"1"},
	{"year":"2001","CTY_CODE":"city4","CTYNAME":"Cityname4","id":"1"},
	{"year":"2001","CTY_CODE":"city5","CTYNAME":"Cityname5","id":"1"},
	{"year":"2001","CTY_CODE":"city6","CTYNAME":"Cityname6","id":"1"},
	{"year":"2001","CTY_CODE":"city7","CTYNAME":"Cityname7","id":"1"},
	{"year":"2001","CTY_CODE":"city8","CTYNAME":"Cityname8","id":"1"},
	{"year":"2001","CTY_CODE":"city9","CTYNAME":"Cityname9","id":"1"},
	{"year":"2001","CTY_CODE":"city00","CTYNAME":"Cityname0","id":"1"}];

$scope.fireHtmlcont=Object.keys($scope.fireDataJsonObj).length;//+" Joined.";

$scope.initialize($scope.firePrgrCount, $scope.fireTotalPplCount);
$scope.fetchData($scope.fireDataJsonObj, $scope.fireTotalFetchCount);
//document.getElementsByClassName("secondLabel")[0].innerHTML=$scope.fireHtmlcont;


$scope.run = function () {
	/* if($scope.fireInitPrgrCount++ < $scope.fireTotalPplCount) {
		 $scope.update(0,$scope.fireInitPrgrCount);
		 document.getElementsByClassName("secondLabel")[0].innerHTML=$scope.fireHtmlcont;
	 } else {
		 $scope.fireInitPrgrCount=0;
		 document.getElementsByClassName("secondLabel")[0].innerHTML=$scope.fireHtmlcont;
		 $scope.fetchData($scope.fireDataJsonObj, $scope.fireTotalFetchCount);
	 }*/
	$scope.update(0,$scope.fireInitPrgrCount);
	$scope.fetchData($scope.fireDataJsonObj, $scope.fireTotalFetchCount);
	
	 document.getElementsByClassName("secondLabel")[0].innerHTML=$scope.fireHtmlcont;
}	
$scope.run();
}