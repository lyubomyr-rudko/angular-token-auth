'use strict';

/**
 * @ngdoc function
 * @name nodeAngularOausLearningApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the nodeAngularOausLearningApp
 */
angular.module('nodeAngularOausLearningApp')
  .controller('LogoutCtrl', function (authToken, $state, $auth) {
    // authToken.removeToken();
    $auth.logout();
    $state.go('main');
  });
