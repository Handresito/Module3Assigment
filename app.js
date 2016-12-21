(function(){
    'use strict';
    angular.module("SearchApp",[])
    .controller("SearchController", SearchController)
    .service("SearchService", SearchService)
    .constant("http://davids-restaurant.herokuapp.com", ApiBasePath);

    SearchController.$inject = ['SearchService'];
    function SearchController(SearchService){
        var vm = this;
        vm.items = SearchService.getItems();
    };

    SearchService.$inject = ['$http']
    function SearchService($http){
        var service = this;
        service.items = [];

        $http({
            method: 'GET',
            url: ApiBasePath + "/menu_items.json"
        }).then(function(response){
            service.items = response.data;
        }, function(error){
            console.log(error.message);
        });

        service.getItems = function(){
            return service.items;
        };
    };
})();