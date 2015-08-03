'use strict';

/**
 * @ngdoc function
 * @name nodeAngularOausLearningApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the nodeAngularOausLearningApp
 */
angular.module('nodeAngularOausLearningApp')
	.controller('LoginCtrl', function ($scope, $state, alert, auth, $auth, authToken) {
		$scope.submit = function () {
			$auth.login({
				email: $scope.email, 
				password: $scope.password
			}).then(function (res) {
				alert('info', 'You are now Loged In!', 'Welcome back, ' + res.data.user.email + '!');

				$state.go('main');
			}).catch(function () {
				alert('warning', 'Oops', 'Could not login'); 
			});
		};

		$scope.authenticate = function (provider) {
			$auth.authenticate(provider)
				.then(function (res) {
					alert('info', 'You are now Loged In!', 'Welcome back, ' + res.data.user.email + '!');
					$state.go('main');
				}, function () {
					alert('warning', 'Oops', 'Could not login'); 
				});	
		};
});
	
