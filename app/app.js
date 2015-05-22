 var app = angular.module("app", []).
  config(function ($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider.when('/edu',
    {
      templateUrl:    'partials/edu.html',
      controller:     'EduCtrl'
    });
    $routeProvider.when('/about',
    {
      templateUrl:    'partials/about.html',
      controller:     'AboutCtrl'
    });
    $routeProvider.when('/contact',
    {
      templateUrl:    'partials/contact.html',
      controller:     'ContactCtrl'
    });
    $routeProvider.otherwise(
    {
      redirectTo:     '/about',
      controller:     'AboutCtrl', 
    }
  );
});

app.controller('NavCtrl', 
['$scope', '$location', function ($scope, $location) {
  $scope.navClass = function (page) {
    var currentRoute = $location.path().substring(1) || 'about';
    return page === currentRoute ? 'active' : '';
  };
  
  $scope.loadEdu = function () {
        $location.url('/edu');
    };
    
      $scope.loadAbout = function () {
        $location.url('/about');
    };
    
      $scope.loadContact = function () {
        $location.url('/contact');
    };
    
}]);

app.controller('MainCtrl', function ($scope) {
    $scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    };
  });

app.directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">{{ title }}</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });

