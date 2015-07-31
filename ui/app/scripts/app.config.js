'use strict';

angular.module('nodeAngularOausLearningApp').config(function ($urlRouterProvider, $stateProvider, $httpProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('main', {
		url: '/',
		templateUrl: '/views/main.html'
	})
	.state('register', {
		url: '/register',
		templateUrl: '/views/register.html',
		controller: 'RegisterCtrl'
	})
	.state('login', {
		url: '/login',
		templateUrl: '/views/login.html',
		controller: 'LoginCtrl'
	})
	.state('jobs', {
		url: '/jobs',
		templateUrl: '/views/jobs.html',
		controller: 'JobsCtrl'
	})
	.state('logout', {
		url: '/logout',
		controller: 'LogoutCtrl'
	});

	$httpProvider.interceptors.push('authInterceptor');
})

.constant('API_URL', 'http://localhost:3000/api/')

.run(function ($window) {
	var params = $window.location.search.substring(1);

	if (params && params.indexOf('code') !== -1 && $window.opener && $window.opener.location.origin === $window.location.origin) {
		var pair = params.split('=');
		var code = decodeURIComponent(pair[1]);

		$window.opener.postMessage(code, $window.location.origin);
	}
});
