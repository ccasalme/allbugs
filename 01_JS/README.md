# JavaScript Quick Reference

![JavaScript Template Banner](../assets/templateBanner.png)

This folder is for practicing JavaScript fundamentals. Use this README as a reference when you need a quick reminder of syntax, browser methods, control flow, loops, and beginner-friendly best practices.

Preview tip: In VS Code, press `Command + Shift + V` on Mac or `Ctrl + Shift + V` on Windows to open the Markdown preview.

---

## Table Of Contents

- [What Is JavaScript?](#what-is-javascript)
- [Adding JavaScript To HTML](#adding-javascript-to-html)
- [Variables](#variables)
- [Common Data Types](#common-data-types)
- [Reserved Words](#reserved-words)
- [The `document` Object](#the-document-object)
- [`document.write()`](#documentwrite)
- [`document.getElementById()`](#documentgetelementbyid)
- [`document.querySelector()`](#documentqueryselector)
- [`document.activeElement`](#documentactiveelement)
- [Changing Page Content](#changing-page-content)
- [Functions](#functions)
- [Arrow Functions](#arrow-functions)
- [Events](#events)
- [If Statements](#if-statements)
- [If / Else Statements](#if--else-statements)
- [If / Else If / Else Statements](#if--else-if--else-statements)
- [Comparison Operators](#comparison-operators)
- [Logical Operators](#logical-operators)
- [While Loops](#while-loops)
- [Do / While Loops](#do--while-loops)
- [For Loops](#for-loops)
- [Looping Through Arrays](#looping-through-arrays)
- [Break And Continue](#break-and-continue)
- [Switch Statements](#switch-statements)
- [Forms And Inputs](#forms-and-inputs)
- [Console Basics](#console-basics)
- [Common Beginner Errors](#common-beginner-errors)
- [Naming Best Practices](#naming-best-practices)
- [General JavaScript Best Practices](#general-javascript-best-practices)
- [Mini Patterns To Remember](#mini-patterns-to-remember)
- [Practice Ideas](#practice-ideas)
- [Quick Vocabulary](#quick-vocabulary)
- [Recommended Learning Order](#recommended-learning-order)

---

## What Is JavaScript?

JavaScript is the programming language that makes webpages interactive.

HTML gives a page structure.
CSS gives a page style.
JavaScript gives a page behavior.

Examples of JavaScript behavior:

- changing text after a button click
- opening and closing a modal
- checking form input
- showing or hiding content
- responding to keyboard or mouse events
- fetching data from an API


[Back to Table of Contents](#table-of-contents)

---

## Adding JavaScript To HTML

The most common beginner-friendly way is to link an external `.js` file before the closing `</body>` tag or inside the `<head>` with `defer`.

```html
<script src="script.js" defer></script>
```

`defer` tells the browser to load the JavaScript file but wait to run it until the HTML is ready.

This matters because JavaScript often needs to find HTML elements. If the script runs before the HTML exists, selectors like `document.getElementById()` may return `null`.


[Back to Table of Contents](#table-of-contents)

---

## Variables

Variables store values so you can use them later.

```js
const name = 'Ada';
let score = 0;
var oldStyle = true;
```

| Keyword | Use | Best Practice |
| --- | --- | --- |
| `const` | Stores a value that should not be reassigned. | Use this by default. |
| `let` | Stores a value that may change later. | Use when reassignment is needed. |
| `var` | Older way to create variables. | Avoid in modern JavaScript. |

Example:

```js
const userName = 'Maya';
let points = 10;

points = points + 5;
```

Use clear variable names:

```js
const submitButton = document.getElementById('submitButton');
```

Avoid unclear names:

```js
const x = document.getElementById('submitButton');
```


[Back to Table of Contents](#table-of-contents)

---

## Common Data Types

| Type | Example | Meaning |
| --- | --- | --- |
| String | `'hello'` | Text |
| Number | `42`, `3.14` | Numeric values |
| Boolean | `true`, `false` | Yes/no or on/off values |
| Array | `['red', 'blue']` | Ordered list |
| Object | `{ name: 'Ada' }` | Grouped data with keys and values |
| Null | `null` | Intentionally empty |
| Undefined | `undefined` | No value has been assigned |

Examples:

```js
const title = 'JavaScript Notes';
const lessonNumber = 1;
const isComplete = false;
const colors = ['red', 'green', 'blue'];
const student = {
  name: 'Ada',
  level: 'beginner',
};
```


[Back to Table of Contents](#table-of-contents)

---

## Reserved Words

Reserved words are words JavaScript already uses for the language itself. Do not use them as variable names, function names, or object identifiers.

Common reserved words:

| Reserved Word | Used For |
| --- | --- |
| `break` | Stops a loop or switch. |
| `case` | Defines a branch in a switch statement. |
| `catch` | Handles errors after `try`. |
| `class` | Creates a class. |
| `const` | Creates a constant variable. |
| `continue` | Skips to the next loop iteration. |
| `default` | Default branch in a switch or default export. |
| `delete` | Removes a property from an object. |
| `do` | Starts a do/while loop. |
| `else` | Runs code when an `if` condition is false. |
| `export` | Exports code from a module. |
| `extends` | Creates inheritance between classes. |
| `finally` | Runs after `try/catch`. |
| `for` | Starts a for loop. |
| `function` | Creates a function. |
| `if` | Starts a condition. |
| `import` | Imports code from another module. |
| `in` | Checks if a property exists or loops through keys. |
| `instanceof` | Checks object type. |
| `let` | Creates a block-scoped variable. |
| `new` | Creates an instance of an object/class. |
| `return` | Sends a value back from a function. |
| `switch` | Runs one matching branch from many options. |
| `this` | Refers to the current object/context. |
| `throw` | Creates an error. |
| `try` | Starts error-handling code. |
| `typeof` | Checks the type of a value. |
| `var` | Older variable keyword. |
| `void` | Evaluates without returning a value. |
| `while` | Starts a while loop. |
| `with` | Avoid using this. |
| `yield` | Pauses a generator function. |

Bad:

```js
const function = 'hello';
```

Good:

```js
const functionName = 'displayMessage';
```


[Back to Table of Contents](#table-of-contents)

---

## The `document` Object

In browser JavaScript, `document` represents the current webpage.

You use `document` to find, read, create, and update HTML elements.

```js
document.title = 'New Page Title';
```

Important idea:

```text
HTML exists in the page.
JavaScript talks to it through the document object.
```


[Back to Table of Contents](#table-of-contents)

---

## `document.write()`

`document.write()` writes text or HTML directly into the document.

```js
document.write('Hello from JavaScript!');
```

You may see it in old tutorials, but it is rarely recommended in modern JavaScript.

Why?

- It can overwrite the entire page if used after the page loads.
- It mixes JavaScript and HTML in a messy way.
- It is harder to maintain than updating a specific element.

Avoid this for most projects:

```js
document.write('<h1>Hello</h1>');
```

Prefer this:

```html
<h1 id="pageTitle"></h1>
```

```js
const pageTitle = document.getElementById('pageTitle');
pageTitle.textContent = 'Hello';
```


[Back to Table of Contents](#table-of-contents)

---

## `document.getElementById()`

`document.getElementById()` finds one HTML element by its `id`.

Important: the correct spelling is `getElementById`, not `getElementByID`. JavaScript is case-sensitive.

HTML:

```html
<p id="message">Original text</p>
```

JavaScript:

```js
const message = document.getElementById('message');
message.textContent = 'Updated text';
```

Read it like this:

```text
Find the element with id="message" and store it in a variable called message.
```

Best practices:

- Use IDs for unique elements.
- Do not reuse the same ID on multiple elements.
- Check your spelling carefully.
- Put your script in the HTML with `defer` so the element exists before JavaScript looks for it.


[Back to Table of Contents](#table-of-contents)

---

## `document.querySelector()`

`querySelector()` finds the first element that matches a CSS selector.

```js
const button = document.querySelector('button');
const card = document.querySelector('.card');
const form = document.querySelector('#signupForm');
```

Use `querySelector()` when you want CSS-style selection.

Use `getElementById()` when you are selecting by one specific ID and want very clear beginner-friendly code.


[Back to Table of Contents](#table-of-contents)

---

## `document.activeElement`

`document.activeElement` tells you which element currently has focus.

Focus usually means:

- the user clicked into an input
- the user tabbed to a button or link
- the element is ready to receive keyboard input

Example:

```html
<input id="email" type="email" />
<button id="checkFocus" type="button">Check focus</button>
<p id="output"></p>
```

```js
const checkFocus = document.getElementById('checkFocus');
const output = document.getElementById('output');

checkFocus.addEventListener('click', function () {
  output.textContent = `Focused element: ${document.activeElement.tagName}`;
});
```

Common uses:

- checking which form field the user is typing in
- improving keyboard accessibility
- managing focus after opening or closing a modal

Best practice:

When you open a modal, move focus into it. When you close the modal, return focus to the button that opened it.


[Back to Table of Contents](#table-of-contents)

---

## Changing Page Content

Use `.textContent` when you want to change text.

```js
const output = document.getElementById('output');
output.textContent = 'Saved successfully!';
```

Use `.innerHTML` only when you intentionally need to insert HTML.

```js
output.innerHTML = '<strong>Saved successfully!</strong>';
```

Best practice:

Prefer `.textContent` for user-facing text because it is safer and simpler.

Be careful with `.innerHTML` if the content comes from a user. It can create security risks.


[Back to Table of Contents](#table-of-contents)

---

## Functions

A function is a reusable block of code.

Basic function:

```js
function greetUser() {
  console.log('Hello!');
}

greetUser();
```

Function with a parameter:

```js
function greetUser(name) {
  console.log(`Hello, ${name}!`);
}

greetUser('Ada');
```

Function that returns a value:

```js
function addNumbers(a, b) {
  return a + b;
}

const total = addNumbers(2, 3);
console.log(total);
```

Function anatomy:

| Part | Example | Meaning |
| --- | --- | --- |
| Keyword | `function` | Starts a function declaration. |
| Name | `greetUser` | The name used to call the function. |
| Parameters | `(name)` | Input placeholders. |
| Body | `{ ... }` | Code that runs when called. |
| Return | `return value;` | Sends a value back. |

Best practices:

- Use action-based names like `showMessage`, `calculateTotal`, or `validateEmail`.
- Keep functions focused on one job.
- Avoid huge functions that do many unrelated things.
- Return values instead of relying on global variables when possible.


[Back to Table of Contents](#table-of-contents)

---

## Arrow Functions

Arrow functions are a shorter way to write functions.

```js
const greetUser = (name) => {
  console.log(`Hello, ${name}!`);
};

greetUser('Ada');
```

Short return example:

```js
const addNumbers = (a, b) => a + b;
```

Both function declarations and arrow functions are useful. For beginners, regular function declarations are often easier to read first.


[Back to Table of Contents](#table-of-contents)

---

## Events

Events are things that happen on the page.

Examples:

- click
- submit
- input
- keydown
- mouseover
- focus
- blur

Example:

```html
<button id="saveButton" type="button">Save</button>
<p id="status"></p>
```

```js
const saveButton = document.getElementById('saveButton');
const status = document.getElementById('status');

function showSavedMessage() {
  status.textContent = 'Saved!';
}

saveButton.addEventListener('click', showSavedMessage);
```

Important:

```js
saveButton.addEventListener('click', showSavedMessage);
```

Pass the function name without parentheses when you want it to run later.

This runs later:

```js
showSavedMessage
```

This runs immediately:

```js
showSavedMessage()
```


[Back to Table of Contents](#table-of-contents)

---

## If Statements

Use `if` statements when your code needs to make a decision.

```js
const age = 20;

if (age >= 18) {
  console.log('Adult');
}
```

Read it like this:

```text
If age is greater than or equal to 18, run this code.
```


[Back to Table of Contents](#table-of-contents)

---

## If / Else Statements

Use `if / else` when there are two possible paths.

```js
const isLoggedIn = false;

if (isLoggedIn) {
  console.log('Show dashboard');
} else {
  console.log('Show login page');
}
```


[Back to Table of Contents](#table-of-contents)

---

## If / Else If / Else Statements

Use `else if` when there are multiple conditions.

```js
const score = 85;

if (score >= 90) {
  console.log('A');
} else if (score >= 80) {
  console.log('B');
} else if (score >= 70) {
  console.log('C');
} else {
  console.log('Keep practicing');
}
```

Best practices:

- Put the most specific or strict condition first.
- Keep conditions readable.
- Avoid deeply nested `if` statements when possible.
- Use meaningful boolean variable names like `isLoggedIn`, `hasPermission`, or `isFormValid`.
- Use `===` instead of `==` for comparisons.

Good:

```js
if (userRole === 'admin') {
  showAdminPanel();
}
```

Avoid:

```js
if (userRole == 'admin') {
  showAdminPanel();
}
```


[Back to Table of Contents](#table-of-contents)

---

## Comparison Operators

| Operator | Meaning | Example |
| --- | --- | --- |
| `===` | Strictly equal | `age === 18` |
| `!==` | Strictly not equal | `name !== 'Ada'` |
| `>` | Greater than | `score > 90` |
| `<` | Less than | `score < 50` |
| `>=` | Greater than or equal | `age >= 18` |
| `<=` | Less than or equal | `age <= 12` |

Use `===` and `!==` most of the time.


[Back to Table of Contents](#table-of-contents)

---

## Logical Operators

| Operator | Meaning | Example |
| --- | --- | --- |
| `&&` | AND | `isLoggedIn && isAdmin` |
| `||` | OR | `isLoggedIn || isGuest` |
| `!` | NOT | `!isLoggedIn` |

Example:

```js
const isLoggedIn = true;
const isAdmin = false;

if (isLoggedIn && isAdmin) {
  console.log('Show admin tools');
}
```


[Back to Table of Contents](#table-of-contents)

---

## While Loops

A `while` loop repeats code while a condition is true.

```js
let count = 1;

while (count <= 5) {
  console.log(count);
  count++;
}
```

Read it like this:

```text
While count is less than or equal to 5, keep running this code.
```

Use a `while` loop when you do not know exactly how many times the loop should run.

Example:

```js
let password = '';

while (password.length < 8) {
  password = prompt('Enter a password with at least 8 characters:');
}
```

Best practices:

- Make sure something inside the loop changes the condition.
- Avoid infinite loops.
- Use `while` when the loop depends on a condition becoming false.
- Use `for` when you know how many times you want to repeat.

Infinite loop example to avoid:

```js
let count = 1;

while (count <= 5) {
  console.log(count);
}
```

The problem is that `count` never changes.


[Back to Table of Contents](#table-of-contents)

---

## Do / While Loops

A `do / while` loop runs at least once, then checks the condition.

```js
let number;

do {
  number = Number(prompt('Enter a number greater than 10:'));
} while (number <= 10);
```

Use this when the code should run once before checking the condition.


[Back to Table of Contents](#table-of-contents)

---

## For Loops

A `for` loop repeats code a known number of times.

```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

Anatomy:

```js
for (start; condition; update) {
  // code to repeat
}
```

| Part | Example | Meaning |
| --- | --- | --- |
| Start | `let i = 0` | Create the counter. |
| Condition | `i < 5` | Keep looping while true. |
| Update | `i++` | Change the counter after each loop. |


[Back to Table of Contents](#table-of-contents)

---

## Looping Through Arrays

Arrays are lists.

```js
const fruits = ['apple', 'banana', 'orange'];
```

Use a `for` loop:

```js
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
```

Use `for...of` for cleaner array loops:

```js
for (const fruit of fruits) {
  console.log(fruit);
}
```

Use `.forEach()` when you want to run a function for each item:

```js
fruits.forEach(function (fruit) {
  console.log(fruit);
});
```

Best practices:

- Use `for...of` when you only need the item.
- Use a regular `for` loop when you need the index.
- Use array methods like `.map()`, `.filter()`, and `.find()` when transforming or searching data.


[Back to Table of Contents](#table-of-contents)

---

## Break And Continue

`break` stops a loop.

```js
for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    break;
  }

  console.log(i);
}
```

`continue` skips the current loop round and moves to the next one.

```js
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue;
  }

  console.log(i);
}
```


[Back to Table of Contents](#table-of-contents)

---

## Switch Statements

Use `switch` when one value can match many possible cases.

```js
const day = 'Monday';

switch (day) {
  case 'Monday':
    console.log('Start of the week');
    break;
  case 'Friday':
    console.log('Almost weekend');
    break;
  default:
    console.log('Regular day');
}
```

Best practices:

- Use `break` unless you intentionally want the next case to run too.
- Use `default` as a fallback.
- Use `if / else` when conditions are ranges or more complex comparisons.
- Use `switch` when checking one value against several exact matches.


[Back to Table of Contents](#table-of-contents)

---

## Forms And Inputs

You can read form input with `.value`.

HTML:

```html
<input id="nameInput" type="text" />
<button id="greetButton" type="button">Greet</button>
<p id="greeting"></p>
```

JavaScript:

```js
const nameInput = document.getElementById('nameInput');
const greetButton = document.getElementById('greetButton');
const greeting = document.getElementById('greeting');

greetButton.addEventListener('click', function () {
  const name = nameInput.value;
  greeting.textContent = `Hello, ${name}!`;
});
```

Best practices:

- Use `.value` for form fields.
- Use `.textContent` to display regular text.
- Validate input before trusting it.
- Use `trim()` to remove extra spaces.

Example:

```js
const name = nameInput.value.trim();

if (name === '') {
  greeting.textContent = 'Please enter your name.';
} else {
  greeting.textContent = `Hello, ${name}!`;
}
```


[Back to Table of Contents](#table-of-contents)

---

## Console Basics

The console helps you debug JavaScript.

```js
console.log('Hello');
console.warn('Careful');
console.error('Something went wrong');
```

Use `console.log()` to check values while learning:

```js
const total = 10 + 5;
console.log(total);
```

Best practice:

Remove unnecessary console logs before shipping a finished project.


[Back to Table of Contents](#table-of-contents)

---

## Common Beginner Errors

| Error | What It Usually Means |
| --- | --- |
| `Cannot read properties of null` | JavaScript could not find the element. Check the ID spelling and script loading. |
| `ReferenceError` | You used a variable or function name that does not exist in that scope. |
| `SyntaxError` | JavaScript cannot read the code. Check brackets, parentheses, quotes, and commas. |
| `TypeError` | You tried to use a value in a way that does not work. |
| Nothing happens | Check the console, event listener, file path, and whether the script is linked. |


[Back to Table of Contents](#table-of-contents)

---

## Naming Best Practices

Use camelCase for JavaScript variables and functions.

```js
const userName = 'Ada';

function showWelcomeMessage() {
  console.log('Welcome!');
}
```

Common naming patterns:

| Pattern | Example |
| --- | --- |
| Boolean values | `isOpen`, `hasError`, `canSubmit` |
| DOM elements | `submitButton`, `emailInput`, `messageOutput` |
| Functions | `openModal`, `validateForm`, `calculateTotal` |
| Arrays | `users`, `scores`, `cartItems` |


[Back to Table of Contents](#table-of-contents)

---

## General JavaScript Best Practices

- Use `const` by default.
- Use `let` when a value needs to change.
- Avoid `var` in modern JavaScript.
- Use `===` and `!==` instead of `==` and `!=`.
- Use meaningful names.
- Keep functions small and focused.
- Prefer `.textContent` over `.innerHTML` unless you need HTML.
- Check the browser console when something breaks.
- Keep JavaScript in `.js` files instead of writing lots of inline scripts in HTML.
- Add comments only when they explain why something is happening.
- Format your code consistently.


[Back to Table of Contents](#table-of-contents)

---

## Mini Patterns To Remember

Select an element:

```js
const element = document.getElementById('elementId');
```

Change text:

```js
element.textContent = 'New text';
```

Listen for a click:

```js
element.addEventListener('click', function () {
  console.log('Clicked');
});
```

Write a function:

```js
function doSomething() {
  console.log('Doing something');
}
```

Use an if statement:

```js
if (condition) {
  // code runs when condition is true
}
```

Use a for loop:

```js
for (let i = 0; i < 3; i++) {
  console.log(i);
}
```

Use a while loop:

```js
while (condition) {
  // repeat while condition is true
}
```


[Back to Table of Contents](#table-of-contents)

---

## Practice Ideas

1. Create a button that changes a paragraph's text.
2. Create an input and button that greets the user by name.
3. Create an age checker using `if / else`.
4. Create a counter using a variable and click event.
5. Loop through an array of favorite foods and display them.
6. Create a password checker with a `while` loop.
7. Build a small form that checks if required fields are filled in.


[Back to Table of Contents](#table-of-contents)

---

## Quick Vocabulary

| Term | Meaning |
| --- | --- |
| Statement | A line or instruction of code. |
| Expression | Code that produces a value. |
| Variable | A named container for a value. |
| Function | Reusable code that performs a task. |
| Parameter | Placeholder input in a function definition. |
| Argument | Real value passed into a function call. |
| Condition | An expression that is true or false. |
| Loop | Code that repeats. |
| Event | Something that happens in the browser. |
| DOM | The browser's object version of the HTML page. |
| Selector | Code used to find HTML elements. |
| Method | A function that belongs to an object. |
| Property | A value that belongs to an object. |


[Back to Table of Contents](#table-of-contents)

---

## Recommended Learning Order

1. Variables: `const`, `let`
2. Data types
3. Functions
4. DOM selection: `document.getElementById()`
5. Events: `addEventListener()`
6. If / else statements
7. Loops
8. Arrays and objects
9. Forms
10. Debugging with the console

[Back to Table of Contents](#table-of-contents)
