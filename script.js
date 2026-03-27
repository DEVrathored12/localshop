/**
 * LocalShop — script.js
 * Rich sample data + Full API integration
 */

/* ══════════════════════════════════════════
   CONFIG
══════════════════════════════════════════ */
const API_BASE = 'https://localshop-api.onrender.com/api';

/* ══════════════════════════════════════════
   RICH SEED DATA — 24 Shops
══════════════════════════════════════════ */
const SEED_SHOPS = [

  /* ── FOOD ── */
  {
    id: 1, name: "Aroma Café", category: "Food",
    address: "12, MG Road, Ahmedabad, Gujarat",
    contact: "+91 98765 43210",
    description: "Cozy coffee shop famous for handcrafted brews, signature masala chai, and fresh sandwiches. Perfect for work or a chill hangout.",
    instagram: "aroma.cafe"
  },
  {
    id: 2, name: "Spice Route", category: "Food",
    address: "7, Vastrapur Lake Road, Ahmedabad",
    contact: "+91 95555 44444",
    description: "Authentic Indian street food and regional delicacies. Family-run since 1990. Must-try: Pav Bhaji and Dabeli.",
    instagram: "spiceroute.ahm"
  },
  {
    id: 3, name: "The Burger Lab", category: "Food",
    address: "22, SG Highway, Ahmedabad",
    contact: "+91 91111 22222",
    description: "Gourmet burgers with fresh ingredients, loaded fries, and thick milkshakes. Dine-in and takeaway available.",
    instagram: "burgerlab.ahm"
  },
  {
    id: 4, name: "Chai Wala Premium", category: "Food",
    address: "5, Navrangpura, Ahmedabad",
    contact: "+91 90000 11111",
    description: "15 types of chai from classic Cutting to Kashmiri Kahwa. Also serves biscuits, poha, and upma.",
    instagram: "chaiwala.premium"
  },
  {
    id: 5, name: "Pizza Palace", category: "Food",
    address: "33, Bodakdev, Ahmedabad",
    contact: "+91 88888 99999",
    description: "Wood-fired pizzas with fresh toppings, garlic bread, and pasta. Best thin crust in the city!",
    instagram: "pizzapalace.ahm"
  },

  /* ── FASHION ── */
  {
    id: 6, name: "Style Studio", category: "Fashion",
    address: "45, CG Road, Ahmedabad",
    contact: "+91 87654 32109",
    description: "Trendy fashion boutique stocking the latest western and ethnic wear. New collections every week.",
    instagram: "stylestudio_ahm"
  },
  {
    id: 7, name: "Denim District", category: "Fashion",
    address: "30, Prahlad Nagar, Ahmedabad",
    contact: "+91 84444 33333",
    description: "The one-stop denim destination. Jeans, jackets, shorts — all brands at the best price.",
    instagram: "denimdistrict"
  },
  {
    id: 8, name: "Ethnic Elegance", category: "Fashion",
    address: "18, Law Garden, Ahmedabad",
    contact: "+91 77777 88888",
    description: "Stunning ethnic wear — sarees, lehengas, kurtis, and sherwanis for every occasion.",
    instagram: "ethnic.elegance"
  },
  {
    id: 9, name: "Sneaker Hub", category: "Fashion",
    address: "11, Satellite Road, Ahmedabad",
    contact: "+91 96666 55555",
    description: "Exclusive sneakers, casual shoes, and sportswear from top brands. Limited editions available.",
    instagram: "sneakerhub.ahm"
  },

  /* ── ELECTRONICS ── */
  {
    id: 10, name: "TechZone", category: "Electronics",
    address: "78, Manek Chowk, Ahmedabad",
    contact: "+91 91234 56789",
    description: "Latest mobiles, laptops, tablets, and accessories. Expert repair services with 3-month warranty.",
    instagram: "techzone_ahm"
  },
  {
    id: 11, name: "Gadget Galaxy", category: "Electronics",
    address: "55, Iscon Mega Mall, Ahmedabad",
    contact: "+91 92222 33333",
    description: "Smartwatches, earbuds, cameras, and smart home devices. Best deals on branded electronics.",
    instagram: "gadgetgalaxy.in"
  },
  {
    id: 12, name: "PC World", category: "Electronics",
    address: "9, Paldi, Ahmedabad",
    contact: "+91 79000 88888",
    description: "Custom PC builds, gaming setups, peripherals, and hardware upgrades. Trusted since 2005.",
    instagram: "pcworld.ahm"
  },

  /* ── BOOKS ── */
  {
    id: 13, name: "Book Nook", category: "Books",
    address: "3, Law Garden, Ahmedabad",
    contact: "+91 76543 21098",
    description: "A paradise for booklovers — fiction, non-fiction, academic, self-help, and rare finds. Cozy reading corner inside.",
    instagram: ""
  },
  {
    id: 14, name: "Page Turner", category: "Books",
    address: "14, Navrangpura, Ahmedabad",
    contact: "+91 75555 66666",
    description: "New releases, bestsellers, children books, stationery, and art supplies all under one roof.",
    instagram: "pageturner.books"
  },

  /* ── HEALTH ── */
  {
    id: 15, name: "HealthPlus Pharmacy", category: "Health",
    address: "22, Navrangpura, Ahmedabad",
    contact: "+91 99887 76655",
    description: "24-hour pharmacy with medicines, supplements, and expert pharmacist consultation always available.",
    instagram: ""
  },
  {
    id: 16, name: "WellCare Clinic", category: "Health",
    address: "6, Bopal, Ahmedabad",
    contact: "+91 98000 77777",
    description: "General physician, dietitian, and physiotherapy services. Appointment booking available online.",
    instagram: "wellcare.clinic"
  },
  {
    id: 17, name: "Ayur Wellness", category: "Health",
    address: "2, Thaltej, Ahmedabad",
    contact: "+91 93333 44444",
    description: "Authentic Ayurvedic treatments, herbal products, and panchakarma therapies for holistic health.",
    instagram: "ayurwellness.ahm"
  },

  /* ── BEAUTY ── */
  {
    id: 18, name: "Glow & Go Salon", category: "Beauty",
    address: "9, Satellite Road, Ahmedabad",
    contact: "+91 88776 65544",
    description: "Premium beauty salon offering skin care facials, hair coloring, bridal makeup, and wellness therapies.",
    instagram: "glowandgo.salon"
  },
  {
    id: 19, name: "The Beauty Bar", category: "Beauty",
    address: "27, Vastrapur, Ahmedabad",
    contact: "+91 87000 96000",
    description: "Nail art, eyelash extensions, threading, waxing, and complete beauty makeover packages.",
    instagram: "thebeautybar.ahm"
  },

  /* ── SPORTS ── */
  {
    id: 20, name: "FitLife Sports", category: "Sports",
    address: "55, Bodakdev, Ahmedabad",
    contact: "+91 77665 54433",
    description: "Everything a sportsperson needs — cricket gear, football, gym equipment, and protein supplements.",
    instagram: "fitlife.sports"
  },
  {
    id: 21, name: "ProSport Arena", category: "Sports",
    address: "40, Motera, Ahmedabad",
    contact: "+91 76000 85000",
    description: "Official sports gear dealer. Badminton, tennis, swimming, cycling accessories and expert guidance.",
    instagram: "prosport.arena"
  },

  /* ── HOME ── */
  {
    id: 22, name: "HomeDecor Hub", category: "Home",
    address: "18, Prahlad Nagar, Ahmedabad",
    contact: "+91 66554 43322",
    description: "Affordable and stylish home furnishings, wall art, kitchen essentials, and smart home products.",
    instagram: ""
  },
  {
    id: 23, name: "Furniture World", category: "Home",
    address: "88, Sarkhej-Gandhinagar Highway, Ahmedabad",
    contact: "+91 65000 74000",
    description: "Custom and ready-made furniture for bedroom, living room, kitchen, and office. EMI available.",
    instagram: "furnitureworld.ahm"
  },
  {
    id: 24, name: "Kitchen King", category: "Home",
    address: "13, Maninagar, Ahmedabad",
    contact: "+91 64000 73000",
    description: "Everything for your kitchen — appliances, cookware, storage solutions, and modular kitchen design.",
    instagram: "kitchenking.ahm"
  }
];

