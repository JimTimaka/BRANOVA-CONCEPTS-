const products = [
  {name:"Business Cards",category:"Printing",price:"From UGX 25,000",image:"assets/images/products/business-cards.jpg"},
  {name:"Flyers & Brochures",category:"Printing",price:"From UGX 50,000",image:"assets/images/products/flyers-brochures.jpg"},
  {name:"Notebooks & Diaries",category:"Stationery",price:"From UGX 8,000",image:"assets/images/products/notebooks-diaries.jpg"},
  {name:"Branded Pens",category:"Promotional",price:"From UGX 1,500",image:"assets/images/products/branded-pens.jpg"},
  {name:"Mugs",category:"Promotional",price:"From UGX 18,000",image:"assets/images/products/mugs.jpg"},
  {name:"T-Shirts & Apparel",category:"Promotional",price:"From UGX 25,000",image:"assets/images/products/tshirts-apparel.jpg"},
  {name:"Pull-Up Banners",category:"Branding",price:"From UGX 180,000",image:"assets/images/products/pullup-banners.jpg"},
  {name:"Vinyl Banners & Signage",category:"Branding",price:"Request Quote",image:"assets/images/products/vinyl-banners-signage.jpg"},
  {name:"Vehicle Branding",category:"Branding",price:"Request Quote",image:"assets/images/products/vehicle-branding.jpg"},
  {name:"Event Backdrops",category:"Branding",price:"Request Quote",image:"assets/images/products/event-backdrops.jpg"},
  {name:"Branded Umbrellas",category:"Promotional",price:"Request Quote",image:"assets/images/products/branded-umbrellas.jpg"},
  {name:"Corporate Gifts",category:"Promotional",price:"Request Quote",image:"assets/images/products/corporate-gifts.jpg"},
  {name:"Packaging & Labels",category:"Packaging",price:"Request Quote",image:"assets/images/products/packaging-labels.jpg"},
  {name:"Stamps & Office Supplies",category:"Stationery",price:"Request Quote",image:"assets/images/products/stamps-office-supplies.jpg"},
  {name:"Large Format Printing",category:"Printing",price:"Request Quote",image:"assets/images/products/large-format-printing.jpg"}
];

let cart=[];

function renderProducts(list=products){
  const grid=document.getElementById("productGrid");
  if(!list.length){grid.innerHTML='<p style="grid-column:1/-1;text-align:center;color:var(--muted);padding:30px">No products found. Try another search or request a custom quote.</p>';return}
  grid.innerHTML=list.map((p,i)=>`
    <article class="product">
      <div class="product-img"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
      <div class="product-body">
        <div class="product-category">${p.category}</div>
        <h3>${p.name}</h3>
        <div class="product-price">${p.price} <small>• customisable</small></div>
        <div class="product-actions">
          <button class="btn btn-primary" onclick="addToCart(${products.indexOf(p)})">Add to Cart</button>
          <button class="btn btn-outline" onclick="openQuote('${p.name}')">Quote</button>
        </div>
      </div>
    </article>`).join("");
}

function filterProducts(){
  const q=document.getElementById("searchInput").value.toLowerCase().trim();
  renderProducts(products.filter(p=>(p.name+" "+p.category).toLowerCase().includes(q)));
}
function showCategory(category){
  document.getElementById("searchInput").value=category;
  filterProducts();
  document.getElementById("shop").scrollIntoView({behavior:"smooth"});
}
function addToCart(index){
  const p=products[index];
  const found=cart.find(x=>x.name===p.name);
  if(found) found.qty++;
  else cart.push({...p,qty:1});
  updateCart();
}
function updateCart(){
  document.getElementById("cartCount").textContent=cart.reduce((s,p)=>s+p.qty,0);
  const el=document.getElementById("cartItems");
  if(!cart.length){el.innerHTML='<div class="empty">Your cart is empty.<br>Add a product to get started.</div>';document.getElementById("cartTotal").textContent="UGX 0";return}
  el.innerHTML=cart.map((p,i)=>`<div class="cart-item"><div><strong>${p.name}</strong><small>${p.category} • Qty ${p.qty}</small></div><button class="btn btn-outline" onclick="removeItem(${i})" style="padding:6px 9px">Remove</button></div>`).join("");
  document.getElementById("cartTotal").textContent="Quotation required";
}
function removeItem(i){cart.splice(i,1);updateCart()}
function openCart(){document.getElementById("cartPanel").classList.add("open");document.getElementById("cartOverlay").classList.add("active")}
function closeCart(){document.getElementById("cartPanel").classList.remove("open");document.getElementById("cartOverlay").classList.remove("active")}
function checkout(){
  if(!cart.length){alert("Your cart is empty.");return}
  const items=cart.map(p=>`${p.name} x${p.qty}`).join(", ");
  document.getElementById("qDetails").value=`Order enquiry: ${items}\n\nPlease provide your best quotation.`;
  closeCart();openQuote();
}
function openQuote(product=""){
  document.getElementById("quoteModal").classList.add("active");
  if(product)document.getElementById("qProduct").value=product;
}
function closeQuote(){document.getElementById("quoteModal").classList.remove("active")}
function submitQuote(e){
  e.preventDefault();
  const name=document.getElementById("qName").value;
  const phone=document.getElementById("qPhone").value;
  const product=document.getElementById("qProduct").value;
  const details=document.getElementById("qDetails").value;
  const message=`Hello Branova Concepts. I would like a quotation.%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AProduct: ${encodeURIComponent(product)}%0ADetails: ${encodeURIComponent(details)}`;
  /* The first Branova WhatsApp number is used for quote requests. */
  window.open(`https://wa.me/256752357618?text=${message}`,"_blank");
  closeQuote();
}
function toggleMobile(){alert("For the production version, this button can open a full mobile navigation menu.")}

function startProductRails(){
  document.querySelectorAll('.product-rail').forEach((rail,railIndex)=>{
    const cards=[...rail.querySelectorAll('.rail-card')];
    const dots=[...rail.querySelectorAll('.rail-dot')];
    let i=0;
    setInterval(()=>{
      cards[i].classList.remove('active'); dots[i].classList.remove('active');
      i=(i+1)%cards.length;
      cards[i].classList.add('active'); dots[i].classList.add('active');
    }, 3200 + railIndex*500);
  });
}
startProductRails();

renderProducts();updateCart();