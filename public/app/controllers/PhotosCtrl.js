'use-strict';
frontEnd.controller('PhotosCtrl',function($scope,User){
     $scope.userObj = User.get().userObj;
     $scope.albums=User.get().albums;
     $scope.photos=$scope.albums[User.get().index].photos.data;

} );



