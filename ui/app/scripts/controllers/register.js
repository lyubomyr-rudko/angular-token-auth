'use strict';

/**
 * @ngdoc function
 * @name nodeAngularOausLearningApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the nodeAngularOausLearningApp
 */
angular.module('nodeAngularOausLearningApp')
    .controller('RegisterCtrl', function ($scope, $state, alert, $auth) {
        $scope.submit = function () {
            $auth.signup({
                email: $scope.email, 
                password: $scope.password
            })
            .then(function (res) {
                alert('info', 'You are now registered!', 'Welcome back, ' + res.data.user.email + '!');

                $state.go('main');
            })
            .catch(function () {
                alert('warning', 'Oops', 'Could not register'); 
            });
        };
});
