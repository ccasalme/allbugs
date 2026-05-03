# Lesson 1: JavaScript Functions

This lesson introduces one of the most important ideas in JavaScript:

```text
Functions let us name a block of code and reuse it later.
```

In this project, clicking a button runs a function. That function changes the text on the page.

---

## Learning Goals

By the end of this lesson, you should understand how to:

- connect JavaScript to HTML
- select HTML elements with `getElementById()`
- write a basic function
- call a function when a button is clicked
- update page text with `.textContent`
- use an event listener

---

## Project Files

```text
lesson1/
├── function.html   # Page structure
├── function.js     # JavaScript behavior
├── function.css    # Lesson-specific styling
├── template.css    # Shared template styling
└── README.md       # Lesson notes
```

Note: `function.html` currently links to `js.css`, but this folder has a file named `function.css`. If the custom lesson styles are not loading, update the HTML link to:

```html
<link rel="stylesheet" href="function.css" />
```

---

## What This App Does

The page starts with:

- a heading
- a short lesson description
- a button
- an empty paragraph for output

When the user clicks the button, JavaScript changes the empty paragraph to say:

```text
Button was clicked!
```

That is the whole lesson in one sentence:

```text
Click button -> run function -> update page
```

---

## Part 1: The HTML

The most important HTML is inside the main section:

```html
<button id="actionButton" type="button">Click me</button>
<p id="output" aria-live="polite"></p>
```

There are two important IDs here:

| Element | ID | Why it matters |
| --- | --- | --- |
| Button | `actionButton` | JavaScript uses this to find the button. |
| Paragraph | `output` | JavaScript uses this to display the result. |

The IDs are like labels JavaScript can search for.

---

## Part 2: Connecting JavaScript

The HTML loads the JavaScript file here:

```html
<script src="function.js" defer></script>
```

The `src` tells the browser which JavaScript file to load.

The `defer` keyword tells the browser:

```text
Load this script, but wait to run it until the HTML is ready.
```

That matters because `function.js` tries to find HTML elements. If JavaScript runs before the button exists, it cannot find it.

---

## Part 3: Selecting HTML Elements

At the top of `function.js`, we have:

```js
const actionButton = document.getElementById('actionButton');
const output = document.getElementById('output');
```

This line:

```js
const actionButton = document.getElementById('actionButton');
```

means:

```text
Find the HTML element with id="actionButton" and store it in a variable.
```

This line:

```js
const output = document.getElementById('output');
```

means:

```text
Find the HTML element with id="output" and store it in a variable.
```

Now JavaScript can work with those elements.

---

## Part 4: The Function

Here is the function from the lesson:

```js
function displayMessage() {
  output.textContent = 'Button was clicked!';
}
```

A function has a few parts:

```js
function functionName() {
  // code to run
}
```

For this lesson:

| Part | Example | Meaning |
| --- | --- | --- |
| `function` | `function` | Tells JavaScript we are creating a function. |
| Function name | `displayMessage` | The name we will use to call the function later. |
| Parentheses | `()` | Where parameters can go. This function has none yet. |
| Curly braces | `{ }` | The function body. The code inside runs when the function is called. |

The function name is important. `displayMessage` is a good name because it describes what the function does.

---

## Part 5: Updating Text

Inside the function, this line does the visible work:

```js
output.textContent = 'Button was clicked!';
```

This means:

```text
Change the text inside the output paragraph.
```

Before the click:

```html
<p id="output"></p>
```

After the click:

```html
<p id="output">Button was clicked!</p>
```

JavaScript changes the page without reloading it.

---

## Part 6: The Event Listener

This line connects the button click to the function:

```js
actionButton.addEventListener('click', displayMessage);
```

Read it like this:

```text
When actionButton gets clicked, run displayMessage.
```

Important detail:

```js
displayMessage
```

is passed without parentheses.

That means:

```text
Run this function later, when the click happens.
```

If we wrote this instead:

```js
displayMessage()
```

the function would run immediately when the page loads.

---

## Full JavaScript Flow

Here is the whole JavaScript file in plain English:

```text
1. Find the button.
2. Find the output paragraph.
3. Create a function called displayMessage.
4. Inside that function, change the paragraph text.
5. Wait for the button to be clicked.
6. When the click happens, run displayMessage.
```

And here is the actual code:

```js
const actionButton = document.getElementById('actionButton');
const output = document.getElementById('output');

function displayMessage() {
  output.textContent = 'Button was clicked!';
}

actionButton.addEventListener('click', displayMessage);
```

---

## Vocabulary

| Term | Meaning |
| --- | --- |
| Function | A reusable block of code that performs a task. |
| Function name | The name used to call or reference a function. |
| Function body | The code inside `{ }` that runs when the function is called. |
| Parameter | A placeholder input listed inside a function's parentheses. |
| Argument | The real value passed into a function when it is called. |
| Variable | A named container for storing a value. |
| `const` | Creates a variable that should not be reassigned. |
| `document` | The browser's JavaScript representation of the webpage. |
| `getElementById()` | Finds one HTML element by its `id`. |
| `.textContent` | Gets or changes the text inside an element. |
| Event listener | Code that waits for something to happen, like a click. |

---

## Tiny Challenge

Change the function so the button displays a different message.

Example:

```js
function displayMessage() {
  output.textContent = 'Functions are starting to make sense!';
}
```

Bonus challenge:

Create a second function called `clearMessage()` that removes the text from the paragraph.
