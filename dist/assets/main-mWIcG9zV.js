import"./cart-CPXUeT1p.js";import{g as d}from"./supabase-client-plvbIh6d.js";let n=0;const s=document.querySelectorAll(".slide"),u=document.querySelector(".slideshow-dots");s.forEach((e,o)=>{const t=document.createElement("button");t.classList.add("slideshow-dot"),o===0&&t.classList.add("active"),t.addEventListener("click",()=>m(o)),u.appendChild(t)});function c(e){s.forEach(o=>o.classList.remove("active")),document.querySelectorAll(".slideshow-dot").forEach(o=>o.classList.remove("active")),n=(e+s.length)%s.length,s[n].classList.add("active"),document.querySelectorAll(".slideshow-dot")[n].classList.add("active")}function m(e){c(e)}function r(){c(n+1)}function p(){c(n-1)}document.querySelector(".slideshow-nav.next").addEventListener("click",r);document.querySelector(".slideshow-nav.prev").addEventListener("click",p);setInterval(r,5e3);async function h(){const e=document.getElementById("collectionsGrid"),o=await d();if(o.length===0){e.innerHTML='<p style="text-align: center;">No collections available at the moment.</p>';return}e.innerHTML=o.map(t=>`
        <a href="/shop.html?category=${t.slug}" class="collection-card">
          <img src="${t.image_url||"https://images.pexels.com/photos/3993324/pexels-photo-3993324.jpeg"}"
               alt="${t.name}"
               class="collection-image">
          <div class="collection-overlay">
            <h3 class="collection-name">${t.name}</h3>
            <p class="collection-description">${t.description}</p>
            <span class="collection-link">Shop Now →</span>
          </div>
        </a>
      `).join("")}const l=document.getElementById("newsletterPopup"),v=document.getElementById("openNewsletterBtn"),w=document.getElementById("closeNewsletterBtn"),g=document.getElementById("newsletterForm");function a(){l.classList.add("active"),document.body.style.overflow="hidden"}function i(){l.classList.remove("active"),document.body.style.overflow=""}v.addEventListener("click",a);w.addEventListener("click",i);l.addEventListener("click",e=>{e.target===l&&i()});g.addEventListener("submit",e=>{e.preventDefault(),e.target.querySelector("input").value,alert("Thank you for subscribing! You will receive exclusive updates."),e.target.reset(),i()});setTimeout(()=>{sessionStorage.getItem("newsletterPopupShown")||(a(),sessionStorage.setItem("newsletterPopupShown","true"))},3e3);h();
