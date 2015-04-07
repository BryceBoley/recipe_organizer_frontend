'use strict';

angular.module('myApp.recipeDetail', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/recipes/:recipeId', {
            templateUrl: 'recipe-detail/recipe-detail.html',
            controller: 'RecipeDetailCtrl'
        });
    }])

    .controller('RecipeDetailCtrl', ['$scope', 'Restangular', '$routeParams', '$location', '$http', function($scope, Restangular, $routeParams, $location, $http) {

        $scope.recipeId = $routeParams.recipeId;

        Restangular.one('recipes', $scope.recipeId).customGET().then(function (data) {
            $scope.recipe = data;
        });

        $scope.convertImageUrl = function (url) {
            return url.replace(/http:.*media/, '/api/media');
        };

        $scope.deleteRecipe = function () {
            var confirmation = confirm('Are you sure you want to delete this recipe? This cannot be undone');

            if (confirmation) {
                Restangular.one('recipes', $scope.recipeId).customDELETE().then(function () {
                        $location.path('/recipes');
                    },
                    function () {
                        alert('There was a problem deleting your recipe')
                    })
            }
        };

        $scope.editRecipe = function () {
            var fd = new FormData();
            //fd.append("photo", $scope.recipe.photo);
            fd.append("name", $scope.recipe.name);
            fd.append("description", $scope.recipe.description);
            fd.append("directions", $scope.recipe.directions);
            fd.append("ingredients", $scope.recipe.ingredients);
            //fd.append("tags", $scope.recipe.tags);

            $http.put('/recipes' + $scope.recipe.id, fd, {
                headers: {'Content-type': undefined },
                transformRequest: angular.identity

            }).success(function () {
                $location.path('/recipes');
            }).error(function (response) {
                console.log('Error response: ' + response);
            })};

        $scope.uploadFile = function (files) {
            $scope.recipe.photo = files[0];
        };

        $scope.convertImageUrl = function (url) {
            return url.replace(/http:.*media/, '/api/media');
        };

        $scope.cancel = function () {
            $location.path('/recipes');

        }
    }]);