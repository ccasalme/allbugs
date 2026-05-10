const orderForm = document.getElementById('orderForm');
const output = document.getElementById('output');
const customerNameInput = document.getElementById('customerName');
const customerPhoneInput = document.getElementById('customerPhone');
const pickupDateInput = document.getElementById('pickupDate');
const orderItems = document.getElementById('orderItems');
const addItemButton = document.getElementById('addItemButton');
const orderLimitNote = document.getElementById('orderLimitNote');
const reviewModal = document.getElementById('reviewModal');
const placedModal = document.getElementById('placedModal');
const reviewOrderSummary = document.getElementById('reviewOrderSummary');
const placedOrderSummary = document.getElementById('placedOrderSummary');
const editOrderButton = document.getElementById('editOrderButton');
const placeOrderButton = document.getElementById('placeOrderButton');
const doneOrderButton = document.getElementById('doneOrderButton');
const menuCards = document.querySelectorAll('.menu-preview .menu-card');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartMessage = document.getElementById('cartMessage');
const checkoutCartButton = document.getElementById('checkoutCartButton');
const cartPanel = document.getElementById('cartPanel');
const cartToast = document.getElementById('cartToast');
const cartToastTitle = document.getElementById('cartToastTitle');
const cartToastMessage = document.getElementById('cartToastMessage');
const cartToastLink = document.getElementById('cartToastLink');
const cartToastClose = document.getElementById('cartToastClose');

const phoneNumber = '1-888-777-6666';
const maxOnlineItems = 12;
const maxNameLength = 40;
const namePattern = /^[A-Za-z ]+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let pendingOrderData = null;
let cart = [];
let cartToastTimer = null;
let cartToastTouchStartX = 0;
let cartToastTouchStartY = 0;

function getDateValue(daysFromToday = 0) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function setPickupDateLimits() {
  pickupDateInput.min = getDateValue();
  pickupDateInput.max = getDateValue(7);
}

function showFieldMessage(field, message) {
  field.setCustomValidity(message);
  field.reportValidity();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function getOrderRows() {
  return Array.from(orderItems.querySelectorAll('.order-item'));
}

function getQuantityInputs() {
  return Array.from(orderItems.querySelectorAll('.item-quantity'));
}

function getOrderDetails() {
  return getOrderRows().map((row) => {
    const menuItem = row.querySelector('.menu-item-select').value;
    const quantity = Number(row.querySelector('.item-quantity').value);

    return {
      menuItem,
      quantity,
    };
  });
}

function getOrderTotal() {
  return getOrderDetails().reduce((total, item) => total + item.quantity, 0);
}

function updateOrderLimitNote() {
  const total = getOrderTotal();
  orderLimitNote.textContent = `${total} item${total === 1 ? '' : 's'} selected. Please call for orders of ${maxOnlineItems} or more items.`;
}

function getCartTotal() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function showCartLimitMessage() {
  const message = `For orders of ${maxOnlineItems} or more items, please call us at ${phoneNumber} so we can make sure we have enough in stock for what you are looking for.`;

  cartMessage.textContent = message;
  showCartToast({
    title: 'Please call us first',
    message,
    type: 'warning',
  });
}

function focusCartPanel() {
  cartPanel.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
  cartPanel.focus({
    preventScroll: true,
  });
}

function hideCartToast() {
  clearTimeout(cartToastTimer);
  cartToast.hidden = true;
}

function showCartToast({
  title = 'Added to your cart!',
  message = '',
  type = 'success',
} = {}) {
  clearTimeout(cartToastTimer);
  cartToastTitle.textContent = title;
  cartToastMessage.textContent = message;
  cartToast.classList.toggle('is-warning', type === 'warning');
  cartToast.hidden = false;

  cartToastTimer = setTimeout(() => {
    hideCartToast();
  }, 5000);
}

function renderCart() {
  const total = getCartTotal();

  cartItems.innerHTML = '';
  cartTotal.textContent = `${total} item${total === 1 ? '' : 's'} selected.`;
  checkoutCartButton.disabled = cart.length === 0;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  cart.forEach((item) => {
    const cartLine = document.createElement('div');
    cartLine.className = 'cart-line';
    cartLine.innerHTML = `
      <strong>${escapeHtml(item.name)}</strong>
      <span>${item.quantity} item${item.quantity === 1 ? '' : 's'}</span>
      <button class="cart-remove-button" type="button" data-cart-item="${escapeHtml(item.name)}">
        Remove
      </button>
    `;

    cartItems.append(cartLine);
  });
}

function addToCart(name, quantity) {
  const nextTotal = getCartTotal() + quantity;

  if (nextTotal >= maxOnlineItems) {
    showCartLimitMessage();
    return;
  }

  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      name,
      quantity,
    });
  }

  cartMessage.textContent = `${quantity} ${name}${quantity === 1 ? ' was' : 's were'} added to your cart.`;
  renderCart();
  showCartToast();
}

