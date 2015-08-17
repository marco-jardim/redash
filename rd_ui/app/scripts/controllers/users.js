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
      // {
      //   'label': 'Parent User ID',
      //   'cellTemplate': '{{dataRow.parent_user_id}}'
      // },
      // {
      //   'label': 'Groups',
      //   'cellTemplate': '{{dataRow.groups}}'
      // },
      {
        'label': 'Countries',
        'cellTemplate': '{{dataRow.countries}}'
      },
      {
        'label': 'Created At',
        'cellTemplate': '<span am-time-ago="dataRow.created_at"></span>'
      },
      {
        'label': 'Updated At',
        'cellTemplate': '<span am-time-ago="dataRow.updated_at"></span>'
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

    $scope.countries = Country.getCurrentUserCountries();

    if ($scope.userId === "new") {
      Events.record(currentUser, 'view', 'page', 'users/new');
      $scope.user = new User({options: {}});
      // $log.debug($scope.countries);
    } else {
      Events.record(currentUser, 'view', 'user', $scope.userId);
      $scope.user = User.get({id: $scope.userId}, function(user) {

        countries = Country.getCountriesDict(user.countries);
        $scope.user.countries = countries[0];

        $log.debug(countries);
      });
    }

    $scope.saveChanges = function() {
      if ($scope.user.name === undefined || $scope.user.name === '') {
        // $scope.user.name = $scope.getDefaultName();
      }

      $scope.user.$save(function(user) {

        growl.addSuccessMessage("Saved.");

        if ($scope.userId === "new") {
           $location.path('/users/' + user.id).replace();
        } else {

          // CODE FOR SINGLE COUNTRY
          $scope.user = User.get({id: $scope.userId}, function(user){
            countries = Country.getCountriesDict(user.countries);
            $scope.user.countries = countries[0];
          });
          // END

        }

        $location.path("/users");

      }, function(e) {
        growl.addErrorMessage("Failed saving user.");
      });
    };


  };

  angular.module('redash.controllers')
    .controller('UsersCtrl', ['$scope', '$log', 'User', UsersCtrl])
    .controller('UserCtrl', ['$scope', '$routeParams', '$location', '$log', 'growl', 'Events', 'User', 'Country', UserCtrl])
})();
