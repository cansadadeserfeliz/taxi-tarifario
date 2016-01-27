(function(){
  var app = angular.module('tarifario', []);
  
  app.controller('RateCalculatorController', [ '$http', function($http){
    var rateCtrl = this;
    rateCtrl.result = {};
    rateCtrl.neighborhoods = []
    
    //$http.get('locations.json').success(function(data){
    //  rateCtrl.neighborhoods = data;
    //});
    
    rateCtrl.beach = {
      "id": 0,
      "name": "Beach",
    }
    rateCtrl.neighborhoods = [
      {
        "id": 1,
        "name": "Barrancas",
        "city_id": 1
      }, {
        "id": 2,
        "name": "Chico",
        "city_id": 1
      }, {
        "id": 3,
        "name": "San Cristobal",
        "city_id": 1
      }, {
        "id": 4,
        "name": "Mandalay",
        "city_id": 1
      }, {
        "id": 5,
        "name": "Kennedy",
        "city_id": 1
      }, {
        "id": 6,
        "name": "Butovo",
        "city_id": 2
      }, {
        "id": 7,
        "name": "Sokolniki",
        "city_id": 2
      }, {
        "id": 8,
        "name": "Konkovo",
        "city_id": 2
      }
    ];
    
    rateCtrl.cities = [
      {
        "id": 1,
        "name": "Bogota",
        "price_unit": 72,
        "price_beach": 17000,
        "country_id": 1
      }, {
        "id": 2,
        "name": "Moscow",
        "price_unit": 4,
        "price_beach": 2500,
        "country_id": 2
      }
    ];
    
    rateCtrl.countries = [
      {
        "id": 1,
        "name": "Colombia",
        "currency": "COP"
      }, {
        "id": 2,
        "name": "Russia",
        "currency": "RUB"
      }
    ];
    
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
      if (form.origin.$invalid && form.destination.$invalid) {
        return;
      }
      var price = 0;
      var towards_beach = false;
      if (rateCtrl.destination == rateCtrl.beach.id) {
        towards_beach = true;
      }
      var origin_neighborhood = rateCtrl.getNeighborhood(rateCtrl.origin);
      var origin_city = rateCtrl.getCity(origin_neighborhood.city_id);
      var country = rateCtrl.getCountry(origin_city.country_id);
      
      var origin_name = [
        origin_neighborhood.name,
        origin_city.name,
        country.name,
      ].join(', ');
      
      if (!towards_beach) {
        var destination_neighborhood = rateCtrl.getNeighborhood(rateCtrl.destination);
        var destination_city = rateCtrl.getCity(destination_neighborhood.city_id);
      
        var destination_name = [
          destination_neighborhood.name,
          destination_city.name,
          country.name,
        ].join(', ');
        
        // TODO: check if origin country id and destination country id are equal
      } else {
        var destination_name = rateCtrl.beach.name;
        price = origin_city.price_beach;
      }
      
      rateCtrl.result = {
        origin: origin_name,
        destination: destination_name,
        price: price + ' ' + country.currency
      }
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