function addCartControls() {
  menuCards.forEach((card) => {
    const itemName = card.querySelector('h3').textContent;
    const controls = document.createElement('div');
    controls.className = 'menu-cart-controls';
    controls.innerHTML = `
      <input
        class="menu-cart-quantity"
        type="number"
        min="1"
        max="11"
        value="1"
        aria-label="Quantity for ${escapeHtml(itemName)}"
      />
      <button class="add-cart-button" type="button">
        Add to cart
      </button>
    `;

    card.append(controls);
  });
}

function setQuantityLimitValidity(shouldReport = false) {
  const quantityInputs = getQuantityInputs();
  const total = getOrderTotal();
  const message =
    total >= maxOnlineItems
      ? `For orders of ${maxOnlineItems} or more items, please call us at ${phoneNumber} so we can make sure we have enough in stock for what you are looking for.`
      : '';

  quantityInputs.forEach((input) => {
    input.setCustomValidity('');
  });

  if (!message) {
    return true;
  }

  quantityInputs[0].setCustomValidity(message);

  if (shouldReport) {
    showCartToast({
      title: 'Please call us first',
      message,
      type: 'warning',
    });
    quantityInputs[0].reportValidity();
  }

  return false;
}

function updateRemoveButtons() {
  const rows = getOrderRows();

  rows.forEach((row) => {
    row.querySelector('.remove-item-button').disabled = rows.length === 1;
  });
}

function createOrderRow() {
  const firstRow = getOrderRows()[0];
  const newRow = firstRow.cloneNode(true);
  const menuSelect = newRow.querySelector('.menu-item-select');
  const quantityInput = newRow.querySelector('.item-quantity');

  menuSelect.value = '';
  quantityInput.value = '1';
  quantityInput.setCustomValidity('');

  return newRow;
}

function setOrderRowsFromCart() {
  const rows = getOrderRows();
  const firstRow = rows[0];

  rows.slice(1).forEach((row) => row.remove());

  cart.forEach((item, index) => {
    const row = index === 0 ? firstRow : createOrderRow();

    row.querySelector('.menu-item-select').value = item.name;
    row.querySelector('.item-quantity').value = String(item.quantity);

    if (index > 0) {
      orderItems.append(row);
    }
  });

  updateRemoveButtons();
  updateOrderLimitNote();
  setQuantityLimitValidity();
}

function prepareOrderFormFromCart() {
  if (cart.length === 0) {
    return;
  }

  setOrderRowsFromCart();
}

function addOrderRow() {
  orderItems.append(createOrderRow());
  updateRemoveButtons();
  updateOrderLimitNote();
  setQuantityLimitValidity();
}

function validateOrderItems() {
  const orderDetails = getOrderDetails();
  const firstQuantityInput = orderItems.querySelector('.item-quantity');
  const firstEmptyItem = getOrderRows().find((row) => !row.querySelector('.menu-item-select').value);

  getQuantityInputs().forEach((input) => {
    input.setCustomValidity('');
  });

  if (firstEmptyItem) {
    showFieldMessage(firstEmptyItem.querySelector('.menu-item-select'), 'Please choose an item for each order row.');
    return false;
  }

  if (orderDetails.some((item) => item.quantity < 1 || Number.isNaN(item.quantity))) {
    showFieldMessage(firstQuantityInput, 'Please enter a quantity of at least 1 for each item.');
    return false;
  }

  if (!setQuantityLimitValidity(true)) {
    return false;
  }

  return true;
}

