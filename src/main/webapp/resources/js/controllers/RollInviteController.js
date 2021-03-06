//$routeParams, $firebaseObject - needed?? YESSSS 
var RollInviteController = function($scope, $http, $location, $rootScope, $routeParams, $firebaseObject) {
	 $scope.invites=[];
	 $scope.fetchRoll = function() {
		 	if(null == firebase.auth().currentUser) {
		 		$location.path('/auth');
		 	} else {
		 		$scope.roll=$routeParams.id
		 		//load the roll details
		 		var starCountRef = firebase.database().ref('RollProperty/'+$routeParams.id);
		 			starCountRef.once('value', function(snapshot) {
		 				$scope.fireRollName =snapshot.child("name").val();
		 				$scope.fireSponsorName = snapshot.child("sponsor").val();
		 		});
		 	}
	    };
	$scope.fetchRoll();
	
    $scope.showListofUsers = function() {
		 $scope.invites=[];
		 var starCountRef = firebase.database().ref("RollPropertyInvitees/"+$scope.roll+"/"+firebase.auth().currentUser.uid+"/");
	 		starCountRef.on('value', function(snapshot) {
	 			keyvalArr = snapshot.val()
	 			if(null != keyvalArr) {
		 			Object.keys(keyvalArr).forEach(function(arr) {
		 				console.log(keyvalArr[arr].email);
		 				if(!$scope.$$phase) {
		 					$scope.$apply(function() {
		 						$scope.invites.push({"email":keyvalArr[arr].email});
		 					});
		 				} else {
		 					$scope.invites.push({"email":keyvalArr[arr].email});
		 				}
		 			}
		 		)}
	 		}
	 	);
	 }
	//show list of users invited by me on this roll!
	$scope.showListofUsers();
	
	$scope.submitInviteRoll = function() {
		var data=$scope.fields;
		console.log(data);
		var newRef = firebase.database().ref("RollPropertyInvitees/"+$scope.roll+"/"+firebase.auth().currentUser.uid+"/")
			.push({
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
			  //show list of users invited by me on this roll!
			  $scope.showListofUsers();
			  
		 });
		 var email = data.email;
		 email = email.replace(new RegExp('\\.', 'g'), '=dot=');

		 firebase.database().ref("RollJoinersInvites/"+email+"/"+$scope.roll+"/").push({
			 	  "name":$scope.fireRollName,
			 	  "sponsor":$scope.fireSponsorName,
			 	  "rollId":$scope.roll,
			 	  "description":data.desc,
			 	  "email":data.email,
	 			  "creator":firebase.auth().currentUser.uid
	 	 });
		
		 /*
		 firebase.storage().ref().child(newRef.key+"/nature1.jpg").put(file).then(function(snapshot) {
			  console.log('Uploaded !');
		 });*/
		 //$location.path('/roll/'+newRef.key) 
    };
    
 }