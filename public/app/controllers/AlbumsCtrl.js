'use-strict';
frontEnd.controller('AlbumsCtrl',function($scope,User,$location){
     $scope.userObj = User.get().userObj;
     $scope.albums=User.get().albums;
     var indexRealSizeAlbum=0;
     var realSizeCoverPhoto=function(){
    if(indexRealSizeAlbum<$scope.albums.length){
    	if($scope.albums[indexRealSizeAlbum].photos){
		      FB.api(
		        '/'+$scope.albums[indexRealSizeAlbum].photos.data[0].id+'/picture',
		          'GET',
		          {"width":"500","height":"500"},
		          function(response) {
		              $scope.albums[indexRealSizeAlbum].photos.data[0].pictureRealSize=response.data.url;
		              indexRealSizeAlbum++;
		              realSizeCoverPhoto();
		              $scope.$digest();
		          }
		      );   
		} 	
		else{ 
		  	indexRealSizeAlbum++;
		  	realSizeCoverPhoto();
		}
	}
  }
     function compare(a,b) {
		  if (a.name < b.name)
		    return -1;
		  else if (a.name > b.name)
		    return 1;
		  else 
		    return 0;
		}
	 $scope.albums.sort(compare);
	 realSizeCoverPhoto();
     $scope.albumPhotos=function(index){
        User.setIndex(index);
        $location.path("/photos");
     }
} );