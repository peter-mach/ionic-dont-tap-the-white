angular.module('dttw.game')

.directive('gameboard', [ function() {
	return {
		scope: true,
		restrict: 'E',
		replace: true,
		templateUrl: 'src/game/gameboard/gameboard.html',
		controller: function($scope, $element, $attrs, $transclude) {
			var framerate    = 1000/60, //60 fps
				framerateInterval,
				gameSpeed = 1.05;

			$scope.rows = [];

			function getRandomInt(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}

			function updatePosition () {
				for (var i = 0; i < 6; i++) {
					$scope.rows[i].y += gameSpeed;
					if ($scope.rows[i].y > 100) {
						if ($scope.rows[i].black >= 0) {
							//game over
							$scope.stopGame();
							$scope.gameOver();
						}

						$scope.rows[i].y -= 150;
						$scope.rows[i].black = getRandomInt(0,3);
						$scope.setBlackTile(i, $scope.rows[i].black);
					}
					$scope.setRowPosition(i, $scope.rows[i].y);
				}
			}

			function destroy () {
				clearInterval(framerateInterval);
				$element.off('touchstart');
			}

			//$scope methods
			$scope.reset = function () {
				$scope.score = 0;
				$scope.rows = [];
				for (var i = 0; i < 6; i++) {
					$scope.rows[i] = {
						y: 75 - i*25,
						black: getRandomInt(0,3)
					};
					$scope.setBlackTile(i, $scope.rows[i].black);
					$scope.setRowPosition(i, $scope.rows[i].y);
				}
				$scope.rows[0].black = -1;
				$scope.setBlackTile(0, $scope.rows[0].black);
			};

			$scope.startGame = function () {
				//start the game loop
				framerateInterval = setInterval(updatePosition, framerate);
			};

			$scope.stopGame = function () {
				clearInterval(framerateInterval);
			};

			//registering event listeners
			$scope.$on('$destroy', destroy);
			$scope.$on('game:start', $scope.startGame);

		},
		link: function($scope, element, attrs) {
			var rowElements = [];

			for (var i = 0; i < element[0].children.length; i++) {
				rowElements[i] = element[0].children[i];
			}

			element.on('touchstart', function (event) {
				if (event.target.className.indexOf('black') > -1) {
					event.target.className = 'green';
					$scope.rows[parseInt(event.target.getAttribute('row-id'))].black = -1;
					$scope.addScore();
				}
				if (event.target.className === '') {
					event.target.className = 'red flash';
					element.off('touchstart');
					$scope.stopGame();
					$scope.gameOver();
				}
			});

			$scope.setRowPosition = function (row, y) {
				rowElements[row].style.top = y+'%';
			};

			$scope.setBlackTile = function (row, i) {
				for (var t = 0; t < 4; t++) {
					rowElements[row].children[t].className = t===i ? 'black' : '';
				}
			};

			//initial gameboard layout
			$scope.reset();
		}
	};
}]);
