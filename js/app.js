(function(){
  var app = angular.module('tarifario', []);
  
  app.controller('RateCalculatorController', [ '$http', function($http){
    var rateCtrl = this;
    rateCtrl.price = 0;
    rateCtrl.neighborhoods = []
    
    //$http.get('locations.json').success(function(data){
    //  rateCtrl.neighborhoods = data;
    //});
    
    rateCtrl.neighborhoods = [
      {
        "name": "Barrancas",
        "id": 1
      }, {
        "name": "Chico",
        "id": 2
      }, {
        "name": "San Cristobal",
        "id": 3
      }, {
        "name": "Mandalay",
        "id": 4
      }, {
        "name": "Kennedy",
        "id": 5
      }
    ];
    
    this.getPrice = function() {
      this.price = 200;
    };
    
    this.clearForm = function() {
      this.origin = '';
      this.destination = '';
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
