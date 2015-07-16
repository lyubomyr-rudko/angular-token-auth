'use strict';

/**
 * @ngdoc service
 * @name nodeAngularOausLearningApp.alert
 * @description
 * # alert
 * Service in the nodeAngularOausLearningApp.
 */
angular.module('nodeAngularOausLearningApp')
  .service('alert', function ($rootScope, $timeout) {
  	var alertTimeout;

  	return function (type, title, msg, timeout) {
  		$rootScope.alert = {
  			hasBeenShown: true,
  			show: true,
  			type: type,
  			msg: msg, 
  			title: title
  		};

  		$timeout.cancel(alertTimeout);
  		alertTimeout = $timeout(function () {
  			$rootScope.alert.show = false;
  		}, timeout || 2000);
  	};
  });
