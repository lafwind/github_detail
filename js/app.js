var app = angular.module("myApp", []);

app.controller("GitCtrl", ["$scope", "$http", "$q", function($scope, $http, $q) {


  $scope.user_info = {};
  $scope.repo_list = {};

  var get_user = function(username) {
    var user_url = "https://api.github.com/users/" + username + '?callback=JSON_CALLBACK';
    console.log(user_url);

    var defer = $q.defer();

    $http.jsonp(user_url)
    .success(function(result) {
      defer.resolve(result.data);
    })
    .error(function(err) {
      defer.reject(err);
    });

    console.log(defer.promise);
    return defer.promise;
  }


  var get_repo = function(repos_url) {
    var url =  repos_url + '?callback=JSON_CALLBACK';

    var defer = $q.defer();

    $http.jsonp(url).
      success(function(result) {
      $scope.repo_list = result.data;
      defer.resolve(result.data)
    }).
      error(function(err) {
      defer.reject(err);
    });

    return defer.promise;
  }


  $scope.get_info = function(username) {

    get_user(username)
    .then(function(result) {
      // success
      $scope.user_info = result;
      var repo_url = result.repos_url;

      get_repo(repo_url)
      .then(function(result) {
        $scope.repo_list = result;
      });

    });
    console.log($scope.repo_list);
  }
}]);
