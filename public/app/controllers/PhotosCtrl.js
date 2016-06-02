'use-strict';
frontEnd.controller('PhotosCtrl',function($scope,User){
     $scope.userObj = User.get().userObj;
     $scope.albums=User.get().albums;
     $scope.photos=$scope.albums[User.get().index].photos.data;
     $scope.creds          = {
     access_key:'YOUR-KEY',
     secret_key:'YOUR-SECRET',
     bucket:'BucketName'
  };
  $scope.loadImage=function(index){
  	if(!$scope.photos[index].file){
	var file = null;
    var xhr = new XMLHttpRequest(); 
    xhr.open("GET", $scope.photos[index].picture); 
    xhr.responseType = "blob";//force the HTTP response, response-type header to be blob
    xhr.onload = function() 
    {
        file = xhr.response;//xhr.response is now a blob object
        //file.name=''
        console.log(file);
        $scope.photos[index].file = file;
        $scope.$apply();
    }
	xhr.send();
	}else{
		console.log('error');
	}

  }
  $scope.upload = function() {

  	AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
	AWS.config.region = 'us-east-1';
	var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });
  	$scope.index=0;
  	$scope.lastIndex=0;
  	var Upload=function(){

  				
 				while($scope.index<$scope.photos.length){
 					if($scope.photos[$scope.index].checked && $scope.photos[$scope.index].uploadProgress!=100) break;
 					else $scope.index++;
 				}
 				if($scope.index==$scope.photos.length){ 
 					if($scope.photos[$scope.lastIndex].uploadProgress==100){
 					alert('images uploaded Successfully');
 					}
 					return;
 				}else{
 					$scope.lastIndex=$scope.index;
 				}


			  	$scope.photos[$scope.index].uploadProgress = 0;
			    //
	            var fileSize = Math.round(parseInt($scope.photos[$scope.index].file.size));
	        	var uniqueFileName = $scope.uniqueString() + '-' + $scope.photos[$scope.index].file.name;

	        	var params = { Key: uniqueFileName, ContentType: $scope.photos[$scope.index].file.type, Body: $scope.photos[$scope.index].file, ServerSideEncryption: 'AES256' };

		        bucket.putObject(params, function(err, data) {
		          if(err) {
		            return false;
		          }
		          else {
		            // Upload Successfully Finished
		            
		            Upload();
		            // Reset The Progress Bar
		            /*setTimeout(function() {
		              $scope.photos[$scope.index].uploadProgress = 0;
		              $scope.$digest();
		            }, 4000);*/
		          }
		        })
		        .on('httpUploadProgress',function(progress) {
		          $scope.photos[$scope.index].uploadProgress = Math.round(progress.loaded / progress.total * 100);
		          //if($scope.photos[$scope.index].uploadProgress===100) Upload();
		          $scope.$digest();
		        });
  		
  	}
  	Upload();

		   
  	//
	}
  $scope.uniqueString = function() {
    var text     = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 8; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }


} );



