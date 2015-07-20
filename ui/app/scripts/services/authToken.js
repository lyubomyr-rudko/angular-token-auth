'use strict';

/**
 * @ngdoc service
 * @name nodeAngularOausLearningApp.authtoken
 * @description
 * # authtoken
 * Factory in the nodeAngularOausLearningApp.
 */
angular.module('nodeAngularOausLearningApp')
  .factory('authToken', function ($window) {
    var cachedToken = null;
    var storage = $window.localStorage;
    var userToken = 'userToken';

    // Public API here
    var authToken = {
    	setToken: function (token) {
    		cachedToken = token;

    		storage.setItem(userToken, token);
    	},

    	getToken: function () {
    		if (!cachedToken) {
    			cachedToken = storage.getItem(userToken);
    		}

    		return cachedToken;
    	},

    	isAuthenticated: function () {
    		return !!authToken.getToken();
    	},

    	removeToken: function () {
    		cachedToken = null;
    		storage.removeItem(userToken);
    	}
    };

    return authToken;
  });
