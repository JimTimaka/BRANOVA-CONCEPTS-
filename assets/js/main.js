/* Branova storefront behaviour.
   Set window.BRANOVA_API_URL to the deployed Spring Boot base URL before this file loads
   to enable persistent API enquiries. Without it, enquiries can be sent to WhatsApp. */
const API_BASE_URL = window.BRANOVA_API_URL || "";
const WHATSAPP_NUMBER = "256752357618";
const products = [
  {id:"business-cards",name:"Business cards",category:"Printing",price:"From UGX 35,000",description:"Professional cards with your choice of stock and finish.",image:"assets/images/products/business-cards.jpg",badge:"Print essential"},
  {id:"flyers-brochures",name:"Flyers & brochures",category:"Printing",price:"From UGX 1,500",description:"Promote services, products, campaigns and events.",image:"assets/images/products/flyers-brochures.jpg",badge:"Popular"},
  {id:"large-format-printing",name:"Large-format printing",category:"Printing",price:"From UGX 25,000",description:"Large visual prints for indoor and outdoor use.",image:"assets/images/products/large-format-printing.jpg",badge:"Big impact"},
  {id:"pullup-banners",name:"Pull-up banners",category:"Branding",price:"From UGX 180,000",description:"Portable display systems for events and promotions.",image:"assets/images/products/pullup-banners.jpg",badge:"Event favourite"},
  {id:"vinyl-banners-signage",name:"Vinyl banners & signage",category:"Branding",price:"From UGX 25,000",description:"Custom banners, signs and branded display graphics.",image:"assets/images/products/vinyl-banners-signage.jpg",badge:"Custom made"},
  {id:"event-backdrops",name:"Event backdrops",category:"Branding",price:"From UGX 250,000",description:"Branded backgrounds for conferences, launches and events.",image:"assets/images/products/event-backdrops.jpg",badge:"For events"},
  {id:"printed-tablecloths",name:"Custom printed tablecloths",category:"Branding",price:"Quote on request",description:"Branded tablecloths for exhibitions, receptions and promotional events. Choose dimensions, fabric, full-colour artwork and coverage.",image:"assets/images/products/event-backdrops.jpg",badge:"Event tables"},
  {id:"fitted-table-covers",name:"Fitted table covers",category:"Branding",price:"Quote on request",description:"Tailored branded covers for event and display tables. Specify table measurements, corner fit, fabric and logo placement.",image:"assets/images/products/event-backdrops.jpg",badge:"Custom fit"},
  {id:"stretch-table-covers",name:"Stretch table covers",category:"Branding",price:"Quote on request",description:"Close-fitting stretch covers for professional exhibition tables. Request size, colour, branding and leg or foot style.",image:"assets/images/products/event-backdrops.jpg",badge:"Exhibition ready"},
  {id:"table-runners",name:"Branded table runners",category:"Branding",price:"Quote on request",description:"Custom logo table runners for conferences, pop-ups and presentation tables. Choose width, length, material and print placement.",image:"assets/images/products/event-backdrops.jpg",badge:"Event essential"},
  {id:"vehicle-branding",name:"Vehicle branding",category:"Branding",price:"From UGX 150,000",description:"Turn company vehicles into moving brand visibility.",image:"assets/images/products/vehicle-branding.jpg",badge:"On the move"},
  {id:"branded-pens",name:"Branded pens",category:"Promotional",price:"From UGX 2,500",description:"Useful promotional items for teams, clients and events.",image:"assets/images/products/branded-pens.jpg",badge:"Everyday brand"},
  {id:"mugs",name:"Branded mugs",category:"Promotional",price:"From UGX 18,000",description:"Custom mugs for corporate gifts and campaigns.",image:"assets/images/products/mugs.jpg",badge:"Gift idea"},
  {id:"tshirts-apparel",name:"T-shirts & apparel",category:"Promotional",price:"From UGX 25,000",description:"Branded wear for staff, teams, events and merchandise.",image:"assets/images/products/tshirts-apparel.jpg",badge:"Wear your brand"},
  {id:"branded-umbrellas",name:"Branded umbrellas",category:"Promotional",price:"From UGX 35,000",description:"Practical branded merchandise for all-weather visibility.",image:"assets/images/products/branded-umbrellas.jpg",badge:"Useful gifts"},
  {id:"corporate-gifts",name:"Corporate gifts",category:"Promotional",price:"From UGX 50,000",description:"Thoughtful gift sets and promotional merchandise.",image:"assets/images/products/corporate-gifts.jpg",badge:"Gift collections"},
  {id:"notebooks-diaries",name:"Notebooks & diaries",category:"Stationery",price:"From UGX 15,000",description:"Branded notebooks, diaries and writing materials.",image:"assets/images/products/notebooks-diaries.jpg",badge:"Office favourite"},
  {id:"stamps-office-supplies",name:"Stamps & office supplies",category:"Stationery",price:"From UGX 25,000",description:"Everyday stationery and office essentials for organisations.",image:"assets/images/products/stamps-office-supplies.jpg",badge:"Work essentials"},
  {id:"packaging-labels",name:"Packaging & labels",category:"Packaging",price:"From UGX 500",description:"Labels, stickers and packaging to present your product.",image:"assets/images/products/packaging-labels.jpg",badge:"Product ready"},
  {id:"general-supplies",name:"General supplies",category:"General Supplies",price:"Quote on request",description:"Tell us what your organisation needs, branded or not.",image:"assets/images/products/corporate-gifts.jpg",badge:"Source to order"}
];

