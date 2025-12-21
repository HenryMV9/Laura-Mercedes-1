import{g as m,c as p,f as c}from"./cart-CuCbkbA8.js";/* empty css             */import{c as u}from"./supabase-client-plvbIh6d.js";const y=document.getElementById("orderSummary"),l=document.getElementById("checkoutForm"),d=document.getElementById("placeOrderBtn");function h(){const s=m();if(s.length===0){window.location.href="/cart.html";return}const a=s.reduce((t,i)=>t+i.price*i.quantity,0),e=5e3,o=a+e;y.innerHTML=`
    ${s.map(t=>`
      <div class="order-item">
        <img src="${t.image}" alt="${t.name}" class="order-item-image">
        <div class="order-item-details">
          <p class="order-item-name">${t.name}</p>
          <p class="order-item-qty">Qty: ${t.quantity}</p>
        </div>
        <div class="order-item-price">${c(t.price*t.quantity)}</div>
      </div>
    `).join("")}

    <div class="summary-row">
      <span>Subtotal:</span>
      <span>${c(a)}</span>
    </div>
    <div class="summary-row">
      <span>Shipping:</span>
      <span>${c(e)}</span>
    </div>
    <div class="summary-row total">
      <span>Total:</span>
      <span>${c(o)}</span>
    </div>
  `}async function g(s){s.preventDefault();const a=m();if(a.length===0){alert("Your cart is empty");return}d.disabled=!0,d.textContent="Processing...";try{const e=new FormData(l),o={customerName:`${e.get("firstName")} ${e.get("lastName")}`,customerEmail:e.get("email"),customerPhone:e.get("phone"),shippingAddress:{address:e.get("address"),city:e.get("city"),state:e.get("state"),postalCode:e.get("postalCode")},items:a.map(r=>({productId:r.id,name:r.name,price:r.price,quantity:r.quantity})),subtotal:a.reduce((r,n)=>r+n.price*n.quantity,0),total:a.reduce((r,n)=>r+n.price*n.quantity,0)+5e3,stripePaymentId:""},t=await u(o);p(),alert(`Order placed successfully! Order number: ${t.order_number}

You will receive a confirmation via WhatsApp shortly.`);const i=encodeURIComponent(`New Order: ${t.order_number}

Customer: ${o.customerName}
Phone: ${o.customerPhone}
Total: ${c(o.total)}

Please confirm this order.`);window.open(`https://wa.me/2348143372835?text=${i}`,"_blank"),setTimeout(()=>{window.location.href="/shop.html"},2e3)}catch(e){console.error("Checkout error:",e),alert("There was an error processing your order. Please try again or contact us via WhatsApp."),d.disabled=!1,d.textContent="Place Order"}}l.addEventListener("submit",g);h();
