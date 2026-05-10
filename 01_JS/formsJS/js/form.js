const orderForm = document.getElementById('orderForm');
const output = document.getElementById('output');
const customerNameInput = document.getElementById('customerName');
const customerPhoneInput = document.getElementById('customerPhone');
const pickupDateInput = document.getElementById('pickupDate');
const orderItems = document.getElementById('orderItems');
const addItemButton = document.getElementById('addItemButton');
const orderLimitNote = document.getElementById('orderLimitNote');

const phoneNumber = '1-888-777-6666';
const maxOnlineItems = 12;
const maxNameLength = 40;
const namePattern = /^[A-Za-z ]+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

function getOrderRows() {
  return Array.from(orderItems.querySelectorAll('.order-item'));
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
  orderLimitNote.textContent = `${total} of ${maxOnlineItems} online items selected.`;
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

function addOrderRow() {
  orderItems.append(createOrderRow());
  updateRemoveButtons();
  updateOrderLimitNote();
}

function validateOrderItems() {
  const orderDetails = getOrderDetails();
  const firstQuantityInput = orderItems.querySelector('.item-quantity');
  const firstEmptyItem = getOrderRows().find((row) => !row.querySelector('.menu-item-select').value);
  const total = getOrderTotal();

  firstQuantityInput.setCustomValidity('');

  if (firstEmptyItem) {
    showFieldMessage(firstEmptyItem.querySelector('.menu-item-select'), 'Please choose an item for each order row.');
    return false;
  }

  if (orderDetails.some((item) => item.quantity < 1 || Number.isNaN(item.quantity))) {
    showFieldMessage(firstQuantityInput, 'Please enter a quantity of at least 1 for each item.');
    return false;
  }

  if (total > maxOnlineItems) {
    showFieldMessage(
      firstQuantityInput,
      `For orders over ${maxOnlineItems} items total, please call us at ${phoneNumber} so we can make sure we have enough in stock and can prepare everything beautifully for you.`
    );
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

function buildOrderSummary() {
  return getOrderDetails()
    .map((item) => `- ${item.quantity} x ${item.menuItem}`)
    .join('\n');
}

function buildReviewMessage(formData) {
  const customerName = String(formData.get('customerName')).trim();
  const customerEmail = String(formData.get('customerEmail')).trim();
  const customerPhone = String(formData.get('customerPhone')).trim();
  const pickupDate = formData.get('pickupDate');
  const orderNotes = String(formData.get('orderNotes')).trim() || 'None';

  return `Please review your order before we send it:

Name: ${customerName}
Email: ${customerEmail}
Phone: ${customerPhone}
Pickup date: ${pickupDate}

Items:
${buildOrderSummary()}

Notes: ${orderNotes}

Orders cannot be cancelled after they are placed.

Would you like to place this order?`;
}

function showConfirmation(formData) {
  const customerName = String(formData.get('customerName')).trim();
  const pickupDate = formData.get('pickupDate');
  const total = getOrderTotal();

  alert(`Thank you for ordering, ${customerName}!

We received your request for ${total} item${total === 1 ? '' : 's'} for pickup on ${pickupDate}.
We will contact you if we need to confirm any details.`);

  output.textContent = `Thank you, ${customerName}. Your order request for ${total} item${total === 1 ? '' : 's'} on ${pickupDate} has been received.`;
}

setPickupDateLimits();
updateRemoveButtons();
updateOrderLimitNote();

customerPhoneInput.addEventListener('input', () => {
  customerPhoneInput.value = customerPhoneInput.value.replace(/\D/g, '').slice(0, 10);
});

customerNameInput.addEventListener('input', () => {
  customerNameInput.value = customerNameInput.value.replace(/[^A-Za-z ]/g, '').slice(0, maxNameLength);
});

addItemButton.addEventListener('click', addOrderRow);

orderItems.addEventListener('click', (event) => {
  if (!event.target.classList.contains('remove-item-button')) {
    return;
  }

  event.target.closest('.order-item').remove();
  updateRemoveButtons();
  updateOrderLimitNote();
});

orderItems.addEventListener('input', (event) => {
  if (!event.target.classList.contains('item-quantity')) {
    return;
  }

  const total = getOrderTotal();
  const message =
    total > maxOnlineItems
      ? `For orders over ${maxOnlineItems} items total, please call us at ${phoneNumber} so we can make sure we have enough in stock for what you are looking for.`
      : '';

  event.target.setCustomValidity(message);
  updateOrderLimitNote();
});

orderForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(orderForm);

  if (!validateOrder(formData)) {
    return;
  }

  const customerConfirmed = confirm(buildReviewMessage(formData));

  if (!customerConfirmed) {
    return;
  }

  showConfirmation(formData);
  orderForm.reset();
  getOrderRows().slice(1).forEach((row) => row.remove());
  setPickupDateLimits();
  updateRemoveButtons();
  updateOrderLimitNote();

  if (typeof closeOrderModal === 'function') {
    closeOrderModal();
  }
});
