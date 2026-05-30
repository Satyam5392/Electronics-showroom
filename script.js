/* =============================================
   Sanjay Electronics – script.js v2
   Google Sheets CMS + Product Slideshow
   ============================================= */
'use strict';

// ============================================================
// GOOGLE SHEETS CONFIG
// STEP 1: Create your Google Sheet with tabs:
//   - store_info (key | value)
//   - products   (id | name | brand | category | price | mrp | emi | warranty | badge | image_url | image2 | image3 | image4 | image5)
//   - offers     (title | subtitle | tag | bg_color | end_date | category | button_text)
// STEP 2: File → Share → Publish to web → each tab as CSV
// STEP 3: Paste your Sheet ID below
// ============================================================
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';

const SHEET_URLS = {
  store_info: `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=store_info`,
  products:   `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=products`,
  offers:     `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=offers`,
};

// ============================================================
// FALLBACK DATA (used when Sheet is not connected yet)
// Edit this data for your demo presentation
// ============================================================
const DEFAULT_STORE = {
  store_name:    'Sanjay Electronics',
  logo_initial:  'S',
  tagline:       'Electronics & Appliances',
  address_short: 'Main Road, Salipur, Cuttack – 754202',
  address_full:  'Main Road, Salipur, District Cuttack, Odisha – 754202',
  phone:         '+91 98765 43210',
  whatsapp:      '919876543210',
  email:         'info@sanjayelectronics.com',
  hours_weekday: 'Monday – Saturday: 9:30 AM – 8:30 PM',
  hours_sunday:  'Sunday: 10:00 AM – 7:00 PM',
  hours_short:   'Mon–Sat: 9:30 AM – 8:30 PM',
  hero_badge:    "Salipur & Cuttack's Most Trusted Electronics Store",
  offer_tag:     'Summer Sale On!',
  page_title:    'Sanjay Electronics — Premium Electronics & Appliances in Salipur, Cuttack',
  meta_desc:     'Sanjay Electronics – Salipur\'s most trusted showroom for Mobiles, TVs, ACs, Refrigerators, Furniture, Mattresses & more. Easy EMI, Free Delivery.',
  og_title:      'Sanjay Electronics — Premium Electronics & Home Store',
  og_desc:       '15+ Years of trust. 50+ Brands. Visit us in Salipur, Cuttack.',
};

