(function(){
  var app = angular.module('tarifario', []);
  
  app.controller('RateCalculatorController', function(){
    this.price = 0;
    
    this.getPrice = function() {
      this.price = 200;
    };
    
    this.clearForm = function() {
      this.origin = '';
      this.destination = '';
    }
  });
})();
