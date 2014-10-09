/**
* dttw.menu Module
*
* Piotr Machowski
*/
angular.module('dttw.menu', [])

.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('menu', {
      url: '/menu',
      controller: 'MenuCtrl',
      templateUrl: 'src/menu/menu.html'
    });
}])

.controller('MenuCtrl', ['$scope', '$state', function($scope, $state) {
	$scope.onPlayTap = function () {
		//start the game
		$state.go('game');
	};
}]);
