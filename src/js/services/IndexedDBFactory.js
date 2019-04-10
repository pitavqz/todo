var app = angular.module('TododApp');

app.factory('IndexDBTodo', function($window, $q){
    var indexedDB = $window.indexedDB;
    var dbtodo = null;
    var lastIndex = 0;

    var openDB = function(){
      var deferred = $q.defer();
      var request = indexedDB.open('TodoDB', 1);
      
      request.onupgradeneeded = function (e) {
        dbtodo = e.target.result;

          e.target.transaction.onerror = indexedDB.onerror;

          if (dbtodo.objectStoreNames.contains("task")) {
            dbtodo.deleteObjectStore("task");
          }

          var store = dbtodo.createObjectStore("task", {
              keyPath: "id"
          });
      };

      request.onsuccess = function (e) {
        dbtodo = e.target.result;
        deferred.resolve();
      };

      request.onerror = function () {
          deferred.reject();
      };

      return deferred.promise;
    }

    var getTasks = function () {
      var deferred = $q.defer();

      var trans = dbtodo.transaction(["task"], "readwrite");
      var store = trans.objectStore("task");
      var tasks = [];
      var keyRange = IDBKeyRange.lowerBound(0);
      var cursorRequest = store.openCursor(keyRange);

      cursorRequest.onsuccess = function (e) {

        var result = e.target.result;
        if (result === null || result === undefined) {
                  deferred.resolve(tasks);
        } else{
                  tasks.push(result.value);
                  if (result.value.id > lastIndex) {
                      lastIndex = result.value.id;
                  }
                  result.
                  continue ();
        }
      };

          cursorRequest.onerror = function (e) {
              console.log(e.value);
              deferred.reject("An Eror has ocurred getting tasks");
          };
      

        return deferred.promise;
    };

    var addTask = function (taskDesc) {
      var deferred = $q.defer();
      var trans = dbtodo.transaction(["task"], "readwrite");
      var store = trans.objectStore("task");
      
      lastIndex++;
      
      var request = store.put({
              "id": lastIndex,
                  "task_desc": taskDesc
      });

      request.onsuccess = function (e) {
              deferred.resolve();
      };

      request.onerror = function (e) {
              console.log(e.value);
              deferred.reject("Add task failed");
      };

      return deferred.promise;
    };

    var deleteTask = function (id) {
      var deferred = $q.defer();
      var trans = dbtodo.transaction(["task"], "readwrite");
      var store = trans.objectStore("task");

      var request = store.delete(id);

      request.onsuccess = function (e) {
              deferred.resolve();
      };

      request.onerror = function (e) {
              console.log(e.value);
              deferred.reject("Delete task failed");
      };

      return deferred.promise;
  };

  return {
    open: openDB,
    getTasks: getTasks,
    addTask: addTask,
    deleteTask: deleteTask
  };
});