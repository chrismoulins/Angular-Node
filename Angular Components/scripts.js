/**
 * Created by inet2005 on 12/12/15.
 */
(function(){
    var app = angular.module('myApp', ['ngResource']);

    app.factory("Restaurant", function($resource) {
        return $resource("http://localhost:3000/api/restaurants/:_id", null,
            {'update':{method:'PUT'}
            });
    });

    app.controller('restaurantController', function($scope, Restaurant){

        $scope.displayReport = false;
        $scope.displayForm = false;
        $scope.displaySearch = false;

         //modify the Authorization header to send the username &amp; password
        //$http.defaults.headers.common.Authorization = 'Basic ' + base64.encode('chris' + ':' + 'whatever');

        $scope.showForm = function(){
            $scope.displayForm = true;
        };

        $scope.showSearch = function(){
            $scope.displaySearch = true;
        };

        Restaurant.query(function(data) {
            $scope.restaurants = data;
        });

        $scope.refreshRestaurants = function (){
            Restaurant.query(function(data) {
                $scope.restaurants = data;
            });
            $scope.message = "";
        };

        $scope.showRestaurant = function(id){
            Restaurant.get({ _id: id }, function(data) {
                $scope.restaurant = data;
            });
            $scope.displayReport = true;
        };

        $scope.hideReport = function(){
            $scope.displayReport = false;

        };

        $scope.addRestaurant = function (){

            var data = {
                borough: $scope.newBorough,
                cuisine: $scope.newCuisine,
                name: $scope.newName,
                restaurant_id: $scope.newRestaurantId,
                date: $scope.newDate,
                grade: $scope.newGrade,
                x: $scope.newLongitude,
                y: $scope.newLatitude,
                score: $scope.newScore,
                building: $scope.newBuilding,
                street: $scope.newStreet,
                zipcode: $scope.newZipCode
            };
            $scope.displayForm = false;
            $scope.message = Restaurant.save(data);
        };

        $scope.deleteRestaurant = function(id){
            $scope.message = Restaurant.delete({_id: id});
        };

        $scope.searchRestaurant = function(){
            Restaurant.query({ name: $scope.search }, function(data) {
                $scope.restaurants = data;
            });
            $scope.displaySearch = false;
        };

        $scope.updateRestaurant = function(id){
            var restaurant_id = document.getElementById('updateRestaurantId' + id).innerHTML;
            var name = document.getElementById('updateRestaurantName' + id).innerHTML;
            var cuisine = document.getElementById('updateRestaurantBorough' + id).innerHTML;
            var borough = document.getElementById('updateRestaurantCuisine' + id).innerHTML;

            Restaurant.get({_id: id}, function(data){
                var data = {
                    name: name,
                    borough: borough,
                    cuisine: cuisine,
                    restaurant_id: restaurant_id
                };
                $scope.message = Restaurant.update({_id: id}, data);
            });
        };

    });
})();