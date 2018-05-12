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
	value='';
	
	//Initial case scenario!!
	if(joinerArray==null || joinerArray.length<2) {
		if(joinerArray==null || joinerArray.length==1) {
			rolmen = {"year":"2001","CTY_CODE":"city1","CTYNAME":"ELMNZ V","id":"1"};
			$scope.fireDataJsonObj.push(rolmen);
		 } else {
			rolmen = {"year":"2001","CTY_CODE":"city1","CTYNAME":"ELMNZ V","id":"1"};
			$scope.fireDataJsonObj.push(rolmen);
			rolmen = {"year":"2001","CTY_CODE":"city1","CTYNAME":"ELMNZ U","id":"1"};
			$scope.fireDataJsonObj.push(rolmen);
		 }
		$scope.fireHtmlcont=snapshot.child("totalJoined").val();	
		$scope.run();
	} else {
		//TODO:No where in Firestore for now so keeping this iteration and calling run method each time!
		Object.keys(joinerArray).forEach(function(key) {
			firebase.database().ref("RollJoiners/"+joinerArray[key].userId).child("_details/")
				.once("value", function(userSnap) { 
						console.log(userSnap.val());
						value=userSnap.val().email;
						// value = joinerArray[key];
					    rolmen = {"year":"2001","CTY_CODE":"city1","CTYNAME":""+value,"id":"1"};
					    $scope.fireDataJsonObj.push(rolmen);
					    $scope.fireHtmlcont=snapshot.child("totalJoined").val();	
						$scope.run();	
					});
		});
	}
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
		{"year":"2001","CTY_CODE":"city1","CTYNAME":"ELMNZ I","id":"1"},
		{"year":"2001","CTY_CODE":"city6","CTYNAME":"ELMNZ I","id":"1"}];
}
	$scope.fireHtmlcont=Object.keys($scope.fireDataJsonObj).length;//+" Joined.";
	$scope.initialize($scope.firePrgrCount, $scope.fireTotalPplCount);

	$scope.run();
}





/* 

RollProperty/{id}/joiners/{id2} <=> RollJoiners/{id2} => RollJoiners/{id2}

var fb = firebase.database().ref("RollProperty/1"); 
fb.child("joiners").once("value", function(userSnap) {
   firebase.database().ref("RollJoiners").once("value", function(mediaSnap) {
        console.log(userSnap.val(), mediaSnap.val());
   });
});
*/