'use-strict';
frontEnd.controller('AlbumsCtrl',function($scope,User,$location){
     $scope.userObj = User.get().userObj;
     $scope.albums=User.get().albums;

     function compare(a,b) {
		  if (a.name < b.name)
		    return -1;
		  else if (a.name > b.name)
		    return 1;
		  else 
		    return 0;
		}

	 $scope.albums.sort(compare);
     $scope.albumPhotos=function(index){
        User.setIndex(index);
        $location.path("/photos");
     }
} );