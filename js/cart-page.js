import { getCart, updateCartItemQuantity, removeFromCart, formatCurrency, getCartTotal, clearCart } from './cart.js';
import { createOrder } from './supabase-client.js';

const cartItemsContainer = document.getElementById('cartItems');
const subtotalElement = document.getElementById('subtotal');
const totalElement = document.getElementById('total');
const proceedToCheckoutBtn = document.getElementById('proceedToCheckout');
const checkoutModal = document.getElementById('checkoutModal');
const closeCheckoutModalBtn = document.getElementById('closeCheckoutModal');
const quickCheckoutForm = document.getElementById('quickCheckoutForm');
const modalSubtotal = document.getElementById('modalSubtotal');
const modalTotal = document.getElementById('modalTotal');

const SHIPPING_FEE = 5000;

function renderCartItems() {
  const cart = getCart();

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <h2>Your cart is currently empty</h2>
        <p>Explore our collections and find your perfect hair and beauty products.</p>
        <a href="/shop.html" class="btn btn-gold">Continue Shopping</a>
      </div>
    `;
    updateCartSummary();
    if (proceedToCheckoutBtn) {
      proceedToCheckoutBtn.setAttribute('disabled', 'true');
      proceedToCheckoutBtn.style.opacity = '0.5';
      proceedToCheckoutBtn.style.cursor = 'not-allowed';
    }
    return;
  }

  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item" data-product-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h3 class="cart-item-name">${item.name}</h3>
        <p class="cart-item-price">${formatCurrency(item.price)}</p>
      </div>
      <div class="cart-item-quantity">
        <button class="qty-btn" data-action="decrease" data-id="${item.id}">-</button>
        <input type="number" value="${item.quantity}" min="1" class="qty-input" data-id="${item.id}">
        <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
      </div>
      <div class="cart-item-total">
        ${formatCurrency(item.price * item.quantity)}
      </div>
      <button class="cart-item-remove" data-id="${item.id}">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  `).join('');

  updateCartSummary();

  if (proceedToCheckoutBtn) {
    proceedToCheckoutBtn.removeAttribute('disabled');
    proceedToCheckoutBtn.style.opacity = '1';
    proceedToCheckoutBtn.style.cursor = 'pointer';
  }

  attachEventListeners();
}

function updateCartSummary() {
  const subtotal = getCartTotal();
  const total = subtotal;

  if (subtotalElement) {
    subtotalElement.textContent = formatCurrency(subtotal);
  }

  if (totalElement) {
    totalElement.textContent = formatCurrency(total);
  }

  if (modalSubtotal) {
    modalSubtotal.textContent = formatCurrency(subtotal);
  }

  if (modalTotal) {
    modalTotal.textContent = formatCurrency(subtotal + SHIPPING_FEE);
  }
}

function attachEventListeners() {
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', handleQuantityChange);
  });

  document.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('change', handleQuantityInput);
  });

  document.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', handleRemoveItem);
  });
}

function handleQuantityChange(e) {
  const productId = e.target.dataset.id;
  const action = e.target.dataset.action;
  const cart = getCart();
  const item = cart.find(item => item.id === productId);

  if (!item) return;

  const newQuantity = action === 'increase' ? item.quantity + 1 : item.quantity - 1;

  if (newQuantity > 0) {
    updateCartItemQuantity(productId, newQuantity);
    renderCartItems();
  }
}

function handleQuantityInput(e) {
  const productId = e.target.dataset.id;
  const newQuantity = parseInt(e.target.value) || 1;

  if (newQuantity > 0) {
    updateCartItemQuantity(productId, newQuantity);
    renderCartItems();
  }
}

function handleRemoveItem(e) {
  const productId = e.currentTarget.dataset.id;
  removeFromCart(productId);
  renderCartItems();
}

function openCheckoutModal() {
  const cart = getCart();
  if (cart.length === 0) return;

  updateCartSummary();
  checkoutModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  checkoutModal.classList.remove('active');
  document.body.style.overflow = '';
}

async function handleCheckout(e) {
  e.preventDefault();

  const cart = getCart();
  if (cart.length === 0) {
    alert('Your cart is empty');
    return;
  }

  const formData = new FormData(quickCheckoutForm);
  const customerName = formData.get('customerName');
  const customerEmail = formData.get('customerEmail');
  const customerPhone = formData.get('customerPhone');

  if (!customerName || !customerEmail || !customerPhone) {
    alert('Please fill in all required fields');
    return;
  }

  const submitBtn = document.getElementById('proceedToPayment');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Processing...';

  try {
    const subtotal = getCartTotal();
    const total = subtotal + SHIPPING_FEE;

    const orderData = {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress: {},
      items: cart.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      subtotal,
      total,
      stripePaymentId: ''
    };

    const order = await createOrder(orderData);

    alert(`Order created successfully!\nOrder Number: ${order.order_number}\n\nYou will be contacted shortly for payment and delivery details via WhatsApp.`);

    const whatsappMessage = encodeURIComponent(
      `New Order: ${order.order_number}\n\nCustomer: ${customerName}\nEmail: ${customerEmail}\nPhone: ${customerPhone}\nTotal: ${formatCurrency(total)}\n\nItems:\n${cart.map(item => `- ${item.name} x${item.quantity} (${formatCurrency(item.price * item.quantity)})`).join('\n')}\n\nPlease confirm this order.`
    );

    clearCart();
    closeCheckoutModal();

    window.open(`https://wa.me/2348143372835?text=${whatsappMessage}`, '_blank');

    setTimeout(() => {
      window.location.href = '/shop.html';
    }, 1500);

  } catch (error) {
    console.error('Checkout error:', error);
    alert('There was an error processing your order. Please try again or contact us via WhatsApp.');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Proceed to Payment';
  }
}

if (proceedToCheckoutBtn) {
  proceedToCheckoutBtn.addEventListener('click', openCheckoutModal);
}

if (closeCheckoutModalBtn) {
  closeCheckoutModalBtn.addEventListener('click', closeCheckoutModal);
}

if (checkoutModal) {
  checkoutModal.addEventListener('click', (e) => {
    if (e.target === checkoutModal) {
      closeCheckoutModal();
    }
  });
}

if (quickCheckoutForm) {
  quickCheckoutForm.addEventListener('submit', handleCheckout);
}

window.addEventListener('cartUpdated', renderCartItems);

renderCartItems();
