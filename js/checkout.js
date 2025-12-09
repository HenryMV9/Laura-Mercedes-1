import { getCart, formatCurrency, clearCart } from './cart.js';
import { createOrder } from './supabase-client.js';

const orderSummary = document.getElementById('orderSummary');
const checkoutForm = document.getElementById('checkoutForm');
const placeOrderBtn = document.getElementById('placeOrderBtn');

function displayOrderSummary() {
  const cart = getCart();

  if (cart.length === 0) {
    window.location.href = '/cart.html';
    return;
  }

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 5000;
  const total = subtotal + shipping;

  orderSummary.innerHTML = `
    ${cart.map(item => `
      <div class="order-item">
        <img src="${item.image}" alt="${item.name}" class="order-item-image">
        <div class="order-item-details">
          <p class="order-item-name">${item.name}</p>
          <p class="order-item-qty">Qty: ${item.quantity}</p>
        </div>
        <div class="order-item-price">${formatCurrency(item.price * item.quantity)}</div>
      </div>
    `).join('')}

    <div class="summary-row">
      <span>Subtotal:</span>
      <span>${formatCurrency(subtotal)}</span>
    </div>
    <div class="summary-row">
      <span>Shipping:</span>
      <span>${formatCurrency(shipping)}</span>
    </div>
    <div class="summary-row total">
      <span>Total:</span>
      <span>${formatCurrency(total)}</span>
    </div>
  `;
}

async function handleCheckout(e) {
  e.preventDefault();

  const cart = getCart();
  if (cart.length === 0) {
    alert('Your cart is empty');
    return;
  }

  placeOrderBtn.disabled = true;
  placeOrderBtn.textContent = 'Processing...';

  try {
    const formData = new FormData(checkoutForm);

    const orderData = {
      customerName: `${formData.get('firstName')} ${formData.get('lastName')}`,
      customerEmail: formData.get('email'),
      customerPhone: formData.get('phone'),
      shippingAddress: {
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        postalCode: formData.get('postalCode')
      },
      items: cart.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      subtotal: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
      total: cart.reduce((total, item) => total + (item.price * item.quantity), 0) + 5000,
      stripePaymentId: ''
    };

    const order = await createOrder(orderData);

    clearCart();

    alert(`Order placed successfully! Order number: ${order.order_number}\n\nYou will receive a confirmation via WhatsApp shortly.`);

    const whatsappMessage = encodeURIComponent(
      `New Order: ${order.order_number}\n\nCustomer: ${orderData.customerName}\nPhone: ${orderData.customerPhone}\nTotal: ${formatCurrency(orderData.total)}\n\nPlease confirm this order.`
    );
    window.open(`https://wa.me/2348143372835?text=${whatsappMessage}`, '_blank');

    setTimeout(() => {
      window.location.href = '/shop.html';
    }, 2000);

  } catch (error) {
    console.error('Checkout error:', error);
    alert('There was an error processing your order. Please try again or contact us via WhatsApp.');
    placeOrderBtn.disabled = false;
    placeOrderBtn.textContent = 'Place Order';
  }
}

checkoutForm.addEventListener('submit', handleCheckout);
displayOrderSummary();
