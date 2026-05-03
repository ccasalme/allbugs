//defined variables for the prompt demo
const actionButton = document.getElementById('actionButton');
const output = document.getElementById('output');
const promptModal = document.getElementById('promptModal');
const promptForm = document.getElementById('promptForm');
const promptInput = document.getElementById('promptInput');
const closeModalButton = document.getElementById('closeModalButton');
const cancelModalButton = document.getElementById('cancelModalButton');

// Variable to store the last focused element before opening the modal,
// so we can return focus to it when the modal is closed.
let lastFocusedElement;

// Functions to handle opening and closing the custom prompt modal, 
// as well as displaying messages based on user input or actions.
function openPromptModal() {
  lastFocusedElement = document.activeElement; 
  //active.Element is a built-in property that returns the currently focused element in the document.
  promptInput.value = '';
  promptModal.hidden = false;
  document.body.classList.add('modal-open');
  promptInput.focus();
}

function closePromptModal() {
  promptModal.hidden = true;
  document.body.classList.remove('modal-open');

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function showMessage(message) {
  output.textContent = message;
}

// Button click event listener for custom prompt demo
actionButton.addEventListener('click', openPromptModal);

promptForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const userInput = promptInput.value;
  showMessage(`You entered: ${userInput}`);
  closePromptModal();
});

closeModalButton.addEventListener('click', closePromptModal);

cancelModalButton.addEventListener('click', function() {
  showMessage('Prompt canceled.');
  closePromptModal();
});

promptModal.addEventListener('click', function(event) {
  if (event.target === promptModal) {
    closePromptModal();
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && !promptModal.hidden) {
    closePromptModal();
  }
});
