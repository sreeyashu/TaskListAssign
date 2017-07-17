(function() {
	'use strict';

	function googleTasksConfig(googleApiProvider) {
		googleApiProvider.setConfig({
			clientId: '1093081869946-15u613sb6rdpvosl2vfgio3iua4sj3ju.apps.googleusercontent.com',
			apiKey: 'AIzaSyAJz7KoMbyN9f5QHpy7OwV6uFISqt0kL_0',
			scopes: ['https://www.googleapis.com/auth/tasks', 'https://www.googleapis.com/auth/plus.me']
		});
	}

	googleTasksConfig.$inject = ['googleApiProvider'];


	function googleTasksRun($rootScope, $timeout, $q, $location, application, googleApi, security) {
		/** @property signed_in */

		var gapiPromise,
			timeout,
			routeChangePromise,
			onRouteChangeSuccessHandler,
			onRouteChangeSuccess;

		gapiPromise = googleApi.init().then(function (data) {
			return security.setAuthObject(data);
		});

		// Splash screen will be visible at least 500ms
		timeout = $timeout(angular.noop, 500, false);

		routeChangePromise = $q.defer();

		onRouteChangeSuccessHandler = function () {
			routeChangePromise.resolve();
			onRouteChangeSuccess();
		};

		onRouteChangeSuccess = $rootScope.$on('$routeChangeSuccess', onRouteChangeSuccessHandler);

		// Need to remember this promise for the first time
		security.authState = gapiPromise;

		$q.all([timeout, gapiPromise, routeChangePromise.promise]).then(function () {
			application.ready();
		});

		// Listen route change events
		$rootScope.$on('$locationChangeStart', function () {

			var path = $location.path();

			if (path === '' || path === '/') {

				application.ready(function () {
					var redirectPath = security.isSignedIn() ? '/tasklists' : '/login';
					$location.path(redirectPath);
				});

				// In this case manually resolve $routeChangeSuccess
				onRouteChangeSuccessHandler();
			}
		});

		// On route change error redirect
		var resolveOnce = false;
		$rootScope.$on('$routeChangeError', function (event, current) {

			if (!resolveOnce) {
				resolveOnce = true;
				routeChangePromise.resolve();
				onRouteChangeSuccess();
			}

			application.ready(function () {
				var onRouteError = current.onRouteError;
				if (onRouteError && onRouteError.redirectTo) {
					$location.path(onRouteError.redirectTo);
				}
			});
		});
	}

	googleTasksRun.$inject = ['$rootScope', '$timeout', '$q', '$location', 'application', 'googleApi', 'security'];

	angular.module('googleTasks', [
		'ui.bootstrap',
		'ngRoute',
		'ngAnimate',
		'ngSanitize',
		'components.services',
		'components.directives',
		'login',
		'tasklists',
		'tasks'
	], googleTasksConfig).run(googleTasksRun);
})();


angular.extend = function extendDeep(dst) {
	'use strict';

	angular.forEach(arguments, function(obj) {
		if (obj !== dst) {
			angular.forEach(obj, function(value, key) {
				if (dst[key] && dst[key].constructor && dst[key].constructor === Object) {
					extendDeep(dst[key], value);
				} else {
					dst[key] = value;
				}
			});
		}
	});
	return dst;
};