function validateOrder(formData) {
  const customerName = String(formData.get('customerName')).trim();
  const customerEmail = String(formData.get('customerEmail')).trim();
  const customerPhone = String(formData.get('customerPhone')).trim();
  const pickupDate = String(formData.get('pickupDate'));

  customerNameInput.setCustomValidity('');
  orderForm.elements.customerEmail.setCustomValidity('');
  customerPhoneInput.setCustomValidity('');
  pickupDateInput.setCustomValidity('');

  if (!namePattern.test(customerName)) {
    showFieldMessage(customerNameInput, 'Please enter your name using letters and spaces only.');
    return false;
  }

  if (customerName.length > maxNameLength) {
    showFieldMessage(customerNameInput, `Please keep your name to ${maxNameLength} characters or fewer.`);
    return false;
  }

  if (!emailPattern.test(customerEmail)) {
    showFieldMessage(orderForm.elements.customerEmail, 'Please enter a valid email address, like email@example.com.');
    return false;
  }

  if (!/^\d{10}$/.test(customerPhone)) {
    showFieldMessage(customerPhoneInput, 'Please enter a 10-digit phone number with numbers only.');
    return false;
  }

  if (pickupDate < pickupDateInput.min) {
    showFieldMessage(pickupDateInput, 'Please choose today or a future pickup date.');
    return false;
  }

  if (pickupDate > pickupDateInput.max) {
    showFieldMessage(pickupDateInput, 'Please choose a pickup date within the next 7 days.');
    return false;
  }

  return validateOrderItems();
}

function getOrderSnapshot(formData) {
  const customerName = String(formData.get('customerName')).trim();
  const customerEmail = String(formData.get('customerEmail')).trim();
  const customerPhone = String(formData.get('customerPhone')).trim();
  const pickupDate = formData.get('pickupDate');
  const orderNotes = String(formData.get('orderNotes')).trim() || 'None';

  return {
    customerName,
    customerEmail,
    customerPhone,
    pickupDate,
    orderNotes,
    orderDetails: getOrderDetails(),
    total: getOrderTotal(),
  };
}

function renderOrderSummary(container, orderData, includeWarning = false) {
  const itemsMarkup = orderData.orderDetails
    .map((item) => `<li>${item.quantity} x ${escapeHtml(item.menuItem)}</li>`)
    .join('');

  container.innerHTML = `
    <div class="summary-row">
      <strong>Name</strong>
      <span>${escapeHtml(orderData.customerName)}</span>
    </div>
    <div class="summary-row">
      <strong>Email</strong>
      <span>${escapeHtml(orderData.customerEmail)}</span>
    </div>
    <div class="summary-row">
      <strong>Phone</strong>
      <span>${escapeHtml(orderData.customerPhone)}</span>
    </div>
    <div class="summary-row">
      <strong>Pickup date</strong>
      <span>${escapeHtml(orderData.pickupDate)}</span>
    </div>
    <div>
      <strong>Items</strong>
      <ul class="summary-items">${itemsMarkup}</ul>
    </div>
    <div class="summary-row">
      <strong>Total</strong>
      <span>${orderData.total} item${orderData.total === 1 ? '' : 's'}</span>
    </div>
    <div>
      <strong>Notes</strong>
      <p>${escapeHtml(orderData.orderNotes)}</p>
    </div>
    ${
      includeWarning
        ? '<p class="summary-warning">Orders cannot be cancelled after they are placed.</p>'
        : ''
    }
  `;
}

function openReviewModal(orderData) {
  pendingOrderData = orderData;
  renderOrderSummary(reviewOrderSummary, orderData, true);
  reviewModal.hidden = false;

  if (typeof activateModalFocus === 'function') {
    activateModalFocus(reviewModal, placeOrderButton);
  } else {
    placeOrderButton.focus();
  }
}

function closeReviewModal() {
  reviewModal.hidden = true;

  if (typeof activateModalFocus === 'function' && !orderModal.hidden) {
    activateModalFocus(orderModal, customerNameInput);
  }
}

function openPlacedModal(orderData) {
  renderOrderSummary(placedOrderSummary, orderData);
  document.body.classList.add('modal-open');
  placedModal.hidden = false;

  if (typeof activateModalFocus === 'function') {
    activateModalFocus(placedModal, doneOrderButton);
  } else {
    doneOrderButton.focus();
  }
}

function closePlacedModal() {
  placedModal.hidden = true;
  document.body.classList.remove('modal-open');
  output.textContent = `Your order is placed, ${pendingOrderData.customerName}. Thank you for ordering!`;
  pendingOrderData = null;

  if (typeof deactivateModalFocus === 'function') {
    deactivateModalFocus();
  }

  if (typeof restoreLastFocus === 'function') {
    restoreLastFocus();
  }
}

