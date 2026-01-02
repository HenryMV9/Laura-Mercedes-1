import{f as c,a as p}from"./cart-CPXUeT1p.js";/* empty css             */import{b as u,a as m}from"./supabase-client-plvbIh6d.js";const v=new URLSearchParams(window.location.search),d=v.get("slug");async function g(){if(!d){document.getElementById("productContent").innerHTML=`
          <div style="text-align: center; padding: 50px 0;">
            <p>Product not found.</p>
            <a href="/shop.html" class="btn btn-primary">Return to Shop</a>
          </div>
        `;return}const a=await u(d);if(!a){document.getElementById("productContent").innerHTML=`
          <div style="text-align: center; padding: 50px 0;">
            <p>Product not found.</p>
            <a href="/shop.html" class="btn btn-primary">Return to Shop</a>
          </div>
        `;return}document.title=`${a.name} - Luxury Atelier`;const s=[a.main_image,...a.gallery_images||[]].filter(t=>t&&t.trim()!==""),r=a.compare_at_price&&a.compare_at_price>a.price,i=r?Math.round((1-a.price/a.compare_at_price)*100):0;if(document.getElementById("productContent").innerHTML=`
        <div class="product-breadcrumb">
          <a href="/">Home</a> /
          <a href="/shop.html">Shop</a> /
          <a href="/shop.html?category=${a.categories?.slug||""}">${a.categories?.name||"Products"}</a> /
          <span>${a.name}</span>
        </div>

        <div class="product-container">
          <div class="product-gallery">
            <div class="main-image-wrapper">
              <img src="${s.length>0?s[0]:"https://images.pexels.com/photos/3993324/pexels-photo-3993324.jpeg"}" alt="${a.name}" class="main-image" id="mainImage">
            </div>
            ${s.length>0?`
              <div class="gallery-thumbnails">
                ${s.map((t,n)=>`
                  <div class="thumbnail ${n===0?"active":""}" data-image="${t}">
                    <img src="${t}" alt="${a.name}">
                  </div>
                `).join("")}
              </div>
            `:""}
          </div>

          <div class="product-details">
            <h1 class="product-title">${a.name}</h1>

            <div class="product-price-section">
              <span class="product-current-price">${c(a.price)}</span>
              ${r?`
                <span class="product-original-price">${c(a.compare_at_price)}</span>
                <span class="product-savings">Save ${i}%</span>
              `:""}
            </div>

            <div class="product-status">
              <span class="status-dot ${a.in_stock?"":"out-of-stock"}"></span>
              <span>${a.in_stock?"In Stock":"Out of Stock"}</span>
            </div>

            <div class="product-description">
              <h3>Description</h3>
              <p>${a.description||"No description available."}</p>
            </div>

            ${a.in_stock?`
              <div class="quantity-selector">
                <span class="quantity-label">Quantity:</span>
                <div class="quantity-controls">
                  <button class="quantity-btn" id="decreaseQty">−</button>
                  <input type="number" class="quantity-input" id="quantityInput" value="1" min="1" max="10">
                  <button class="quantity-btn" id="increaseQty">+</button>
                </div>
              </div>

              <div class="product-actions">
                <button class="btn btn-primary add-to-cart-btn" id="addToCartBtn">
                  Add to Cart
                </button>
                <a href="https://wa.me/2348143372835?text=${encodeURIComponent(`Hi, I'm interested in: ${a.name}`)}"
                   class="whatsapp-inquiry-btn" target="_blank">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Inquire
                </a>
              </div>
            `:`
              <div class="product-actions">
                <a href="https://wa.me/2348143372835?text=${encodeURIComponent(`Hi, when will "${a.name}" be back in stock?`)}"
                   class="btn btn-gold" target="_blank" style="flex: 1; text-align: center;">
                  Notify When Available
                </a>
              </div>
            `}

            <div class="product-meta">
              <div class="meta-item">
                <span class="meta-label">Category:</span>
                <span class="meta-value">${a.categories?.name||"Uncategorized"}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">SKU:</span>
                <span class="meta-value">${a.id.slice(0,8).toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>
      `,document.querySelectorAll(".thumbnail").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".thumbnail").forEach(n=>n.classList.remove("active")),t.classList.add("active"),document.getElementById("mainImage").src=t.dataset.image})}),a.in_stock){const t=document.getElementById("quantityInput"),n=document.getElementById("decreaseQty"),l=document.getElementById("increaseQty"),o=document.getElementById("addToCartBtn");n.addEventListener("click",()=>{const e=parseInt(t.value);e>1&&(t.value=e-1)}),l.addEventListener("click",()=>{const e=parseInt(t.value);e<10&&(t.value=e+1)}),t.addEventListener("input",()=>{let e=parseInt(t.value);(isNaN(e)||e<1)&&(e=1),e>10&&(e=10),t.value=e}),o.addEventListener("click",()=>{const e=parseInt(t.value);p(a,e),o.textContent="Added to Cart!",setTimeout(()=>{o.textContent="Add to Cart"},2e3)})}h(a.category_id,a.id)}async function h(a,s){const i=(await m({categoryId:a})).filter(t=>t.id!==s).slice(0,4);i.length!==0&&(document.getElementById("relatedSection").style.display="block",document.getElementById("relatedGrid").innerHTML=i.map(t=>{const n=t.compare_at_price&&t.compare_at_price>t.price;return`
          <div class="product-card">
            <div class="product-image-wrapper">
              <a href="/product.html?slug=${t.slug}">
                <img src="${t.main_image}" alt="${t.name}" class="product-image">
              </a>
            </div>
            <div class="product-info">
              <p class="product-category">${t.categories?.name||"Uncategorized"}</p>
              <h3 class="product-name">
                <a href="/product.html?slug=${t.slug}">${t.name}</a>
              </h3>
              <div class="product-price">
                <span class="current-price">${c(t.price)}</span>
                ${n?`<span class="original-price">${c(t.compare_at_price)}</span>`:""}
              </div>
            </div>
          </div>
        `}).join(""))}g();
