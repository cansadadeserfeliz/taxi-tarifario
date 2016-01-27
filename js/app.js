(function(){
  var app = angular.module('tarifario', []);
  
  app.controller('RateCalculatorController', [ '$http', function($http){
    var rateCtrl = this;
    rateCtrl.result = {
      has_route: false
    };
    rateCtrl.neighborhoods = []
    
    
    $http.get('data/neighborhoods.json').success(function(data){
      rateCtrl.neighborhoods = data;
    });
    $http.get('data/cities.json').success(function(data){
      rateCtrl.cities = data;
    });
    $http.get('data/countries.json').success(function(data){
      rateCtrl.countries = data;
    });
    $http.get('data/rates.json').success(function(data){
      rateCtrl.rates = data;
    });
    
    rateCtrl.beach = {
      "id": 0,
      "name": "Playa",
    }
    
    this.getNeighborhood = function(id) {
      return _.find(
        rateCtrl.neighborhoods, 
        function(neighborhood){ return neighborhood.id == id; }
      );
    };
    
    this.getCity = function(id) {
      return _.find(
        rateCtrl.cities, 
        function(city){ return city.id == id; }
      );
    };
    
    this.getCountry = function(id) {
      return _.find(
        rateCtrl.countries, 
        function(country){ return country.id == id; }
      );
    };
        
    this.getPrice = function(form) {
      if (form.$invalid) {
        return;
      }
      var price = 0;
      rateCtrl.result = {
        towards_beach: false,
        price: 0,
        has_route: true,
        no_route_message: 'No hay ruta encontrada.'
      };
      
      if (rateCtrl.destination == rateCtrl.beach.id) {
        rateCtrl.result.towards_beach = true;
      }
      
      // Get origin info
      var origin_neighborhood = rateCtrl.getNeighborhood(rateCtrl.origin);
      var origin_city = rateCtrl.getCity(origin_neighborhood.city_id);
      var country = rateCtrl.getCountry(origin_city.country_id);
      var origin_name = [
        origin_neighborhood.name,
        origin_city.name,
        country.name,
      ].join(', ');
      
     if (!rateCtrl.result.towards_beach) {
        // Get destonation info
        var destination_neighborhood = rateCtrl.getNeighborhood(rateCtrl.destination);
        var destination_city = rateCtrl.getCity(destination_neighborhood.city_id);
      
        var destination_name = [
          destination_neighborhood.name,
          destination_city.name,
          country.name,
        ].join(', ');
        
        // Check if origin city and destination city are equal
        if (origin_neighborhood.city_id != destination_neighborhood.city_id) {
          rateCtrl.result.has_route = false;
          rateCtrl.result.no_route_message = 'No se puede tomar taxi entre ciudades diferentes'
        } else {
          // Get units between origin and destination neighborhoods
          var units = 0;
          if (rateCtrl.origin in rateCtrl.rates && rateCtrl.destination in rateCtrl.rates[rateCtrl.origin]) {
            units = rateCtrl.rates[rateCtrl.origin][rateCtrl.destination];
          } else if (rateCtrl.destination in rateCtrl.rates && rateCtrl.origin in rateCtrl.rates[rateCtrl.destination]) {
            units = rateCtrl.rates[rateCtrl.destination][rateCtrl.origin];
          } else {
            rateCtrl.result.has_route = false;
          }
          price = origin_city.price_per_unit * units;
        }
      } else {
        // Get price to the beach
        var destination_name = rateCtrl.beach.name;
        price = origin_city.price_beach;
      }
      
      rateCtrl.result.origin = origin_name;
      rateCtrl.result.destination = destination_name;
      rateCtrl.result.price = price + ' ' + country.currency;
    };
    
    this.clearForm = function() {
      rateCtrl.origin = '';
      rateCtrl.destination = '';
      rateCtrl.result = {};
    }
  } ]);
  
  app.directive('equalsToOrigin', [
    function() {
      var link = function($scope, $element, $attrs, ctrl) {
        var validate = function(viewValue) {
          var comparisonModel = $attrs.equalsToOrigin;
          if(!viewValue || !comparisonModel){
            // It's valid because we have nothing to compare against
            ctrl.$setValidity('equalsToOrigin', true);
          }
          // It's valid if model is lower than the model we're comparing against
          ctrl.$setValidity('equalsToOrigin', parseInt(viewValue, 10) != parseInt(comparisonModel, 10) );
          return viewValue;
        };
        ctrl.$parsers.unshift(validate);
        ctrl.$formatters.push(validate);
        $attrs.$observe('equalsToOrigin', function(comparisonModel){
          return validate(ctrl.$viewValue);
        });
      };
      return {
        require: 'ngModel',
        link: link
      };
    }
  ]);
})();
