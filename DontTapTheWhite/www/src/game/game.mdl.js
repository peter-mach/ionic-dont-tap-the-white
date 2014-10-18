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

.controller('GameCtrl', ['$scope', '$state', '$ionicPopup', '$timeout', function($scope, $state, $ionicPopup, $timeout) {
	// game config
	$scope.score = 0;
	$scope.showCountdown = true;
	$scope.countdown = 'ready?';

	//starting the game
	$timeout(function(){
		$scope.countdown = 'GO!!!';
		$timeout(function () {
			$scope.showCountdown = false;
			$scope.$broadcast('game:start');
		}, 500);
	}, 1000);

	function gotoMenu () {
		$state.go('menu');
	}

	function restartGame () {
		//reload current state
		$state.go($state.current, {}, { reload: true });
	}

	$scope.addScore = function () {
		$scope.score += 1;
		$scope.$apply();
	};

	$scope.gameOver = function () {
		$ionicPopup.alert({
			title: 'your score',
			template: '<span class="highscore">' + $scope.score + '</span>',
			buttons: [{
					text: 'again!',
					type: 'again',
					onTap: function(e) {
						return 'again';
					}
				},{
					text: 'menu',
					type: 'button-default',
					onTap: function(e) {
						return 'menu';
					}
				},
			]
		}).then(function(response) {
			if (response === 'again') {
				restartGame();
			} else {
				gotoMenu();
			}
		});
	};

}]);