/* Product detail catalogue: multiple images can be added to each product's images array.
   Existing single images remain the default until additional assets are published. */
const productDetails = {
  "business-cards":"Custom printed business cards for professionals and organisations. Specify card size, single- or double-sided printing, paper weight, finish, quantity and artwork.",
  "flyers-brochures":"Flyers, folded leaflets and brochures for promotions, product catalogues and company information. Choose page size, number of pages, paper stock, colour printing and finishing.",
  "large-format-printing":"Large-format posters, displays and graphics for indoor or outdoor use. Share the dimensions, material, finishing and installation requirements.",
  "pullup-banners":"Portable retractable display banners for exhibitions, receptions and conferences. Confirm stand size, print material, artwork and carrying case requirements.",
  "vinyl-banners-signage":"Custom vinyl banners and signage for shops, offices and events. Specify dimensions, weather resistance, mounting, finishing and installation.",
  "event-backdrops":"Branded stage and photo backdrops for conferences, activations and launches. Share the venue, backdrop dimensions, frame requirements and design.",
  "vehicle-branding":"Vehicle decals, graphics and wraps for fleet branding. Provide vehicle model, coverage area, design files and installation location.",
  "branded-pens":"Personalised ballpoint and executive pens for campaigns, staff and client gifts. Choose pen style, ink colour, logo placement, print method and quantity.",
  "mugs":"Personalised ceramic mugs for offices, campaigns and gifts. Choose mug colour, capacity, artwork, print area, packaging and quantity.",
  "tshirts-apparel":"Custom T-shirts, polo shirts and branded apparel for teams, uniforms and events. Select sizes, colours, fabric, logo positions and print or embroidery.",
  "branded-umbrellas":"Promotional umbrellas with custom logo printing. Specify umbrella type, panel colours, print positions and required quantity.",
  "corporate-gifts":"Tailored corporate gifts and merchandise sets for clients, staff and events. Choose items, packaging, personalisation and delivery requirements.",
  "notebooks-diaries":"Branded notebooks, diaries and journals for meetings, gifts and office use. Specify size, cover, page count, binding and logo finish.",
  "stamps-office-supplies":"Office stationery and custom stamps for everyday operations. Share required items, specifications, quantities and any branding needs.",
  "packaging-labels":"Custom product labels, stickers and packaging for retail and promotions. Specify sizes, material, adhesive, print finish and quantity.",
  "printed-tablecloths":"Custom printed tablecloths help brand exhibition stands, conference desks, sales booths and receptions. Share your table dimensions, preferred fabric, print coverage, artwork and quantity. Loose and draped styles can be requested.",
  "fitted-table-covers":"Fitted table covers are tailored to table dimensions for a clean branded appearance at trade shows and events. Specify table length, width and height, open or closed back, fabric, logo location and quantity.",
  "stretch-table-covers":"Stretch table covers provide a fitted look for promotional tables and exhibition stands. Specify table size, colour, printed panels, foot style, artwork and order quantity.",
  "table-runners":"Branded table runners are a flexible way to add your logo to event tables. Specify runner width and length, print area, fabric, edge finish and quantity.",
  "general-supplies":"Business and institutional supplies sourced to specification. Tell us the items, technical requirements, quantities and preferred delivery date."
};
products.forEach(p => { p.description = productDetails[p.id] || p.description; p.images = [p.image]; });
let currentProduct = null;
let currentImageIndex = 0;
const eventTableOptions = {
  "printed-tablecloths":["Loose / draped","Full print","Front logo only","Custom"],
  "fitted-table-covers":["Fitted closed back","Fitted open back","Custom"],
  "stretch-table-covers":["Stretch fitted","Stretch with foot pockets","Custom"],
  "table-runners":["Standard runner","Full-colour runner","Custom"]
};
const eventTableIds = Object.keys(eventTableOptions);
const detailStyles = document.createElement("style");
detailStyles.textContent = `
.product-image-open{display:block;width:100%;height:100%;padding:0;border:0;background:transparent;cursor:pointer}.product-image-open img{width:100%;height:100%;object-fit:cover}.product-view-link{background:none;border:0;padding:10px 0;color:#176b5b;font-size:11px;font-weight:800;text-align:left;cursor:pointer}.product-view-link:hover{text-decoration:underline}
.product-detail-overlay{position:fixed;inset:0;z-index:850;background:rgba(4,20,17,.72);display:none;align-items:center;justify-content:center;padding:18px}.product-detail-overlay.open{display:flex}.product-detail-panel{background:#fff;color:#19382e;border-radius:16px;max-width:940px;width:100%;max-height:94vh;overflow:auto;position:relative;padding:28px;box-shadow:0 24px 80px #0005}.product-detail-close{position:absolute;right:16px;top:12px;border:0;background:#f0f4f2;border-radius:50%;font-size:25px;width:38px;height:38px;cursor:pointer}.product-detail-layout{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:28px}.product-detail-main-image{width:100%;aspect-ratio:1;object-fit:contain;background:#f4f6f4;border-radius:12px}.product-detail-thumbs{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}.product-detail-thumbs button{width:66px;height:66px;border:2px solid #ddd;border-radius:7px;overflow:hidden;padding:0;background:white;cursor:pointer}.product-detail-thumbs button.selected{border-color:#146858}.product-detail-thumbs img{width:100%;height:100%;object-fit:cover}.product-detail-info h2{font-size:26px;margin:8px 35px 12px 0}.product-detail-info p{font-size:13px;line-height:1.65;margin:12px 0}.product-detail-info label{display:block;font-size:12px;font-weight:700;margin-top:14px}.product-detail-info input,.product-detail-info select,.product-detail-info textarea{display:block;width:100%;margin-top:6px;padding:11px;border:1px solid #ccd6d1;border-radius:7px;font:inherit}.product-detail-info textarea{min-height:78px;resize:vertical}.product-detail-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}.product-detail-actions button{padding:12px 15px;border:0;border-radius:7px;background:#123b32;color:#fff;font-weight:700;cursor:pointer}.product-detail-actions button.secondary{background:#e9f2ee;color:#123b32}.product-detail-hint{font-size:11px!important;color:#596e65}.product-detail-price{font-weight:800;color:#126250}@media(max-width:700px){.product-detail-panel{padding:20px}.product-detail-layout{grid-template-columns:1fr;gap:16px}.product-detail-main-image{max-height:290px}.product-detail-info h2{font-size:22px}}
`;
document.head.appendChild(detailStyles);
const detailOverlay = document.createElement("div");
detailOverlay.className = "product-detail-overlay";
detailOverlay.id = "productDetailOverlay";
detailOverlay.setAttribute("role","dialog");
detailOverlay.setAttribute("aria-modal","true");
detailOverlay.setAttribute("aria-label","Product details and quotation options");
document.body.appendChild(detailOverlay);
function openProductDetails(id) {
  const p = products.find(item => item.id === id);
  if (!p) return;
  currentProduct = p;
  currentImageIndex = 0;
  const images = (p.images && p.images.length ? p.images : [p.image]);
  detailOverlay.innerHTML = `<div class="product-detail-panel"><button class="product-detail-close" type="button" data-detail-close aria-label="Close product details">×</button><div class="product-detail-layout"><div><img class="product-detail-main-image" id="detailMainImage" src="${escapeHtml(images[0])}" alt="${escapeHtml(p.name)}"><div class="product-detail-thumbs">${images.map((src,i)=>`<button type="button" data-detail-image="${i}" class="${i===0?'selected':''}" aria-label="View image ${i+1}"><img src="${escapeHtml(src)}" alt="${escapeHtml(p.name)} image ${i+1}"></button>`).join("")}</div><p class="product-detail-hint">Additional views will appear when BRANOVA product photographs are uploaded. Event-table images are temporary category illustrations.</p></div><div class="product-detail-info"><small>${escapeHtml(p.category)}</small><h2>${escapeHtml(p.name)}</h2><p>${escapeHtml(p.description)}</p><p class="product-detail-price">${escapeHtml(p.price)}</p><p class="product-detail-hint">Indicative price only. Final cost and availability are confirmed by quotation.</p><form id="detailOrderForm"> ${eventTableIds.includes(p.id) ? `<label>Cover style<select id="detailStyle">${eventTableOptions[p.id].map(v=>`<option>${escapeHtml(v)}</option>`).join("")}</select></label><label>Table dimensions (length × width × height)<input id="detailDimensions" maxlength="100" placeholder="e.g. 180 × 75 × 75 cm"></label><label>Print coverage<select id="detailPrint"><option>Front logo</option><option>Full-colour all-over</option><option>Front and sides</option><option>Discuss options</option></select></label><label>Fabric / colour preference<input id="detailFabric" maxlength="120" placeholder="e.g. polyester, forest green"></label>` : ""}<label>Quantity required<input id="detailQuantity" type="number" min="1" step="1" value="1" required></label><label>Order urgency<select id="detailUrgency"><option value="Standard (3–7 days requested)">Standard — 3–7 days (requested)</option><option value="Express (subject to confirmation)">Express — priority request</option><option value="Flexible / discuss timing">Flexible / discuss timing</option></select></label><label>Preferred delivery date (optional)<input id="detailDate" type="date"></label><label>Customisation / specifications<textarea id="detailSpecs" maxlength="1000" placeholder="Colour, size, logo placement, material, delivery location…"></textarea></label><p class="product-detail-hint">Production and delivery times depend on product, quantity and artwork approval. Express service is not guaranteed until confirmed.</p><div class="product-detail-actions"><button type="submit">Request quotation on WhatsApp ↗</button><button type="button" class="secondary" id="detailAddBasket">Add quantity to basket</button></div></form></div></div></div>`;
  detailOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
  detailOverlay.querySelector("[data-detail-close]").focus();
}
function closeProductDetails() {
  detailOverlay.classList.remove("open");
  detailOverlay.innerHTML = "";
  currentProduct = null;
  document.body.style.overflow = "";
}
function productOrderDetails() {
  const quantity = Math.max(1,Math.floor(Number(document.getElementById("detailQuantity").value)||1));
  const urgency = document.getElementById("detailUrgency").value;
  const date = document.getElementById("detailDate").value;
  const specs = document.getElementById("detailSpecs").value.trim();
  const tableDetails = eventTableIds.includes(currentProduct?.id) ? [
    "Style: " + document.getElementById("detailStyle").value,
    "Table dimensions: " + (document.getElementById("detailDimensions").value.trim() || "To confirm"),
    "Print coverage: " + document.getElementById("detailPrint").value,
    "Fabric / colour: " + (document.getElementById("detailFabric").value.trim() || "To confirm")
  ].join("; ") : "";
  return {quantity,urgency,date,specs:[tableDetails,specs].filter(Boolean).join("; ")};
}
detailOverlay.addEventListener("click",event=>{
  if(event.target===detailOverlay || event.target.closest("[data-detail-close]")) {closeProductDetails();return;}
  const thumb=event.target.closest("[data-detail-image]");
  if(thumb && currentProduct) {
    currentImageIndex=Number(thumb.dataset.detailImage);
    document.getElementById("detailMainImage").src=currentProduct.images[currentImageIndex];
    detailOverlay.querySelectorAll("[data-detail-image]").forEach(b=>b.classList.toggle("selected",Number(b.dataset.detailImage)===currentImageIndex));
  }
  if(event.target.closest("#detailAddBasket") && currentProduct) {
    const order=productOrderDetails();
    const existing=basket.find(item=>item.id===currentProduct.id && item.urgency===order.urgency && item.specs===order.specs && item.date===order.date);
    if(existing) existing.quantity+=order.quantity;
    else basket.push({...currentProduct,quantity:order.quantity,urgency:order.urgency,date:order.date,specs:order.specs});
    renderBasket();
    closeProductDetails();
    openBasket();
  }
});
detailOverlay.addEventListener("submit",event=>{
  if(event.target.id!=="detailOrderForm" || !currentProduct)return;
  event.preventDefault();
  const order=productOrderDetails();
  const message=[`Hello Branova Concepts, please quote for ${currentProduct.name}.`,`Quantity: ${order.quantity}`,`Urgency: ${order.urgency}`,order.date?`Preferred date: ${order.date}`:"",order.specs?`Specifications: ${order.specs}`:"",`Indicative price: ${currentProduct.price}`,"Please confirm total price, availability and delivery timeline."].filter(Boolean).join("\n");
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,"_blank","noopener,noreferrer");
});
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&detailOverlay.classList.contains("open"))closeProductDetails();});