setPickupDateLimits();
addCartControls();
renderCart();
updateRemoveButtons();
updateOrderLimitNote();

customerPhoneInput.addEventListener('input', () => {
  customerPhoneInput.value = customerPhoneInput.value.replace(/\D/g, '').slice(0, 10);
});

customerNameInput.addEventListener('input', () => {
  customerNameInput.value = customerNameInput.value.replace(/[^A-Za-z ]/g, '').slice(0, maxNameLength);
});

addItemButton.addEventListener('click', addOrderRow);

function addCardItemToCart(card) {
  const itemName = card.querySelector('h3').textContent;
  const quantityInput = card.querySelector('.menu-cart-quantity');
  const quantity = Number(quantityInput.value);

  if (quantity < 1 || Number.isNaN(quantity)) {
    quantityInput.reportValidity();
    return;
  }

  addToCart(itemName, quantity);
}

document.querySelector('.menu-preview').addEventListener('click', (event) => {
  if (!event.target.classList.contains('add-cart-button')) {
    return;
  }

  const card = event.target.closest('.menu-card');
  addCardItemToCart(card);
});

document.querySelector('.menu-preview').addEventListener('keydown', (event) => {
  if (event.key !== 'Enter' || !event.target.classList.contains('menu-cart-quantity')) {
    return;
  }

  event.preventDefault();
  addCardItemToCart(event.target.closest('.menu-card'));
});

cartItems.addEventListener('click', (event) => {
  if (!event.target.classList.contains('cart-remove-button')) {
    return;
  }

  cart = cart.filter((item) => item.name !== event.target.dataset.cartItem);
  cartMessage.textContent = '';
  renderCart();
});

checkoutCartButton.addEventListener('click', () => {
  if (cart.length === 0) {
    return;
  }

  prepareOrderFormFromCart();

  if (typeof openOrderModal === 'function') {
    openOrderModal();
  }
});

cartToastLink.addEventListener('click', (event) => {
  event.preventDefault();
  hideCartToast();
  focusCartPanel();
});

cartToastClose.addEventListener('click', hideCartToast);

cartToast.addEventListener('touchstart', (event) => {
  const touch = event.changedTouches[0];
  cartToastTouchStartX = touch.clientX;
  cartToastTouchStartY = touch.clientY;
});

cartToast.addEventListener('touchend', (event) => {
  const touch = event.changedTouches[0];
  const deltaX = touch.clientX - cartToastTouchStartX;
  const deltaY = touch.clientY - cartToastTouchStartY;
  const swipedFarEnough = Math.abs(deltaX) > 60 || deltaY < -45;

  if (swipedFarEnough) {
    hideCartToast();
  }
});

orderItems.addEventListener('click', (event) => {
  if (!event.target.classList.contains('remove-item-button')) {
    return;
  }

  event.target.closest('.order-item').remove();
  updateRemoveButtons();
  updateOrderLimitNote();
  setQuantityLimitValidity();
});

orderItems.addEventListener('input', (event) => {
  if (!event.target.classList.contains('item-quantity')) {
    return;
  }

  updateOrderLimitNote();
  setQuantityLimitValidity(true);
});

orderForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(orderForm);

  if (!validateOrder(formData)) {
    return;
  }

  openReviewModal(getOrderSnapshot(formData));
});

editOrderButton.addEventListener('click', () => {
  closeReviewModal();
});

placeOrderButton.addEventListener('click', () => {
  if (!pendingOrderData) {
    return;
  }

  closeReviewModal();
  closeOrderModal(false);
  openPlacedModal(pendingOrderData);
  orderForm.reset();
  cart = [];
  cartMessage.textContent = '';
  renderCart();
  getOrderRows().slice(1).forEach((row) => row.remove());
  setPickupDateLimits();
  updateRemoveButtons();
  updateOrderLimitNote();
});

doneOrderButton.addEventListener('click', closePlacedModal);

reviewModal.addEventListener('click', (event) => {
  if (event.target === reviewModal) {
    closeReviewModal();
  }
});

placedModal.addEventListener('click', (event) => {
  if (event.target === placedModal) {
    closePlacedModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') {
    return;
  }

  if (!placedModal.hidden) {
    closePlacedModal();
    return;
  }

  if (!reviewModal.hidden) {
    closeReviewModal();
  }
});
