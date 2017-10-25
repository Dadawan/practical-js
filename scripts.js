var todoList = {
	todos: [],

	addTodo: function(todo) {
		this.todos.push({
			todoText: todo,
			completed: false
		});
	},
	changeTodo: function(position, newText) {
		this.todos[position].todoText = newText;
	},
	deleteTodo: function(position) {
		this.todos.splice(position, 1);
	},
	toggleCompleted: function(position) {
		var todo = this.todos[position];
		todo.completed = !todo.completed;
	},
	toggleAll: function() {
		var length = this.todos.length;
		var complete = 0;

		for (var i = 0; i < length; i+=1) {
			if (this.todos[i].completed === true) {
				complete++;
			}
		}

		if (complete === 0 || complete === length) {
			for (var i = 0; i < length; i+=1) {
				this.todos[i].completed = !this.todos[i].completed;
			}
		} else {
			for (var i = 0; i < length; i+=1) {
				this.todos[i].completed = true;
			}
		}		
	}
}

var handlers = {
	addTodo: function() {
		var todoTextInput = document.getElementById('addTodoTextInput');
		todoList.addTodo(todoTextInput.value);
		todoTextInput.value = "";
		view.displayTodos();
	},
	changeTodo: function(position, newText) {
		todoList.changeTodo(position, newText);
		view.displayTodos();
	},
	deleteTodo: function(position) {
		todoList.deleteTodo(position);
		view.displayTodos();
	},
	toggleCompleted: function(position) {
		todoList.toggleCompleted(position);
		view.displayTodos();
	},
	toggleAll: function() {
		todoList.toggleAll();
		view.displayTodos();
	}
}

//doesn't change data in the app, no logic
var view = {
	displayTodos: function() {
		var todosUl = document.querySelector('ul');
		todosUl.innerHTML = "";
		
		for (var i = 0; i < todoList.todos.length; i+=1) {
			var todoLi = document.createElement('li');
			if (todoList.todos[i].completed === true) {
				todoLi.appendChild(this.createCompleteToggleButton());
				
			} else {
				todoLi.appendChild(this.createIncompleteToggleButton());
			}

			// var textElement = todoList.todos[i].todoText;

			todosUl.appendChild(todoLi);
			todoLi.appendChild(todoList.todos[i].todoText);

			todoLi.id = i;
			todoLi.appendChild(this.createDeleteButton());
		}

		if (todoList.todos.length === 0) {
			var todoLi = document.createElement('li');
			todoLi.textContent = "Hey now. Your todo list is empty!";
			todosUl.appendChild(todoLi);
		}
	},
	createDeleteButton: function() {
		var deleteButton = document.createElement('button');
		deleteButton.textContent = "Delete";
		deleteButton.className = "deleteButton"
		return deleteButton;
	},
	createCompleteToggleButton: function() {
		var toggleButton = document.createElement('button');
		toggleButton.textContent = "x";
		toggleButton.className = "toggleButton";
		return toggleButton;
	},
	createIncompleteToggleButton: function() {
		var toggleButton = document.createElement('button');
		toggleButton.textContent = "_";
		toggleButton.className = "toggleButton";
		return toggleButton;
	},
	createChangeInput: function() {
		var changeInput = document.createElement('input');
		// changeInput.textContent = ;
		changeInput.className = "changeInput";
		return changeInput;
	},
	setUpEventListeners: function() {
		var todosUl = document.querySelector('ul');
		var addInput = document.querySelector('input');
		
		todosUl.addEventListener('click', function(event) {
			var clickedElement = event.target;

			if (clickedElement.className === "deleteButton") {
				handlers.deleteTodo(parseInt(clickedElement.parentNode.id));
			} else if (clickedElement.className === "toggleButton") {
				handlers.toggleCompleted(parseInt(clickedElement.parentNode.id));
			}
		})

		addInput.addEventListener('keyup', function(event) {
			if (event.keyCode === 13) {
				handlers.addTodo()
			}
		})

		todosUl.addEventListener('dblclick', function(event) {
			var changeInput = document.createElement('input');
			changeInput.value = todoList.todos[parseInt(event.target.id)].todoText;

			if (event.target.childNodes.length === 4) {
				event.target.children[2] = changeInput;
			} else {
				// var changeInput = document.createElement('input');
				// changeInput.value = todoList.todos[parseInt(event.target.id)].todoText;

				event.target.appendChild(changeInput);

				changeInput.addEventListener('keyup', function(event) {
					if (event.keyCode === 13) {
						todoList.todos[parseInt(event.target.parentNode.id)].todoText = changeInput.value
						handlers.changeTodo(parseInt(event.target.parentNode.id), todoList.todos[parseInt(event.target.parentNode.id)].todoText);
					}
				})
			}
		})
	}
}

view.setUpEventListeners();

//so we have the todoList object with methods, and the todos array
//we have the handlers object to handle dom manipulation
//we have the view object to handle dom rendering

//1. get access to display todos button
//by saving reference to button with id to variable

// var displayTodosButton = document.getElementById('displayTodosButton');
// console.log(displayTodosButton);

//2. run display method when display todos button is clicked
//by adding event listener to the button
// displayTodosButton.addEventListener('click', function() {
// 	todoList.displayTodos();
// });

//now repeat for toggleAllButton
// var toggleAllButton = document.getElementById('toggleAllButton');
// toggleAllButton.addEventListener('click', function() {
// 	todoList.toggleAll();
// });

// var addTodoButton = document.getElementById('addTodoButton');
// addTodoButton.addEventListener('click', )
