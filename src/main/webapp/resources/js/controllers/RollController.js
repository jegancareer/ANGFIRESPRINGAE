var RollController = function($scope, $http, $location, $routeParams, $firebaseObject) {
	if(null == firebase.auth().currentUser) {
 		//$rootScope.oldURL='/rollcreate';
 		$location.path('/auth');return;
 	} 
	
	//alert($routeParams.id);
    $scope.fetchRollImages = function(id) {
    	 $scope.roll=id;
        $http.get('roll/roll.json').success(function(rolling){
            //$scope.roll = rolling;
        });
        
        $scope.imageUrls=[];
        //fetch images
        for(i=0;i<5;i++) {
        	firebase.storage().ref(id).child('/nature'+i+'.jpg').getDownloadURL().then(function(url){
        		if(!$scope.$$phase) {
 					$scope.$apply(function() {$scope.imageUrls.push(url);});
 				} else {
 					$scope.imageUrls.push(url);
 				} console.log(' - '+url)
        			
        	}).catch(function(error) {
        		console.log(error.code);
        	});
        }
    };
    $scope.fetchRollImages($routeParams.id, $firebaseObject);
    App.RollGlobals($scope);
    App.RollGradiants($scope);
    App.RollData($scope);
    App.RollChords($scope);
    App.RollUpdate($scope);
    App.RollProperty($scope, $routeParams, $firebaseObject);
    //https://angularfirebase.com/lessons/managing-firebase-user-relationships-to-database-records/
    $scope.optThisRoll = function(id) {
    	firebase.database().ref("RollPropertyJoiners/"+id+"/").push({
			  userId:firebase.auth().currentUser.uid
    	});
    	$scope.disableOptIn=true;
    };
    
};