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

    $http.jsonp(url)
    .success(function(result) {
      info.repo_list = result.data;
      defer.resolve(result.data)
    })
    .error(function(err) {
      defer.reject(err);
    });

    return defer.promise;
  }

  info.get_starred = function(starts_url) {
    var url = starts_url.split('{')[0] + '?callback=JSON_CALLBACK';
    console.log(url);
    var defer = $q.defer();

    $http.jsonp(url)
    .success(function(result) {
      console.log(result);
      defer.resolve(result.data)
    })
    .error(function(err) {
      defer.reject(err);
    });

    return defer.promise;
  }

  return info;
});



app.controller("GitCtrl", function($scope, info) {

  $scope.user_info = {};
  $scope.repo_list = {};
  $scope.starred_list = {};
  $scope.followers = {}
  $scope.following = {}

  $scope.get_all_info = function(username) {
    $scope.get_user(username);
    $scope.get_info(username);
  }

  $scope.get_user = function(username) {
    info.get_user(username)
    .then(function(res) {
      $scope.user_info = info.user;
    }, function(err) {
      // error
    })
  }

  $scope.get_info = function(username) {
    info.get_user(username)
    .then(function(res) {
      // success
      console.log(res.repos_url);

      // for repos
      info.get_repos(res.repos_url)
      .then(function(res) {
        $scope.repo_list = res
        // success
      }, function(err) {
        // err
      });

      // for starts
      info.get_starred(res.starred_url)
      .then(function(res) {
        // success
        $scope.starred_list = res;

      }, function(err) {
        // err
      })

    }, function(err) {
      // error
    })
  }

  //$scope.init();

});
