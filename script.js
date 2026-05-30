/* =============================================
   [Store Name] Electronics – Main JavaScript
   Premium IKEA-Inspired Retail Website
   ============================================= */

'use strict';

// ==================== PRODUCT & CATEGORY DATA ====================
// INSTRUCTIONS: Replace images, names, prices with your actual products

const CATEGORIES = [
  {
    id: 'Mobile',
    name: 'Mobile Phones',
    count: '500+',
    desc: 'Latest smartphones from Samsung, Apple, OnePlus, Xiaomi, Vivo, Oppo & more. 5G, AMOLED, best cameras.',
    // Replace with your actual mobile department photo
    img: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=500&q=80',
  },
  {
    id: 'Smart TV',
    name: 'Smart TVs',
    count: '150+',
    desc: '32" to 85" 4K OLED, QLED and LED Smart TVs. Android TV, Tizen, webOS platforms.',
    // Replace with your actual TV display photo
    img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80',
  },
  {
    id: 'AC',
    name: 'Air Conditioners',
    count: '80+',
    desc: 'Split ACs, Window ACs from Voltas, Daikin, LG, Samsung. 1-star to 5-star inverter ACs.',
    // Replace with your actual AC display photo
    img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80',
  },
  {
    id: 'Refrigerator',
    name: 'Refrigerators',
    count: '120+',
    desc: 'Single door, double door, side-by-side and French door refrigerators. Frost-free models.',
    // Replace with your actual refrigerator display photo
    img: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500&q=80',
  },
  {
    id: 'Washing Machine',
    name: 'Washing Machines',
    count: '90+',
    desc: 'Top load, front load and semi-automatic washing machines. 6 kg to 12 kg capacity.',
    // Replace with your actual washing machine display photo
    img: 'https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=500&q=80',
  },
  {
    id: 'Sofa',
    name: 'Sofas & Furniture',
    count: '60+',
    desc: 'Premium fabric and leather sofas, recliners, sofa beds in L-shape and loveseat configurations.',
    // Replace with your actual furniture showroom photo
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80',
  },
  {
    id: 'Mattress',
    name: 'Mattresses',
    count: '50+',
    desc: 'Memory foam, orthopaedic, spring and coir mattresses. Single, double, queen and king sizes.',
    // Replace with your actual mattress display photo
    img: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=500&q=80',
  },
  {
    id: 'Bed',
    name: 'Beds',
    count: '45+',
    desc: 'Wooden, metal and upholstered bed frames with storage options. Platform beds and divan beds.',
    // Replace with your actual bedroom display photo
    img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80',
  },
  {
    id: 'Inverter',
    name: 'Inverters',
    count: '60+',
    desc: 'Home inverters, solar inverters and UPS systems. 500VA to 5kVA with battery combos.',
    // Replace with your actual inverter display photo
    img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&q=80',
  },
  {
    id: 'Water Purifier',
    name: 'Water Purifiers',
    count: '70+',
    desc: 'RO, UV, UF water purifiers from Kent, Livpure, Aquaguard. Wall-mounted and countertop models.',
    // Replace with your actual water purifier display photo
    img: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&q=80',
  },
  {
    id: 'Kitchen',
    name: 'Kitchen Appliances',
    count: '300+',
    desc: 'Mixer grinders, microwave ovens, dishwashers, chimneys, hobs and small kitchen gadgets.',
    // Replace with your actual kitchen appliances photo
    img: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500&q=80',
  },
];

