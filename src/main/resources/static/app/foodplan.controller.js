(function() {
'use strict';

angular.module('app', [])
.controller('FoodplanController', FoodplanController);

function FoodplanController($http) {
var vm = this;

vm.foods = [];
vm.ingredients = [];
vm.getFoods = getFoods;
vm.getIngredients = getIngredients;
vm.deleteFood = deleteFood;
vm.deleteIngredient = deleteIngredient;

init();

function init() {
getFoods();
}

function getFoods(){
var url = "/food";
var foodplanPromise = $http.get(url);
foodplanPromise.then(function(response){
vm.foods = response.data;
});
}

function getIngredients(){
var url = "/ingredient";
var foodplanPromise = $http.get(url);
foodplanPromise.then(function(response){
vm.ingredients = response.data;
});
}

function deleteFood(id){
var url = "/food/" + id;
var foodplanPromise = $http.delete(url);
foodplanPromise.then(function(response){
vm.foods = response.data;
});
}

function deleteIngredient(id){
var url = "/ingredient/" + id;
var foodplanPromise = $http.delete(url);
foodplanPromise.then(function(response){
vm.ingredients = response.data;
});
}
}
})();