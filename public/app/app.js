'use-strict';
var frontEnd = angular.module('frontEnd', ['ngRoute']);

window.fbAsyncInit = function() {
    FB.init({
        appId      : '1034828379917797',
        xfbml      : true,
        version    : 'v2.6'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
    console.log('FB init');
}(document, 'script', 'facebook-jssdk'));