const PRODUCTS = [
  // ===== MOBILES =====
  // Replace product images with your actual product photos
  {
    id: 1, cat: 'Mobile',
    name: 'Galaxy S24 Ultra', brand: 'Samsung', model: 'SM-S928B',
    price: 134999, mrp: 149999,
    img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80',
    emi: '₹5,625/mo', warranty: '1 Year', badge: 'Best Seller',
  },
  {
    id: 2, cat: 'Mobile',
    name: 'iPhone 16 Pro Max', brand: 'Apple', model: 'MTQN3HN/A',
    price: 134900, mrp: 149900,
    img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80',
    emi: '₹5,625/mo', warranty: '1 Year', badge: 'New',
  },
  {
    id: 3, cat: 'Mobile',
    name: 'OnePlus 12', brand: 'OnePlus', model: 'CPH2573',
    price: 64999, mrp: 69999,
    img: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&q=80',
    emi: '₹2,708/mo', warranty: '1 Year', badge: '',
  },
  {
    id: 4, cat: 'Mobile',
    name: 'Redmi Note 13 Pro+', brand: 'Xiaomi', model: 'RN13PP',
    price: 29999, mrp: 34999,
    img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80',
    emi: '₹1,250/mo', warranty: '1 Year', badge: 'Popular',
  },
  // ===== ACS =====
  {
    id: 5, cat: 'AC',
    name: '1.5T 5-Star Inverter Split AC', brand: 'Voltas', model: '185V DZW',
    price: 45990, mrp: 54990,
    img: 'https://images.unsplash.com/photo-1631083191779-c1c2d4b2b9e3?w=400&q=80',
    emi: '₹1,916/mo', warranty: '5 Years (Compressor)', badge: '5-Star',
  },
  {
    id: 6, cat: 'AC',
    name: '1.5T Premium Inverter AC', brand: 'Daikin', model: 'FTKG50TV',
    price: 52990, mrp: 61990,
    img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80',
    emi: '₹2,208/mo', warranty: '5 Years (Compressor)', badge: 'Best Pick',
  },
  {
    id: 7, cat: 'AC',
    name: '2T 3-Star Dual Cool AC', brand: 'LG', model: 'RS-Q24YNZE',
    price: 49990, mrp: 57990,
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    emi: '₹2,083/mo', warranty: '5 Years', badge: '',
  },
  // ===== REFRIGERATORS =====
  {
    id: 8, cat: 'Refrigerator',
    name: '591L French Door Refrigerator', brand: 'Samsung', model: 'RF59C701ES9',
    price: 89990, mrp: 105000,
    img: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&q=80',
    emi: '₹3,750/mo', warranty: '1 Year', badge: 'Premium',
  },
  {
    id: 9, cat: 'Refrigerator',
    name: '655L Side by Side Refrigerator', brand: 'LG', model: 'GC-B257KQBV',
    price: 79990, mrp: 95000,
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
    emi: '₹3,333/mo', warranty: '1 Year', badge: '',
  },
  {
    id: 10, cat: 'Refrigerator',
    name: '265L Double Door', brand: 'Whirlpool', model: 'NEOFRESH 278LH',
    price: 26990, mrp: 31990,
    img: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&q=80',
    emi: '₹1,125/mo', warranty: '1 Year', badge: 'Value',
  },
  // ===== WASHING MACHINES =====
  {
    id: 11, cat: 'Washing Machine',
    name: '8kg Front Load WM', brand: 'IFB', model: 'Senator WXS',
    price: 42990, mrp: 49990,
    img: 'https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=400&q=80',
    emi: '₹1,792/mo', warranty: '2 Years', badge: 'Top Rated',
  },
  {
    id: 12, cat: 'Washing Machine',
    name: '10kg Inverter Front Load', brand: 'LG', model: 'FHV1410Z2P',
    price: 55990, mrp: 64990,
    img: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=400&q=80',
    emi: '₹2,333/mo', warranty: '2 Years', badge: '',
  },
  // ===== SMART TVs =====
  {
    id: 13, cat: 'Smart TV',
    name: '65" 4K QLED Smart TV', brand: 'Samsung', model: 'QA65Q70D',
    price: 89990, mrp: 109999,
    img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80',
    emi: '₹3,750/mo', warranty: '1 Year', badge: '4K QLED',
  },
  {
    id: 14, cat: 'Smart TV',
    name: '55" OLED Smart TV', brand: 'LG', model: 'OLED55C4',
    price: 129990, mrp: 149999,
    img: 'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=400&q=80',
    emi: '₹5,416/mo', warranty: '1 Year', badge: 'OLED',
  },
  {
    id: 15, cat: 'Smart TV',
    name: '43" 4K Android TV', brand: 'Sony', model: 'KD-43X74L',
    price: 44990, mrp: 54999,
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    emi: '₹1,875/mo', warranty: '1 Year', badge: '',
  },
  // ===== SOFAS =====
  {
    id: 23, cat: 'Sofa',
    name: '3+2 Premium Fabric Sofa Set', brand: 'Godrej Interio', model: 'ZEST 3+2',
    price: 42990, mrp: 55000,
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
    emi: '₹1,792/mo', warranty: '1 Year', badge: '',
  },
  {
    id: 24, cat: 'Sofa',
    name: 'L-Shaped Leather Sofa', brand: 'Evok', model: 'Premium L-Sofa',
    price: 68990, mrp: 85000,
    img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&q=80',
    emi: '₹2,875/mo', warranty: '1 Year', badge: 'Premium',
  },
  // ===== MATTRESSES =====
  {
    id: 25, cat: 'Mattress',
    name: '6" Memory Foam Queen Mattress', brand: 'Sleepwell', model: 'Vitalize 6in',
    price: 22990, mrp: 28000,
    img: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&q=80',
    emi: '₹958/mo', warranty: '5 Years', badge: 'Ortho',
  },
  // ===== BEDS =====
  {
    id: 26, cat: 'Bed',
    name: 'Queen Platform Bed with Storage', brand: 'Nilkamal', model: 'Portland QN',
    price: 28990, mrp: 36000,
    img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80',
    emi: '₹1,208/mo', warranty: '1 Year', badge: '',
  },
  // ===== INVERTERS =====
  {
    id: 19, cat: 'Inverter',
    name: '1500VA Pure Sine Wave Inverter', brand: 'Luminous', model: 'Eco Watt Neo 1650',
    price: 7490, mrp: 8990,
    img: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&q=80',
    emi: '₹312/mo', warranty: '2 Years', badge: '',
  },
  {
    id: 20, cat: 'Inverter',
    name: '2KVA Solar Inverter', brand: 'Microtek', model: 'SEBz 2000',
    price: 12990, mrp: 15490,
    img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80',
    emi: '₹542/mo', warranty: '2 Years', badge: 'Solar',
  },
  // ===== WATER PURIFIERS =====
  {
    id: 21, cat: 'Water Purifier',
    name: 'Grand Star RO+UV Purifier', brand: 'Kent', model: 'Grand Star',
    price: 14990, mrp: 18490,
    img: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80',
    emi: '₹625/mo', warranty: '1 Year', badge: 'RO+UV',
  },
  // ===== KITCHEN APPLIANCES =====
  {
    id: 27, cat: 'Kitchen',
    name: '28L Convection Microwave', brand: 'Samsung', model: 'MC28A5033CK',
    price: 15990, mrp: 19490,
    img: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&q=80',
    emi: '₹666/mo', warranty: '1 Year', badge: 'Convection',
  },
  {
    id: 28, cat: 'Kitchen',
    name: '750W Mixer Grinder', brand: 'Prestige', model: 'Iris Plus 750',
    price: 3490, mrp: 4490,
    img: 'https://images.unsplash.com/photo-1585515656973-eba4dd5d86ce?w=400&q=80',
    emi: '₹292/mo', warranty: '2 Years', badge: '',
  },
];

