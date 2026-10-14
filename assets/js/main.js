/* Branova storefront behaviour.
   Set window.BRANOVA_API_URL to the deployed Spring Boot base URL before this file loads
   to enable persistent API enquiries. Without it, enquiries can be sent to WhatsApp. */
const API_BASE_URL = window.BRANOVA_API_URL || "";
const WHATSAPP_NUMBER = "256752357618";
const products = [
  {id:"business-cards",name:"Business cards",category:"Printing",price:"Quote on request",description:"Professional cards with your choice of stock and finish.",image:"assets/images/products/business-cards.jpg",badge:"Print essential"},
  {id:"flyers-brochures",name:"Flyers & brochures",category:"Printing",price:"Quote on request",description:"Promote services, products, campaigns and events.",image:"assets/images/products/flyers-brochures.jpg",badge:"Popular"},
  {id:"large-format-printing",name:"Large-format printing",category:"Printing",price:"Quote on request",description:"Large visual prints for indoor and outdoor use.",image:"assets/images/products/large-format-printing.jpg",badge:"Big impact"},
  {id:"pullup-banners",name:"Pull-up banners",category:"Branding",price:"Quote on request",description:"Portable display systems for events and promotions.",image:"assets/images/products/pullup-banners.jpg",badge:"Event favourite"},
  {id:"vinyl-banners-signage",name:"Vinyl banners & signage",category:"Branding",price:"Quote on request",description:"Custom banners, signs and branded display graphics.",image:"assets/images/products/vinyl-banners-signage.jpg",badge:"Custom made"},
  {id:"event-backdrops",name:"Event backdrops",category:"Branding",price:"Quote on request",description:"Branded backgrounds for conferences, launches and events.",image:"assets/images/products/event-backdrops.jpg",badge:"For events"},
  {id:"vehicle-branding",name:"Vehicle branding",category:"Branding",price:"Quote on request",description:"Turn company vehicles into moving brand visibility.",image:"assets/images/products/vehicle-branding.jpg",badge:"On the move"},
  {id:"branded-pens",name:"Branded pens",category:"Promotional",price:"Quote on request",description:"Useful promotional items for teams, clients and events.",image:"assets/images/products/branded-pens.jpg",badge:"Everyday brand"},
  {id:"mugs",name:"Branded mugs",category:"Promotional",price:"Quote on request",description:"Custom mugs for corporate gifts and campaigns.",image:"assets/images/products/mugs.jpg",badge:"Gift idea"},
  {id:"tshirts-apparel",name:"T-shirts & apparel",category:"Promotional",price:"Quote on request",description:"Branded wear for staff, teams, events and merchandise.",image:"assets/images/products/tshirts-apparel.jpg",badge:"Wear your brand"},
  {id:"branded-umbrellas",name:"Branded umbrellas",category:"Promotional",price:"Quote on request",description:"Practical branded merchandise for all-weather visibility.",image:"assets/images/products/branded-umbrellas.jpg",badge:"Useful gifts"},
  {id:"corporate-gifts",name:"Corporate gifts",category:"Promotional",price:"Quote on request",description:"Thoughtful gift sets and promotional merchandise.",image:"assets/images/products/corporate-gifts.jpg",badge:"Gift collections"},
  {id:"notebooks-diaries",name:"Notebooks & diaries",category:"Stationery",price:"Quote on request",description:"Branded notebooks, diaries and writing materials.",image:"assets/images/products/notebooks-diaries.jpg",badge:"Office favourite"},
  {id:"stamps-office-supplies",name:"Stamps & office supplies",category:"Stationery",price:"Quote on request",description:"Everyday stationery and office essentials for organisations.",image:"assets/images/products/stamps-office-supplies.jpg",badge:"Work essentials"},
  {id:"packaging-labels",name:"Packaging & labels",category:"Packaging",price:"Quote on request",description:"Labels, stickers and packaging to present your product.",image:"assets/images/products/packaging-labels.jpg",badge:"Product ready"},
  {id:"general-supplies",name:"General supplies",category:"General Supplies",price:"Quote on request",description:"Tell us what your organisation needs, branded or not.",image:"assets/images/products/corporate-gifts.jpg",badge:"Source to order"}
];
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
      <div class="product-photo"><img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy"><span class="product-badge">${escapeHtml(p.badge)}</span></div>
      <div class="product-info"><span class="product-category">${escapeHtml(p.category)}</span><h3>${escapeHtml(p.name)}</h3>
        <p class="product-description">${escapeHtml(p.description)}</p>
        <div class="product-bottom"><span class="product-price">${escapeHtml(p.price)}<small>Custom quantities & specifications</small></span><button class="add-product" data-add="${p.id}">+ Add to basket</button></div>
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
  const existing = basket.find(item => item.id === id);
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
    <div class="basket-item"><div><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.category)} · Quotation required</small></div>
      <div class="qty-controls"><button aria-label="Decrease ${escapeHtml(item.name)} quantity" data-qty="-1" data-id="${item.id}">−</button><span>${item.quantity}</span><button aria-label="Increase ${escapeHtml(item.name)} quantity" data-qty="1" data-id="${item.id}">+</button></div>
      <button class="basket-remove" data-remove="${item.id}">Remove</button>
    </div>`).join("") : '<p class="basket-empty">Your basket is empty.<br>Add products to request a combined quotation.</p>';
}
function basketToQuote() {
  if (!basket.length) {
    $("basketItems").innerHTML = '<p class="basket-empty">Add at least one product first.</p>';
    return;
  }
  const details = basket.map(item => `• ${item.name}, quantity: ${item.quantity}`).join("\n");
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
  if (API_BASE_URL) {
    try {
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
    } catch (error) {
      feedback.textContent = "The online service is unavailable right now. WhatsApp is ready as an alternative.";
      window.open(whatsappUrl(payload), "_blank", "noopener,noreferrer");
    }
  } else {
    window.open(whatsappUrl(payload), "_blank", "noopener,noreferrer");
    feedback.textContent = "WhatsApp opened with your enquiry. Please send the prepared message to complete your request.";
  }
  submitButton.disabled = false;
  submitButton.innerHTML = 'Send enquiry <span>↗</span>';
}
function toggleMenu() {
  const open = $("mainNav").classList.toggle("open");
  $("menuToggle").setAttribute("aria-expanded", String(open));
  $("menuToggle").setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  $("menuToggle").textContent = open ? "×" : "☰";
}
document.addEventListener("click", event => {
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
        local.price = remote.price || local.price;
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
