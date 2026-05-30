/* =============================================
   [Store Name] Electronics – Main JavaScript
   ============================================= */

'use strict';

// ==================== DATA ====================

const CATEGORIES = [
  { id: 'Mobile', icon: '📱', name: 'Mobile Phones', count: '500+', desc: 'Latest smartphones from Samsung, Apple, OnePlus, Xiaomi & more. 5G, AMOLED displays, and cutting-edge cameras.' },
  { id: 'AC', icon: '❄️', name: 'Air Conditioners', count: '80+', desc: 'Split ACs, Window ACs, Cassette ACs from Voltas, Daikin, LG, Samsung. 1-star to 5-star energy ratings.' },
  { id: 'Refrigerator', icon: '🧊', name: 'Refrigerators', count: '120+', desc: 'Single door, double door, side-by-side and French door refrigerators. Frost-free and direct cool models.' },
  { id: 'Washing Machine', icon: '🫧', name: 'Washing Machines', count: '90+', desc: 'Top load, front load and semi-automatic washing machines. 6 kg to 12 kg capacity options.' },
  { id: 'Smart TV', icon: '🖥️', name: 'Smart TVs', count: '150+', desc: '32" to 85" 4K OLED, QLED and LED Smart TVs. Android TV, Tizen, webOS platforms.' },
  { id: 'Laptop', icon: '💻', name: 'Laptops', count: '200+', desc: 'Business laptops, gaming laptops, ultrabooks and Chromebooks from Dell, HP, Lenovo, ASUS.' },
  { id: 'Inverter', icon: '⚡', name: 'Inverters', count: '60+', desc: 'Home inverters, solar inverters and UPS systems. 500VA to 5kVA capacity with battery combos.' },
  { id: 'Water Purifier', icon: '💧', name: 'Water Purifiers', count: '70+', desc: 'RO, UV, UF water purifiers from Kent, Livpure, Aquaguard. Wall-mounted and countertop models.' },
  { id: 'Sofa', icon: '🛋️', name: 'Sofas & Recliners', count: '40+', desc: 'Fabric and leather sofas, recliners and sofa beds in L-shape, U-shape and loveseat configurations.' },
  { id: 'Mattress', icon: '🛏️', name: 'Mattresses', count: '50+', desc: 'Memory foam, orthopaedic, spring and coir mattresses. Single, double, queen and king sizes.' },
  { id: 'Bed', icon: '🪑', name: 'Beds & Bedroom', count: '45+', desc: 'Wooden, metal and upholstered bed frames with storage options. Platform beds and divan beds.' },
  { id: 'Kitchen', icon: '🍳', name: 'Kitchen Appliances', count: '300+', desc: 'Mixer grinders, microwave ovens, dishwashers, chimneys, hobs and small kitchen gadgets.' },
];

