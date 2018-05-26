'use strict';

var AngularSpringApp = {};

var config = { };
	firebase.initializeApp(config);

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
	
	
	
var App = angular.module('AngularSpringApp', ['AngularSpringApp.filters', 'AngularSpringApp.services', 'AngularSpringApp.directives','firebase']);
App.run(function(){
	//alert('calld bef controller..,');
});

/*App.factory("messageService", function($q){ 
		return {authToken: function(){
				firebase.auth().onAuthStateChanged(function(user) {
				})
}}});*/


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
    
    $routeProvider.when('/rollcreate', {
        templateUrl: 'rollcreate/create',
        controller: 'RollCreateController',
        /*resolve: {
            message: function(messageService){
                return messageService.authToken();
        }
        }*/
    });
    
    $routeProvider.when('/auth', {
        templateUrl: 'auth/login',
        controller: AuthController
    });
    
    $routeProvider.when('/rolllist', {
        templateUrl: 'rolllist/list',
        controller: RollListController
    });
    
    $routeProvider.when('/rollinvite/:id', {
        templateUrl: 'rollinvite/invite',
        controller: RollInviteController
    });
    
    $routeProvider.when('/myinvites', {
        templateUrl: 'myinvites/list',
        controller: MyInvitesController
    });
    
    $routeProvider.otherwise({redirectTo: '/rolllist'});
}]);



