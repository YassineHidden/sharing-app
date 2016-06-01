'use-strict';
frontEnd.controller('DashCtrl',function ($scope, User,$location) {
    $scope.userObj = User.get().userObj;
    $scope.getPhotos=function(){
				FB.api(
				  '/me/albums',
				  'GET',
				  {"fields":"name,photos{picture}"},
				  function(response) {
				  	
				  	 User.setAlbums(response.data);
				  	 $scope.$apply(function() { $location.path("/albums"); })
				  }
				);
    }
});