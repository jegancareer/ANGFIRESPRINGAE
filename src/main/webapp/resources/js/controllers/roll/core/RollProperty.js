App.RollProperty = function($scope, $routeParams, $firebaseObject){
	

 $scope.initialize = function (prgcount, totalChordCount) {
	//progress bar count and name of progress display
	 /* for (var i=0; i < prgcount; i++) {
        var o={};
        o.index=i;
        o.month=$scope.monthsMap[i % 12];
        o.year=$scope.baseYear + Math.floor(i/12);
        $scope.months.push(o);
    }*/

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
}	

var starCountRef = firebase.database().ref('RollProperty/'+$routeParams.id);
	starCountRef.on('value', function(snapshot) {
	updateRollProperty(snapshot);
});
	
var joinCountRef = firebase.database().ref('RollPropertyJoiners/'+$routeParams.id);
	joinCountRef.on('value', function(joinshot) {
	updateJoinerProperty(joinshot);
});

function updateJoinerProperty(joinshot) {
	joinerArray = joinshot.val();
	$scope.fireDataJsonObj=[]
	value='';
	
	//Initial case/static scenario!!
	if(joinerArray==null || joinerArray.length<2) {
		if(joinerArray==null || joinerArray.length==1) {
			rolmen = {"year":"2001","CTY_CODE":"no","CTYNAME":"ELMNZ V","id":"1"};
			$scope.fireDataJsonObj.push(rolmen);
		 } else {
			rolmen = {"year":"2001","CTY_CODE":"no","CTYNAME":"ELMNZ V","id":"1"};
			$scope.fireDataJsonObj.push(rolmen);
			rolmen = {"year":"2001","CTY_CODE":"no","CTYNAME":"ELMNZ U","id":"1"};
			$scope.fireDataJsonObj.push(rolmen);
		 }
		updateCheckOnJoined(2);
		$scope.run();
	} else {
		//TODO:No where clause with IN Firestore for now so keeping this iteration and calling run method each time!
		Object.values(joinerArray).forEach(function(key) {
			firebase.database().ref("RollJoiners/"+key.userId).child("_details/")
				.once("value", function(userSnap) { 
						//console.log(userSnap.val());
						value=userSnap.val().email;
						// value = key;//joinerArray[key];
						if(null !=firebase.auth().currentUser && null !=firebase.auth().currentUser.uid &&
								key.userId==firebase.auth().currentUser.uid) {
							rolmen = {"year":"2001","CTY_CODE":"yes","CTYNAME":""+"You \u{2665}","id":"1"};
							
							if(!$scope.$$phase) {
								$scope.$apply(function() {$scope.disableOptIn=true;});
							} else {
								$scope.disableOptIn=true;
							} 
						} else {
							rolmen = {"year":"2001","CTY_CODE":"no","CTYNAME":value.slice(0,10)+"..","id":"1"};
						}
					    $scope.fireDataJsonObj.push(rolmen);
					    //$scope.fireHtmlcont=snapshot.child("totalJoined").val();	
						$scope.run();	
					});
		});
		updateCheckOnJoined(Object.keys(joinerArray).length);
	}
}

function updateCheckOnJoined(jonied) {
	$scope.fireHtmlcont=jonied;	
	$scope.monthlyImports.push(jonied);
	//$scope.monthlyImports.shift();
	document.getElementsByClassName("secondLabel")[0].innerHTML=$scope.fireHtmlcont +" Joined.";
	//check if roll is full?
	if($scope.fireHtmlcont==$scope.fireTotalFetchCount) {
		$scope.disableOptIn=true;
	}
}

function updateRollProperty(snapshot) {	
	//alert(' - '+ JSON.stringify(snapshot.val()));
	//update DOM/model/VIEW via FIREBASE(on) event
	if(!$scope.$$phase) {
		$scope.$apply(function() {$scope.fireRollName =snapshot.child("name").val();});
	} else {
		$scope.fireRollName =snapshot.child("name").val();
	} 
	$scope.fireSponsorName = snapshot.child("sponsor").val();
	$scope.firePrgrCount= 100;
	$scope.fireTotalFetchCount=snapshot.child("maxLimit").val(); 
	$scope.fireTotalPplCount=10; 
	////$scope.fireInitPrgrCount=0;
	//$scope.fireDataJsonObj="resources/d4/data/ustrade_2000-2014.csv";
	document.getElementsByClassName("thirdLabel")[0].innerHTML="*By " + $scope.fireSponsorName;
	
}



//Default
if ($scope.fireDataJsonObj == undefined) {
	//$scope.monthlyImports.unshift(0);
	//$scope.fireRollName ='anonymous';
	$scope.firePrgrCount= 100; //looping progress bar
	if ($scope.fireTotalFetchCount == undefined) $scope.fireTotalFetchCount=5;// //
	if ($scope.fireTotalPplCount == undefined)$scope.fireTotalPplCount=5; 
	$scope.fireInitPrgrCount=$scope.fireTotalPplCount-2;
	//$scope.fireDataJsonObj="resources/d4/data/ustrade_2000-2015.csv";
	$scope.fireDataJsonObj=[
		{"year":"2001","CTY_CODE":"no","CTYNAME":"ELMNZ I","id":"1"},
		{"year":"2001","CTY_CODE":"no","CTYNAME":"ELMNZ V","id":"1"}];
}
	//$scope.fireHtmlcont=Object.keys($scope.fireDataJsonObj).length;//+" Joined.";
	$scope.initialize($scope.firePrgrCount, $scope.fireTotalPplCount);

	$scope.run();
}
