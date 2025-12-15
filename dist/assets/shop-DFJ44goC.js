import{f as o,a as y}from"./cart-CuCbkbA8.js";/* empty css             */import{g as f,a as v}from"./supabase-client-plvbIh6d.js";let i=[],n=[],r={categoryId:null,minPrice:null,maxPrice:null,inStock:!1};const h=new URLSearchParams(window.location.search),d=h.get("category");async function k(){const a=await f(),c=document.getElementById("categoryFilters");if(c.innerHTML=`
        <label class="filter-option">
          <input type="radio" name="category" value="" checked>
          <span>All Products</span>
        </label>
        ${a.map(e=>`
          <label class="filter-option">
            <input type="radio" name="category" value="${e.id}">
            <span>${e.name}</span>
          </label>
        `).join("")}
      `,d){const e=a.find(t=>t.slug===d);if(e){r.categoryId=e.id;const t=c.querySelector(`input[value="${e.id}"]`);t&&(t.checked=!0)}}}async function E(){i=await v(),l()}function l(){n=i.filter(a=>!(r.categoryId&&a.category_id!==r.categoryId||r.minPrice&&a.price<r.minPrice||r.maxPrice&&a.price>r.maxPrice||r.inStock&&!a.in_stock)),u()}function u(){const a=document.getElementById("productsGrid"),c=document.getElementById("resultsCount");if(c.textContent=`${n.length} ${n.length===1?"product":"products"}`,n.length===0){a.innerHTML=`
          <div class="no-products">
            <p>No products found matching your filters.</p>
            <button class="btn btn-primary" id="resetFilters">Clear All Filters</button>
          </div>
        `,document.getElementById("resetFilters")?.addEventListener("click",m);return}a.innerHTML=n.map(e=>{const t=e.compare_at_price&&e.compare_at_price>e.price;return`
          <div class="product-card">
            <div class="product-image-wrapper">
              <a href="/product.html?slug=${e.slug}">
                <img src="${e.main_image}" alt="${e.name}" class="product-image">
              </a>
              ${e.featured?'<span class="product-badge">Featured</span>':""}
              ${e.in_stock?"":'<span class="product-badge" style="background: var(--color-gray-600);">Sold Out</span>'}
              ${e.in_stock?`<button class="product-quick-add" data-id="${e.id}">Add to Cart</button>`:""}
            </div>
            <div class="product-info">
              <p class="product-category">${e.categories?.name||"Uncategorized"}</p>
              <h3 class="product-name">
                <a href="/product.html?slug=${e.slug}">${e.name}</a>
              </h3>
              <div class="product-price">
                <span class="current-price">${o(e.price)}</span>
                ${t?`<span class="original-price">${o(e.compare_at_price)}</span>`:""}
              </div>
            </div>
          </div>
        `}).join(""),document.querySelectorAll(".product-quick-add").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const g=e.dataset.id,s=i.find(p=>p.id===g);s&&(y(s),e.textContent="Added!",setTimeout(()=>{e.textContent="Add to Cart"},2e3))})})}function m(){r={categoryId:null,minPrice:null,maxPrice:null,inStock:!1},document.querySelector('input[name="category"][value=""]').checked=!0,document.getElementById("minPrice").value="",document.getElementById("maxPrice").value="",document.getElementById("inStockFilter").checked=!1,l()}document.getElementById("applyFilters").addEventListener("click",()=>{const a=document.querySelector('input[name="category"]:checked')?.value;r.categoryId=a||null,r.minPrice=parseFloat(document.getElementById("minPrice").value)||null,r.maxPrice=parseFloat(document.getElementById("maxPrice").value)||null,r.inStock=document.getElementById("inStockFilter").checked,l(),window.innerWidth<=1024&&document.getElementById("shopFilters").classList.remove("active")});document.getElementById("clearFilters").addEventListener("click",m);document.getElementById("sortSelect").addEventListener("change",a=>{switch(a.target.value){case"price-low":n.sort((e,t)=>e.price-t.price);break;case"price-high":n.sort((e,t)=>t.price-e.price);break;case"name":n.sort((e,t)=>e.name.localeCompare(t.name));break;default:n.sort((e,t)=>new Date(t.created_at)-new Date(e.created_at))}u()});document.getElementById("mobileFilterToggle").addEventListener("click",()=>{document.getElementById("shopFilters").classList.add("active"),document.getElementById("filterClose").style.display="block"});document.getElementById("filterClose").addEventListener("click",()=>{document.getElementById("shopFilters").classList.remove("active")});await k();await E();
