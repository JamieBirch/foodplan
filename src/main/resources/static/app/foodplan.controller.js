(function() {
    'use strict';

    angular.module('app', [])
        .controller('FoodplanController', FoodplanController);

    function FoodplanController($http) {
        var vm = this;

        vm.openTab = openTab;

        vm.ingredients = [];
        vm.getIngredients = getIngredients;
        vm.deleteIngredient = deleteIngredient;
        vm.addIngredient = addIngredient;

        vm.foods = [];
        vm.getFoods = getFoods;
        vm.deleteFood = deleteFood;
        vm.addFood = addFood;

        init();

        function init() {
            disableAllTables();
//            getFoods();
//            getIngredients();
        }

        // Ingredients

        function getIngredients() {
            var url = "/ingredient";
            var foodplanPromise = $http.get(url);
            foodplanPromise.then(function(response) {
                vm.ingredients = response.data;
            });
        }

        function deleteIngredient(id) {
            var url = "/ingredient/" + id;
            var foodplanPromise = $http.delete(url);
            foodplanPromise.then(function(response) {
                getIngredients();
            });
        }

        function addIngredient(name) {
            var url = "/ingredient";
            var myJson = { "name": name };
            $http.post(url, myJson)
                .then(function(response) {
                    console.log('Ingredient added:', response.data);
                    getIngredients();
                })
                .catch(function(error) {
                    console.error('There was a problem adding the ingredient:', error);
                });
        }

        // Foods

        function getFoods() {
            var url = "/food";
            var foodplanPromise = $http.get(url);
            foodplanPromise.then(function(response) {
                vm.foods = response.data;
            });
        }

        function deleteFood(id) {
            var url = "/food/" + id;
            var foodplanPromise = $http.delete(url);
            foodplanPromise.then(function(response) {
                getFoods();
            });
        }

        function addFood(food) {
            var url = "/food";
            var myJson = JSON.stringify(food);
            $http.post(url, myJson)
                .then(function(response) {
                    console.log('Food added:', response.data);
                    getFoods();
                })
                .catch(function(error) {
                    console.error('There was a problem adding the food:', error);
                });
        }

        // Other

        function openTab(evt, tabName) {
            // Update table content by calling corresponding function
            switch (tabName) {
                case "Foods":
                    getFoods();
                    break;
                case "Ingredients":
                    getIngredients();
                    break;
                default:
                    break;
            }

            var i, tabbuttons;

            // Get all elements with class="tables" and hide them
            disableAllTables();

            // Make table visible
            document.getElementById(tabName).style.display = "table";

            // Get all elements with class="tabbuttons" and remove the class "active"
            tabbuttons = document.getElementsByClassName("btn-default");
            for (i = 0; i < tabbuttons.length; i++) {
                tabbuttons[i].className = tabbuttons[i].className.replace(" active", "");
            }

            // Add the class "active" to the button that opened the tab
//            evt.currentTarget.className += " active";
        }

        function disableAllTables() {
            var i, tables;
            tables = document.getElementsByClassName("table");
            for (i = 0; i < tables.length; i++) {
                tables[i].style.display = "none";
            }
        }
    }
})();
