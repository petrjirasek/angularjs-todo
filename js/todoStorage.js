'use strict';

// tovarna vytvori sluzbu, ktera zajistuje persistenci todos prostrednoctvim localStorage
todoapp.factory('todoStorage', function () {
	var STORAGE_ID = 'todos-angularjs';

	return {
		// vrati kolekci todos v JSON
		get:function () {
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},

		// aktualizuje todos
		put:function (todos) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
		}
	};
});
