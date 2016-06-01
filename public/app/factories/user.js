'use-strict';
frontEnd.factory('User',function () {
    var User = {};
  return {
    get: function() {
      return User;
    },
    setAccessToken:function(token){
       User.accessToken=token;
    },
    setAlbums:function(albums){
        User.albums=albums;
    },
    setUserObj:function(UserObj){
        User.userObj=UserObj;
    },
    setIndex:function(index){
        User.index=index;
    }
  };
});