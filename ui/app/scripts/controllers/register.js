'use strict';

/**
 * @ngdoc function
 * @name nodeAngularOausLearningApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the nodeAngularOausLearningApp
 */
angular.module('nodeAngularOausLearningApp')
  .controller('RegisterCtrl', function ($scope, $http, $state, alert, authToken) {
    $scope.submit = function () {
    	var url = 'http://localhost:3000/api/register', 
    		user = {
                email: $scope.email, 
                password: $scope.password
            };

    	$http.post(url, user)
    		.success(function (res) {
    			alert('info', 'You are now registered!', 'Welcome, ' + res.user.email + '!');

                authToken.setToken(res.token);
                $state.go('main');
    		})
    		.error(function () {
    			alert('warning', 'Oops', 'Could not register'); 
    		});
    };
  });
