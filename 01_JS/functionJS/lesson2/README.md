# Lesson 2: Functions and Prompts in JavaScript

This lesson introduces two beginner-friendly JavaScript ideas:

- **Prompts**: asking the user for information
- **Functions**: packaging logic into reusable blocks of code

The original browser `prompt()` works, but it is plain and not very flexible. This lesson upgrades that idea into a custom modal window built with HTML, CSS, and JavaScript.

---

## Learning Goals

By the end of this lesson, you should understand how to:

- collect user input
- store that input in a variable
- respond to button clicks
- show and hide elements with JavaScript
- write small functions that organize behavior
- use basic accessibility attributes for a modal dialog

---

## Project Files

```text
lesson2/
├── prompt.html     # Page structure and modal markup
├── prompt.js       # JavaScript behavior for opening, closing, and submitting
├── template.css    # Shared page styling
├── js.css          # Lesson-specific modal styling
└── README.md       # Lesson notes
```

---

## Part 1: The Built-In Prompt

JavaScript has a built-in browser function called `prompt()`.

```js
const userInput = prompt('Please enter your message:');
```

This opens a basic browser popup and waits for the user to type something.

Then we can display the result:

```js
document.getElementById('output').textContent = `You entered: ${userInput}`;
```

That works, but the browser controls how the popup looks. We cannot style it with CSS.

So instead, this lesson creates our own prompt-style modal.

---

## Part 2: Functions

A function is a reusable block of code.

```js
function greet(name) {
  return 'Hello ' + name + '!';
}
```

We can call the function by passing in a value:

```js
greet('Cyrl');
```

That gives us:

```text
Hello Cyrl!
```

Functions are useful because they let us give names to actions. In this lesson, we use functions like:

```js
function openPromptModal() {
  // show the modal
}

function closePromptModal() {
  // hide the modal
}

function showMessage(message) {
  // display output on the page
}
```

---

## Part 3: The Custom Modal

The modal starts hidden in the HTML.

```html
<div
  id="promptModal"
  class="modal"
  role="dialog"
  aria-modal="true"
  aria-labelledby="promptTitle"
  aria-describedby="promptMessage"
  hidden
>
```

Here is what each part does:

| Attribute | What it does |
| --- | --- |
| `id="promptModal"` | Gives JavaScript a unique way to find this element. |
| `class="modal"` | Gives CSS a hook for styling the modal. |
| `role="dialog"` | Tells assistive technology this is a dialog window. |
| `aria-modal="true"` | Tells assistive technology the user should focus on this modal before returning to the page. |
| `aria-labelledby="promptTitle"` | Connects the modal to its title. |
| `aria-describedby="promptMessage"` | Connects the modal to its instruction text. |
| `hidden` | Keeps the modal invisible when the page first loads. |

In plain English, this says:

```html
<div
  id="the thing JavaScript controls"
  class="the thing CSS styles"
  role="this is a dialog"
  aria-modal="this temporarily takes over the page"
  aria-labelledby="this element is the title"
  aria-describedby="this element explains the dialog"
  hidden="start invisible"
>
```

---

## Part 4: How JavaScript Finds the Elements

At the top of `prompt.js`, we grab the HTML elements we need:

```js
const actionButton = document.getElementById('actionButton');
const output = document.getElementById('output');
const promptModal = document.getElementById('promptModal');
const promptForm = document.getElementById('promptForm');
const promptInput = document.getElementById('promptInput');
const closeModalButton = document.getElementById('closeModalButton');
const cancelModalButton = document.getElementById('cancelModalButton');
```

This is JavaScript saying:

```text
Find these elements on the page so I can work with them.
```

---

## Part 5: Opening the Modal

```js
function openPromptModal() {
  lastFocusedElement = document.activeElement;
  promptInput.value = '';
  promptModal.hidden = false;
  document.body.classList.add('modal-open');
  promptInput.focus();
}
```

What happens here:

- `document.activeElement` remembers what the user was focused on before the modal opened.
- `promptInput.value = ''` clears the input field.
- `promptModal.hidden = false` shows the modal.
- `document.body.classList.add('modal-open')` prevents the page behind the modal from scrolling.
- `promptInput.focus()` moves the cursor into the input so the user can type right away.

---

## Part 6: Closing the Modal

```js
function closePromptModal() {
  promptModal.hidden = true;
  document.body.classList.remove('modal-open');

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}
```

What happens here:

- `promptModal.hidden = true` hides the modal.
- `document.body.classList.remove('modal-open')` restores normal page scrolling.
- `lastFocusedElement.focus()` sends focus back to where the user was before the modal opened.

That last part is especially helpful for keyboard and screen reader users.

---

## Part 7: Event Listeners

An event listener waits for something to happen.

This one waits for the main button to be clicked:

```js
actionButton.addEventListener('click', openPromptModal);
```

This one waits for the form to be submitted:

```js
promptForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const userInput = promptInput.value;
  showMessage(`You entered: ${userInput}`);
  closePromptModal();
});
```

Important details:

- `event.preventDefault()` stops the form from refreshing the page.
- `promptInput.value` gets whatever the user typed.
- `showMessage()` displays the result.
- `closePromptModal()` hides the modal after submitting.

---

## Part 8: Extra Modal Controls

The modal can close in a few different ways.

Click the close button:

```js
closeModalButton.addEventListener('click', closePromptModal);
```

Click Cancel:

```js
cancelModalButton.addEventListener('click', function() {
  showMessage('Prompt canceled.');
  closePromptModal();
});
```

Click outside the modal window:

```js
promptModal.addEventListener('click', function(event) {
  if (event.target === promptModal) {
    closePromptModal();
  }
});
```

Press Escape:

```js
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && !promptModal.hidden) {
    closePromptModal();
  }
});
```

---

## Vocabulary

| Term | Meaning |
| --- | --- |
| `prompt()` | A built-in browser function that asks the user for input. |
| `function` | A reusable block of code. |
| `return` | Sends a value back from a function. |
| `event listener` | Code that waits for something to happen, like a click or key press. |
| `modal` | A popup-style window that temporarily takes over the page. |
| `document.activeElement` | The element currently focused on the page. |
| `.focus()` | Moves keyboard focus to an element. |
| `hidden` | A built-in HTML attribute that hides an element. |
| `aria-*` | Accessibility attributes that give extra meaning to assistive technology. |

---

## Tiny Challenge

Try changing the project so the modal asks for a name instead of a message.

Then make the output say:

```text
Hello, NAME!
```

Hint:

```js
showMessage(`Hello, ${userInput}!`);
```
