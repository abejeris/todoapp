<<<<<<< Updated upstream
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
=======
/**
 * @jest-environment jsdom
 */
// import { deleteFunc } from "./todo.js";
>>>>>>> Stashed changes

// test("deleteFunc should remove a todo from localStorage and render the updated todo list", () => {
// 	localStorage.setItem(
// 		"todos-username",
// 		JSON.stringify(["Buy milk", "Walk the dog", "Do laundry"])
// 	);
// 	localStorage.setItem("favorites-username", JSON.stringify(["Buy milk"]));

// 	deleteFunc("Buy milk");

<<<<<<< Updated upstream
		renderTodos();

		expect(dom.window.document.querySelector(".todoText").textContent).toBe(
			"Buy milk"
		);
	});
});
=======
// 	expect(JSON.parse(localStorage.getItem("todos-username"))).toEqual([
// 		"Walk the dog",
// 		"Do laundry",
// 	]);
// 	expect(JSON.parse(localStorage.getItem("favorites-username"))).toEqual([]);
// });
>>>>>>> Stashed changes
