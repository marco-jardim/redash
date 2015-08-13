(function () {
  var UsersCtrl = function ($scope, $location, growl, Events, User, $log) {

    $log.debug("we are on UsersCtrl");

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
        "cellTemplate": '<a href="/users/{{dataRow.id}}">{{dataRow.name}}</a> (<a href="/queries/{{dataRow.query.id}}">query</a>)'
      },
      {
        'label': 'Email',
        'map': 'user.name'
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

  var UserCtrl = function ($scope, $routeParams, $http, $location, Events, User, $log) {

    $log.debug("we are on UserCtrl");

    $scope.saveChanges = function() {
      if ($scope.alert.name === undefined || $scope.alert.name === '') {
        $scope.alert.name = $scope.getDefaultName();
      }

      $scope.alert.$save(function(alert) {
        growl.addSuccessMessage("Saved.");
        if ($scope.alertId === "new") {
           $location.path('/users/' + alert.id).replace();
        }
      }, function() {
        growl.addErrorMessage("Failed saving alert.");
      });
    };

  };

  angular.module('redash.controllers')
    .controller('UsersCtrl', ['$scope', '$location', 'growl', 'Events', 'User', '$log', UsersCtrl])
    .controller('UserCtrl', ['$scope', '$routeParams', '$http', '$location', 'Events', 'User', '$log', UserCtrl])
})();
