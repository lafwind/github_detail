var app = angular.module("myApp", []);

app.service("info", function($http, $q) {

  var info = this;

  info.user = {};
  info.repo_list = {};

  info.get_user = function(username) {
    var user_url = "https://api.github.com/users/" + username + '?callback=JSON_CALLBACK';

    var defer = $q.defer();

    $http.jsonp(user_url)
    .success(function(result) {
      info.user = result.data;
      defer.resolve(result.data);
    })
    .error(function(err) {
      defer.reject(err);
    });

    return defer.promise;
  }

  info.get_repos = function(repos_url) {
    var url =  repos_url + '?callback=JSON_CALLBACK';
    var defer = $q.defer();

    $http.jsonp(url).
      success(function(result) {
      info.repo_list = result.data;
      defer.resolve(result.data)
    }).
      error(function(err) {
      defer.reject(err);
    });

    return defer.promise;
  }

  return info;
});



app.controller("GitCtrl", function($scope, info) {

  $scope.user_info = {};
  $scope.repo_list = {};

  $scope.init = function(username) {
    $scope.get_user(username);
  }

  $scope.get_user = function(username) {
    info.get_user(username)
    .then(function(res) {
      $scope.user_info = info.user;
    }, function(err) {
      // error
    })
  }


  $scope.get_repo = function(username) {
    $scope.get_user(username);
    console.log($scope.user_info);
  }


  $scope.get_info = function(username) {
    $scope.get_user(username);
  }

  $scope.init();


});
