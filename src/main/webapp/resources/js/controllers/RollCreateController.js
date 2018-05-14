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

    $scope.createRoll = function(id) {
    	 //alert('in'+id);
    	firebase.database().ref("RollProperty/"+firebase.auth().currentUser.uid+"/"+id).update({
    	  "fetchCount" : "1",
   		  "joiners" : {},
   		  "name" : "New "+id,
   		  "sponsor" : "ELMNZ",
   		  "start" : "today",
   		  "totalJoined" : "0"
   	 });
	firebase.database().ref("RollPropertyJoiners/"+id).update({
 		  "joiners" : {
 			  userId:firebase.auth().currentUser.uid
 		  },
 	 });
    };
 }