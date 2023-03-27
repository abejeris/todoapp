const signUpForm = document.querySelector("form");
const errorMessage = document.querySelector("#errorMessage");
errorMessage.style.color = "red";

signUpForm.addEventListener("submit", function (e) {
	e.preventDefault();
	const username = document.querySelector("#name").value;
	const password = document.querySelector("#password").value;

	if (password === "" || username === "") {
		errorMessage.textContent = "Please enter all values";
	} else if (localStorage.getItem(username)) {
		const loginDetails = JSON.parse(localStorage.getItem(username));
		if (
			username === loginDetails.username &&
			password === loginDetails.password
		) {
			// When user logs in create logged in user ogj and store it in local storage.
			const currentAccount = {
				username: username,
			};
			localStorage.setItem("LoggedInAs", JSON.stringify(currentAccount));
			//redirect to page ""
			window.location.href = "todo.html";
		} else {
			errorMessage.textContent = "Wrong credentials";
		}
	}
});
