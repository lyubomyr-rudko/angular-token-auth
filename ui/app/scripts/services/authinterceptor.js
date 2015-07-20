'use strict';

/**
 * @ngdoc service
 * @name nodeAngularOausLearningApp.authInterceptor
 * @description
 * # authInterceptor
 * Factory in the nodeAngularOausLearningApp.
 */
angular.module('nodeAngularOausLearningApp')
  .factory('authInterceptor', function (authToken) {
    return {
      request: function (config) {
        var token = authToken.getToken();

        if (token) {
          config.headers.Authorization = 'Bearer ' + token;
        }

        return config;
      }, 

      response: function (response) {
        return response;
      }
    };
  });