const PRODUCTS = [
  // Mobiles
  { id: 1, cat: 'Mobile', name: 'Galaxy S24 Ultra', brand: 'Samsung', model: 'SM-S928B', price: 134999, mrp: 149999, img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80', emi: '₹5,625/mo', warranty: '1 Year', badge: 'Best Seller' },
  { id: 2, cat: 'Mobile', name: 'iPhone 16 Pro', brand: 'Apple', model: 'MTQN3HN/A', price: 119900, mrp: 134900, img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80', emi: '₹4,996/mo', warranty: '1 Year', badge: 'New' },
  { id: 3, cat: 'Mobile', name: 'OnePlus 12', brand: 'OnePlus', model: 'CPH2573', price: 64999, mrp: 69999, img: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&q=80', emi: '₹2,708/mo', warranty: '1 Year', badge: '' },
  { id: 4, cat: 'Mobile', name: 'Redmi Note 13 Pro+', brand: 'Xiaomi', model: 'RN13PP', price: 29999, mrp: 34999, img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80', emi: '₹1,250/mo', warranty: '1 Year', badge: 'Popular' },
  // ACs
  { id: 5, cat: 'AC', name: '1.5T 5-Star Split AC', brand: 'Voltas', model: '185V DZW', price: 45990, mrp: 54990, img: 'https://images.unsplash.com/photo-1631083191779-c1c2d4b2b9e3?w=400&q=80', emi: '₹1,916/mo', warranty: '5 Years Comp.', badge: '5-Star' },
  { id: 6, cat: 'AC', name: '1.5T Premium Inverter AC', brand: 'Daikin', model: 'FTKG50TV', price: 52990, mrp: 61990, img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80', emi: '₹2,208/mo', warranty: '5 Years Comp.', badge: 'Best Pick' },
  { id: 7, cat: 'AC', name: '2T 3-Star Dual Cool', brand: 'LG', model: 'RS-Q24YNZE', price: 49990, mrp: 57990, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', emi: '₹2,083/mo', warranty: '5 Years', badge: '' },
  // Refrigerators
  { id: 8, cat: 'Refrigerator', name: '591L French Door Refrigerator', brand: 'Samsung', model: 'RF59C701ES9', price: 89990, mrp: 105000, img: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&q=80', emi: '₹3,750/mo', warranty: '1 Year', badge: 'Premium' },
  { id: 9, cat: 'Refrigerator', name: '655L Side by Side', brand: 'LG', model: 'GC-B257KQBV', price: 79990, mrp: 95000, img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', emi: '₹3,333/mo', warranty: '1 Year', badge: '' },
  { id: 10, cat: 'Refrigerator', name: '265L Double Door', brand: 'Whirlpool', model: 'NEOFRESH 278LH', price: 26990, mrp: 31990, img: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&q=80', emi: '₹1,125/mo', warranty: '1 Year', badge: 'Value' },
  // Washing Machines
  { id: 11, cat: 'Washing Machine', name: '8kg Front Load', brand: 'IFB', model: 'Senator WXS', price: 42990, mrp: 49990, img: 'https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=400&q=80', emi: '₹1,792/mo', warranty: '2 Years', badge: 'Top Rated' },
  { id: 12, cat: 'Washing Machine', name: '10kg Inverter WM', brand: 'LG', model: 'FHV1410Z2P', price: 55990, mrp: 64990, img: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=400&q=80', emi: '₹2,333/mo', warranty: '2 Years', badge: '' },
  // Smart TVs
  { id: 13, cat: 'Smart TV', name: '65" 4K QLED TV', brand: 'Samsung', model: 'QA65Q70D', price: 89990, mrp: 109999, img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80', emi: '₹3,750/mo', warranty: '1 Year', badge: '4K QLED' },
  { id: 14, cat: 'Smart TV', name: '55" OLED TV', brand: 'LG', model: 'OLED55C4', price: 129990, mrp: 149999, img: 'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=400&q=80', emi: '₹5,416/mo', warranty: '1 Year', badge: 'OLED' },
  { id: 15, cat: 'Smart TV', name: '43" 4K Android TV', brand: 'Sony', model: 'KD-43X74L', price: 44990, mrp: 54999, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', emi: '₹1,875/mo', warranty: '1 Year', badge: '' },
  // Laptops
  { id: 16, cat: 'Laptop', name: 'XPS 15 OLED', brand: 'Dell', model: '9530-5760', price: 149990, mrp: 169999, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80', emi: '₹6,249/mo', warranty: '1 Year', badge: 'Premium' },
  { id: 17, cat: 'Laptop', name: 'HP Pavilion 15', brand: 'HP', model: 'EG3083TX', price: 59990, mrp: 74999, img: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&q=80', emi: '₹2,500/mo', warranty: '1 Year', badge: 'Best Value' },
  { id: 18, cat: 'Laptop', name: 'IdeaPad Gaming 3', brand: 'Lenovo', model: '82SA00B5IN', price: 72990, mrp: 84999, img: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80', emi: '₹3,041/mo', warranty: '1 Year', badge: 'Gaming' },
  // Inverters
  { id: 19, cat: 'Inverter', name: '1500VA Pure Sine Wave', brand: 'Luminous', model: 'Eco Watt Neo 1650', price: 7490, mrp: 8990, img: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&q=80', emi: '₹312/mo', warranty: '2 Years', badge: '' },
  { id: 20, cat: 'Inverter', name: '2KVA Solar Inverter', brand: 'Microtek', model: 'SEBz 2000', price: 12990, mrp: 15490, img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80', emi: '₹542/mo', warranty: '2 Years', badge: 'Solar' },
  // Water Purifiers
  { id: 21, cat: 'Water Purifier', name: 'Mineral RO+UV', brand: 'Kent', model: 'Grand Star', price: 14990, mrp: 18490, img: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80', emi: '₹625/mo', warranty: '1 Year', badge: 'RO+UV' },
  { id: 22, cat: 'Water Purifier', name: 'Copper RO Purifier', brand: 'Aquaguard', model: 'Copper Marvel', price: 18490, mrp: 22990, img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80', emi: '₹771/mo', warranty: '1 Year', badge: 'Copper' },
  // Sofas
  { id: 23, cat: 'Sofa', name: '3+2 Fabric Sofa Set', brand: 'Godrej Interio', model: 'ZEST 3+2', price: 42990, mrp: 55000, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80', emi: '₹1,792/mo', warranty: '1 Year', badge: '' },
  { id: 24, cat: 'Sofa', name: 'L-Shaped Leather Sofa', brand: 'Evok', model: 'Premium L-Sofa', price: 68990, mrp: 85000, img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&q=80', emi: '₹2,875/mo', warranty: '1 Year', badge: 'Premium' },
  // Mattresses
  { id: 25, cat: 'Mattress', name: '6" Memory Foam Queen', brand: 'Sleepwell', model: 'Vitalize 6in', price: 22990, mrp: 28000, img: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&q=80', emi: '₹958/mo', warranty: '5 Years', badge: 'Ortho' },
  // Beds
  { id: 26, cat: 'Bed', name: 'Queen Platform Bed', brand: 'Nilkamal', model: 'Portland QN', price: 28990, mrp: 36000, img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80', emi: '₹1,208/mo', warranty: '1 Year', badge: '' },
  // Kitchen
  { id: 27, cat: 'Kitchen', name: '28L Convection Microwave', brand: 'Samsung', model: 'MC28A5033CK', price: 15990, mrp: 19490, img: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&q=80', emi: '₹666/mo', warranty: '1 Year', badge: 'Convection' },
  { id: 28, cat: 'Kitchen', name: '750W Mixer Grinder', brand: 'Prestige', model: 'Iris Plus 750', price: 3490, mrp: 4490, img: 'https://images.unsplash.com/photo-1585515656973-eba4dd5d86ce?w=400&q=80', emi: '₹292/mo', warranty: '2 Years', badge: '' },
];

// ==================== GLOBALS ====================
let compareList = [];
let currentPage = 'home';

// ==================== NAVIGATION ====================
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    currentPage = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // update nav active
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  const activeLink = document.querySelector(`.nav-link[onclick*="'${pageId}'"]`);
  if (activeLink) activeLink.classList.add('active');

  // Close mobile menu
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');

  // Trigger render for pages
  if (pageId === 'categories') renderCategories();
  if (pageId === 'products') { renderAllProducts(PRODUCTS); filterProducts(); }
  if (pageId === 'home') renderFeaturedProducts();
}

function showProductsByCategory(cat) {
  showPage('products');
  setTimeout(() => {
    const sel = document.getElementById('filterCategory');
    if (sel) { sel.value = cat; filterProducts(); }
  }, 100);
}

// ==================== NAVBAR SCROLL ====================
window.addEventListener('scroll', () => {
  const nb = document.getElementById('navbar');
  if (window.scrollY > 20) nb.classList.add('scrolled');
  else nb.classList.remove('scrolled');
});

// ==================== HAMBURGER ====================
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
});

// Nav links click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
    document.getElementById('hamburger').classList.remove('open');
  });
});

// ==================== SEARCH ====================
document.getElementById('searchToggle').addEventListener('click', () => {
  document.getElementById('searchBar').classList.toggle('open');
  if (document.getElementById('searchBar').classList.contains('open')) {
    document.getElementById('searchInput').focus();
  }
});

document.getElementById('searchInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const val = e.target.value.trim();
    if (val) {
      showPage('products');
      setTimeout(() => {
        document.getElementById('productSearch').value = val;
        filterProducts();
      }, 100);
      document.getElementById('searchBar').classList.remove('open');
      document.getElementById('searchInput').value = '';
    }
  }
});

// ==================== RENDER FEATURED (HOME) ====================
function renderFeaturedProducts() {
  const featured = PRODUCTS.filter(p => p.badge && ['Best Seller','New','Popular','4K QLED','OLED','Best Pick','Premium'].includes(p.badge)).slice(0, 8);
  const grid = document.getElementById('featuredProducts');
  if (!grid) return;
  grid.innerHTML = featured.map(p => productCardHTML(p, false)).join('');
}

// ==================== RENDER ALL PRODUCTS ====================
function renderAllProducts(list) {
  const grid = document.getElementById('allProducts');
  if (!grid) return;
  if (list.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--text2)">No products found matching your criteria.</div>';
    return;
  }
  grid.innerHTML = list.map(p => productCardHTML(p, true)).join('');
}

function productCardHTML(p, showCompare) {
  const discount = Math.round((1 - p.price / p.mrp) * 100);
  const inCompare = compareList.find(c => c.id === p.id);
  return `
    <div class="product-card reveal">
      <div class="product-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
        ${showCompare ? `<button class="compare-check ${inCompare ? 'active' : ''}" onclick="toggleCompare(${p.id})" id="cc-${p.id}">
          ${inCompare ? '✓ Added' : '+ Compare'}
        </button>` : ''}
      </div>
      <div class="product-body">
        <div class="product-cat">${p.cat}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-brand">${p.brand}</div>
        <div class="product-model">Model: ${p.model}</div>
        <div class="product-price-row">
          <span class="product-price">₹${p.price.toLocaleString('en-IN')}</span>
          <span class="product-mrp">₹${p.mrp.toLocaleString('en-IN')}</span>
          <span class="product-discount">${discount}% off</span>
        </div>
        <div class="product-meta">
          <span class="emi-tag">EMI: ${p.emi}</span>
          <span>🛡️ ${p.warranty}</span>
        </div>
        <div class="product-actions">
          <a href="https://wa.me/919876543210?text=Hi!%20I%20am%20interested%20in%20${encodeURIComponent(p.brand + ' ' + p.name)}%20(Model:%20${p.model}).%20Please%20share%20details." class="btn-wa" target="_blank">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Enquire
          </a>
          <button class="btn-enquire" onclick="showPage('contact')">Buy Now</button>
        </div>
      </div>
    </div>`;
}

// ==================== RENDER CATEGORIES ====================
function renderCategories() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid || grid.children.length) return;
  grid.innerHTML = CATEGORIES.map(c => `
    <div class="cat-card reveal" onclick="showProductsByCategory('${c.id}')">
      <div class="cat-icon">${c.icon}</div>
      <div class="cat-name">${c.name}</div>
      <div class="cat-count">${c.count} Products</div>
      <div class="cat-desc">${c.desc}</div>
      <button class="cat-btn">View Products →</button>
    </div>`).join('');
  observeReveal();
}

// ==================== FILTER PRODUCTS ====================
function filterProducts() {
  const cat = document.getElementById('filterCategory')?.value || '';
  const sort = document.getElementById('filterSort')?.value || 'default';
  const search = (document.getElementById('productSearch')?.value || '').toLowerCase();

  let list = PRODUCTS.filter(p => {
    const matchCat = !cat || p.cat === cat;
    const matchSearch = !search || p.name.toLowerCase().includes(search) || p.brand.toLowerCase().includes(search) || p.cat.toLowerCase().includes(search);
    return matchCat && matchSearch;
  });

  if (sort === 'price-low') list.sort((a, b) => a.price - b.price);
  if (sort === 'price-high') list.sort((a, b) => b.price - a.price);

  renderAllProducts(list);
  setTimeout(observeReveal, 50);
}

// ==================== EMI CALCULATOR ====================
function toggleEMI() {
  const body = document.getElementById('emiBody');
  const icon = document.getElementById('emiToggleIcon');
  body.classList.toggle('open');
  icon.textContent = body.classList.contains('open') ? '▲' : '▼';
  if (body.classList.contains('open')) calcEMI();
}

function calcEMI() {
  const P = parseFloat(document.getElementById('emiPrice')?.value) || 0;
  const n = parseInt(document.getElementById('emiTenure')?.value) || 12;
  const rAnnual = parseFloat(document.getElementById('emiRate')?.value) || 0;

  let monthly, total, interest;
  if (rAnnual === 0) {
    monthly = P / n;
    total = P;
    interest = 0;
  } else {
    const r = rAnnual / 12 / 100;
    monthly = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    total = monthly * n;
    interest = total - P;
  }

  const fmt = v => '₹' + Math.round(v).toLocaleString('en-IN');
  document.getElementById('emiMonthly').textContent = fmt(monthly);
  document.getElementById('emiTotal').textContent = fmt(total);
  document.getElementById('emiInterest').textContent = fmt(interest);
}

// ==================== COMPARE ====================
function toggleCompare(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const idx = compareList.findIndex(p => p.id === id);
  if (idx >= 0) {
    compareList.splice(idx, 1);
    showToast(`${product.name} removed from compare`);
  } else {
    if (compareList.length >= 3) { showToast('You can compare up to 3 products only'); return; }
    compareList.push(product);
    showToast(`${product.name} added to compare`);
  }

  updateCompareBar();
  // Update button state
  const btn = document.getElementById('cc-' + id);
  if (btn) {
    const inList = compareList.find(p => p.id === id);
    btn.textContent = inList ? '✓ Added' : '+ Compare';
    btn.classList.toggle('active', !!inList);
  }
}

function updateCompareBar() {
  const bar = document.getElementById('compareBar');
  const itemsEl = document.getElementById('compareItems');
  if (!bar || !itemsEl) return;

  if (compareList.length === 0) {
    bar.classList.remove('visible');
    return;
  }
  bar.classList.add('visible');
  itemsEl.innerHTML = '<span class="compare-label">Compare:</span>' +
    compareList.map(p => `<span class="compare-chip">${p.brand} ${p.name} <button onclick="toggleCompare(${p.id})">✕</button></span>`).join('');
}

function clearCompare() {
  compareList = [];
  updateCompareBar();
  document.querySelectorAll('.compare-check').forEach(btn => {
    btn.textContent = '+ Compare';
    btn.classList.remove('active');
  });
}

function compareProducts() {
  if (compareList.length < 2) { showToast('Add at least 2 products to compare'); return; }

  const fields = ['name','brand','cat','model','price','emi','warranty'];
  const labels = { name:'Product', brand:'Brand', cat:'Category', model:'Model', price:'Price', emi:'EMI', warranty:'Warranty' };

  let html = '<div style="padding:24px;overflow-x:auto"><table class="compare-table"><thead><tr><th>Feature</th>' +
    compareList.map(p => `<th>${p.brand} ${p.name}</th>`).join('') + '</tr></thead><tbody>';

  fields.forEach(f => {
    html += `<tr><td style="font-weight:600;color:var(--text2)">${labels[f]}</td>`;
    compareList.forEach(p => {
      let val = f === 'price' ? '₹' + p[f].toLocaleString('en-IN') : p[f];
      html += `<td>${val}</td>`;
    });
    html += '</tr>';
  });

  html += '</tbody></table></div>';
  document.getElementById('compareTableWrap').innerHTML = html;
  document.getElementById('compareModal').classList.add('open');
}

document.getElementById('compareModal').addEventListener('click', function(e) {
  if (e.target === this) this.classList.remove('open');
});

// ==================== FAQ ====================
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-a').classList.remove('open');
    });
    if (!isOpen) {
      item.classList.add('open');
      item.querySelector('.faq-a').classList.add('open');
    }
  });
});

// ==================== FORMS ====================
function submitService() {
  const name = document.getElementById('svcName')?.value.trim();
  const phone = document.getElementById('svcPhone')?.value.trim();
  const cat = document.getElementById('svcCategory')?.value;
  const problem = document.getElementById('svcProblem')?.value.trim();

  if (!name || !phone || !cat || !problem) {
    showToast('Please fill in all required fields');
    return;
  }
  if (!/^[6-9]\d{9}$/.test(phone.replace(/[\s+]/g, ''))) {
    showToast('Please enter a valid Indian phone number');
    return;
  }

  const brand = document.getElementById('svcBrand')?.value || '';
  const model = document.getElementById('svcModel')?.value || '';
  const date = document.getElementById('svcDate')?.value || '';

  const msg = `Hello [Store Name]! I'd like to book a service request.\n\nName: ${name}\nPhone: ${phone}\nCategory: ${cat}\nBrand: ${brand}\nModel: ${model}\nPreferred Date: ${date}\nProblem: ${problem}`;

  window.open('https://wa.me/919876543210?text=' + encodeURIComponent(msg), '_blank');
  showToast('Redirecting to WhatsApp... ✅');

  // Reset form
  ['svcName','svcPhone','svcBrand','svcModel','svcProblem','svcDate'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.getElementById('svcCategory').selectedIndex = 0;
}

function submitContact() {
  const name = document.getElementById('ctcName')?.value.trim();
  const phone = document.getElementById('ctcPhone')?.value.trim();
  const msg = document.getElementById('ctcMsg')?.value.trim();

  if (!name || !phone || !msg) {
    showToast('Please fill in all required fields');
    return;
  }

  const product = document.getElementById('ctcProduct')?.value || '';
  const email = document.getElementById('ctcEmail')?.value || '';

  const waMsg = `Hello [Store Name]!\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nInterested In: ${product}\n\nMessage: ${msg}`;

  window.open('https://wa.me/919876543210?text=' + encodeURIComponent(waMsg), '_blank');
  showToast('Enquiry sent via WhatsApp! ✅');

  ['ctcName','ctcPhone','ctcEmail','ctcProduct','ctcMsg'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

// ==================== TOAST ====================
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

// ==================== SCROLL REVEAL ====================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

function observeReveal() {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  showPage('home');
  renderFeaturedProducts();
  calcEMI();
  observeReveal();

  // Re-observe on page switch
  const pageObserver = new MutationObserver(() => {
    setTimeout(observeReveal, 100);
  });
  document.querySelectorAll('.page').forEach(page => {
    pageObserver.observe(page, { attributes: true, attributeFilter: ['class'] });
  });

  // Service date minimum today
  const svcDate = document.getElementById('svcDate');
  if (svcDate) {
    const today = new Date().toISOString().split('T')[0];
    svcDate.min = today;
  }
});

// ==================== KEYBOARD SHORTCUT ====================
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('searchBar').classList.add('open');
    document.getElementById('searchInput').focus();
  }
  if (e.key === 'Escape') {
    document.getElementById('searchBar').classList.remove('open');
    document.getElementById('compareModal').classList.remove('open');
  }
});
