(function () {
  var UsersCtrl = function ($scope, User, $log) {

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
        "cellTemplate": '<a href="/users/{{dataRow.id}}">{{dataRow.name}}</a>'
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

  var UserCtrl = function ($scope, $routeParams, $location, $log, Events, User) {

    $log.debug("we are on UserCtrl");
    $scope.$parent.pageTitle = "Users";

    $scope.alertId = $routeParams.alertId;

    if ($scope.alertId === "new") {
      Events.record(currentUser, 'view', 'page', 'users/new');
      $scope.alert = new Alert({options: {}});
    } else {
      Events.record(currentUser, 'view', 'alert', $scope.alertId);
      $scope.alert = Alert.get({id: $scope.alertId}, function(alert) {
        $scope.onQuerySelected(new Query($scope.alert.query));
      });
    }

  };

  angular.module('redash.controllers')
    .controller('UsersCtrl', ['$scope', 'User', '$log', UsersCtrl])
    .controller('UserCtrl', ['$scope', '$routeParams', '$location', '$log', 'Events', 'User', UserCtrl])
})();
