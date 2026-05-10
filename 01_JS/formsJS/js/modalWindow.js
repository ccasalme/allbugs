const orderModal = document.getElementById('orderModal');
const closeOrderModalButton = document.getElementById('closeOrderModal');
const openOrderButtons = document.querySelectorAll('[data-open-order]');
const menuToggle = document.getElementById('menuToggle');
const siteNavigation = document.getElementById('siteNavigation');
const firstOrderField = document.getElementById('customerName');

let lastFocusedElement = null;

function openOrderModal() {
  lastFocusedElement = document.activeElement;

  if (typeof prepareOrderFormFromCart === 'function') {
    prepareOrderFormFromCart();
  }

  orderModal.hidden = false;
  document.body.classList.add('modal-open');
  firstOrderField.focus();
}

function closeOrderModal() {
  orderModal.hidden = true;
  document.body.classList.remove('modal-open');

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function toggleNavigation() {
  const isOpen = siteNavigation.classList.toggle('is-open');

  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
}

function closeNavigation() {
  siteNavigation.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
}

openOrderButtons.forEach((button) => {
  button.addEventListener('click', openOrderModal);
});

closeOrderModalButton.addEventListener('click', closeOrderModal);

orderModal.addEventListener('click', (event) => {
  if (event.target === orderModal) {
    closeOrderModal();
  }
});

document.addEventListener('keydown', (event) => {
  const reviewModal = document.getElementById('reviewModal');
  const placedModal = document.getElementById('placedModal');
  const confirmationIsOpen = !reviewModal.hidden || !placedModal.hidden;

  if (event.key === 'Escape' && !orderModal.hidden && !confirmationIsOpen) {
    closeOrderModal();
  }
});

menuToggle.addEventListener('click', toggleNavigation);

siteNavigation.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    closeNavigation();
  }
});
