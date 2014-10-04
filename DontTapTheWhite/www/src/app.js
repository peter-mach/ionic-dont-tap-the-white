// Don't Tap The White -
// author: Piotr Machowski
// www: http://machowski.co

angular.module('dttw', [
  'ionic',
  'ui.router',

  'dttw.menu',

  ])

.config(['$urlRouterProvider', function($urlRouterProvider) {
  $urlRouterProvider.otherwise('/menu');
}])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
  });
});
