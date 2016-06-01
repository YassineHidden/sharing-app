'use-strict';
frontEnd.controller('AlbumsCtrl',function($scope,User,$location){
     $scope.userObj = User.get().userObj;
     $scope.albums=User.get().albums;
     $scope.albumPhotos=function(index){
        User.setIndex(index);
        $location.path("/photos");
     }
} );