// Each product can have up to 5 images (image_url, image2, image3, image4, image5)
// For demo we use Unsplash URLs — replace with actual product photos
const DEFAULT_PRODUCTS = [
  // MOBILES
  { id:1, cat:'Mobile', name:'Galaxy S24 Ultra', brand:'Samsung', model:'SM-S928B',
    price:134999, mrp:149999, emi:'₹5,625/mo', warranty:'1 Year', badge:'Best Seller',
    images:[
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&q=80',
      'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=500&q=80',
    ]},
  { id:2, cat:'Mobile', name:'iPhone 16 Pro Max', brand:'Apple', model:'MTQN3HN/A',
    price:134900, mrp:149900, emi:'₹5,625/mo', warranty:'1 Year', badge:'New',
    images:[
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&q=80',
    ]},
  { id:3, cat:'Mobile', name:'OnePlus 12', brand:'OnePlus', model:'CPH2573',
    price:64999, mrp:69999, emi:'₹2,708/mo', warranty:'1 Year', badge:'',
    images:[
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&q=80',
    ]},
  { id:4, cat:'Mobile', name:'Redmi Note 13 Pro+', brand:'Xiaomi', model:'RN13PP',
    price:29999, mrp:34999, emi:'₹1,250/mo', warranty:'1 Year', badge:'Popular',
    images:[
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&q=80',
      'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=500&q=80',
    ]},
  // SMART TVs
  { id:5, cat:'Smart TV', name:'65" 4K QLED Smart TV', brand:'Samsung', model:'QA65Q70D',
    price:89990, mrp:109999, emi:'₹3,750/mo', warranty:'1 Year', badge:'4K QLED',
    images:[
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80',
      'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=500&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
    ]},
  { id:6, cat:'Smart TV', name:'55" OLED Smart TV', brand:'LG', model:'OLED55C4',
    price:129990, mrp:149999, emi:'₹5,416/mo', warranty:'1 Year', badge:'OLED',
    images:[
      'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=500&q=80',
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80',
    ]},
  { id:7, cat:'Smart TV', name:'43" 4K Android TV', brand:'Sony', model:'KD-43X74L',
    price:44990, mrp:54999, emi:'₹1,875/mo', warranty:'1 Year', badge:'',
    images:[
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
      'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=500&q=80',
    ]},
  // ACs
  { id:8, cat:'AC', name:'1.5T 5-Star Inverter Split AC', brand:'Voltas', model:'185V DZW',
    price:45990, mrp:54990, emi:'₹1,916/mo', warranty:'5 Years (Compressor)', badge:'5-Star',
    images:[
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80',
      'https://images.unsplash.com/photo-1631083191779-c1c2d4b2b9e3?w=500&q=80',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&q=80',
    ]},
  { id:9, cat:'AC', name:'1.5T Premium Inverter AC', brand:'Daikin', model:'FTKG50TV',
    price:52990, mrp:61990, emi:'₹2,208/mo', warranty:'5 Years (Compressor)', badge:'Best Pick',
    images:[
      'https://images.unsplash.com/photo-1631083191779-c1c2d4b2b9e3?w=500&q=80',
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80',
    ]},
  // REFRIGERATORS
  { id:10, cat:'Refrigerator', name:'591L French Door Refrigerator', brand:'Samsung', model:'RF59C701ES9',
    price:89990, mrp:105000, emi:'₹3,750/mo', warranty:'1 Year', badge:'Premium',
    images:[
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500&q=80',
      'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=500&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80',
    ]},
  { id:11, cat:'Refrigerator', name:'265L Double Door', brand:'Whirlpool', model:'NEOFRESH 278LH',
    price:26990, mrp:31990, emi:'₹1,125/mo', warranty:'1 Year', badge:'Value',
    images:[
      'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=500&q=80',
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500&q=80',
    ]},
  // WASHING MACHINES
  { id:12, cat:'Washing Machine', name:'8kg Front Load WM', brand:'IFB', model:'Senator WXS',
    price:42990, mrp:49990, emi:'₹1,792/mo', warranty:'2 Years', badge:'Top Rated',
    images:[
      'https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=500&q=80',
      'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=500&q=80',
    ]},
  // SOFAS
  { id:13, cat:'Sofa', name:'3+2 Premium Fabric Sofa Set', brand:'Godrej Interio', model:'ZEST 3+2',
    price:42990, mrp:55000, emi:'₹1,792/mo', warranty:'1 Year', badge:'',
    images:[
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&q=80',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&q=80',
    ]},
  { id:14, cat:'Sofa', name:'L-Shaped Leather Sofa', brand:'Evok', model:'Premium L-Sofa',
    price:68990, mrp:85000, emi:'₹2,875/mo', warranty:'1 Year', badge:'Premium',
    images:[
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80',
    ]},
  // MATTRESSES
  { id:15, cat:'Mattress', name:'6" Memory Foam Queen Mattress', brand:'Sleepwell', model:'Vitalize 6in',
    price:22990, mrp:28000, emi:'₹958/mo', warranty:'5 Years', badge:'Ortho',
    images:[
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=500&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80',
    ]},
  // BEDS
  { id:16, cat:'Bed', name:'Queen Platform Bed with Storage', brand:'Nilkamal', model:'Portland QN',
    price:28990, mrp:36000, emi:'₹1,208/mo', warranty:'1 Year', badge:'',
    images:[
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80',
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=500&q=80',
    ]},
  // INVERTERS
  { id:17, cat:'Inverter', name:'1500VA Pure Sine Wave Inverter', brand:'Luminous', model:'Eco Watt Neo 1650',
    price:7490, mrp:8990, emi:'₹312/mo', warranty:'2 Years', badge:'',
    images:[
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&q=80',
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=500&q=80',
    ]},
  // WATER PURIFIERS
  { id:18, cat:'Water Purifier', name:'Grand Star RO+UV Purifier', brand:'Kent', model:'Grand Star',
    price:14990, mrp:18490, emi:'₹625/mo', warranty:'1 Year', badge:'RO+UV',
    images:[
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&q=80',
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&q=80',
    ]},
  // KITCHEN
  { id:19, cat:'Kitchen', name:'28L Convection Microwave', brand:'Samsung', model:'MC28A5033CK',
    price:15990, mrp:19490, emi:'₹666/mo', warranty:'1 Year', badge:'Convection',
    images:[
      'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500&q=80',
      'https://images.unsplash.com/photo-1585515656973-eba4dd5d86ce?w=500&q=80',
    ]},
  { id:20, cat:'Kitchen', name:'750W Mixer Grinder', brand:'Prestige', model:'Iris Plus 750',
    price:3490, mrp:4490, emi:'₹292/mo', warranty:'2 Years', badge:'',
    images:[
      'https://images.unsplash.com/photo-1585515656973-eba4dd5d86ce?w=500&q=80',
      'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500&q=80',
    ]},
];

const DEFAULT_OFFERS = [
  { title:'Beat the Heat', subtitle:'Up to <strong>₹8,000 OFF</strong> on all Air Conditioners. 5-Star rated. Free installation included.', tag:'Summer AC Sale', bg:'offer-blue', end_date:'2025-09-01', category:'AC', button_text:'Shop ACs Now', btn_class:'btn-offer', img:'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80' },
  { title:'Upgrade Your TV', subtitle:'Exchange your old TV and get up to <strong>₹12,000</strong> bonus on 4K Smart TVs.', tag:'TV Exchange Offer', bg:'offer-yellow', end_date:'2025-08-15', category:'Smart TV', button_text:'Shop Smart TVs', btn_class:'btn-offer-dark', img:'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80' },
  { title:'Buy Now, Pay Zero Interest', subtitle:'0% EMI on Mobiles, Refrigerators, Washing Machines & more with major bank cards.', tag:'Zero Cost EMI', bg:'offer-light', end_date:'2025-12-31', category:'', button_text:'View All Products', btn_class:'btn-outline-dark', img:'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80' },
];

