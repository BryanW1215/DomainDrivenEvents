var App = angular.module('Sample', ['DomainEvents']);

App.controller('myEventEmittingController', ['$scope', '$events', function ($scope, $events){
   var myEmitter = $event.instance("EmitterDomain");

    myEmitter
        .emit('Message', "Hello World")
        .then(function () { console.log("Message Propagated")});

    $scope.$on('$destroy', myEmitter.destroy);
}]);

App.controller('myEventReceivingController', ['$scope', '$events', function ($scope, $events){
    var myEmitter = $event.instance("EmitterDomain");
    var SecondEmitter = $event.instance("DifferentDomain");

    myEmitter.on('Message', function (message){
        console.log('Message Received: ' + message);
    });

    SecondEmitter.on("Message", function (message){
        console.log('Message Received: ' + message);
        // This event is never fired because the second emitter is on a different domain
    });

    $scope.$on('$destroy', myEmitter.destroy);
    $scope.$on('$destroy', SecondEmitter.destroy);
}]);
