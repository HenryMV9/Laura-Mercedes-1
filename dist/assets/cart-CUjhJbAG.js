import{g as y,b as w,f as r,c as P,u as q,r as T}from"./cart-DRHFGjFt.js";import{c as M}from"./supabase-client-plvbIh6d.js";const b=document.getElementById("cartItems"),C=document.getElementById("subtotal"),E=document.getElementById("total"),n=document.getElementById("proceedToCheckout"),d=document.getElementById("checkoutModal"),I=document.getElementById("closeCheckoutModal"),p=document.getElementById("quickCheckoutForm"),k=document.getElementById("modalSubtotal"),$=document.getElementById("modalTotal"),x=5e3;function l(){const t=y();if(t.length===0){b.innerHTML=`
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
  `).join(""),h(),n&&(n.removeAttribute("disabled"),n.style.opacity="1",n.style.cursor="pointer"),A()}function h(){const t=w(),e=t;C&&(C.textContent=r(t)),E&&(E.textContent=r(e)),k&&(k.textContent=r(t)),$&&($.textContent=r(t+x))}function A(){document.querySelectorAll(".qty-btn").forEach(t=>{t.addEventListener("click",S)}),document.querySelectorAll(".qty-input").forEach(t=>{t.addEventListener("change",F)}),document.querySelectorAll(".cart-item-remove").forEach(t=>{t.addEventListener("click",N)})}function S(t){const e=t.target.dataset.id,o=t.target.dataset.action,c=y().find(i=>i.id===e);if(!c)return;const s=o==="increase"?c.quantity+1:c.quantity-1;s>0&&(q(e,s),l())}function F(t){const e=t.target.dataset.id,o=parseInt(t.target.value)||1;o>0&&(q(e,o),l())}function N(t){const e=t.currentTarget.dataset.id;T(e),l()}function Q(){y().length!==0&&(h(),d.classList.add("active"),document.body.style.overflow="hidden")}function f(){d.classList.remove("active"),document.body.style.overflow=""}async function D(t){t.preventDefault();const e=y();if(e.length===0){alert("Your cart is empty");return}const o=new FormData(p),u=o.get("customerName"),c=o.get("customerEmail"),s=o.get("customerPhone");if(!u||!c||!s){alert("Please fill in all required fields");return}const i=document.getElementById("proceedToPayment");i.disabled=!0,i.textContent="Processing...";try{const m=w(),g=m+x,B={customerName:u,customerEmail:c,customerPhone:s,shippingAddress:{},items:e.map(a=>({productId:a.id,name:a.name,price:a.price,quantity:a.quantity})),subtotal:m,total:g,stripePaymentId:""},v=await M(B);alert(`Order created successfully!
Order Number: ${v.order_number}

You will be contacted shortly for payment and delivery details via WhatsApp.`);const L=encodeURIComponent(`New Order: ${v.order_number}

Customer: ${u}
Email: ${c}
Phone: ${s}
Total: ${r(g)}

Items:
${e.map(a=>`- ${a.name} x${a.quantity} (${r(a.price*a.quantity)})`).join(`
`)}

Please confirm this order.`);P(),f(),window.open(`https://wa.me/2348143372835?text=${L}`,"_blank"),setTimeout(()=>{window.location.href="/shop.html"},1500)}catch(m){console.error("Checkout error:",m),alert("There was an error processing your order. Please try again or contact us via WhatsApp."),i.disabled=!1,i.textContent="Proceed to Payment"}}n&&n.addEventListener("click",Q);I&&I.addEventListener("click",f);d&&d.addEventListener("click",t=>{t.target===d&&f()});p&&p.addEventListener("submit",D);window.addEventListener("cartUpdated",l);l();
