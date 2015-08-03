'use strict';

angular.module('nodeAngularOausLearningApp').config(function ($urlRouterProvider, $stateProvider, $httpProvider, $authProvider, API_URL) {

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

	$authProvider.loginUrl = API_URL + 'login';
	$authProvider.signupUrl = API_URL + 'register';

	$authProvider.google({
		clientId: '958858990567-cvvik866sm852s3virfe4jqi4ucti4mv.apps.googleusercontent.com',
		url: API_URL + 'auth/google',
		redirectUri: window.location.origin + '/',
		scope: ['profile', 'email']
	});

	$authProvider.github({
      	clientId: '995ac31ad7039c759150',
      	url: API_URL + 'auth/github',
      	redirectUri: window.location.origin + '/'
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
