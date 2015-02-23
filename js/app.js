var app = angular.module("myApp", []);

app.controller("GitCtrl", function($scope, $http) {

  $scope.user_info;

  $scope.getuser = function(username) {
    var user_url = "https://api.github.com/users/" + username + '?callback=JSON_CALLBACK';
    console.log(user_url);

    $http.jsonp(user_url).
      success(function(data) {
      console.log(data);
      $scope.user_info = data.data;
    }).
      error(function(data) {
    });
  }
});
