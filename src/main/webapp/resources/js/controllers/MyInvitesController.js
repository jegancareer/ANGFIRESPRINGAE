//$routeParams, $firebaseObject - needed?? YESSSS 
var MyInvitesController = function($scope, $http, $location, $rootScope, $routeParams, $firebaseObject) {
	$scope.fetchRolls = function() {
		$scope.rolls=[];
	 	if(null == firebase.auth().currentUser) {
	 		$location.path('/auth');
	 	} else {
	 		var emailPath = firebase.auth().currentUser.email;
	 		emailPath = emailPath.replace(new RegExp('\\.', 'g'), '=dot=');
	 		var starCountRef = firebase.database().ref("RollJoinersInvites/"+emailPath+"/");
	 		starCountRef.on('value', function(snapshot) {
	 			keyvalArr = snapshot.val()
	 			//console.log(keyvalArr);
	 			if(null != keyvalArr) {
		 			Object.keys(keyvalArr).forEach(function(arr) {
			 				console.log(keyvalArr[arr]);
			 				if(!$scope.$$phase) {
			 					$scope.$apply(function() {$scope.rolls.push(
			 							{	key:Object.values(keyvalArr[arr])[0].rollId, 
			 								value:Object.values(keyvalArr[arr])[0].description,
			 								newpa:Object.values(keyvalArr[arr])[0].creator
			 							}
			 							);});
			 					//console.log('1');
			 				} else {
			 					$scope.rolls.push(
			 							{	key:Object.values(keyvalArr[arr])[0].rollId, 
			 								value:Object.values(keyvalArr[arr])[0].description,
			 								newpa:Object.values(keyvalArr[arr])[0].creator
			 							}
			 							);
			 					//console.log('2');
			 				} 
		 			});
		 		}
		 	});
	 		
	 	}
    };
    $scope.fetchRolls();
}