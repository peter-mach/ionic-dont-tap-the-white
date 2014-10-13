/**
* dttw.menu Module
*
* Piotr Machowski
*/
angular.module('dttw.game', [])

.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('game', {
      url: '/game',
      controller: 'GameCtrl',
      templateUrl: 'src/game/game.html'
    });
}])

.controller('GameCtrl', ['$scope', '$state', function($scope, $state) {
	$scope.speed = 1.05;
	$scope.score = 0;
	$scope.maxScore = 0;

}])

;
