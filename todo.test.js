import { renderTodos } from "./todos.js";

beforeEach(() => {
	localStorage.clear();
	localStorage.setItem("LoggedInAs", JSON.stringify({ username: "testUser" }));
});

describe("renderTodos", () => {
	test("it renders/adds a todo item", () => {
		localStorage.setItem("todos-testUser", JSON.stringify(["Buy milk"]));

		renderTodos();

		expect(document.querySelector(".todoText").textContent).toBe("Buy milk");
	});
});
