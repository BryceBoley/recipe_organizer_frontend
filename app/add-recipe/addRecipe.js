
        };

        $scope.addRecipe = function () {

            Restangular.all('add-recipe').customPOST($scope.recipe).then(function () {
                    $location.path('/recipes');
                },
                function () {
                    alert("There was a problem creating your event. Please try again.")
                })
        };
       // $scope.addRecipe = function () {
       //     Restangular.all('add-recipe').customPOST($scope.recipe).then(function () {
       //             $location.path('/recipes');
       //         },
       //         function () {
       //             alert("There was a problem creating your event. Please try again.")
       //         })
       // };


        //Add a new recipe, alert the user when it's been created or when there was a problem.
        $scope.addRecipe = function () {
            //var boundary = "---------------------------7da24f2e50046";
            var fd = new FormData();
            //fd.append("photo", $scope.recipe.photo);
            fd.append("name", $scope.recipe.name);
            fd.append("description", $scope.recipe.description);
            fd.append("directions", $scope.recipe.directions);
            fd.append("ingredients", $scope.recipe.ingredients);
            fd.append("tags", $scope.recipe.tags);

            console.log(fd);

            $http.post('/recipes', fd, {
                headers: {'Content-Type': undefined },
                transformRequest: angular.identity

            }).success(function () {
                $location.path('/recipes');
            }).error(function (response) {
                console.log('Error response: ' + response);
            })};

        $scope.uploadFile = function (files) {
            $scope.recipe.photo = files[0];
            console.log($scope.recipe.photo);
        };

        $scope.convertImageUrl = function (url) {
            if (url !== null) {
                return url.replace(/http:.*media/, '/api/media')
            } else {
         
       return url('/img.chicken.jpeg')
            }
        };

        $scope.cancel = function () {
             $location.path('/recipes');

        };

    }]);
