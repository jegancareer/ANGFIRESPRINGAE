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


