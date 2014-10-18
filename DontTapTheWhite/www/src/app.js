// Don't Tap The White -
// author: Piotr Machowski
// www: http://machowski.co

angular.module('dttw', [
  //libs
  'ionic',
  'ui.router',

  //game specific includes
  'dttw.menu',
  'dttw.game'

  ])

.config(['$urlRouterProvider', function($urlRouterProvider) {
  //set default view
  $urlRouterProvider.otherwise('/menu');
}])

;
