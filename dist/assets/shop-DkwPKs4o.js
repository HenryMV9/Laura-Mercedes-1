import{f as m,a as f}from"./cart-CPXUeT1p.js";/* empty css             */import{g as v,a as h}from"./supabase-client-plvbIh6d.js";let l=[],r=[],n={categoryId:null,minPrice:null,maxPrice:null,inStock:!1};const k=new URLSearchParams(window.location.search),u=k.get("category");async function E(){const a=await v(),c=document.getElementById("categoryFilters");if(c.innerHTML=`
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
      `,u){const e=a.find(t=>t.slug===u);if(e){n.categoryId=e.id;const t=c.querySelector(`input[value="${e.id}"]`);t&&(t.checked=!0)}}}async function I(){l=await h(),s()}function s(){r=l.filter(a=>!(n.categoryId&&a.category_id!==n.categoryId||n.minPrice&&a.price<n.minPrice||n.maxPrice&&a.price>n.maxPrice||n.inStock&&!a.in_stock)),g()}function g(){const a=document.getElementById("productsGrid"),c=document.getElementById("resultsCount");if(c.textContent=`${r.length} ${r.length===1?"product":"products"}`,r.length===0){a.innerHTML=`
          <div class="no-products">
            <p>No products found matching your filters.</p>
            <button class="btn btn-primary" id="resetFilters">Clear All Filters</button>
          </div>
        `,document.getElementById("resetFilters")?.addEventListener("click",p);return}a.innerHTML=r.map(e=>{const t=e.compare_at_price&&e.compare_at_price>e.price,i=e.main_image&&e.main_image.trim()!==""?e.main_image:e.gallery_images&&e.gallery_images.length>0?e.gallery_images[0]:"https://images.pexels.com/photos/3993324/pexels-photo-3993324.jpeg";return`
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
                <span class="current-price">${m(e.price)}</span>
                ${t?`<span class="original-price">${m(e.compare_at_price)}</span>`:""}
              </div>
            </div>
          </div>
        `}).join(""),document.querySelectorAll(".product-quick-add").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const i=e.dataset.id,d=l.find(y=>y.id===i);d&&(f(d),e.textContent="Added!",setTimeout(()=>{e.textContent="Add to Cart"},2e3))})})}function p(){n={categoryId:null,minPrice:null,maxPrice:null,inStock:!1},document.querySelector('input[name="category"][value=""]').checked=!0,document.getElementById("minPrice").value="",document.getElementById("maxPrice").value="",document.getElementById("inStockFilter").checked=!1,s()}document.getElementById("applyFilters").addEventListener("click",()=>{const a=document.querySelector('input[name="category"]:checked')?.value;n.categoryId=a||null,n.minPrice=parseFloat(document.getElementById("minPrice").value)||null,n.maxPrice=parseFloat(document.getElementById("maxPrice").value)||null,n.inStock=document.getElementById("inStockFilter").checked,s(),window.innerWidth<=1024&&o()});document.getElementById("clearFilters").addEventListener("click",p);document.getElementById("sortSelect").addEventListener("change",a=>{switch(a.target.value){case"price-low":r.sort((e,t)=>e.price-t.price);break;case"price-high":r.sort((e,t)=>t.price-e.price);break;case"name":r.sort((e,t)=>e.name.localeCompare(t.name));break;default:r.sort((e,t)=>new Date(t.created_at)-new Date(e.created_at))}g()});document.getElementById("mobileFilterToggle").addEventListener("click",()=>{document.getElementById("shopFilters").classList.add("active"),document.getElementById("filtersBackdrop").classList.add("active"),document.getElementById("filterClose").style.display="block",document.body.style.overflow="hidden"});function o(){document.getElementById("shopFilters").classList.remove("active"),document.getElementById("filtersBackdrop").classList.remove("active"),document.body.style.overflow=""}document.getElementById("filterClose").addEventListener("click",o);document.getElementById("filtersBackdrop").addEventListener("click",o);await E();await I();
