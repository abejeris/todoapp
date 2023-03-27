const welcomeUser = document.querySelector("#usernameLogo");
//get stored obj and take username
const getUser = JSON.parse(localStorage.getItem("LoggedInAs"));
welcomeUser.textContent = getUser.username;

const todoInput = document.querySelector("#todo");
const addBtn = document.querySelector("#add");

// function for button add
addBtn.addEventListener("click", function (e) {
	e.preventDefault();

	const todoListContainer = document.querySelector("#todoList");
	const todoListDiv = document.createElement("div");
	todoListDiv.classList.add("todoDiv");
	todoListContainer.append(todoListDiv);

	// adding todo text
	const todoText = document.createElement("span");
	todoText.classList.add("todoText");
	todoText.textContent = todoInput.value;
	todoListDiv.appendChild(todoText);

	// adding delete button
	const deleteBtn = document.createElement("button");
	deleteBtn.classList.add("deleteBtn");
	deleteBtn.textContent = "delete";
	todoListDiv.appendChild(deleteBtn);

	// adding event listener to delete button
	deleteBtn.addEventListener("click", function () {
		todoListDiv.remove();
	});
	const editBtn = document.createElement("button");
	editBtn.classList.add("editBtn");
	editBtn.textContent = "edit";
	todoListDiv.appendChild(editBtn);

	editBtn.addEventListener("click", function () {
		// edit function
	});

	const favBtn = document.createElement("button");
	favBtn.classList("favBtn");
	favBtn.textContent = "favorite";
	todoListDiv.appendChild(favBtn);

	editBtn.addEventListener("click", function () {
		// favorite function
	});
});
