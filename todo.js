const welcomeUser = document.querySelector("#usernameLogo");
const getUser = JSON.parse(localStorage.getItem("LoggedInAs"));
welcomeUser.textContent = getUser.username;

const todoInput = document.querySelector("#todo");
const addBtn = document.querySelector("#add");

const userTodosKey = `todos-${getUser.username}`; // Use username as part of key
const userFavorites = `favorites-${getUser.username}`; //use username as part of key for favorite todos
const userChecked = `checked-${getUser.username}`; // use username as part of key for checked todos

let todos = JSON.parse(localStorage.getItem(userTodosKey)) || [];
let todosFav = JSON.parse(localStorage.getItem(userFavorites)) || [];
let checked = JSON.parse(localStorage.getItem(userChecked)) || [];

function renderTodos() {
	const todoListContainer = document.querySelector("#todoList");
	todoListContainer.innerHTML = ""; // Clear list before rendering

	todos.forEach((todo) => {
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
			const todoText = todoListDiv.querySelector(".todoText").textContent;
			const todoIndex = todos.indexOf(todoText);
			const favIndex = todosFav.indexOf(todoText);
			const checkedIndex = checked.indexOf(todoText);

			// Search for exact match in todos
			if (todoIndex !== -1) {
				todos.splice(todoIndex, 1);
				localStorage.setItem(userTodosKey, JSON.stringify(todos));
			}

			// Search for exact match in favorites
			if (favIndex !== -1) {
				todosFav.splice(favIndex, 1);
				localStorage.setItem(userFavorites, JSON.stringify(todosFav));
			}

			if (checkedIndex !== -1) {
				checked.splice(checkedIndex, 1);
				localStorage.setItem(userChecked, JSON.stringify(checked));
			}

			renderTodos();
		});
		const editBtn = document.createElement("button");
		editBtn.classList.add("editBtn");
		editBtn.textContent = "EDIT";
		btnDiv.append(editBtn);

		editBtn.addEventListener("click", function () {
			const todoText = todoListDiv.querySelector(".todoText");
			const newTodoText = prompt("Edit your to-do item:", todoText.textContent);
			if (newTodoText !== null && newTodoText !== "") {
				// Check if the current todo is in favorites
				const isTodoInFavorites = todosFav.includes(todoText.textContent);

				todoText.textContent = newTodoText;
				todos[index] = newTodoText;
				if (isTodoInFavorites) {
					const favIndex = todosFav.indexOf(todoId);
					if (favIndex !== -1) {
						todosFav[favIndex] = newTodoText;
						localStorage.setItem(userFavorites, JSON.stringify(todosFav));
					}
				}
				localStorage.setItem(userTodosKey, JSON.stringify(todos));
				renderTodos();
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

			renderTodos(); // Call renderTodos after updating favorite status
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
				checked.push(todoId);
				localStorage.setItem(userChecked, JSON.stringify(checked));
			} else {
				todoText.style.textDecoration = "none";
				todoText.style.opacity = "1";

				const index = checked.indexOf(todoId);

				if (index > -1) {
					checked.splice(index, 1);
					localStorage.setItem(userChecked, JSON.stringify(checked));
				}
			}
			renderTodos();
		}
		const tickedId = todoListDiv.getAttribute("data-id");
		let ticked = JSON.parse(localStorage.getItem(userChecked)) || [];
		if (ticked.includes(tickedId)) {
			checkBox.checked = true;
			todoText.style.textDecoration = "line-through";
			todoText.style.opacity = "0.6";
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
module.exports = { renderTodos };
