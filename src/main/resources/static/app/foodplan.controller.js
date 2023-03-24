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
vm.openTab = openTab;

init();

function init() {
disableAllTables()
getFoods();
getIngredients();
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

function openTab(evt, tabName) {
    //TODO update table content by openTab call

  var i, tabbuttons;

  // Get all elements with class="tables" and hide them
  disableAllTables()

  // Get all elements with class="tabbuttons" and remove the class "active"
  tabbuttons = document.getElementsByClassName("btn-default");
  for (i = 0; i < tabbuttons.length; i++) {
    tabbuttons[i].className = tabbuttons[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
//  evt.currentTarget.className += " active";
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