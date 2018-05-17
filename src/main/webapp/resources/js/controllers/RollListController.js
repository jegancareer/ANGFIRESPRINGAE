//$routeParams, $firebaseObject - needed?? YESSSS 
var RollListController = function($scope, $http, $location, $rootScope, $routeParams, $firebaseObject) {
	$scope.fetchRolls = function() {
		$scope.rolls=[];
	 	if(null == firebase.auth().currentUser) {
	 		$location.path('/auth');
	 	} else {
	 		var starCountRef = firebase.database().ref('RollProperty');
	 		starCountRef.on('value', function(snapshot) {
	 			keyvalArr = snapshot.val()
	 			console.log(keyvalArr);
	 			Object.keys(keyvalArr).forEach(function(arr) {
		 				console.log(keyvalArr[arr]);
		 				if(!$scope.$$phase) {
		 					$scope.$apply(function() {$scope.rolls.push({key:arr, value:keyvalArr[arr].name});});
		 					console.log('1');
		 				} else {
		 					$scope.rolls.push({key:arr, value:keyvalArr[arr].name});console.log('2');
		 				} 
	 			});
	 			
		 	});
	 		
	 	}
    };
    $scope.fetchRolls();
}