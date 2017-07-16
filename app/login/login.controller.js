(function() {
	'use strict';

	function loginController($scope, $location, googleApi, security, sModal) {
		$scope.login = function() {
			googleApi.login().then(function(data) {
				security.authObject = data;
				$location.path('/tasklists');
			}, function(data) {
				$scope.error = true;
			});
		};
	}
	loginController.$inject = ['$scope', '$location', 'googleApi', 'security', 'sModal'];
	angular.module('login').controller('loginController', loginController);
})();