// ==================== GLOBALS ====================
let currentPage = 'home';
let currentFilter = 'all';

// WhatsApp number – update with your actual number
const WA_NUMBER = '919876543210';

// ==================== PAGE LOADER ====================
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('pageLoader');
    if (loader) loader.classList.add('done');
    initPage();
  }, 1500);
});

function initPage() {
  AOS.init({ duration: 700, once: true, offset: 60, easing: 'ease-out-cubic' });
  initNavbar();
  initSearch();
  initHamburger();
  renderCategoryGrid();
  renderCategoriesFull();
  renderFeaturedProducts();
  renderProductsPage('all');
  initCounters();
  initCountdowns();
  calcEMI();
  initGSAP();
}

// ==================== NAVIGATION ====================
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    currentPage = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // Update nav link active state
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.getAttribute('onclick') && l.getAttribute('onclick').includes(`'${pageId}'`));
  });
  // Close mobile menu
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  if (navLinks) navLinks.classList.remove('open');
  if (hamburger) hamburger.classList.remove('active');
}

function initNavbar() {
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    if (window.scrollY > 20) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });
}

function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
}

function initSearch() {
  const toggle = document.getElementById('searchToggle');
  const dropdown = document.getElementById('searchDropdown');
  const closeBtn = document.getElementById('searchClose');
  const input = document.getElementById('searchInput');
  if (!toggle || !dropdown) return;
  toggle.addEventListener('click', () => {
    dropdown.classList.toggle('open');
    if (dropdown.classList.contains('open') && input) setTimeout(() => input.focus(), 100);
  });
  if (closeBtn) closeBtn.addEventListener('click', () => dropdown.classList.remove('open'));
}

