const orderForm = document.getElementById('orderForm');
const output = document.getElementById('output');

orderForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(orderForm);
  const customerName = formData.get('customerName');
  const menuItem = formData.get('menuItem');
  const quantity = formData.get('quantity');
  const pickupDate = formData.get('pickupDate');
  const itemLabel = quantity === '1' ? menuItem : `${menuItem}s`;

  output.textContent = `Thank you, ${customerName}. Your request for ${quantity} ${itemLabel} on ${pickupDate} has been received.`;
  orderForm.reset();

  if (typeof closeOrderModal === 'function') {
    closeOrderModal();
  }
});
