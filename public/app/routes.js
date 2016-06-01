'use-strict';
frontEnd.config( function($routeProvider) {
	$routeProvider

		.when("/", {
			templateUrl : 'views/home/home.html',
			controller : 'HomeCtrl'
		})
		.when("/fb/login", {
			templateUrl : 'views/process/login.html',
			controller : 'LoginCtrl'
		})
		.when('/dashboard', {
			templateUrl : 'views/home/dashboard.html',
			controller : 'DashCtrl',
			authenticated: true
		})
		.when('/albums', {
			templateUrl : 'views/home/albums.html',
			controller : 'AlbumsCtrl',
			authenticated: true
		})
		.when('/photos', {
			templateUrl : 'views/home/photos.html',
			controller : 'PhotosCtrl',
			authenticated: true
		})
		.otherwise('/', {
			templateUrl : 'views/home/home.html',
			controller : 'HomeCtrl'
		});
});

frontEnd.run( function($rootScope, $location, User) {
	$rootScope.$on('$routeChangeStart', function(event, next, current) {

		/*If route is authenticated then check if the user has access token, else return to login screen*/
		if (next.$$route.authenticated) {
			var userAuth = User.get().accessToken;
			if (!userAuth) {

				$location.path("/");
			}
		}
	});
});