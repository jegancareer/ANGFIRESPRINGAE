//$routeParams, $firebaseObject - needed?? YESSSS 
var MyRollsController = function($scope, $http, $location, $rootScope, $routeParams, $firebaseObject) {
	 $scope.myrolls=[];
	 $scope.fetchRoll = function() {
		 	if(null == firebase.auth().currentUser) {
		 		//$rootScope.oldURL='/rollcreate';
		 		$location.path('/auth');
		 	} else {
		 		var starCountRef = firebase.database().ref('RollJoinersProperties/'+firebase.auth().currentUser.uid+"/");
		 		starCountRef.on('value', function(snapshot) {
		 			keyvalArr = snapshot.val()
		 			//console.log(keyvalArr);
		 			if(null != keyvalArr) {
			 			Object.keys(keyvalArr).forEach(function(arr) {
				 				console.log(keyvalArr[arr]);
				 				if(!$scope.$$phase) {
				 					$scope.$apply(function() {$scope.myrolls.push(
				 							{	key:arr, 
				 								value:Object.values(keyvalArr[arr])[0].name,
				 								newpa:Object.values(keyvalArr[arr])[0].sponsor,
				 								creator:Object.values(keyvalArr[arr])[0].creator
				 							}
				 							);});
				 					//console.log('1');
				 				} else {
				 					$scope.myrolls.push({key:arr, 
				 							value:Object.values(keyvalArr[arr])[0].name, 
				 							newpa:Object.values(keyvalArr[arr])[0].sponsor,
				 							creator:Object.values(keyvalArr[arr])[0].creator});
				 					}
				 					//console.log('2');
			 			}); 
			 		}
			 	});
		 		
		 	}
	    };
	$scope.fetchRoll();
	
 }