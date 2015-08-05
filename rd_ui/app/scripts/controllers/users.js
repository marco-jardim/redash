(function () {
  var UsersCtrl = function ($scope, $location, growl, Events, User) {
    Events.record(currentUser, "view", "page", "manage/users");
    $scope.$parent.pageTitle = "Users";

    $scope.users = User.query();

    $scope.openUser = function(user) {
      $location.path('/users/' + user.id);
    };

    $scope.deleteUser = function(event, user) {
      event.stopPropagation();
      Events.record(currentUser, "delete", "user", user.id);
      user.$delete(function(resource) {
        growl.addSuccessMessage("User deleted succesfully.");
        this.$parent.users = _.without(this.users, resource);
      }.bind(this), function(httpResponse) {
        console.log("Failed to delete data source: ", httpResponse.status, httpResponse.statusText, httpResponse.data);
        growl.addErrorMessage("Failed to delete data source.");
      });
    }
  };

  var UserCtrl = function ($scope, $routeParams, $http, $location, Events, User) {
    Events.record(currentUser, "view", "page", "manage/user");
    $scope.$parent.pageTitle = "Users";

    $scope.userId = $routeParams.userId;

    if ($scope.userId == "new") {
      $scope.user = new User({options: {}});
    } else {
      $scope.user = User.get({id: $routeParams.userId});
    }

    $scope.$watch('user.id', function(id) {
      if (id != $scope.userId && id !== undefined) {
        $location.path('/users/' + id).replace();
      }
    });
  };

  angular.module('redash.controllers')
    .controller('UsersCtrl', ['$scope', '$location', 'growl', 'Events', 'User', UsersCtrl])
    .controller('UserCtrl', ['$scope', '$routeParams', '$http', '$location', 'Events', 'User', UserCtrl])
})();
