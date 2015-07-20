'use strict';

/**
 * @ngdoc function
 * @name nodeAngularOausLearningApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the nodeAngularOausLearningApp
 */
angular.module('nodeAngularOausLearningApp')
  	.controller('HeaderCtrl', function ($scope, authToken) {
  		$scope.isAuthenticated = authToken.isAuthenticated;
  	});
