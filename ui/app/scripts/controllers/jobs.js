'use strict';

/**
 * @ngdoc function
 * @name nodeAngularOausLearningApp.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * Controller of the nodeAngularOausLearningApp
 */
angular.module('nodeAngularOausLearningApp')
  .controller('JobsCtrl', function ($scope, $http, API_URL, alert) {

  	$http.get(API_URL + 'jobs')
  		.success(function (jobs) {
  			$scope.jobs = jobs;
  		})
  		.error(function (err) {
  			alert('warning', 'Unable to get jobs', err.message);
  		});
  });
