'use strict';

var AngularSpringApp = {};

var App = angular.module('AngularSpringApp', ['AngularSpringApp.filters', 'AngularSpringApp.services', 'AngularSpringApp.directives','firebase']);

// Declare app level module which depends on filters, and services
App.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/cars', {
        templateUrl: 'cars/layout',
        controller: CarController
    });

    $routeProvider.when('/roll/:id', {
        templateUrl: 'roll/layout',
        controller: RollController
    });
    
    $routeProvider.when('/auth', {
        templateUrl: 'auth/login',
        controller: AuthController
    });
    
    $routeProvider.otherwise({redirectTo: '/cars'});
}]);


var config = {
	   
};
firebase.initializeApp(config);

/*var rec = database.ref().child('RollProperty/1').once('value').then(function(snapshot) {
	 // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
	  // ...
	alert(' - '+ JSON.stringify(snapshot.val())) ;
	});
*/

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    firebase.database().ref("RollJoiners/" + user.uid + "/_details").update({
		name: user.displayName,
		email: user.email,
		photo: user.photoURL
	});
  } else {
    // User is signed out.so?
    // ...
  }
});
