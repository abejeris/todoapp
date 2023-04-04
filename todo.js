const welcomeUser = document.querySelector("#usernameLogo");
const getUser = JSON.parse(localStorage.getItem("LoggedInAs"));
welcomeUser.textContent = getUser.username;
const todoInput = document.querySelector("#todo");
const addBtn = document.querySelector("#add");

const userTodosKey = `todos-${getUser.username}`; // Use username as part of key
const userFavorites = `favorites-${getUser.username}`; //use username as part of key for favorite todos
const userChecked = `checked-${getUser.username}`; // use username as part of key for checked todos

let todos = [];
let todosFav = [];
let checked = [];

function loadLocalStorageData() {
	todos = JSON.parse(localStorage.getItem(userTodosKey)) || [];
	todosFav = JSON.parse(localStorage.getItem(userFavorites)) || [];
	checked = JSON.parse(localStorage.getItem(userChecked)) || [];
	const todoListDivs = document.querySelectorAll(".todoDiv");
}
function saveToLocalStorage() {
	localStorage.setItem(userTodosKey, JSON.stringify(todos));
	localStorage.setItem(userFavorites, JSON.stringify(todosFav));
	localStorage.setItem(userChecked, JSON.stringify(checked));
}

function init() {
	loadLocalStorageData();
	renderTodos();
}

function renderTodos() {
	const todoListContainer = document.querySelector("#todoList");
	todoListContainer.innerHTML = ""; // Clear list before rendering

	todos.forEach((todo, index) => {
		const todoListDiv = createTodoListDiv(todo, index);
		todoListContainer.append(todoListDiv);
	});
}

function createTodoListDiv(todo, index) {
	const todoListDiv = document.createElement("div");
	todoListDiv.classList.add("todoDiv");
	todoListDiv.setAttribute("data-id", todo);

	const checkBox = createCheckBox(todoListDiv, todo);
	todoListDiv.prepend(checkBox);

	const todoText = createTodoText(todo);
	todoListDiv.append(todoText);

	const btnDiv = document.createElement("div");
	btnDiv.classList.add("btnDiv");
	todoListDiv.append(btnDiv);

	const deleteBtn = createDeleteButton(todoListDiv);
	btnDiv.append(deleteBtn);

	const editBtn = createEditButton(todoListDiv, todo, index);
	btnDiv.append(editBtn);

	const favIcon = createFavoriteIcon(todoListDiv, index);
	btnDiv.append(favIcon);

	checkBox.addEventListener("change", function () {
		check(todoListDiv, todo);
	});

	return todoListDiv;
}

function createTodoText(todo) {
	const todoText = document.createElement("span");
	todoText.classList.add("todoText");
	todoText.textContent = todo;
	return todoText;
}

function createDeleteButton(todoListDiv) {
	const deleteBtn = document.createElement("button");
	deleteBtn.classList.add("deleteBtn");
	deleteBtn.textContent = "DELETE";

	deleteBtn.addEventListener("click", function () {
		const todoText = todoListDiv.querySelector(".todoText").textContent;
		const todoIndex = todos.indexOf(todoText);
		const favIndex = todosFav.indexOf(todoText);
		const checkedIndex = checked.indexOf(todoText);

		if (todoIndex !== -1) {
			todos.splice(todoIndex, 1);
			saveToLocalStorage();
		}

		if (favIndex !== -1) {
			todosFav.splice(favIndex, 1);
			saveToLocalStorage();
		}

		if (checkedIndex !== -1) {
			checked.splice(checkedIndex, 1);
			saveToLocalStorage();
		}

		renderTodos();
	});

	return deleteBtn;
}

function createEditButton(todoListDiv, todo, index) {
	const editBtn = document.createElement("button");
	editBtn.classList.add("editBtn");
	editBtn.textContent = "EDIT";

	editBtn.addEventListener("click", function () {
		const todoText = todoListDiv.querySelector(".todoText");
		const newTodoText = prompt("Edit the todo:", todo);
		if (newTodoText !== null && newTodoText !== "") {
			todos[index] = newTodoText;
			todoText.textContent = newTodoText;
			saveToLocalStorage();
		}
	});

	return editBtn;
}

function createFavoriteIcon(todoListDiv, index) {
	const favIcon = document.createElement("i");
	favIcon.classList.add("fa-heart");

	if (todosFav.includes(todos[index])) {
		favIcon.classList.add("fa-solid");
	} else {
		favIcon.classList.add("fa-regular");
	}

	favIcon.addEventListener("click", function () {
		if (todosFav.includes(todos[index])) {
			const favIndex = todosFav.indexOf(todos[index]);
			todosFav.splice(favIndex, 1);
			favIcon.classList.remove("fa-solid");
			favIcon.classList.add("fa-regular");
		} else {
			todosFav.push(todos[index]);
			favIcon.classList.remove("fa-regular");
			favIcon.classList.add("fa-solid");
		}
		saveToLocalStorage();
	});

	return favIcon;
}
function createCheckBox(todoListDiv, todo, todoText) {
	const checkBox = document.createElement("input");
	checkBox.setAttribute("type", "checkbox");
	checkBox.classList.add("checkBox");

	if (checked.includes(todo)) {
		checkBox.checked = true;
		todoListDiv.classList.add("checked");
	} else {
		todoListDiv.classList.remove("checked");
	}

	checkBox.addEventListener("change", function () {
		if (checkBox.checked) {
			checked.push(todo);
			todoListDiv.classList.add("checked");
		} else {
			const index = checked.indexOf(todo);
			if (index !== -1) {
				checked.splice(index, 1);
				todoListDiv.classList.remove("checked");
			}
		}
		saveToLocalStorage();
	});

	return checkBox;
}

function check(todoListDiv, todo) {
	const checkBox = todoListDiv.querySelector(".checkBox");
	const todoText = todoListDiv.querySelector(".todoText");
	if (checked.includes(todo)) {
		todoListDiv.classList.add("checked");
	} else {
		todoListDiv.classList.remove("checked");
	}

	if (checkBox.checked) {
		checked.push(todo);
	} else {
		checked.splice(checked.indexOf(todo), 1);
	}
}

addBtn.addEventListener("click", function () {
	const todoText = todoInput.value.trim();
	if (todoText !== "") {
		todos.push(todoText);
		saveToLocalStorage();
		renderTodos();
		todoInput.value = "";
	}
});

init();
