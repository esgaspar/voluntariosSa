var app = angular.module('cdg', [require('angular-route'),'angularUtils.directives.dirPagination']);

app.config(function($routeProvider){
	$routeProvider.when("/", {
		templateUrl : "views/voluntario.html",
		controller : "voluntarioController",
        access: { requiredLogin: false }
	});
});
