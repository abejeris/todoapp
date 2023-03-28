const welcomeUser = document.querySelector("#usernameLogo");
const getUser = JSON.parse(localStorage.getItem("LoggedInAs"));
welcomeUser.textContent = getUser.username;

const todoInput = document.querySelector("#todo");
const addBtn = document.querySelector("#add");

const userTodosKey = `todos-${getUser.username}`; // Use username as part of key
const userFavorites = `favorites-${getUser.username}`; //use username as part of key for favorite todos

let todos = JSON.parse(localStorage.getItem(userTodosKey)) || [];
let todosFav = JSON.parse(localStorage.getItem(userFavorites)) || [];

function renderTodos() {
	const todoListContainer = document.querySelector("#todoList");
	todoListContainer.innerHTML = ""; // Clear list before rendering

	todos.forEach((todo, index) => {
		const todoListDiv = document.createElement("div");
		todoListDiv.classList.add("todoDiv");
		todoListDiv.setAttribute("data-id", todo);
		todoListContainer.append(todoListDiv);

		const todoText = document.createElement("span");
		todoText.classList.add("todoText");
		todoText.textContent = todo;
		todoListDiv.append(todoText);

		//mygtuku divas
		const btnDiv = document.createElement("div");
		btnDiv.classList.add("btnDiv");
		todoListDiv.append(btnDiv);

		const deleteBtn = document.createElement("button");
		deleteBtn.classList.add("deleteBtn");
		deleteBtn.textContent = "DELETE";
		btnDiv.append(deleteBtn);

		deleteBtn.addEventListener("click", function () {
			todos.splice(index, 1);
			localStorage.setItem(userTodosKey, JSON.stringify(todos));
			renderTodos();
		});
		const editBtn = document.createElement("button");
		editBtn.classList.add("editBtn");
		editBtn.textContent = "EDIT";
		btnDiv.append(editBtn);

		editBtn.addEventListener("click", function () {
			const newTodoText = prompt("Edit your to-do item:", todoText.textContent);
			if (newTodoText !== null && newTodoText !== "") {
				todoText.textContent = newTodoText;
				todos[index] = newTodoText; // Update corresponding todo in the array
				localStorage.setItem(userTodosKey, JSON.stringify(todos));
			}
		});

		const favIcon = document.createElement("span");
		favIcon.classList.add("favIcon");
		favIcon.innerHTML = '<i class="fa-regular fa-heart"></i>';
		// Check the favorite status for the current todo element
		const todoId = todoListDiv.getAttribute("data-id");
		if (todosFav.includes(todoId)) {
			favIcon.innerHTML = '<i class="fa-solid fa-heart"></i>';
		}

		btnDiv.append(favIcon);

		favIcon.addEventListener("click", function () {
			const todoId = todoListDiv.getAttribute("data-id"); // Get the unique identifier

			if (favIcon.innerHTML === '<i class="fa-regular fa-heart"></i>') {
				favIcon.innerHTML = '<i class="fa-solid fa-heart"></i>';
				todosFav.push(todoId);
				localStorage.setItem(userFavorites, JSON.stringify(todosFav));
			} else {
				favIcon.innerHTML = '<i class="fa-regular fa-heart"></i>';
				const index = todosFav.indexOf(todoId);
				if (index > -1) {
					todosFav.splice(index, 1);
					localStorage.setItem(userFavorites, JSON.stringify(todosFav));
				}
			}
		});

		const checkBox = document.createElement("input");
		checkBox.classList.add("checkBox");
		checkBox.setAttribute("type", "checkbox");
		todoListDiv.prepend(checkBox);

		checkBox.addEventListener("change", function () {
			check();
		});

		function check() {
			if (checkBox.checked) {
				todoText.style.textDecoration = "line-through";
				todoText.style.opacity = "0.6";
			} else {
				todoText.style.textDecoration = "none";
				todoText.style.opacity = "1";
			}
		}
	});
}

renderTodos();

addBtn.addEventListener("click", function (e) {
	e.preventDefault();

	const newTodo = todoInput.value.trim();

	if (newTodo) {
		todos.push(newTodo);
		localStorage.setItem(userTodosKey, JSON.stringify(todos));
		renderTodos();
		todoInput.value = "";
	}
});
