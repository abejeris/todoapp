import { JSDOM } from "jsdom";
// const dom = new JSDOM;
// Set up a basic DOM environment with a document object
const dom = new JSDOM("<html><body></body></html>");

// Mock localStorage
const localStorage = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	clear: jest.fn(),
};

// Make the document object globally available to your tests
// global.document = document;
// global.window = document.defaultView;
// global.localStorage = localStorage;

// Now you can import your module and run your tests
import renderTodos from "./todo.js";

beforeEach(() => {
	localStorage.clear();
	localStorage.setItem("LoggedInAs", JSON.stringify({ username: "testUser" }));
});

describe("renderTodos", () => {
	test("it renders/adds a todo item", () => {
		localStorage.setItem("todos-testUser", JSON.stringify(["Buy milk"]));

		renderTodos();

		expect(dom.window.document.querySelector(".todoText").textContent).toBe(
			"Buy milk"
		);
	});
});
