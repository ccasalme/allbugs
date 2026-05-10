const display = document.getElementById('display');
const buttons = document.querySelector('.buttons');

buttons.addEventListener('click', (e) => {
  const value = e.target.dataset.value;

  if (value) {
    appendToDisplay(value);
  }

  if (e.target.id === 'clear') {
    display.value = '';
  }

  if (e.target.id === 'equals') {
    try {
      display.value = eval(display.value);
    } catch {
      display.value = 'Error';
    }
  }
});

function appendToDisplay(value) {
  display.value += value;
}