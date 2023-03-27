const welcomeUser = document.querySelector("#usernameLogo");
const getUser = JSON.parse(localStorage.getItem("LoggedInAs"));
welcomeUser.textContent = getUser.username;

const todoInput = document.querySelector("#todo");
const addBtn = document.querySelector("#add");

const userTodosKey = `todos-${getUser.username}`; // Use username as part of key

let todos = JSON.parse(localStorage.getItem(userTodosKey)) || [];

function renderTodos() {
	const todoListContainer = document.querySelector("#todoList");
	todoListContainer.innerHTML = ""; // Clear list before rendering

	todos.forEach((todo, index) => {
		const todoListDiv = document.createElement("div");
		todoListDiv.classList.add("todoDiv");
		todoListContainer.append(todoListDiv);

		const todoText = document.createElement("span");
		todoText.classList.add("todoText");
		todoText.textContent = todo;
		todoListDiv.append(todoText);

		const deleteBtn = document.createElement("button");
		deleteBtn.classList.add("deleteBtn");
		deleteBtn.textContent = "delete";
		todoListDiv.append(deleteBtn);

		deleteBtn.addEventListener("click", function () {
			todos.splice(index, 1);
			localStorage.setItem(userTodosKey, JSON.stringify(todos));
			renderTodos();
		});
		const editBtn = document.createElement("button");
		editBtn.classList.add("editBtn");
		editBtn.textContent = "edit";
		todoListDiv.append(editBtn);

		editBtn.addEventListener("click", function () {
			const newTodoText = prompt("Edit your to-do item:", todoText.textContent);
			if (newTodoText !== null && newTodoText !== "") {
				todoText.textContent = newTodoText;
			}
		});

		const favBtn = document.createElement("button");
		favBtn.classList.add("favBtn");
		favBtn.textContent = "favorite";
		todoListDiv.append(favBtn);
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
