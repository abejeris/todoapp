const signUpForm = document.querySelector("form");
const errorMessage = document.querySelector("#errorMessage");
errorMessage.style.color = "red";

signUpForm.addEventListener("submit", function (e) {
	e.preventDefault();

	let username = document.querySelector("#name").value;
	let password = document.querySelector("#password").value;
	let passwordConfirm = document.querySelector("#password2").value;

	const getUser = JSON.parse(localStorage.getItem(username));
	// Check if passwords match
	if (password === "" || passwordConfirm === "" || username === "") {
		errorMessage.textContent = "Please enter all values";
		// alert("Passwords do not match.");
	} else if (getUser != null) {
		errorMessage.textContent = "Username already exists";

		document.querySelector("#password").value = "";
		document.querySelector("#password2").value = "";
	} else if (password !== passwordConfirm) {
		errorMessage.textContent = "Passwords don't match.";

		document.querySelector("#password").value = "";
		document.querySelector("#password2").value = "";
		return;
	} else {
		const user = {
			username: username,
			password: password,
		};

		// Store user object in local storage
		localStorage.setItem(username, JSON.stringify(user));
		document.querySelector("#name").value = "";
		document.querySelector("#password").value = "";
		document.querySelector("#password2").value = "";
		setTimeout(function () {
			alert("Account created!");
			if (confirm("Go to login page") == true) {
				window.location.href = "index.html";
			}
		});
	}
});