// ==================== RENDER CATEGORIES ====================
function renderCategoryGrid() {
  const grid = document.getElementById('categoryGrid');
  if (!grid) return;
  const featured = CATEGORIES.slice(0, 9);
  grid.innerHTML = featured.map(cat => `
    <div class="cat-card" onclick="filterProductsPage('${cat.id}', null); showPage('products');" data-aos="fade-up">
      <div class="cat-img">
        <img src="${cat.img}" alt="${cat.name}" loading="lazy" />
      </div>
      <div class="cat-info">
        <div class="cat-name">${cat.name}</div>
        <div class="cat-count">${cat.count} Products</div>
      </div>
    </div>
  `).join('');
}

function renderCategoriesFull() {
  const grid = document.getElementById('categoriesFullGrid');
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map(cat => `
    <div class="cat-full-card" onclick="filterProductsPage('${cat.id}', null); showPage('products');" data-aos="fade-up">
      <div class="cat-full-img">
        <img src="${cat.img}" alt="${cat.name}" loading="lazy" />
      </div>
      <div class="cat-full-body">
        <div class="cat-full-name">${cat.name}</div>
        <div class="cat-full-desc">${cat.desc}</div>
        <div class="cat-full-count">${cat.count} Products Available</div>
      </div>
    </div>
  `).join('');
}

// ==================== RENDER PRODUCTS ====================
function productCardHTML(p) {
  const discount = p.mrp > p.price ? Math.round((1 - p.price / p.mrp) * 100) : 0;
  const badgeClass = p.badge === 'New' ? 'badge-new' : p.badge ? '' : '';
  const waMsg = encodeURIComponent(`Hi! I'm interested in the ${p.brand} ${p.name} (₹${p.price.toLocaleString('en-IN')}). Please share details and best price.`);
  return `
    <div class="product-card" data-cat="${p.cat}" data-aos="fade-up">
      <div class="product-img">
        <img src="${p.img}" alt="${p.brand} ${p.name}" loading="lazy" />
        ${p.badge ? `<span class="product-badge ${badgeClass}">${p.badge}</span>` : ''}
      </div>
      <div class="product-body">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-meta">
          <span>⚡ ${p.warranty}</span>
          ${p.model ? `<span>${p.model}</span>` : ''}
        </div>
        <div class="product-pricing">
          <span class="product-price">₹${p.price.toLocaleString('en-IN')}</span>
          ${p.mrp > p.price ? `<span class="product-mrp">₹${p.mrp.toLocaleString('en-IN')}</span>` : ''}
          ${discount > 3 ? `<span class="product-discount">${discount}% OFF</span>` : ''}
          <span class="product-emi">EMI from <strong>${p.emi}</strong></span>
        </div>
        <div class="product-actions">
          <a href="https://wa.me/${WA_NUMBER}?text=${waMsg}" class="btn-wa-product ripple" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Get Price
          </a>
          <button class="btn-enquire ripple" onclick="quickEnquire('${p.brand} ${p.name}')">Enquire</button>
        </div>
      </div>
    </div>
  `;
}

function renderFeaturedProducts(filter = 'all') {
  const grid = document.getElementById('homeFeaturedProducts');
  if (!grid) return;
  const list = filter === 'all' ? PRODUCTS.slice(0, 8) : PRODUCTS.filter(p => p.cat === filter).slice(0, 8);
  if (list.length === 0) {
    grid.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:40px;grid-column:1/-1;">No products found in this category.</p>';
    return;
  }
  grid.innerHTML = list.map(productCardHTML).join('');
  if (typeof AOS !== 'undefined') AOS.refresh();
}

function renderProductsPage(filter = 'all') {
  const grid = document.getElementById('productsPageGrid');
  if (!grid) return;
  const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);
  if (list.length === 0) {
    grid.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:40px;grid-column:1/-1;">No products found.</p>';
    return;
  }
  grid.innerHTML = list.map(productCardHTML).join('');
  if (typeof AOS !== 'undefined') AOS.refresh();
}

