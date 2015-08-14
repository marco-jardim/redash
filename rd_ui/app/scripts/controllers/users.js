(function () {
  var UsersCtrl = function ($scope, $log, User) {

    // $log.debug("we are on UsersCtrl");

    $scope.users = [];

    User.getAll(function(users){
      $scope.users = users;
    });

    $scope.gridConfig = {
      isPaginationEnabled: true,
      itemsByPage: 50,
      maxSize: 8,
    };


    $scope.gridColumns = [
      {
        "label": "Name",
        "map": "name",
        "cellTemplate": '<a href="/users/{{dataRow.id}}">{{dataRow.name}}</a>'
      },
      {
        'label': 'Email',
        'cellTemplate': '{{dataRow.email}}'
      },
      {
        'label': 'Parent User ID',
        'cellTemplate': '{{dataRow.parent_user_id}}'
      },
      {
        'label': 'Groups',
        'cellTemplate': '{{dataRow.groups}}'
      },
      {
        'label': 'Countries',
        'cellTemplate': '{{dataRow.countries}}'
      },
      {
        'label': 'Created At',
        'cellTemplate': '{{dataRow.created_at}}'
      },
      {
        'label': 'Updated At',
        'cellTemplate': '{{dataRow.updated_at}}'
      },
      {
        'label': 'Status',
        'cellTemplate': '{{dataRow.status}}'
      }
    ];

  };

  var UserCtrl = function ($scope, $routeParams, $location, $log, growl, Events, User, Country) {

    $log.debug("we are on UserCtrl");
    $scope.$parent.pageTitle = "Users";

    $scope.userId = $routeParams.userId;

    if ($scope.userId === "new") {
      $scope.countries = currentUser.countries;
      Events.record(currentUser, 'view', 'page', 'users/new');
      $scope.user = new User({options: {}});
    } else {
      Events.record(currentUser, 'view', 'user', $scope.userId);
      $scope.user = User.get({id: $scope.userId}, function(user) {
      $log.debug($scope.userId);
      $log.debug(user);
      });
    }

    $scope.saveChanges = function() {
      if ($scope.user.name === undefined || $scope.user.name === '') {
        // $scope.user.name = $scope.getDefaultName();
      }
      countries = [];
      oldUserCountriesObj = $scope.user.countries;

      _.each($scope.user.countries, function(country){
        countries.push(country['code']);
      });

      $scope.user.countries = countries;

      $scope.user.$save(function(user) {

        $scope.user.countries = oldUserCountriesObj;

        growl.addSuccessMessage("Saved.");

        if ($scope.userId === "new") {
           $location.path('/users/' + user.id).replace();
        }

      }, function(e) {
        growl.addErrorMessage("Failed saving user.");
      });
    };
  };

  angular.module('redash.controllers')
    .controller('UsersCtrl', ['$scope', '$log', 'User', UsersCtrl])
    .controller('UserCtrl', ['$scope', '$routeParams', '$location', '$log', 'growl', 'Events', 'User', 'Country', UserCtrl])
})();