let activeCategory = "All";
let basket = [];
const $ = id => document.getElementById(id);

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
function renderProducts() {
  const query = ($("searchInput")?.value || "").trim().toLowerCase();
  const visible = products.filter(p => (activeCategory === "All" || p.category === activeCategory) &&
    (p.name + " " + p.category + " " + p.description).toLowerCase().includes(query));
  $("productGrid").innerHTML = visible.length ? visible.map(p => `
    <article class="product-card">
      <div class="product-photo"><button type="button" class="product-image-open" data-view="${p.id}" aria-label="View details and images for ${escapeHtml(p.name)}"><img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy"></button><span class="product-badge">${escapeHtml(p.badge)}</span></div>
      <div class="product-info"><span class="product-category">${escapeHtml(p.category)}</span><h3>${escapeHtml(p.name)}</h3>
        <p class="product-description">${escapeHtml(p.description)}</p><button type="button" class="product-view-link" data-view="${p.id}">View images, details & order options ↗</button>
        <div class="product-bottom"><span class="product-price">${escapeHtml(p.price)}<small>Indicative price · final quote varies by specifications</small></span><button class="add-product" data-add="${p.id}">+ Add to basket</button></div>
      </div>
    </article>`).join("") : '<div class="catalog-empty">No matching products found. Try another search or request a custom quotation.</div>';
}
function setCategory(category) {
  activeCategory = category;
  document.querySelectorAll(".filter-chip").forEach(button => button.classList.toggle("active", button.dataset.category === category));
  renderProducts();
}
function openQuote(product = "") {
  $("quoteModal").classList.add("open");
  document.body.style.overflow = "hidden";
  if (product) {
    const select = $("qProduct");
    const option = [...select.options].find(o => o.text.toLowerCase() === product.toLowerCase() || o.value.toLowerCase() === product.toLowerCase());
    select.value = option ? option.value : (product.length < 100 ? product : "General enquiry");
    if (!option && product !== "General enquiry") select.value = "General enquiry";
    $("qDetails").value = product === "General enquiry" ? "" : `Product/service: ${product}\n\nPlease provide a quotation for this request.`;
  }
  $("formFeedback").textContent = "";
  setTimeout(() => $("qName").focus(), 80);
}
function closeQuote() {
  $("quoteModal").classList.remove("open");
  document.body.style.overflow = "";
}
function openBasket() {
  $("basketDrawer").classList.add("open");
  $("basketBackdrop").classList.add("open");
  $("basketDrawer").setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeBasket() {
  $("basketDrawer").classList.remove("open");
  $("basketBackdrop").classList.remove("open");
  $("basketDrawer").setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
function addToBasket(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  const existing = basket.find(item => item.id === id && !item.urgency);
  if (existing) existing.quantity += 1;
  else basket.push({...product, quantity:1});
  renderBasket();
}
function changeQuantity(id, amount) {
  const item = basket.find(p => p.id === id);
  if (!item) return;
  item.quantity += amount;
  if (item.quantity <= 0) basket = basket.filter(p => p.id !== id);
  renderBasket();
}
function removeFromBasket(id) {
  basket = basket.filter(p => p.id !== id);
  renderBasket();
}
function renderBasket() {
  $("cartCount").textContent = basket.reduce((sum, item) => sum + item.quantity, 0);
  $("basketItems").innerHTML = basket.length ? basket.map(item => `
    <div class="basket-item"><div><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.category)} · ${escapeHtml(item.price)} · Final quotation required</small></div>
      <div class="qty-controls"><button aria-label="Decrease ${escapeHtml(item.name)} quantity" data-qty="-1" data-id="${item.id}">−</button><span>${item.quantity}</span><button aria-label="Increase ${escapeHtml(item.name)} quantity" data-qty="1" data-id="${item.id}">+</button></div>
      <button class="basket-remove" data-remove="${item.id}">Remove</button>
    </div>`).join("") : '<p class="basket-empty">Your basket is empty.<br>Add products to request a combined quotation.</p>';
}
function basketToQuote() {
  if (!basket.length) {
    $("basketItems").innerHTML = '<p class="basket-empty">Add at least one product first.</p>';
    return;
  }
  const details = basket.map(item => `• ${item.name}, quantity: ${item.quantity}, indicative price: ${item.price}${item.urgency ? ", urgency: "+item.urgency : ""}${item.date ? ", preferred date: "+item.date : ""}${item.specs ? ", specifications: "+item.specs : ""}`).join("\n");
  closeBasket();
  openQuote("General enquiry");
  $("qDetails").value = `Please quote for the following items:\n${details}\n\nPlease advise on available specifications, branding options, pricing and delivery.`;
}
function enquiryPayload() {
  const form = $("quoteForm");
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const email = String(data.get("email") || "").trim();
  const product = String(data.get("product") || "General enquiry").trim();
  const quantity = String(data.get("quantity") || "").trim();
  const deadline = String(data.get("deadline") || "").trim();
  const details = String(data.get("message") || "").trim();
  const parts = [`Product/service: ${product}`, quantity ? `Quantity: ${quantity}` : "", deadline ? `Required by: ${deadline}` : "", details].filter(Boolean);
  return {name, phone, email, product, message:parts.join("\n")};
}
function whatsappUrl(payload) {
  const message = [
    "Hello Branova Concepts, I would like a quotation.",
    "",
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    payload.email ? `Email: ${payload.email}` : "",
    payload.message
  ].filter(Boolean).join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
function sendWhatsApp() {
  const form = $("quoteForm");
  if (!form.reportValidity()) return;
  const payload = enquiryPayload();
  window.open(whatsappUrl(payload), "_blank", "noopener,noreferrer");
}
async function submitEnquiry(event) {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  const payload = enquiryPayload();
  const submitButton = $("submitQuote");
  const feedback = $("formFeedback");
  submitButton.disabled = true;
  submitButton.textContent = "Sending…";
  feedback.textContent = "";
  try {
    if (API_BASE_URL) {
      const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/api/enquiries`, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name:payload.name,phone:payload.phone,email:payload.email,message:payload.message})
      });
      if (!response.ok) throw new Error("The enquiry could not be saved.");
      feedback.textContent = "Your enquiry was received. Thank you, Branova will follow up.";
      $("quoteForm").reset();
      basket = [];
      renderBasket();
    } else {
      window.open(whatsappUrl(payload), "_blank", "noopener,noreferrer");
      feedback.textContent = "WhatsApp opened with your enquiry. Please send the prepared message to complete your request.";
    }
  } catch (error) {
    feedback.textContent = API_BASE_URL
      ? "The online service is unavailable right now. Choose “Send with WhatsApp” to send this enquiry instead."
      : "We could not open WhatsApp automatically. Please use the WhatsApp contact link on the page.";
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Send enquiry <span>↗</span>';
  }
}
function toggleMenu() {
  const open = $("mainNav").classList.toggle("open");
  $("menuToggle").setAttribute("aria-expanded", String(open));
  $("menuToggle").setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  $("menuToggle").textContent = open ? "×" : "☰";
}
document.addEventListener("click", event => {
  const view = event.target.closest("[data-view]");
  if (view) openProductDetails(view.dataset.view);
  const add = event.target.closest("[data-add]");
  if (add) addToBasket(add.dataset.add);
  const qty = event.target.closest("[data-qty]");
  if (qty) changeQuantity(qty.dataset.id, Number(qty.dataset.qty));
  const remove = event.target.closest("[data-remove]");
  if (remove) removeFromBasket(remove.dataset.remove);
  const quote = event.target.closest("[data-quote]");
  if (quote) { event.preventDefault(); openQuote(quote.dataset.quote); }
  const service = event.target.closest("[data-service]");
  if (service) { event.preventDefault(); setCategory(service.dataset.service); $("catalog").scrollIntoView({behavior:"smooth"}); }
  const filter = event.target.closest("[data-category]");
  if (filter) setCategory(filter.dataset.category);
  if (event.target.closest("#mainNav a")) {
    $("mainNav").classList.remove("open");
    $("menuToggle").setAttribute("aria-expanded","false");
    $("menuToggle").textContent = "☰";
  }
});
$("searchInput").addEventListener("input", renderProducts);
$("menuToggle").addEventListener("click", toggleMenu);
$("cartOpen").addEventListener("click", openBasket);
$("basketClose").addEventListener("click", closeBasket);
$("basketBackdrop").addEventListener("click", closeBasket);
$("basketQuote").addEventListener("click", basketToQuote);
$("basketClear").addEventListener("click", () => { basket = []; renderBasket(); });
$("quoteClose").addEventListener("click", closeQuote);
$("quoteModal").addEventListener("click", event => { if (event.target === $("quoteModal")) closeQuote(); });
$("quoteForm").addEventListener("submit", submitEnquiry);
$("sendWhatsApp").addEventListener("click", sendWhatsApp);
document.addEventListener("keydown", event => { if (event.key === "Escape") { closeQuote(); closeBasket(); } });
async function syncCatalogFromApi() {
  if (!API_BASE_URL) return;
  try {
    const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/api/catalog`);
    if (!response.ok) throw new Error("Catalogue API unavailable");
    const remoteProducts = await response.json();
    remoteProducts.forEach(remote => {
      const local = products.find(product => product.id === remote.id);
      if (local) {
        local.name = remote.name || local.name;
        local.category = remote.category || local.category;
        local.description = remote.description || local.description;
        local.image = remote.image || local.image;
        local.images = Array.isArray(remote.images) && remote.images.length ? remote.images : [local.image];
        // Keep the approved storefront indicative prices consistent even when the API is enabled.
      }
    });
    renderProducts();
  } catch (error) {
    console.warn("Using the built-in Branova catalogue because the API is unavailable.", error);
  }
}
renderProducts();
renderBasket();
syncCatalogFromApi();
