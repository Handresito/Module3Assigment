(function(){
    'use strict';
    angular.module("SearchApp",[])
    .controller("SearchController", SearchController)
    .service("SearchService", SearchService)
    .constant("ApiBasePath", "https://davids-restaurant.herokuapp.com")
    .directive("myList", ListDirective);

    function ListDirective(){
        var ddo = {
            templateUrl: 'list.html',
            title: '@'
        };

        return ddo;
    };

    SearchController.$inject = ['SearchService','$q'];
    function SearchController(SearchService, $q){
        var vm = this;
        vm.searchInput = "";
        vm.menuTitle = "Menu List";
        vm.foundTitle = "Found List";

        vm.removeItem = function(index){
            vm.items.splice(index, 1);
        }
        
        vm.getItems = function(){
            if(vm.searchInput.trim() === ""){
                alert("Insert data in the textbox.");
                return;
            }
            var promise = SearchService.getMenuItem();
            promise.then(function(response){
                vm.foundItems = [];
                vm.results = "";
                vm.countItem = 0;
                vm.items = response.data.menu_items;
                for(var i = 0; i < vm.items.length;i++){
                    if(vm.items[i].description.toLowerCase().indexOf(vm.searchInput) !== -1){
                        vm.foundItems.push(vm.items[i]);
                        vm.countItem++;
                    }
                    if(vm.countItem === 0){
                        vm.results = "Nothing found."
                    }
                    else{
                        vm.results = "There are " + vm.foundItems.length  + " results."
                    }
                }
                vm.searchInput = "";
            })
            .catch(function(error){
                console.log("Something wrong happen.");
            });
        };
    };

    SearchService.$inject = ['$http', 'ApiBasePath']
    function SearchService($http, ApiBasePath){
        var service = this;
        
        service.getMenuItem = function(){
            var response = $http({
                method: 'GET',
                url: ApiBasePath + "/menu_items.json"
            });
            return response;
        };

        

        
    };
})();