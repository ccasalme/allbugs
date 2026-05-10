const orderModal = document.getElementById('orderModal');
const closeOrderModalButton = document.getElementById('closeOrderModal');
const openOrderButtons = document.querySelectorAll('[data-open-order]');
const menuToggle = document.getElementById('menuToggle');
const siteNavigation = document.getElementById('siteNavigation');
const firstOrderField = document.getElementById('customerName');
const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

let lastFocusedElement = null;
let activeModal = null;

function getFocusableElements(container) {
  return Array.from(container.querySelectorAll(focusableSelector)).filter((element) => {
    return element.offsetParent !== null;
  });
}

function activateModalFocus(modal, firstFocusTarget) {
  activeModal = modal;
  const focusTarget = firstFocusTarget || getFocusableElements(modal)[0] || modal;

  focusTarget.focus();
}

function deactivateModalFocus() {
  activeModal = null;
}

function restoreLastFocus() {
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function openOrderModal() {
  if (!activeModal) {
    lastFocusedElement = document.activeElement;
  }

  if (typeof prepareOrderFormFromCart === 'function') {
    prepareOrderFormFromCart();
  }

  orderModal.hidden = false;
  document.body.classList.add('modal-open');
  activateModalFocus(orderModal, firstOrderField);
}

function closeOrderModal(shouldRestoreFocus = true) {
  orderModal.hidden = true;
  deactivateModalFocus();
  document.body.classList.remove('modal-open');

  if (shouldRestoreFocus) {
    restoreLastFocus();
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

  if (event.key === 'Tab' && activeModal) {
    const focusableElements = getFocusableElements(activeModal);
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (!firstFocusable || !lastFocusable) {
      event.preventDefault();
      return;
    }

    if (event.shiftKey && document.activeElement === firstFocusable) {
      event.preventDefault();
      lastFocusable.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable.focus();
    }
  }

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
