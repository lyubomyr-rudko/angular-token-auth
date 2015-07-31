'use strict';

/**
 * @ngdoc service
 * @name nodeAngularOausLearningApp.auth
 * @description
 * # auth
 * Service in the nodeAngularOausLearningApp.
 */
angular.module('nodeAngularOausLearningApp')
	.service('auth', function ($http, $window, $q, authToken, API_URL) {
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

		this.googleAuth = function () {
			var clientId = '958858990567-cvvik866sm852s3virfe4jqi4ucti4mv.apps.googleusercontent.com';
			var url = 'https://accounts.google.com/o/oauth2/auth?' +
				'response_type=code' +
				'&client_id=' + clientId + 
				'&redirect_uri=http://localhost:9000/' + // window.location.origin
				'&scope=profile email';

			var options = 'width=500, height=500, left=' + 
				($window.outerWidth - 500) / 2 + ', top=' + 
				($window.outerHeight - 500) / 2.5;

			var popup = $window.open(url, '', options);
			var deferred = $q.defer();

			$window.focus();
			$window.addEventListener('message', function (e) {
				if (e.origin === $window.location.origin) {
					$http.post(API_URL + 'auth/google', {
						clientId: clientId,
						redirectUri: window.location.origin + '/',
						code: e.data
					}).success(function (res) {
						authToken.setToken(res.token);
						deferred.resolve(res);
					}).error(function (res) {
						deferred.reject(res);
					});

					popup.close();
				}
			});

			return deferred.promise;
		};
	// AngularJS will instantiate a singleton by calling "new" on this function
  });
