'use strict';

/**
 * @ngdoc function
 * @name nodeAngularOausLearningApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the nodeAngularOausLearningApp
 */
angular.module('nodeAngularOausLearningApp')
    .controller('RegisterCtrl', function ($scope, $state, alert, auth) {
        $scope.submit = function () {
            auth.register($scope.email, $scope.password)
                .success(function (res) {
                    alert('info', 'You are now registered!', 'Welcome back, ' + res.user.email + '!');

                    $state.go('main');
                })
                .error(function () {
                    alert('warning', 'Oops', 'Could not register'); 
                });
        };
});
