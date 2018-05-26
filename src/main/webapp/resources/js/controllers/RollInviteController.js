//$routeParams, $firebaseObject - needed?? YESSSS 
var RollInviteController = function($scope, $http, $location, $rootScope, $routeParams, $firebaseObject) {
	 $scope.fetchRoll = function() {
		 	if(null == firebase.auth().currentUser) {
		 		//$rootScope.oldURL='/rollcreate';
		 		$location.path('/auth');
		 	} else {
		 		$scope.roll=$routeParams.id
		 	}
	    };
	$scope.fetchRoll();

	
	$scope.submitInviteRoll = function() {
		var data=$scope.fields;
		console.log(data);
		var newRef = firebase.database().ref("RollPropertyInvitees/"+$scope.roll+"/").push({
	   		  "email" : data.email,
	   		  "description":data.desc,
	   		  "creator":firebase.auth().currentUser.uid	  
	   	 }).then(function(snapshot) {
			  console.log('Email successfully added.. !');
			  if(!$scope.$$phase) {
					$scope.$apply(function() {$scope.fields.email="";});
				} else {
					$scope.fields.email=""
				}
			  //show list of users invited by me!
			  
			  
		 });
		 
		 /*firebase.database().ref("RollPropertyJoiners/"+newRef.key+"/").push({
	 			  userId:firebase.auth().currentUser.uid
	 	 });
		 
		 firebase.storage().ref().child(newRef.key+"/nature1.jpg").put(file).then(function(snapshot) {
			  console.log('Uploaded !');
		 });*/
		 //$location.path('/roll/'+newRef.key) 
    };
 }