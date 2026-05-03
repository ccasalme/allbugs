const actionButton = document.getElementById('actionButton');
const output = document.getElementById('output');
const promptModal = document.getElementById('promptModal');
const promptForm = document.getElementById('promptForm');
const promptInput = document.getElementById('promptInput');
const closeModalButton = document.getElementById('closeModalButton');
const cancelModalButton = document.getElementById('cancelModalButton');

let lastFocusedElement;

function openPromptModal() {
  lastFocusedElement = document.activeElement;
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
