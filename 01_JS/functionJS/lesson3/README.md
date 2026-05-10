# Lesson 3: JavaScript Calculator

This lesson builds a simple calculator using HTML, CSS, and JavaScript.

The calculator lets users click number and operator buttons, display a math expression, clear the display, and calculate a result.

## Learning Goals

By the end of this lesson, you should understand how to:

- connect HTML, CSS, and JavaScript files
- select elements with `getElementById()` and `querySelector()`
- use `data-value` attributes on buttons
- listen for click events
- update an input field with JavaScript
- use a helper function
- evaluate basic math expressions

## Project Files

```text
lesson3/
├── calculator.html  # Calculator structure
├── calculator.css   # Calculator styling
├── calculator.js    # Calculator behavior
├── template.css     # Basic reset styles
└── README.md        # Lesson notes
```

## How To Use It

Open `calculator.html` in a browser.

Click the number and operator buttons to build an expression.

Example:

```text
2 + 3 * 4
```

Then click `=` to calculate the answer.

The calculator follows normal math rules, so multiplication and division happen before addition and subtraction.

```text
2 + 3 * 4 = 14
```

Click `C` to clear the display.

## How It Works

The calculator display is an input field:

```html
<input id="display" type="text" readonly />
```

Each button stores a value using `data-value`:

```html
<button data-value="1">1</button>
<button data-value="+">+</button>
```

JavaScript listens for clicks on the button area:

```js
buttons.addEventListener('click', (e) => {
  const value = e.target.dataset.value;
});
```

When a number or operator is clicked, it gets added to the display:

```js
function appendToDisplay(value) {
  display.value += value;
}
```

When `=` is clicked, JavaScript calculates the expression:

```js
display.value = eval(display.value);
```

If the expression is not valid, the calculator shows:

```text
Error
```

## Current Limitations

This is a beginner calculator, so it still has some limitations:

- dividing by zero shows `Infinity`
- pressing `=` with an empty display can show `undefined`
- invalid expressions like `2++3` show `Error`
- decimal numbers are not available yet
- parentheses are not available yet

## Big Idea

This lesson follows a common JavaScript pattern:

```text
User clicks something -> JavaScript responds -> the page updates
```
