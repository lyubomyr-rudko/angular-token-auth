'use strict';

/**
 * @ngdoc service
 * @name nodeAngularOausLearningApp.auth
 * @description
 * # auth
 * Service in the nodeAngularOausLearningApp.
 */
angular.module('nodeAngularOausLearningApp')
	.service('auth', function ($http, authToken, API_URL) {
		this.login = function (email, password) {
			var url = API_URL + 'login';

			var user = {
				email: email, 
				password: password
			};

			return $http.post(url, user).success(function (res) {
				authToken.setToken(res.token);
			});
		};

		this.register = function (email, password) {
			var url = API_URL + 'register';

			var user = {
				email: email, 
				password: password
			};

			return $http.post(url, user).success(function (res) {
				authToken.setToken(res.token);
			});
		};
	// AngularJS will instantiate a singleton by calling "new" on this function
  });
