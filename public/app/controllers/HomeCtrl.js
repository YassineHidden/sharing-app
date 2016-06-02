'use-strict';
frontEnd.controller('HomeCtrl',function ($scope, $location, User) {
        $scope.FBLogin = function () {
            FB.login(function (response) {
                if (response.authResponse) {
                    console.log('Welcome!  Fetching your information.... ');
                    FB.api('/me', function (response) {
                        /*setting the user object*/
                        User.setUserObj(response);
                        console.log(response);
                        /*get the access token*/
                        var FBAccessToken = FB.getAuthResponse().accessToken;
                        User.setAccessToken(FBAccessToken);
                        $scope.$apply(function() { $location.path("/dashboard"); })
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            },{scope:'user_photos'});
        }
    });