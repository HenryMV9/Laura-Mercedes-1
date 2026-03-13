import{g as y,b as $,c as P,u as q,r as T}from"./cart-DaXgv_wZ.js";import{c as S}from"./supabase-client-D2vQk3vi.js";import{f as r,i as M,c as A}from"./currency-selector-D4CMqF52.js";const b=document.getElementById("cartItems"),C=document.getElementById("subtotal"),E=document.getElementById("total"),n=document.getElementById("proceedToCheckout"),l=document.getElementById("checkoutModal"),I=document.getElementById("closeCheckoutModal"),p=document.getElementById("quickCheckoutForm"),k=document.getElementById("modalSubtotal"),w=document.getElementById("modalTotal"),B=5e3;function d(){const t=y();if(t.length===0){b.innerHTML=`
      <div class="cart-empty">
        <h2>Your cart is currently empty</h2>
        <p>Explore our collections and find your perfect hair and beauty products.</p>
        <a href="/shop.html" class="btn btn-gold">Continue Shopping</a>
      </div>
    `,h(),n&&(n.setAttribute("disabled","true"),n.style.opacity="0.5",n.style.cursor="not-allowed");return}b.innerHTML=t.map(e=>`
    <div class="cart-item" data-product-id="${e.id}">
      <img src="${e.image}" alt="${e.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h3 class="cart-item-name">${e.name}</h3>
        <p class="cart-item-price">${r(e.price)}</p>
      </div>
      <div class="cart-item-quantity">
        <button class="qty-btn" data-action="decrease" data-id="${e.id}">-</button>
        <input type="number" value="${e.quantity}" min="1" class="qty-input" data-id="${e.id}">
        <button class="qty-btn" data-action="increase" data-id="${e.id}">+</button>
      </div>
      <div class="cart-item-total">
        ${r(e.price*e.quantity)}
      </div>
      <button class="cart-item-remove" data-id="${e.id}">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  `).join(""),h(),n&&(n.removeAttribute("disabled"),n.style.opacity="1",n.style.cursor="pointer"),F()}function h(){const t=$(),e=t;C&&(C.textContent=r(t)),E&&(E.textContent=r(e)),k&&(k.textContent=r(t)),w&&(w.textContent=r(t+B))}function F(){document.querySelectorAll(".qty-btn").forEach(t=>{t.addEventListener("click",N)}),document.querySelectorAll(".qty-input").forEach(t=>{t.addEventListener("change",Q)}),document.querySelectorAll(".cart-item-remove").forEach(t=>{t.addEventListener("click",D)})}function N(t){const e=t.target.dataset.id,o=t.target.dataset.action,c=y().find(s=>s.id===e);if(!c)return;const i=o==="increase"?c.quantity+1:c.quantity-1;i>0&&(q(e,i),d())}function Q(t){const e=t.target.dataset.id,o=parseInt(t.target.value)||1;o>0&&(q(e,o),d())}function D(t){const e=t.currentTarget.dataset.id;T(e),d()}function H(){y().length!==0&&(h(),l.classList.add("active"),document.body.style.overflow="hidden")}function f(){l.classList.remove("active"),document.body.style.overflow=""}async function O(t){t.preventDefault();const e=y();if(e.length===0){alert("Your cart is empty");return}const o=new FormData(p),u=o.get("customerName"),c=o.get("customerEmail"),i=o.get("customerPhone");if(!u||!c||!i){alert("Please fill in all required fields");return}const s=document.getElementById("proceedToPayment");s.disabled=!0,s.textContent="Processing...";try{const m=$(),g=m+B,x={customerName:u,customerEmail:c,customerPhone:i,shippingAddress:{},items:e.map(a=>({productId:a.id,name:a.name,price:a.price,quantity:a.quantity})),subtotal:m,total:g,stripePaymentId:""},v=await S(x);alert(`Order created successfully!
Order Number: ${v.order_number}

You will be contacted shortly for payment and delivery details via WhatsApp.`);const L=encodeURIComponent(`New Order: ${v.order_number}

Customer: ${u}
Email: ${c}
Phone: ${i}
Total: ${r(g)}

Items:
${e.map(a=>`- ${a.name} x${a.quantity} (${r(a.price*a.quantity)})`).join(`
`)}

Please confirm this order.`);P(),f(),window.open(`https://wa.me/2348143372835?text=${L}`,"_blank"),setTimeout(()=>{window.location.href="/shop.html"},1500)}catch(m){console.error("Checkout error:",m),alert("There was an error processing your order. Please try again or contact us via WhatsApp."),s.disabled=!1,s.textContent="Proceed to Payment"}}n&&n.addEventListener("click",H);I&&I.addEventListener("click",f);l&&l.addEventListener("click",t=>{t.target===l&&f()});p&&p.addEventListener("submit",O);window.addEventListener("cartUpdated",d);async function _(){await M();const t=document.getElementById("currencySelector");if(t){const e=A(()=>{d()});t.innerHTML="",t.appendChild(e)}d()}_();
