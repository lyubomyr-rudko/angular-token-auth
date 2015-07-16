'use strict';

/**
 * @ngdoc function
 * @name nodeAngularOausLearningApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the nodeAngularOausLearningApp
 */
angular.module('nodeAngularOausLearningApp')
  .controller('RegisterCtrl', function ($scope, $http, alert) {
    $scope.submit = function () {
    	var url = '/', 
    		user = {};

    	$http.post(url, user)
    		.success(function (res) {
    			console.log('ok', res);
    		})
    		.error(function () {
    			alert('warning', 'Oops', 'Could not register'); 
    		});
    };
  });
