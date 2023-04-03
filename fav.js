const welcomeUser = document.querySelector("#usernameLogo");
const getUser = JSON.parse(localStorage.getItem("LoggedInAs"));
const userFavorites = `favorites-${getUser.username}`;
welcomeUser.textContent = getUser.username;

const userTodosKey = `todos-${getUser.username}`;

const userChecked = `checked-${getUser.username}`;

let todos = JSON.parse(localStorage.getItem(userTodosKey)) || [];
let todosFav = JSON.parse(localStorage.getItem(userFavorites)) || [];
let checked = JSON.parse(localStorage.getItem(userChecked)) || [];

function renderFavorites() {
	const favListContainer = document.querySelector("#todoList");
	favListContainer.innerHTML = ""; // Clear list before rendering

	if (todosFav.length === 0) {
		const errorMessage = document.createElement("p");
		errorMessage.setAttribute("id", "errorMessage");
		errorMessage.style.color = "red";
		errorMessage.textContent = "You have no favorites.";
		favListContainer.append(errorMessage);
		return;
	}

	todosFav.forEach((fav, index) => {
		const favListDiv = document.createElement("div");
		favListDiv.classList.add("todoDiv");
		favListDiv.setAttribute("data-id", fav);
		favListContainer.append(favListDiv);

		const favText = document.createElement("span");
		favText.classList.add("todoText");
		favText.textContent = fav;
		favListDiv.append(favText);

		const btnDiv = document.createElement("div");
		btnDiv.classList.add("btnDiv");
		favListDiv.append(btnDiv);

		const deleteBtn = document.createElement("button");
		deleteBtn.classList.add("deleteBtn");
		deleteBtn.textContent = "DELETE";
		btnDiv.append(deleteBtn);

		deleteBtn.addEventListener("click", function () {
			const fav = favText.textContent;
			// adding checked tasks deletion from local storage
			const checkedIndex = checked.indexOf(fav);
			console.log(checkedIndex);
			const filteredFav = todosFav.filter((todo) => todo !== fav); // Filter out the exact match from todosFav array
			if (filteredFav.length !== todosFav.length) {
				todosFav = filteredFav;
				localStorage.setItem(userFavorites, JSON.stringify(todosFav));
				const filteredTodos = todos.filter((todo) => todo !== fav); // Filter out the exact match from todos array
				if (filteredTodos.length !== todos.length) {
					todos = filteredTodos;
					localStorage.setItem(userTodosKey, JSON.stringify(todos));
				}

				if (checkedIndex !== -1) {
					checked.splice(checkedIndex, 1);
					localStorage.setItem(userChecked, JSON.stringify(checked));
				}

				renderFavorites();
			}
		});

		const editBtn = document.createElement("button");
		editBtn.classList.add("editBtn");
		editBtn.textContent = "EDIT";
		btnDiv.append(editBtn);

		editBtn.addEventListener("click", function () {
			const newTodoText = prompt("Edit your to-do item:", favText.textContent);
			if (newTodoText !== null && newTodoText !== "") {
				favText.textContent = newTodoText;
				if (todosFav.includes(fav)) {
					const favIndex = todosFav.indexOf(fav);
					todosFav[favIndex] = newTodoText; // Update corresponding favorite in the array
					localStorage.setItem(userFavorites, JSON.stringify(todosFav)); // Update localStorage with the todosFav array
					const todoIndex = todos.findIndex((todo) => todo === fav);
					if (todoIndex !== -1) {
						//=== -1 i
						todos[todoIndex] = newTodoText; //Update corresponding todo in the array
						localStorage.setItem(userTodosKey, JSON.stringify(todos)); // Update localStorage with the todos array
					}
				}
			}
		});

		const heartBtn = document.createElement("span");
		heartBtn.classList.add("favIcon");
		heartBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
		const todoId = favListDiv.getAttribute("data-id");
		if (todosFav.includes(todoId)) {
			heartBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
		}
		btnDiv.append(heartBtn);

		heartBtn.addEventListener("click", function () {
			todosFav.splice(index, 1);
			localStorage.setItem(userFavorites, JSON.stringify(todosFav));
			renderFavorites();
		});

		const checkBox = document.createElement("input");
		checkBox.classList.add("checkBox");
		checkBox.setAttribute("type", "checkbox");
		favListDiv.prepend(checkBox);

		checkBox.addEventListener("change", function () {
			check();
		});

		function check() {
			if (checkBox.checked) {
				favText.style.textDecoration = "line-through";
				favText.style.opacity = "0.6";
				checked.push(todoId);
				localStorage.setItem(userChecked, JSON.stringify(checked));
			} else {
				favText.style.textDecoration = "none";
				favText.style.opacity = "1";
				const checkedId = favListDiv.getAttribute("data-id");
				const index = checked.indexOf(checkedId);
				if (index > -1) {
					checked.splice(index, 1);
					localStorage.setItem(userChecked, JSON.stringify(checked));
				}
			}
		}

		const tickedId = favListDiv.getAttribute("data-id");
		let ticked = JSON.parse(localStorage.getItem(userChecked)) || [];
		if (ticked.includes(tickedId)) {
			checkBox.checked = true;
			favText.style.textDecoration = "line-through";
			favText.style.opacity = "0.6";
		}
	});
}

window.onload = renderFavorites;
