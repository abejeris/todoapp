const welcomeUser = document.querySelector("#usernameLogo");
const getUser = JSON.parse(localStorage.getItem("LoggedInAs"));
const userFavorites = `favorites-${getUser.username}`;
welcomeUser.textContent = getUser.username;

const userTodosKey = `todos-${getUser.username}`;
const favTodoKey = `favorites-${getUser.username}`;
let todos = JSON.parse(localStorage.getItem(userTodosKey)) || [];
let todosFav = JSON.parse(localStorage.getItem(userFavorites)) || [];

function renderFavorites() {
	const favListContainer = document.querySelector("#todoList");
	favListContainer.innerHTML = ""; // Clear list before rendering

	setTimeout(() => {
		if (todosFav.length === 0) {
			const errorMessage = document.createElement("p");
			errorMessage.setAttribute("id", "errorMessage");
			errorMessage.style.color = "red";
			errorMessage.textContent = "You have no favorites.";
			favListContainer.append(errorMessage);
			return;
		}
	});

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
			todosFav.splice(index, 1);
			localStorage.setItem(userFavorites, JSON.stringify(todosFav));
			renderFavorites();
		});

		const editBtn = document.createElement("button");
		editBtn.classList.add("editBtn");
		editBtn.textContent = "EDIT";
		btnDiv.append(editBtn);

		editBtn.addEventListener("click", function () {
			const newTodoText = prompt("Edit your to-do item:", favText.textContent);
			if (newTodoText !== null && newTodoText !== "") {
				favText.textContent = newTodoText;
				todos[index] = newTodoText; // Update corresponding todo in the array
				localStorage.setItem(userTodosKey, JSON.stringify(todos));
				localStorage.setItem(favTodoKey, JSON.stringify(todos));
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
	});
}

window.onload = renderFavorites;
