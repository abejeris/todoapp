const signUpForm = document.querySelector("form");
const errorMessage = document.querySelector("#errorMessage");
errorMessage.style.color = "red";

signUpForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.querySelector("#name").value;
  const password = document.querySelector("#password").value;
  const passwordConfirm = document.querySelector("#password2").value;

  // Check if passwords match
  if (password !== passwordConfirm) {
    errorMessage.textContent = "Passwords don't match.";
    return;
    // alert("Passwords do not match.");
  } else if (password === "" || passwordConfirm === "" || username === "") {
    errorMessage.textContent = "Please enter all values";
  } else {
    const user = {
      username: username,
      password: password,
    };

    // Store user object in local storage
    localStorage.setItem(username, JSON.stringify(user));

    alert("Account created!");
    console.log("pressed");
  }
});