const CATEGORIES = [
  { id:'Mobile',          name:'Mobile Phones',       count:'500+', desc:'Latest smartphones from Samsung, Apple, OnePlus, Xiaomi, Vivo, Oppo & more.', img:'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=500&q=80' },
  { id:'Smart TV',        name:'Smart TVs',            count:'150+', desc:'32" to 85" 4K OLED, QLED and LED Smart TVs.', img:'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80' },
  { id:'AC',              name:'Air Conditioners',     count:'80+',  desc:'Split ACs, Window ACs from Voltas, Daikin, LG, Samsung.', img:'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80' },
  { id:'Refrigerator',    name:'Refrigerators',        count:'120+', desc:'Single door, double door, side-by-side refrigerators.', img:'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500&q=80' },
  { id:'Washing Machine', name:'Washing Machines',     count:'90+',  desc:'Top load, front load and semi-automatic washing machines.', img:'https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=500&q=80' },
  { id:'Sofa',            name:'Sofas & Furniture',    count:'60+',  desc:'Premium fabric and leather sofas, recliners, sofa beds.', img:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80' },
  { id:'Mattress',        name:'Mattresses',           count:'50+',  desc:'Memory foam, orthopaedic, spring and coir mattresses.', img:'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=500&q=80' },
  { id:'Bed',             name:'Beds',                 count:'45+',  desc:'Wooden, metal and upholstered bed frames with storage.', img:'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80' },
  { id:'Inverter',        name:'Inverters & UPS',      count:'60+',  desc:'Home inverters, solar inverters. 500VA to 5kVA with battery.', img:'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&q=80' },
  { id:'Water Purifier',  name:'Water Purifiers',      count:'70+',  desc:'RO, UV, UF water purifiers from Kent, Livpure, Aquaguard.', img:'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&q=80' },
  { id:'Kitchen',         name:'Kitchen Appliances',   count:'300+', desc:'Mixer grinders, microwaves, dishwashers, chimneys & more.', img:'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500&q=80' },
];

// ============================================================
// GLOBALS
// ============================================================
let STORE   = { ...DEFAULT_STORE };
let PRODUCTS = [...DEFAULT_PRODUCTS];
let OFFERS   = [...DEFAULT_OFFERS];
let WA_NUMBER = DEFAULT_STORE.whatsapp;

// Lightbox state
let lbImages = [], lbIndex = 0;

// ============================================================
// PAGE LOADER
// ============================================================
window.addEventListener('load', () => {
  loadAllData().then(() => {
    applyStoreInfo();
    initAll();
    setTimeout(() => {
      const loader = document.getElementById('pageLoader');
      if (loader) loader.classList.add('done');
    }, 1600);
  });
});

// ============================================================
// GOOGLE SHEETS LOADER
// ============================================================
async function fetchSheet(name) {
  try {
    const res = await fetch(SHEET_URLS[name]);
    if (!res.ok) throw new Error('fetch failed');
    const text = await res.text();
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const cols = json.table.cols.map(c => c.label.toLowerCase().trim().replace(/\s+/g,'_'));
    return json.table.rows
      .filter(r => r.c && r.c.some(c => c && c.v))
      .map(row => {
        const obj = {};
        row.c.forEach((cell, i) => { obj[cols[i]] = cell ? String(cell.v || '').trim() : ''; });
        return obj;
      });
  } catch(e) {
    return null;
  }
}

async function loadAllData() {
  if (SHEET_ID === 'YOUR_GOOGLE_SHEET_ID_HERE') return; // use defaults

  const [storeRows, productRows, offerRows] = await Promise.all([
    fetchSheet('store_info'),
    fetchSheet('products'),
    fetchSheet('offers'),
  ]);

  if (storeRows) {
    storeRows.forEach(r => { if (r.key) STORE[r.key] = r.value; });
    WA_NUMBER = STORE.whatsapp || DEFAULT_STORE.whatsapp;
  }

  if (productRows && productRows.length) {
    PRODUCTS = productRows.map(r => ({
      id:       r.id,
      cat:      r.category || '',
      name:     r.name || '',
      brand:    r.brand || '',
      model:    r.model || '',
      price:    parseFloat(r.price) || 0,
      mrp:      parseFloat(r.mrp) || 0,
      emi:      r.emi || '',
      warranty: r.warranty || '1 Year',
      badge:    r.badge || '',
      images:   [r.image_url, r.image2, r.image3, r.image4, r.image5].filter(Boolean),
    }));
  }

  if (offerRows && offerRows.length) {
    OFFERS = offerRows.map(r => ({
      title:       r.title || '',
      subtitle:    r.subtitle || '',
      tag:         r.tag || '',
      bg:          r.bg_color || 'offer-light',
      end_date:    r.end_date || '',
      category:    r.category || '',
      button_text: r.button_text || 'Shop Now',
      btn_class:   'btn-offer',
      img:         r.image_url || '',
    }));
  }
}

// ============================================================
// APPLY STORE INFO TO DOM
// ============================================================
function applyStoreInfo() {
  // Text content
  document.querySelectorAll('[data-store]').forEach(el => {
    const key = el.getAttribute('data-store');
    if (STORE[key] !== undefined) el.textContent = STORE[key];
  });

  // Page title & meta
  document.title = STORE.page_title || DEFAULT_STORE.page_title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = STORE.meta_desc || DEFAULT_STORE.meta_desc;

  // Dynamic href links
  document.querySelectorAll('[data-store-href]').forEach(el => {
    const type = el.getAttribute('data-store-href');
    const num = STORE.whatsapp || DEFAULT_STORE.whatsapp;
    const phone = STORE.phone || DEFAULT_STORE.phone;
    const email = STORE.email || DEFAULT_STORE.email;
    if (type === 'wa_link')   el.href = `https://wa.me/${num}?text=Hi!%20I%20want%20to%20enquire%20about%20your%20products.`;
    if (type === 'wa_emi')    el.href = `https://wa.me/${num}?text=Hi!%20I%20want%20to%20apply%20for%20EMI.`;
    if (type === 'tel_link')  el.href = `tel:${phone.replace(/\s/g,'')}`;
    if (type === 'email_link') el.href = `mailto:${email}`;
  });

  // Structured data
  const sd = document.getElementById('structuredData');
  if (sd) {
    const data = {
      "@context":"https://schema.org","@type":"Store",
      "name": STORE.store_name,
      "address":{"@type":"PostalAddress","streetAddress": STORE.address_short,"addressLocality":"Cuttack","addressRegion":"Odisha","postalCode":"754202","addressCountry":"IN"},
      "telephone": STORE.phone,
      "openingHours":["Mo-Sa 09:30-20:30","Su 10:00-19:00"]
    };
    sd.textContent = JSON.stringify(data);
  }
}

// ============================================================
// INIT ALL
// ============================================================
function initAll() {
  AOS.init({ duration:700, once:true, offset:60, easing:'ease-out-cubic' });
  initNavbar();
  initHamburger();
  initSearch();
  renderCategoryGrid();
  renderCategoriesFull();
  renderHomeProducts('all');
  renderProductsPage('all');
  renderOfferBanners();
  renderOffersPage();
  initCounters();
  initCountdowns();
  calcEMI();
  initGSAP();
  addRippleEffect();
}

// ============================================================
// NAVIGATION
// ============================================================
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + id);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top:0, behavior:'smooth' });
  }
  document.querySelectorAll('.nav-link').forEach(l => {
    const oc = l.getAttribute('onclick') || '';
    l.classList.toggle('active', oc.includes(`'${id}'`));
  });
  closeMenu();
}