/* ══════════════════════════════════════════
   TOKEN HELPERS
══════════════════════════════════════════ */
function getToken()      { return localStorage.getItem('localshop_token'); }
function setToken(t)     { localStorage.setItem('localshop_token', t); }
function removeToken()   { localStorage.removeItem('localshop_token'); }
function isLoggedIn()    { return !!getToken(); }
function authHeader()    { return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` }; }

/* ══════════════════════════════════════════
   API HELPERS
══════════════════════════════════════════ */
async function apiFetch(endpoint, options = {}, retries = 2) {
  const token   = getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  try {
    const res  = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Something went wrong');
    return data;
  } catch (err) {
    if (retries > 0) {
      await new Promise(r => setTimeout(r, 3000));
      return apiFetch(endpoint, options, retries - 1);
    }
    throw err;
  }
}

/* ══════════════════════════════════════════
   AUTH API
══════════════════════════════════════════ */
async function apiLogin(email, password) {
  const data = await apiFetch('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  setToken(data.token);
  localStorage.setItem('localshop_user', data.name);
  return data;
}

async function apiRegister(name, email, password) {
  const data = await apiFetch('/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password })
  });
  setToken(data.token);
  localStorage.setItem('localshop_user', data.name);
  return data;
}

function apiLogout() {
  removeToken();
  localStorage.removeItem('localshop_user');
  window.location.href = 'login.html';
}

/* ══════════════════════════════════════════
   SHOPS API
══════════════════════════════════════════ */
async function fetchShopsFromAPI(query = '', category = 'All') {
  try {
    let url = '/get-shops?';
    if (query)               url += `q=${encodeURIComponent(query)}&`;
    if (category !== 'All')  url += `category=${encodeURIComponent(category)}`;
    const data = await apiFetch(url);
    return data.shops.map(s => ({ ...s, id: s._id || s.id }));
  } catch (err) {
    console.warn('⚠️ API offline — using local data:', err.message);
    return getShopsLocal(query, category);
  }
}

async function addShopAPI(shopData) {
  try {
    const data = await apiFetch('/add-shop', {
      method: 'POST',
      body: JSON.stringify(shopData)
    });
    return { success: true, shop: data.shop, source: 'api' };
  } catch (err) {
    console.warn('⚠️ Saving to localStorage:', err.message);
    const shop  = { ...shopData, id: Date.now() };
    const shops = getShopsLocal();
    shops.unshift(shop);
    localStorage.setItem('localshop_shops', JSON.stringify(shops));
    return { success: true, shop, source: 'local' };
  }
}

async function getShopById(id) {
  try {
    return await apiFetch(`/shops/${id}`);
  } catch {
    const shops = getShopsLocal();
    return shops.find(s => String(s.id) === String(id) || String(s._id) === String(id));
  }
}

/* ══════════════════════════════════════════
   LOCAL STORAGE — with filter support
══════════════════════════════════════════ */
function getShopsLocal(query = '', category = 'All') {
  const raw = localStorage.getItem('localshop_shops');
  let shops;
  if (raw) {
    try { shops = JSON.parse(raw); } catch { shops = SEED_SHOPS; }
  } else {
    localStorage.setItem('localshop_shops', JSON.stringify(SEED_SHOPS));
    shops = SEED_SHOPS;
  }

  if (category !== 'All') {
    shops = shops.filter(s => s.category === category);
  }
  if (query) {
    const q = query.toLowerCase();
    shops = shops.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.address.toLowerCase().includes(q) ||
      (s.description || '').toLowerCase().includes(q)
    );
  }
  return shops;
}

/* Sync version used by home page */
function getShops() {
  const raw = localStorage.getItem('localshop_shops');
  if (raw) { try { return JSON.parse(raw); } catch {} }
  localStorage.setItem('localshop_shops', JSON.stringify(SEED_SHOPS));
  return SEED_SHOPS;
}

/* ══════════════════════════════════════════
   CATEGORY CONFIG
══════════════════════════════════════════ */
const CAT_EMOJI = {
  Food:'🍔', Fashion:'👗', Electronics:'📱',
  Books:'📚', Health:'💊', Beauty:'💄',
  Sports:'⚽', Home:'🏠'
};

const CAT_COLOR = {
  Food:        'rgba(255,140,0,0.15)',
  Fashion:     'rgba(255,80,160,0.15)',
  Electronics: 'rgba(0,160,255,0.15)',
  Books:       'rgba(100,180,100,0.15)',
  Health:      'rgba(80,220,180,0.15)',
  Beauty:      'rgba(220,100,220,0.15)',
  Sports:      'rgba(255,200,0,0.15)',
  Home:        'rgba(180,130,80,0.15)'
};

/* ══════════════════════════════════════════
   SHOP CARD RENDERER
══════════════════════════════════════════ */
function createShopCard(shop) {
  const emoji    = CAT_EMOJI[shop.category] || '🛍';
  const id       = shop._id || shop.id;
  const color    = CAT_COLOR[shop.category] || 'rgba(0,212,184,0.12)';
  const shortAddr = (shop.address || '').length > 50
    ? shop.address.slice(0, 47) + '…'
    : shop.address;
  const shortDesc = (shop.description || '').length > 80
    ? shop.description.slice(0, 77) + '…'
    : shop.description;

  return `
    <div class="shop-card glass-card" onclick="viewShop('${id}')">
      <div class="shop-card-top">
        <div class="shop-emoji" style="background:${color}">${emoji}</div>
        <div style="flex:1;min-width:0">
          <div class="shop-card-name">${escapeHtml(shop.name)}</div>
          <div class="shop-card-cat">${escapeHtml(shop.category)}</div>
        </div>
      </div>
      ${shortDesc ? `<p class="shop-card-desc">${escapeHtml(shortDesc)}</p>` : ''}
      <div class="shop-card-addr">
        <i class="fas fa-map-marker-alt" style="color:var(--teal);font-size:.75rem;flex-shrink:0"></i>
        ${escapeHtml(shortAddr)}
      </div>
      <div class="shop-card-actions">
        <button class="btn-primary" onclick="event.stopPropagation();viewShop('${id}')">
          <i class="fas fa-eye"></i> View Details
        </button>
        ${shop.instagram ? `
        <a href="https://instagram.com/${encodeURIComponent(shop.instagram)}"
           target="_blank" class="btn-outline"
           onclick="event.stopPropagation()" style="padding:9px 14px">
           <i class="fab fa-instagram"></i>
        </a>` : ''}
      </div>
    </div>
  `;
}

function viewShop(id) {
  window.location.href = `shop-details.html?id=${id}`;
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ══════════════════════════════════════════
   NAVBAR — scroll + mobile + auth state
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Scroll shrink
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.background = window.scrollY > 40
        ? 'rgba(6,11,20,0.96)'
        : 'rgba(6,11,20,0.75)';
    });
  }

  // Mobile toggle
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    document.addEventListener('click', e => {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target))
        navLinks.classList.remove('open');
    });
  }

  // Show logged-in user in navbar
  updateNavAuth();

  // Force reload seed data if shops count is less than 24
  const raw = localStorage.getItem('localshop_shops');
  if (raw) {
    try {
      const arr = JSON.parse(raw);
      if (arr.length < 10) {
        localStorage.setItem('localshop_shops', JSON.stringify(SEED_SHOPS));
      }
    } catch {
      localStorage.setItem('localshop_shops', JSON.stringify(SEED_SHOPS));
    }
  }
});

function updateNavAuth() {
  const loginLink = document.querySelector('.nav-login');
  if (!loginLink) return;
  const user = localStorage.getItem('localshop_user');
  if (user && getToken()) {
    loginLink.innerHTML = `<i class="fas fa-user-check"></i> ${escapeHtml(user)}`;
    loginLink.href      = '#';
    loginLink.title     = 'Click to logout';
    loginLink.onclick   = e => {
      e.preventDefault();
      if (confirm('Logout from LocalShop?')) apiLogout();
    };
  }
}