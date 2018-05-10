var RollController = function($scope, $http, $routeParams, $firebaseObject) {
	//alert($routeParams.id);
    $scope.fetchRoll = function() {
        $http.get('roll/roll.json').success(function(rolling){
            $scope.roll = rolling;
        });
    };
    $scope.fetchRoll();
    App.RollGlobals($scope);
    App.RollGradiants($scope);
    App.RollData($scope);
    App.RollChords($scope);
    App.RollUpdate($scope);
    App.RollProperty($scope, $routeParams, $firebaseObject);
    
    
};