function initNavbar() {
  window.addEventListener('scroll', () => {
    document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 20);
    const msb = document.getElementById('mobileStickyBar');
    if (msb) msb.style.display = window.scrollY > 300 ? 'flex' : 'none';
  });
  document.getElementById('mobileStickyBar').style.display = 'none';
}

function initHamburger() {
  const h = document.getElementById('hamburger');
  const nl = document.getElementById('navLinks');
  h?.addEventListener('click', () => {
    h.classList.toggle('active');
    nl?.classList.toggle('open');
  });
}

function closeMenu() {
  document.getElementById('hamburger')?.classList.remove('active');
  document.getElementById('navLinks')?.classList.remove('open');
}

// ============================================================
// SEARCH
// ============================================================
function initSearch() {
  const toggle = document.getElementById('searchToggle');
  const dropdown = document.getElementById('searchDropdown');
  const closeBtn = document.getElementById('searchClose');
  const input = document.getElementById('searchInput');
  toggle?.addEventListener('click', () => {
    dropdown?.classList.toggle('open');
    if (dropdown?.classList.contains('open')) setTimeout(() => input?.focus(), 100);
  });
  closeBtn?.addEventListener('click', () => dropdown?.classList.remove('open'));
}

function liveSearch(q) {
  const box = document.getElementById('searchResults');
  if (!box) return;
  if (!q || q.length < 2) { box.innerHTML = ''; return; }
  const results = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.brand.toLowerCase().includes(q.toLowerCase()) ||
    p.cat.toLowerCase().includes(q.toLowerCase())
  ).slice(0, 6);
  if (!results.length) { box.innerHTML = '<p style="color:var(--text-muted);padding:12px;font-size:.88rem;">No products found.</p>'; return; }
  box.innerHTML = results.map(p => `
    <div class="sr-item" onclick="goToProduct('${p.cat}'); document.getElementById('searchDropdown').classList.remove('open');">
      <img src="${p.images[0]}" alt="${p.name}" />
      <div class="sr-item-info">
        <strong>${p.brand} ${p.name}</strong>
        <span>₹${p.price.toLocaleString('en-IN')} · ${p.cat}</span>
      </div>
    </div>
  `).join('');
}

function goToProduct(cat) {
  filterProductsPage(cat, null);
  showPage('products');
}

