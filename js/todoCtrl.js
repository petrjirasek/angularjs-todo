'use strict';

// definice controlleru
todoapp.controller('TodoCtrl', function TodoCtrl($scope, todoStorage, filterFilter) {

	// ziskame todos ze storage
	var todos = $scope.todos = todoStorage.get();


	$scope.newTodo = "";
	$scope.editedTodo = null;

	// pri detekci zmeny v todos, dojde k volani funkce, ktera prepocita remainingCount a aktualizuje todos ve storage
	$scope.$watch('todos', function () {
		$scope.remainingCount = filterFilter(todos, {completed:false}).length;
		todoStorage.put(todos);
	}, true);

	// funkce pro pridani noveho zaznamu
	$scope.addTodo = function () {
		if (!$scope.newTodo.length) {
			return;
		}

		todos.push({
			title:$scope.newTodo,
			completed:false
		});

		$scope.newTodo = '';
	};

	// vyvola se pri editaci zaznamu
	$scope.editTodo = function (todo) {
		$scope.editedTodo = todo;
	};

	// vyvola se pri ulozeni editovaneho zaznamu
	$scope.doneEditing = function (todo) {
		$scope.editedTodo = null;
		if (!todo.title) {
			$scope.removeTodo(todo);
		}
	};

	// smaze zaznam
	$scope.removeTodo = function (todo) {
		todos.splice(todos.indexOf(todo), 1);
	};

	// odstrani vsechny zaznamy, ktere jsou dokonceny
	$scope.clearDoneTodos = function () {
		$scope.todos = todos = todos.filter(function (val) {
			return !val.completed;
		});
	};

});
