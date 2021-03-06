'use strict';

var AuthController = function($scope, $http, $rootScope) {
    $scope.fetchLogin = function() {
    	//alert($rootScope.oldURL)
    	$scope.userURL='userURL';
    	if(firebase.auth().currentUser != undefined && firebase.auth().currentUser != null) {
    		$scope.userURL=firebase.auth().currentUser.photoURL;
    	} else {
    		 // Initialize the FirebaseUI Widget using Firebase.
    		let ui = firebaseui.auth.AuthUI.getInstance();
    	    if (!ui) {
    	    	ui = new firebaseui.auth.AuthUI(firebase.auth());
    	    }
    	    // The start method will wait until the DOM is loaded.
    	    //alert(firebase.auth.getCurrentUser());
    	    ui.start('#firebaseui-auth-container', uiConfig);
    	}
    };

    $scope.fetchLogin();
    
    $scope.myFunction = function($scope) {
    	firebase.auth().signOut()
    	 .catch(function (err) {
    	   alert('error logging out!');
    	 });
    	//redirect to cars page...
    	window.location.href = './#/cars';
    }
   
};