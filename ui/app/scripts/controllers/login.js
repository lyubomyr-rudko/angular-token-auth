'use strict';

/**
 * @ngdoc function
 * @name nodeAngularOausLearningApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the nodeAngularOausLearningApp
 */
angular.module('nodeAngularOausLearningApp')
	.controller('LoginCtrl', function ($scope, $state, alert, auth) {
		$scope.submit = function () {
			auth.login($scope.email, $scope.password)
				.success(function (res) {
					alert('info', 'You are now Loged In!', 'Welcome back, ' + res.user.email + '!');

					$state.go('main');
				})
				.error(function () {
					alert('warning', 'Oops', 'Could not login'); 
				});
		};

		$scope.google = function () {
			auth.googleAuth()
				.then(function (res) {
					alert('info', 'You are now Loged In!', 'Welcome back, ' + res.user.email + '!');

					$state.go('main');
				}, function () {
					alert('warning', 'Oops', 'Could not login'); 
				});	
		};
});
	
