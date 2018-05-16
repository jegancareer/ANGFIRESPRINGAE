//$routeParams, $firebaseObject - needed?? YESSSS 
var RollCreateController = function($scope, $http, $location, $rootScope, $routeParams, $firebaseObject) {
	 $scope.fetchRoll = function() {
		 	if(null == firebase.auth().currentUser) {
		 		//$rootScope.oldURL='/rollcreate';
		 		$location.path('/auth');
		 	} else {
		        $http.get('rollcreate/rollcreate.json', {
		            params : {
		            	'ukey':firebase.auth().currentUser.uid
		                }})
		        .success(function(rolling){
		            $scope.sprRoll = rolling;
		        });
		 	}
	    };
	$scope.fetchRoll();

	
	$scope.submitCreateRoll = function() {
    	 //alert('in'+id);firebase.auth().currentUser.uid+"/"+id
		var data=$scope.fields;
		console.log(data);
		var newRef = firebase.database().ref("RollProperty/").push({
	    	  "fetchCount" : "1",
	   		  "name" : data.name,
	   		  "sponsor" : data.sponsor,
	   		  "start" : data.start,
	   		  "totalJoined" : "0",
	   		  "openTo":data.openTo,
	   		  "creator":firebase.auth().currentUser.uid	  
	   	 });
		 firebase.database().ref("RollPropertyJoiners/"+newRef.key+"/").push({
	 			  userId:firebase.auth().currentUser.uid
	 	 });
		 $location.path('/roll/'+newRef.key)	 
    };
 }