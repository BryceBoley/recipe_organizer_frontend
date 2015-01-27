'use strict';

angular.module('myApp.recipeDetail', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/recipes/:recipeId', {
    templateUrl: 'recipe-detail/recipe-detail.html',
    controller: 'RecipeDetailCtrl'
  });
}])

.controller('RecipeDetailCtrl', ['$scope', 'Restangular', '$routeParams', '$location', 'NumberService', function($scope, Restangular, $routeParams) {

    $scope.recipeId = $routeParams.recipeId;

    Restangular.one('recipes', $scope.recipeId).customGET().then(function(data){
        $scope.recipe = data;
    })

}]);