// ============================================================
// RENDER CATEGORIES
// ============================================================
function renderCategoryGrid() {
  const g = document.getElementById('categoryGrid');
  if (!g) return;
  g.innerHTML = CATEGORIES.slice(0, 9).map((c,i) => `
    <div class="cat-card" onclick="filterProductsPage('${c.id}',null);showPage('products');" data-aos="fade-up" data-aos-delay="${i*40}">
      <div class="cat-img"><img src="${c.img}" alt="${c.name}" loading="lazy"/></div>
      <div class="cat-info"><div class="cat-name">${c.name}</div><div class="cat-count">${c.count} Products</div></div>
    </div>`).join('');
}

function renderCategoriesFull() {
  const g = document.getElementById('categoriesFullGrid');
  if (!g) return;
  g.innerHTML = CATEGORIES.map((c,i) => `
    <div class="cat-full-card" onclick="filterProductsPage('${c.id}',null);showPage('products');" data-aos="fade-up" data-aos-delay="${i*40}">
      <div class="cat-full-img"><img src="${c.img}" alt="${c.name}" loading="lazy"/></div>
      <div class="cat-full-body">
        <div class="cat-full-name">${c.name}</div>
        <div class="cat-full-desc">${c.desc}</div>
        <div class="cat-full-count">${c.count} Products Available</div>
      </div>
    </div>`).join('');
}

// ============================================================
// PRODUCT CARD WITH SLIDESHOW
// ============================================================
function productCardHTML(p) {
  const discount = (p.mrp > p.price) ? Math.round((1 - p.price/p.mrp)*100) : 0;
  const imgs = (p.images && p.images.length) ? p.images : ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80'];
  const badgeCls = p.badge === 'New' ? 'badge-new' : p.badge && ['Hot','Sale','Offer'].includes(p.badge) ? 'badge-hot' : '';
  const waMsg = encodeURIComponent(`Hi! I'm interested in ${p.brand} ${p.name} (₹${p.price.toLocaleString('en-IN')}). Please share details.`);
  const imgAll = JSON.stringify(imgs).replace(/"/g,'&quot;');

  const slideDots = imgs.length > 1
    ? `<div class="slide-dots">${imgs.map((_,i) => `<button class="slide-dot${i===0?' active':''}" onclick="event.stopPropagation();slideGoTo(this,${i})"></button>`).join('')}</div>`
    : '';
  const arrows = imgs.length > 1
    ? `<div class="slide-arrows"><button class="slide-arr" onclick="event.stopPropagation();slidePrev(this)">‹</button><button class="slide-arr" onclick="event.stopPropagation();slideNext(this)">›</button></div>`
    : '';

  return `
  <div class="product-card" data-cat="${p.cat}">
    <div class="product-slideshow" onclick="openLightbox(${imgAll},0)">
      ${imgs.map((src,i) => `
        <div class="slide-img${i===0?' active':''}">
          <img src="${src}" alt="${p.brand} ${p.name}" loading="lazy"/>
        </div>`).join('')}
      ${slideDots}
      ${arrows}
      <div class="product-badge-wrap">
        ${p.badge ? `<span class="product-badge ${badgeCls}">${p.badge}</span>` : ''}
      </div>
    </div>
    <div class="product-body">
      <div class="product-brand">${p.brand}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-meta">
        <span>⚡ ${p.warranty}</span>
        ${p.model ? `<span>${p.model}</span>` : ''}
        ${imgs.length > 1 ? `<span>📷 ${imgs.length} Photos</span>` : ''}
      </div>
      <div class="product-pricing">
        <span class="product-price">₹${p.price.toLocaleString('en-IN')}</span>
        ${p.mrp > p.price ? `<span class="product-mrp">₹${p.mrp.toLocaleString('en-IN')}</span>` : ''}
        ${discount > 3 ? `<span class="product-discount">${discount}% OFF</span>` : ''}
        ${p.emi ? `<span class="product-emi">EMI from <strong>${p.emi}</strong></span>` : ''}
      </div>
      <div class="product-actions">
        <a href="https://wa.me/${WA_NUMBER}?text=${waMsg}" class="btn-wa-product ripple" target="_blank" rel="noopener">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Get Price
        </a>
        <button class="btn-enquire ripple" onclick="quickEnquire('${p.brand} ${p.name}')">Enquire</button>
      </div>
    </div>
  </div>`;
}

// ============================================================
// SLIDESHOW CONTROLS
// ============================================================
function getSlideshow(btn) {
  return btn.closest('.product-slideshow');
}

function slideNext(btn) {
  const ss = getSlideshow(btn);
  const slides = ss.querySelectorAll('.slide-img');
  const dots = ss.querySelectorAll('.slide-dot');
  let cur = [...slides].findIndex(s => s.classList.contains('active'));
  slides[cur].classList.remove('active');
  if (dots[cur]) dots[cur].classList.remove('active');
  cur = (cur + 1) % slides.length;
  slides[cur].classList.add('active');
  if (dots[cur]) dots[cur].classList.add('active');
}

function slidePrev(btn) {
  const ss = getSlideshow(btn);
  const slides = ss.querySelectorAll('.slide-img');
  const dots = ss.querySelectorAll('.slide-dot');
  let cur = [...slides].findIndex(s => s.classList.contains('active'));
  slides[cur].classList.remove('active');
  if (dots[cur]) dots[cur].classList.remove('active');
  cur = (cur - 1 + slides.length) % slides.length;
  slides[cur].classList.add('active');
  if (dots[cur]) dots[cur].classList.add('active');
}

function slideGoTo(dotBtn, idx) {
  const ss = dotBtn.closest('.product-slideshow');
  const slides = ss.querySelectorAll('.slide-img');
  const dots = ss.querySelectorAll('.slide-dot');
  slides.forEach((s,i) => s.classList.toggle('active', i===idx));
  dots.forEach((d,i)  => d.classList.toggle('active', i===idx));
}

// ============================================================
// LIGHTBOX
// ============================================================
function openLightbox(imgs, startIdx) {
  lbImages = Array.isArray(imgs) ? imgs : [imgs];
  lbIndex = startIdx || 0;
  renderLightbox();
  document.getElementById('lightboxModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightboxModal').classList.remove('open');
  document.body.style.overflow = '';
}

function lightboxNav(dir) {
  lbIndex = (lbIndex + dir + lbImages.length) % lbImages.length;
  renderLightbox();
}

function renderLightbox() {
  const img = document.getElementById('lightboxImg');
  const dots = document.getElementById('lightboxDots');
  if (img) { img.src = lbImages[lbIndex]; img.alt = 'Product Image'; }
  if (dots) {
    dots.innerHTML = lbImages.map((_,i) =>
      `<button class="lb-dot${i===lbIndex?' active':''}" onclick="lbIndex=${i};renderLightbox()"></button>`
    ).join('');
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeLightbox(); closeMenu(); document.getElementById('searchDropdown')?.classList.remove('open'); }
  if (e.key === 'ArrowRight') lightboxNav(1);
  if (e.key === 'ArrowLeft')  lightboxNav(-1);
});

