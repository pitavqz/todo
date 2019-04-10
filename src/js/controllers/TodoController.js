    
var app = angular.module('TododApp');

app.controller('TodoController', function ($window, IndexDBTodo) {
    var vm  = this;

    vm.tasks = []

    vm.getTasks = function(){
      IndexDBTodo.getTasks().then(function (data) {
        vm.tasks = data; 
      }, function (err) {
          console.log(err);
      });
    }

    vm.addTask = function () {
      IndexDBTodo.addTask(vm.taskDesc).then(function () {
          vm.getTasks();
          vm.taskDesc = "";
      }, function (err) {
        console.log(err); 
      });
    };

    vm.deleteTask = function (id) {
      IndexDBTodo.deleteTask(id).then(function () {
          vm.getTasks();
        }, function (err) {
            console.log(err);
        });
    };
    
    function init() {
      IndexDBTodo.open().then(function () {
        vm.getTasks();
      });
    }

    init();
});
