'use strict';

angular.module('myApp.addRecipe', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add-recipe', {
            templateUrl: 'add-recipe/add-recipe.html',
            controller: 'AddRecipeCtrl'
        });
    }])

    .controller('AddRecipeCtrl', ['$scope', 'Restangular', '$location', function ($scope, Restangular, $location) {
        // Initialize an empty recipe object with an empty ingredients and tags list inside.


        $scope.recipe = {
            ingredients: [],
            tags: []
        };

        // Add the ingredients to the recipe object we're building
        $scope.addIngredientToRecipe = function(ingredientName) {
            var ingredient = {name: ingredientName};
            $scope.recipe.ingredients.push(ingredient);
            $scope.ingredientName = '';

        };

        // Add the tags to the recipe object we're building
        $scope.addTagToRecipe = function (tagName) {
            var tag = {name: tagName};
            $scope.recipe.tags.push(tag);
            $scope.tagName = '';

        };

        // Add a new recipe, alert the user when it's been created or when there was a problem.
        $scope.addRecipe = function () {
            Restangular.all('add-recipe').customPOST($scope.recipe).then(function () {
                    alert("Your recipe was successfully created");
                    $location.path('/recipes');
                },
                function () {
                    alert("There was a problem creating your recipe. Please try again.")
                })}
    }]);