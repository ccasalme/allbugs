//This Function is used to display a message when the button is clicked

const actionButton = document.getElementById('actionButton');
const output = document.getElementById('output');

function displayMessage() {
  output.textContent = 'Button was clicked!';
}

actionButton.addEventListener('click', displayMessage);

// Function: identifies a block of code that performs a specific task, can be reused, and can accept parameters to customize its behavior.
// In this example, we define a function called displayMessage that updates the text content of the output element when the button is clicked. 
// We then add an event listener to the button that calls the displayMessage function whenever the button is clicked.

// functionName: A descriptive name for the function that indicates what it does (e.g., displayMessage).
// Parameters: Optional inputs that the function can accept to perform its task (e.g., message).
// Function Body: The block of code that defines what the function does when it is called (e.g., output.textContent = message;).

// Functions are fundamental building blocks in JavaScript that allow us to organize and reuse code efficiently.
// Argumets: one or more values that are passed to the function and are used by the function to perform its task. 
// In the example above, the message parameter is an argument that we pass to the displayCustomMessage function when we call it.