function filterProducts(cat, btn) {
  if (btn) {
    document.querySelectorAll('#page-home .product-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  renderFeaturedProducts(cat);
}

function filterProductsPage(cat, btn) {
  currentFilter = cat;
  if (btn) {
    document.querySelectorAll('#productsFilterBar .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  } else {
    // Auto-select the right button
    document.querySelectorAll('#productsFilterBar .tab-btn').forEach(b => {
      const onclick = b.getAttribute('onclick') || '';
      if (cat === 'all' && onclick.includes("'all'")) b.classList.add('active');
      else if (onclick.includes(`'${cat}'`)) b.classList.add('active');
      else b.classList.remove('active');
    });
  }
  renderProductsPage(cat);
}

function showProductsByCategory(cat) {
  filterProductsPage(cat, null);
  showPage('products');
}

function filterRoomProducts(cats) {
  // Show products page with multiple categories (show all in first match)
  filterProductsPage(cats[0], null);
  showPage('products');
}

// ==================== QUICK ENQUIRE ====================
function quickEnquire(productName) {
  const msg = encodeURIComponent(`Hi! I want to enquire about ${productName}. Please share more details and best price.`);
  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
}

// ==================== EMI CALCULATOR ====================
function calcEMI() {
  const price = parseFloat(document.getElementById('emiPrice').value) || 0;
  const down = parseFloat(document.getElementById('emiDown').value) || 0;
  const months = parseInt(document.getElementById('emiMonths').value) || 12;
  const rate = parseFloat(document.getElementById('emiRate').value) || 0;
  const loan = Math.max(0, price - down);

  let emi = 0, totalInterest = 0, totalCost = loan;
  if (rate === 0) {
    emi = loan / months;
    totalInterest = 0;
    totalCost = loan;
  } else {
    const r = rate / 12 / 100;
    emi = loan * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
    totalCost = emi * months;
    totalInterest = totalCost - loan;
  }

  const fmt = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
  const emiEl = document.getElementById('emiResult');
  const loanEl = document.getElementById('emiLoan');
  const intEl = document.getElementById('emiInterest');
  const totalEl = document.getElementById('emiTotal');
  if (emiEl) emiEl.textContent = fmt(emi);
  if (loanEl) loanEl.textContent = fmt(loan);
  if (intEl) intEl.textContent = fmt(totalInterest);
  if (totalEl) totalEl.textContent = fmt(totalCost + down);
}

// ==================== STAT COUNTERS ====================
function initCounters() {
  const nums = document.querySelectorAll('.hstat-num[data-target]');
  if (!nums.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      animateCount(el, 0, target, 1800);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach(n => observer.observe(n));
}

function animateCount(el, from, to, duration) {
  const start = performance.now();
  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(from + (to - from) * eased);
    el.textContent = current >= 1000 ? (current / 1000).toFixed(current >= 10000 ? 0 : 1).replace('.0', '') + (current >= 1000 ? '' : '') : current;
    if (to >= 10000) el.textContent = Math.round(from + (to - from) * eased).toLocaleString('en-IN').split(',')[0];
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = to >= 10000 ? (to / 1000).toFixed(0) : to;
  }
  requestAnimationFrame(update);
}

// ==================== COUNTDOWN TIMERS ====================
function initCountdowns() {
  updateCountdown('cd1-d', 'cd1-h', 'cd1-m', new Date('2025-09-01'));
  updateCountdown('cd2-d', 'cd2-h', 'cd2-m', new Date('2025-08-15'));
  setInterval(() => {
    updateCountdown('cd1-d', 'cd1-h', 'cd1-m', new Date('2025-09-01'));
    updateCountdown('cd2-d', 'cd2-h', 'cd2-m', new Date('2025-08-15'));
  }, 60000);
}

function updateCountdown(dId, hId, mId, endDate) {
  const now = new Date();
  let diff = Math.max(0, endDate - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * 86400000;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * 3600000;
  const mins = Math.floor(diff / 60000);
  const pad = n => String(n).padStart(2, '0');
  const dEl = document.getElementById(dId);
  const hEl = document.getElementById(hId);
  const mEl = document.getElementById(mId);
  if (dEl) dEl.textContent = pad(days);
  if (hEl) hEl.textContent = pad(hours);
  if (mEl) mEl.textContent = pad(mins);
}

// ==================== GALLERY FILTER ====================
function filterGallery(dept, btn) {
  if (btn) {
    document.querySelectorAll('.gallery-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  document.querySelectorAll('.gallery-item').forEach(item => {
    const itemDept = item.getAttribute('data-dept');
    if (dept === 'all' || itemDept === dept || itemDept === 'all') {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

// ==================== FORM SUBMISSIONS ====================
function submitEnquiry() {
  const name = document.getElementById('enqName').value.trim();
  const phone = document.getElementById('enqPhone').value.trim();
  const product = document.getElementById('enqProduct').value;
  const msg = document.getElementById('enqMsg').value.trim();
  if (!name) { showToast('Please enter your name.'); return; }
  if (!phone || phone.replace(/\D/g, '').length < 10) { showToast('Please enter a valid mobile number.'); return; }
  const waMsg = encodeURIComponent(`Hi! My name is ${name}.\nPhone: ${phone}\nInterested in: ${product || 'General Enquiry'}\n${msg ? 'Message: ' + msg : ''}\n\nPlease help me with details and pricing.`);
  window.open(`https://wa.me/${WA_NUMBER}?text=${waMsg}`, '_blank');
  document.getElementById('enqName').value = '';
  document.getElementById('enqPhone').value = '';
  document.getElementById('enqProduct').selectedIndex = 0;
  document.getElementById('enqMsg').value = '';
  showToast('✅ Opening WhatsApp with your enquiry!');
}

function submitContact() {
  const name = document.getElementById('ctcName').value.trim();
  const phone = document.getElementById('ctcPhone').value.trim();
  const product = document.getElementById('ctcProduct').value.trim();
  const msg = document.getElementById('ctcMsg').value.trim();
  if (!name) { showToast('Please enter your name.'); return; }
  if (!phone || phone.replace(/\D/g, '').length < 10) { showToast('Please enter a valid phone number.'); return; }
  if (!msg) { showToast('Please enter a message.'); return; }
  const waMsg = encodeURIComponent(`Hi! I'm ${name}.\nPhone: ${phone}\n${product ? 'Product: ' + product + '\n' : ''}Message: ${msg}`);
  window.open(`https://wa.me/${WA_NUMBER}?text=${waMsg}`, '_blank');
  document.getElementById('ctcName').value = '';
  document.getElementById('ctcPhone').value = '';
  if (document.getElementById('ctcEmail')) document.getElementById('ctcEmail').value = '';
  document.getElementById('ctcProduct').value = '';
  document.getElementById('ctcMsg').value = '';
  showToast('✅ Redirecting to WhatsApp...');
}

// ==================== TOAST ====================
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ==================== GSAP ANIMATIONS ====================
function initGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Hero parallax
  const heroBg = document.querySelector('.hero-bg-image img');
  if (heroBg) {
    gsap.to(heroBg, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });
  }

  // Why cards stagger
  gsap.utils.toArray('.why-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.6, delay: i * 0.07,
        scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  });

  // Product cards floating animation
  gsap.utils.toArray('.product-card').forEach((card, i) => {
    gsap.to(card, {
      y: -4,
      duration: 2 + (i % 3) * 0.5,
      yoyo: true, repeat: -1,
      ease: 'power1.inOut',
      delay: (i % 5) * 0.3,
    });
  });
}

// ==================== RIPPLE EFFECT ====================
document.addEventListener('click', function(e) {
  const btn = e.target.closest('.ripple');
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement('span');
  const size = Math.max(rect.width, rect.height) * 2;
  ripple.style.cssText = `
    position:absolute; border-radius:50%;
    background:rgba(255,255,255,0.25); pointer-events:none;
    width:${size}px; height:${size}px;
    left:${e.clientX - rect.left - size/2}px;
    top:${e.clientY - rect.top - size/2}px;
    transform:scale(0); animation:rippleAnim 0.6s ease-out forwards;
  `;
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
});

// Inject ripple animation
const style = document.createElement('style');
style.textContent = `@keyframes rippleAnim { to { transform:scale(1); opacity:0; } }`;
document.head.appendChild(style);

// ==================== ACCESSIBILITY ====================
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const searchDropdown = document.getElementById('searchDropdown');
    if (searchDropdown) searchDropdown.classList.remove('open');
    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.remove('open');
    const hamburger = document.getElementById('hamburger');
    if (hamburger) hamburger.classList.remove('active');
  }
});
