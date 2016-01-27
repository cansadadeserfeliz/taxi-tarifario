(function(){
  var app = angular.module('tarifario', []);
  
  app.controller('RateCalculatorController', function(){
    this.price = 0;
    this.neighborhoods = [
      {
        name: 'Barrancas',
        id: 1
      }, {
        name: 'Chico',
        id: 2
      }, {
        name: 'San Cristobal',
        id: 3
      }, {
        name: 'Mandalay',
        id: 4
      }, {
        name: 'Kennedy',
        id: 5
      }
    ]
    
    this.getPrice = function() {
      this.price = 200;
    };
    
    this.clearForm = function() {
      this.origin = '';
      this.destination = '';
    }
  });
})();
