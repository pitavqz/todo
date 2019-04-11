    
var app = angular.module('TododApp');

app.controller('TodoController', function ($window, TodoData) {
    var vm  = this;
    vm.tasks = [];  
    vm.title = 'To Do Application';
    vm.getTasks = function(){
      TodoData.getTasks().then(function (data) {
        vm.tasks = data; 
      }, function (err) {
          console.log(err);
      });
    }
    vm.addTask = function () {
      TodoData.addTask(vm.taskDesc).then(function () {
          vm.getTasks();
          vm.taskDesc = "";
      }, function (err) {
        console.log(err); 
      });
    };

    vm.deleteTask = function (id) {
      TodoData.deleteTask(id).then(function () {
          vm.getTasks();
        }, function (err) {
            console.log(err);
        });
    };
    
    function init() {
      TodoData.open().then(function () {
        vm.getTasks();
      });
    }

    init();
});
