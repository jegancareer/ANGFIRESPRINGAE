var RollController = function($scope, $http, $routeParams, $firebaseObject) {
	//alert($routeParams.id);
    $scope.fetchRoll = function(id) {
    	 $scope.roll=id;
        $http.get('roll/roll.json').success(function(rolling){
            //$scope.roll = rolling;
        });
    };
    $scope.fetchRoll($routeParams.id);
    App.RollGlobals($scope);
    App.RollGradiants($scope);
    App.RollData($scope);
    App.RollChords($scope);
    App.RollUpdate($scope);
    App.RollProperty($scope, $routeParams, $firebaseObject);
    //https://angularfirebase.com/lessons/managing-firebase-user-relationships-to-database-records/
    $scope.optThisRoll = function(id) {
	 firebase.database().ref("RollProperty/" + id + "/joiners/"+firebase.auth().currentUser.uid).update({
		 userId:firebase.auth().currentUser.uid
	 });
    };
    
};