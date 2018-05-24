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
		 if ($scope.myForm.file.$valid && $scope.file) {
		       // $scope.upload($scope.file);
			 console.log($scope.file);
		     var file = document.getElementById("file").files[0];
			 if(file){
		     var reader = new FileReader();
			 reader.readAsDataURL(file);
			 reader.onload = function (evt) {
		            $scope.fileContent = reader.result;
		            $scope.fileName = document.getElementById("file").files[0].name;
		            $scope.fileSize = document.getElementById("file").files[0].size;;
		        }
			 reader.onerror = function (evt) {
		            $scope.fileContent = "error";
		        }
			 }
		 }
		
		
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
		 
		 firebase.storage().ref().child(newRef.key+"/nature1.jpg").put(file).then(function(snapshot) {
			  console.log('Uploaded !');
		 });
		 
		 $location.path('/roll/'+newRef.key)	 
    };
 }