angular.module('dttw.game')

.directive('gameboard', [ function() {
	return {
		scope: true, // true = child scope
		restrict: 'E', // E = Element
		replace: true,
		templateUrl: 'src/game/gameboard/gameboard.html',
		controller: function($scope, $element, $attrs, $transclude) {
			var now,
				speed 	     = 1.05,
				dt           = 0,
				last         = window.performance.now(),
				framerate    = 1000/60,
				framerateID;

			$scope.rows = [];

			function getRandomInt(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}

			function updatePosition () {
				for (var i = 0; i < 6; i++) {
					$scope.rows[i].y += $scope.speed;
					if ($scope.rows[i].y > 100) {
						$scope.rows[i].y -= 150;
						$scope.rows[i].black = getRandomInt(0,3);
						$scope.setBlackTile(i, $scope.rows[i].black);
					}
					$scope.setRowPosition(i, $scope.rows[i].y);
				}
			}

			function reset () {
				$scope.rows = [];
				for (var i = 0; i < 6; i++) {
					$scope.rows[i] = {
						y: 75 - i*25,
						black: getRandomInt(0,3)
					};
					$scope.setBlackTile(i, $scope.rows[i].black);
					$scope.setRowPosition(i, $scope.rows[i].y);
				}
			}

			function destroy () {
				clearInterval(framerateID);
			}

			//$scope methods
			$scope.reset = reset;

			$scope.startGame = function () {
				reset();
				//start the game loop
				framerateID = setInterval(updatePosition, framerate);
			};

			//directive cleanup on scope destroy event
			$scope.$on('$destroy', destroy);

		},
		link: function($scope, element, attrs, gameCtrl) {
			var rowElements = [];
			console.log("element", element);

			for (var i = 0; i < element[0].children.length; i++) {
				rowElements[i] = element[0].children[i];
			}

			element.on('touchstart', function (event) {
				if (event.target.className.indexOf('black') > -1) {
					event.target.className = 'green';
					console.log("score");
				}
				if (event.target.className === '') {
					event.target.className = 'red flash';
					console.log("wrong");
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

			//initial fields position
			$scope.reset();
			//start game animation
			$scope.startGame();
		}
	};
}]);