// ============================================================
// RENDER PRODUCTS
// ============================================================
function renderHomeProducts(filter) {
  const g = document.getElementById('homeFeaturedProducts');
  if (!g) return;
  const list = filter === 'all' ? PRODUCTS.slice(0, 8) : PRODUCTS.filter(p => p.cat === filter).slice(0, 8);
  g.innerHTML = list.length
    ? list.map(p => productCardHTML(p)).join('')
    : '<p style="color:var(--text-muted);text-align:center;padding:40px;grid-column:1/-1;">No products in this category yet.</p>';
  AOS.refresh?.();
}

function renderProductsPage(filter) {
  const g = document.getElementById('productsPageGrid');
  if (!g) return;
  const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);
  g.innerHTML = list.length
    ? list.map(p => productCardHTML(p)).join('')
    : '<p style="color:var(--text-muted);text-align:center;padding:40px;grid-column:1/-1;">No products found.</p>';
  AOS.refresh?.();
}

function filterHomeProducts(cat, btn) {
  document.querySelectorAll('#homeTabsWrap .tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderHomeProducts(cat);
}

function filterProductsPage(cat, btn) {
  if (btn) {
    document.querySelectorAll('#productsFilterBar .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  } else {
    document.querySelectorAll('#productsFilterBar .tab-btn').forEach(b => {
      const oc = b.getAttribute('onclick') || '';
      b.classList.toggle('active', cat === 'all' ? oc.includes("'all'") : oc.includes(`'${cat}'`));
    });
  }
  renderProductsPage(cat);
}

// ============================================================
// RENDER OFFERS
// ============================================================
function countdownHTML(id, endDate) {
  return `
    <div class="countdown">
      <div class="ct-box"><span class="ct-num" id="${id}-d">00</span><span class="ct-lab">Days</span></div>
      <span class="ct-sep">:</span>
      <div class="ct-box"><span class="ct-num" id="${id}-h">00</span><span class="ct-lab">Hrs</span></div>
      <span class="ct-sep">:</span>
      <div class="ct-box"><span class="ct-num" id="${id}-m">00</span><span class="ct-lab">Min</span></div>
    </div>`;
}

function renderOfferBanners() {
  const g = document.getElementById('offersGrid');
  if (!g) return;
  g.innerHTML = OFFERS.map((o, i) => {
    const cdId = `cd${i+1}`;
    const btnAction = o.category
      ? `filterProductsPage('${o.category}',null);showPage('products');`
      : `showPage('products');`;
    return `
    <div class="offer-card ${o.bg}" onclick="${btnAction}" data-aos="fade-up" data-aos-delay="${i*100}">
      <div class="offer-content">
        <div class="offer-tag">${o.tag}</div>
        <h3>${o.title}</h3>
        <p>${o.subtitle}</p>
        ${o.end_date ? countdownHTML(cdId, o.end_date) : ''}
        <button class="${o.btn_class} ripple" onclick="event.stopPropagation();${btnAction}">${o.button_text}</button>
      </div>
      ${o.img ? `<div class="offer-image"><img src="${o.img}" alt="${o.title}" loading="lazy"/></div>` : ''}
    </div>`;
  }).join('');
  initCountdowns();
}

function renderOffersPage() {
  const g = document.getElementById('offersPageGrid');
  if (!g) return;
  const bgMap = {
    'offer-blue':   'linear-gradient(135deg,#E8F0FB,#dce9f9)',
    'offer-yellow': 'linear-gradient(135deg,#FFF8E7,#fff2cc)',
    'offer-light':  'linear-gradient(135deg,#F7F8FA,#EEF2F7)',
  };
  g.innerHTML = OFFERS.map((o, i) => {
    const action = o.category ? `filterProductsPage('${o.category}',null);showPage('products');` : `showPage('products');`;
    return `
    <div class="offer-page-card" style="background:${bgMap[o.bg]||bgMap['offer-light']};" data-aos="fade-up" data-aos-delay="${i*80}">
      <div class="opc-badge">${o.tag}</div>
      <h3>${o.title}</h3>
      <p>${o.subtitle}</p>
      <button class="btn-primary ripple" onclick="${action}">${o.button_text}</button>
    </div>`;
  }).join('');
}

// ============================================================
// EMI CALCULATOR
// ============================================================
function calcEMI() {
  const price  = parseFloat(document.getElementById('emiPrice')?.value)  || 0;
  const down   = parseFloat(document.getElementById('emiDown')?.value)   || 0;
  const months = parseInt(document.getElementById('emiMonths')?.value)   || 12;
  const rate   = parseFloat(document.getElementById('emiRate')?.value)   || 0;
  const loan   = Math.max(0, price - down);
  let emi = 0, totalInterest = 0, totalCost = loan;
  if (rate === 0) { emi = loan / months; }
  else {
    const r = rate / 12 / 100;
    emi = loan * r * Math.pow(1+r, months) / (Math.pow(1+r, months) - 1);
    totalCost = emi * months;
    totalInterest = totalCost - loan;
  }
  const fmt = n => '₹' + Math.round(n).toLocaleString('en-IN');
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set('emiResult',   fmt(emi));
  set('emiLoan',     fmt(loan));
  set('emiInterest', fmt(totalInterest));
  set('emiTotal',    fmt(totalCost + down));
}

// ============================================================
// COUNTERS
// ============================================================
function initCounters() {
  const nums = document.querySelectorAll('.hstat-num[data-target]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      animateCount(e.target, parseInt(e.target.dataset.target));
      obs.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  nums.forEach(n => obs.observe(n));
}

function animateCount(el, target) {
  const dur = 1800, start = performance.now();
  const update = t => {
    const p = Math.min((t - start) / dur, 1);
    const ease = 1 - Math.pow(1-p, 3);
    const cur = Math.round(target * ease);
    el.textContent = target >= 1000 ? Math.floor(cur/1000) : cur;
    if (p < 1) requestAnimationFrame(update);
    else el.textContent = target >= 1000 ? Math.floor(target/1000) : target;
  };
  requestAnimationFrame(update);
}

// ============================================================
// COUNTDOWN TIMERS
// ============================================================
function initCountdowns() {
  OFFERS.forEach((o, i) => {
    if (!o.end_date) return;
    const id = `cd${i+1}`;
    tick(id, new Date(o.end_date));
  });
}

function tick(id, end) {
  const run = () => {
    const diff = Math.max(0, end - new Date());
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const pad = n => String(n).padStart(2,'0');
    const dEl = document.getElementById(`${id}-d`);
    const hEl = document.getElementById(`${id}-h`);
    const mEl = document.getElementById(`${id}-m`);
    if (dEl) dEl.textContent = pad(d);
    if (hEl) hEl.textContent = pad(h);
    if (mEl) mEl.textContent = pad(m);
  };
  run();
  setInterval(run, 60000);
}

// ============================================================
// GALLERY FILTER
// ============================================================
function filterGallery(dept, btn) {
  document.querySelectorAll('.gallery-tabs .tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.gallery-item').forEach(item => {
    const d = item.getAttribute('data-dept');
    item.classList.toggle('hidden', dept !== 'all' && d !== dept && d !== 'all');
  });
}

// ============================================================
// QUICK ENQUIRE
// ============================================================
function quickEnquire(name) {
  const msg = encodeURIComponent(`Hi! I want to enquire about ${name}. Please share details and best price.`);
  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
}

// ============================================================
// BOOK HOME DEMO MODAL
// ============================================================
function openBookDemo() {
  document.getElementById('demoModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDemoModal() {
  document.getElementById('demoModal').classList.remove('open');
  document.body.style.overflow = '';
}

function submitDemo() {
  const name    = document.getElementById('demoName').value.trim();
  const phone   = document.getElementById('demoPhone').value.trim();
  const product = document.getElementById('demoProduct').value;
  const date    = document.getElementById('demoDate').value.trim();
  if (!name)  { showToast('Please enter your name.'); return; }
  if (!phone || phone.replace(/\D/g,'').length < 10) { showToast('Please enter a valid phone number.'); return; }
  const msg = encodeURIComponent(`Hi! I want to book a FREE Home Demo.\n\nName: ${name}\nPhone: ${phone}\nProduct: ${product || 'To be discussed'}\nPreferred time: ${date || 'Flexible'}\n\nPlease confirm the visit.`);
  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
  closeDemoModal();
  showToast('✅ Opening WhatsApp to confirm your demo!');
}

// ============================================================
// FORM SUBMISSIONS
// ============================================================
function submitEnquiry() {
  const name  = document.getElementById('enqName').value.trim();
  const phone = document.getElementById('enqPhone').value.trim();
  const prod  = document.getElementById('enqProduct').value;
  const msg   = document.getElementById('enqMsg').value.trim();
  if (!name)  { showToast('Please enter your name.'); return; }
  if (!phone || phone.replace(/\D/g,'').length < 10) { showToast('Please enter a valid mobile number.'); return; }
  const waMsg = encodeURIComponent(`Hi! My name is ${name}.\nPhone: ${phone}\nInterested in: ${prod||'General Enquiry'}\n${msg?'Message: '+msg:''}\n\nPlease help me.`);
  window.open(`https://wa.me/${WA_NUMBER}?text=${waMsg}`, '_blank');
  ['enqName','enqPhone','enqMsg'].forEach(id => { const el = document.getElementById(id); if(el) el.value=''; });
  document.getElementById('enqProduct').selectedIndex = 0;
  showToast('✅ Opening WhatsApp with your enquiry!');
}

function submitContact() {
  const name  = document.getElementById('ctcName').value.trim();
  const phone = document.getElementById('ctcPhone').value.trim();
  const prod  = document.getElementById('ctcProduct').value.trim();
  const msg   = document.getElementById('ctcMsg').value.trim();
  if (!name)  { showToast('Please enter your name.'); return; }
  if (!phone || phone.replace(/\D/g,'').length < 10) { showToast('Please enter a valid phone number.'); return; }
  if (!msg)   { showToast('Please enter a message.'); return; }
  const waMsg = encodeURIComponent(`Hi! I'm ${name}.\nPhone: ${phone}\n${prod?'Product: '+prod+'\n':''}Message: ${msg}`);
  window.open(`https://wa.me/${WA_NUMBER}?text=${waMsg}`, '_blank');
  ['ctcName','ctcPhone','ctcEmail','ctcProduct','ctcMsg'].forEach(id => { const el = document.getElementById(id); if(el) el.value=''; });
  showToast('✅ Redirecting to WhatsApp...');
}

function submitService() {
  const name  = document.getElementById('srvName').value.trim();
  const phone = document.getElementById('srvPhone').value.trim();
  const brand = document.getElementById('srvBrand').value.trim();
  const prod  = document.getElementById('srvProduct').value;
  const issue = document.getElementById('srvIssue').value.trim();
  if (!name)  { showToast('Please enter your name.'); return; }
  if (!phone || phone.replace(/\D/g,'').length < 10) { showToast('Please enter a valid phone number.'); return; }
  if (!issue) { showToast('Please describe the issue.'); return; }
  const waMsg = encodeURIComponent(`Hi! I need a SERVICE REQUEST.\n\nName: ${name}\nPhone: ${phone}\nBrand: ${brand||'Not specified'}\nProduct: ${prod||'Not specified'}\nIssue: ${issue}\n\nPlease help me.`);
  window.open(`https://wa.me/${WA_NUMBER}?text=${waMsg}`, '_blank');
  ['srvName','srvPhone','srvBrand','srvIssue'].forEach(id => { const el = document.getElementById(id); if(el) el.value=''; });
  document.getElementById('srvProduct').selectedIndex = 0;
  showToast('✅ Service request sent via WhatsApp!');
}

// ============================================================
// TOAST
// ============================================================
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

// ============================================================
// GSAP ANIMATIONS
// ============================================================
function initGSAP() {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Hero parallax
  const heroBg = document.querySelector('.hero-bg-image img');
  if (heroBg) {
    gsap.to(heroBg, {
      yPercent: 18, ease:'none',
      scrollTrigger:{ trigger:'.hero-section', start:'top top', end:'bottom top', scrub:true }
    });
  }

  // Why cards
  gsap.utils.toArray('.why-card').forEach((c,i) => {
    gsap.fromTo(c, { opacity:0, y:30 }, {
      opacity:1, y:0, duration:.6, delay:i*.06,
      scrollTrigger:{ trigger:c, start:'top 86%', toggleActions:'play none none none' }
    });
  });

  // Floating WA button
  gsap.to('.wa-float', {
    y:-8, duration:2, yoyo:true, repeat:-1, ease:'power1.inOut'
  });
}

// ============================================================
// RIPPLE EFFECT
// ============================================================
function addRippleEffect() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.ripple');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const r = document.createElement('span');
    r.style.cssText = `position:absolute;border-radius:50%;background:rgba(255,255,255,.25);pointer-events:none;
      width:${size}px;height:${size}px;
      left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px;
      transform:scale(0);animation:rippleA .6s ease-out forwards;`;
    btn.appendChild(r);
    setTimeout(() => r.remove(), 700);
  });
  const s = document.createElement('style');
  s.textContent = `@keyframes rippleA{to{transform:scale(1);opacity:0}}`;
  document.head.appendChild(s);
}
