import{f as d,a as y}from"./cart-DRHFGjFt.js";/* empty css             */import{g as f,a as v}from"./supabase-client-plvbIh6d.js";let l=[],r=[],n={categoryId:null,minPrice:null,maxPrice:null,inStock:!1};const h=new URLSearchParams(window.location.search),m=h.get("category");async function k(){const a=await f(),c=document.getElementById("categoryFilters");if(c.innerHTML=`
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
      `,m){const e=a.find(t=>t.slug===m);if(e){n.categoryId=e.id;const t=c.querySelector(`input[value="${e.id}"]`);t&&(t.checked=!0)}}}async function E(){l=await v(),s()}function s(){r=l.filter(a=>!(n.categoryId&&a.category_id!==n.categoryId||n.minPrice&&a.price<n.minPrice||n.maxPrice&&a.price>n.maxPrice||n.inStock&&!a.in_stock)),u()}function u(){const a=document.getElementById("productsGrid"),c=document.getElementById("resultsCount");if(c.textContent=`${r.length} ${r.length===1?"product":"products"}`,r.length===0){a.innerHTML=`
          <div class="no-products">
            <p>No products found matching your filters.</p>
            <button class="btn btn-primary" id="resetFilters">Clear All Filters</button>
          </div>
        `,document.getElementById("resetFilters")?.addEventListener("click",g);return}a.innerHTML=r.map(e=>{const t=e.compare_at_price&&e.compare_at_price>e.price,i=e.main_image&&e.main_image.trim()!==""?e.main_image:e.gallery_images&&e.gallery_images.length>0?e.gallery_images[0]:"https://images.pexels.com/photos/3993324/pexels-photo-3993324.jpeg";return`
          <div class="product-card">
            <div class="product-image-wrapper">
              <a href="/product.html?slug=${e.slug}">
                <img src="${i}" alt="${e.name}" class="product-image">
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
                <span class="current-price">${d(e.price)}</span>
                ${t?`<span class="original-price">${d(e.compare_at_price)}</span>`:""}
              </div>
            </div>
          </div>
        `}).join(""),document.querySelectorAll(".product-quick-add").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const i=e.dataset.id,o=l.find(p=>p.id===i);o&&(y(o),e.textContent="Added!",setTimeout(()=>{e.textContent="Add to Cart"},2e3))})})}function g(){n={categoryId:null,minPrice:null,maxPrice:null,inStock:!1},document.querySelector('input[name="category"][value=""]').checked=!0,document.getElementById("minPrice").value="",document.getElementById("maxPrice").value="",document.getElementById("inStockFilter").checked=!1,s()}document.getElementById("applyFilters").addEventListener("click",()=>{const a=document.querySelector('input[name="category"]:checked')?.value;n.categoryId=a||null,n.minPrice=parseFloat(document.getElementById("minPrice").value)||null,n.maxPrice=parseFloat(document.getElementById("maxPrice").value)||null,n.inStock=document.getElementById("inStockFilter").checked,s(),window.innerWidth<=1024&&document.getElementById("shopFilters").classList.remove("active")});document.getElementById("clearFilters").addEventListener("click",g);document.getElementById("sortSelect").addEventListener("change",a=>{switch(a.target.value){case"price-low":r.sort((e,t)=>e.price-t.price);break;case"price-high":r.sort((e,t)=>t.price-e.price);break;case"name":r.sort((e,t)=>e.name.localeCompare(t.name));break;default:r.sort((e,t)=>new Date(t.created_at)-new Date(e.created_at))}u()});document.getElementById("mobileFilterToggle").addEventListener("click",()=>{document.getElementById("shopFilters").classList.add("active"),document.getElementById("filterClose").style.display="block"});document.getElementById("filterClose").addEventListener("click",()=>{document.getElementById("shopFilters").classList.remove("active")});await k();await E();
