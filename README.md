KOToDo README

KOToDo Task Manager

A browser-based task manager created by KOCreations using HTML, CSS, and JavaScript.

Features

	●	Add tasks using the Add Item button or the Enter key.
	●	Mark tasks complete or incomplete by clicking a task.
	●	Edit the text of an incomplete task.
	●	Delete individual tasks.
	●	Clear all tasks after a confirmation prompt.
	●	Save tasks in browser localStorage so they remain available after refreshing or reopening the page in the same browser.

Built With

	●	HTML — page structure and controls
	●	CSS — layout and styling
	●	JavaScript — task interactions, validation, and browser storage

Run Locally

	1.	Download or clone this repository.
	2.	Open koTodo.html in a web browser.
	3.	Add a task to get started.

No installation or account is required. Task data is stored locally in the browser, not synced between devices.

How It Works

JavaScript creates a list item for each task and attaches event listeners for completing, editing, and deleting it. After changes, the app saves the list’s HTML to localStorage. When the page loads again, the saved HTML is restored and event listeners are reattached so the task controls continue to work.

Development Notes

While adding task editing, I debugged click-event bubbling and the event listeners for tasks restored from browser storage. I also adjusted DOM selection to target the Edit button inside each individual list item.

Creator

KOCreations