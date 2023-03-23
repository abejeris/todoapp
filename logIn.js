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
      alert("Logged in");
    } else {
      errorMessage.textContent = "Wrong credentials";
    }
  }
});
