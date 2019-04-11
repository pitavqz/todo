( function(){ 
    var app = angular.module('TododApp', [
        'ngRoute'
    ])
    .config([
        '$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/todo-list.html',
                    controller: 'TodoController'
                });
        }
    ]);
}());

