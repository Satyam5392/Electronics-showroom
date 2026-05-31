/* =============================================
   Sanjay Electronics — script.js VERSION 2
   Enterprise Edition
   Features:
   ✅ Google Sheets CMS (8 tabs)
   ✅ Lead Tracking System
   ✅ Online Booking System
   ✅ Product Comparison (up to 3)
   ✅ Multi-Branch Management
   ✅ Light CRM Dashboard
   ✅ Dynamic Reviews from Sheets
   ✅ Product Slideshow + Lightbox
   ✅ WhatsApp Integration
   ✅ EMI Calculator
   ============================================= */
'use strict';

// ============================================================
//  CONFIG — paste your IDs here
// ============================================================
const SHEET_ID        = 'YOUR_GOOGLE_SHEET_ID_HERE';
const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';

const SHEET_BASE = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=`;

// ============================================================
//  GLOBAL STATE
// ============================================================
let STORE      = {};
let PRODUCTS   = [];
let OFFERS     = [];
let REVIEWS    = [];
let BRANCHES   = [];
let ACTIVE_BRANCH = null;   // null = show all
let COMPARE_LIST  = [];     // max 3 products
let WA_NUMBER     = '919876543210';

// Lightbox state
let lbImages = [], lbIndex = 0;

// ============================================================
//  DEFAULT FALLBACK DATA
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
};

const DEFAULT_BRANCHES = [
  { branch_id:'BR001', branch_name:'Salipur Main Branch',
    address:'Main Road, Salipur, Cuttack – 754202',
    phone:'+91 98765 43210', whatsapp:'919876543210',
    email:'info@sanjayelectronics.com',
    map_embed_url:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14955.0!2d85.8!3d20.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSalipur%2C+Cuttack%2C+Odisha!5e0!3m2!1sen!2sin!4v1',
    opening_hours:'Mon–Sat: 9:30 AM – 8:30 PM | Sun: 10 AM – 7 PM',
    active:'YES' },
  { branch_id:'BR002', branch_name:'Cuttack City Branch',
    address:'Buxi Bazar, Cuttack – 753001',
    phone:'+91 97654 32109', whatsapp:'919765432109',
    email:'cuttack@sanjayelectronics.com',
    map_embed_url:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14968.0!2d85.88!3d20.46!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCuttack%2C+Odisha!5e0!3m2!1sen!2sin!4v1',
    opening_hours:'Mon–Sat: 10:00 AM – 9:00 PM | Sun: 10 AM – 7 PM',
    active:'YES' },
];

const DEFAULT_PRODUCTS = [
  { product_id:'P001', category:'Mobile', product_name:'Galaxy S24 Ultra', brand:'Samsung', price:134999, mrp:149999, emi:'₹5,625/mo', warranty:'1 Year', badge:'Best Seller', description:'Flagship smartphone with S-Pen, 200MP camera, and AI features.', feature1:'200MP Camera', feature2:'S-Pen Included', feature3:'5000mAh Battery', images:['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80','https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&q=80','https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=500&q=80'], branch_id:'', active:'YES' },
  { product_id:'P002', category:'Mobile', product_name:'iPhone 16 Pro Max', brand:'Apple', price:134900, mrp:149900, emi:'₹5,625/mo', warranty:'1 Year', badge:'New', description:'Apple\'s most powerful iPhone with A18 Pro chip and titanium design.', feature1:'A18 Pro Chip', feature2:'Titanium Design', feature3:'48MP Camera System', images:['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80','https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&q=80'], branch_id:'', active:'YES' },
  { product_id:'P003', category:'Mobile', product_name:'OnePlus 12', brand:'OnePlus', price:64999, mrp:69999, emi:'₹2,708/mo', warranty:'1 Year', badge:'', description:'Flagship killer with Snapdragon 8 Gen 3 and Hasselblad cameras.', feature1:'Snapdragon 8 Gen 3', feature2:'Hasselblad Camera', feature3:'100W SuperVOOC Charging', images:['https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&q=80'], branch_id:'', active:'YES' },
  { product_id:'P004', category:'Mobile', product_name:'Redmi Note 13 Pro+', brand:'Xiaomi', price:29999, mrp:34999, emi:'₹1,250/mo', warranty:'1 Year', badge:'Popular', description:'Best mid-range phone with 200MP camera and 120W charging.', feature1:'200MP Camera', feature2:'120W Charging', feature3:'5000mAh Battery', images:['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&q=80'], branch_id:'', active:'YES' },
  { product_id:'P005', category:'Smart TV', product_name:'65" 4K QLED Smart TV', brand:'Samsung', price:89990, mrp:109999, emi:'₹3,750/mo', warranty:'1 Year', badge:'4K QLED', description:'Stunning QLED display with Quantum HDR and smart features.', feature1:'4K QLED Display', feature2:'Quantum HDR', feature3:'Smart TV Tizen OS', images:['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80','https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=500&q=80'], branch_id:'', active:'YES' },
  { product_id:'P006', category:'Smart TV', product_name:'55" OLED Smart TV', brand:'LG', price:129990, mrp:149999, emi:'₹5,416/mo', warranty:'1 Year', badge:'OLED', description:'Perfect black levels and infinite contrast with OLED technology.', feature1:'OLED Display', feature2:'Dolby Vision IQ', feature3:'webOS Smart Platform', images:['https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=500&q=80'], branch_id:'', active:'YES' },
  { product_id:'P007', category:'Smart TV', product_name:'43" 4K Android TV', brand:'Sony', price:44990, mrp:54999, emi:'₹1,875/mo', warranty:'1 Year', badge:'', description:'Google TV with Cognitive Processor XR for realistic picture.', feature1:'4K HDR Display', feature2:'Google TV', feature3:'Cognitive Processor XR', images:['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80'], branch_id:'', active:'YES' },
  { product_id:'P008', category:'AC', product_name:'1.5T 5-Star Inverter Split AC', brand:'Voltas', price:45990, mrp:54990, emi:'₹1,916/mo', warranty:'5 Years Compressor', badge:'5-Star', description:'Energy-efficient inverter AC with intelligent cooling technology.', feature1:'5-Star BEE Rating', feature2:'Inverter Technology', feature3:'Auto Restart', images:['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80','https://images.unsplash.com/photo-1631083191779-c1c2d4b2b9e3?w=500&q=80'], branch_id:'', active:'YES' },
  { product_id:'P009', category:'AC', product_name:'1.5T Premium Inverter AC', brand:'Daikin', price:52990, mrp:61990, emi:'₹2,208/mo', warranty:'5 Years Compressor', badge:'Best Pick', description:'Japanese technology with advanced air purification and silent operation.', feature1:'Japanese Technology', feature2:'Air Purification', feature3:'Silent Operation 19dB', images:['https://images.unsplash.com/photo-1631083191779-c1c2d4b2b9e3?w=500&q=80'], branch_id:'', active:'YES' },
  { product_id:'P010', category:'Refrigerator', product_name:'591L French Door Refrigerator', brand:'Samsung', price:89990, mrp:105000, emi:'₹3,750/mo', warranty:'1 Year', badge:'Premium', description:'Large capacity French door with Twin Cooling Plus technology.', feature1:'Twin Cooling Plus', feature2:'Metal Cooling', feature3:'Power Freeze', images:['https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500&q=80','https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=500&q=80'], branch_id:'', active:'YES' },
  { product_id:'P011', category:'Refrigerator', product_name:'265L Double Door', brand:'Whirlpool', price:26990, mrp:31990, emi:'₹1,125/mo', warranty:'1 Year', badge:'Value', description:'Frost-free double door with Intellifresh technology.', feature1:'Frost Free', feature2:'Intellifresh Tech', feature3:'6th Sense Technology', images:['https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=500&q=80'], branch_id:'', active:'YES' },
  { product_id:'P012', category:'Washing Machine', product_name:'8kg Front Load WM', brand:'IFB', price:42990, mrp:49990, emi:'₹1,792/mo', warranty:'2 Years', badge:'Top Rated', description:'Aqua Energie technology for better wash with hard water.', feature1:'Aqua Energie', feature2:'3D Wash System', feature3:'In-Built Heater', images:['https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=500&q=80'], branch_id:'', active:'YES' },
  { product_id:'P013', category:'Sofa', product_name:'3+2 Premium Fabric Sofa Set', brand:'Godrej Interio', price:42990, mrp:55000, emi:'₹1,792/mo', warranty:'1 Year', badge:'', description:'Premium fabric sofa set with solid wood frame and high-density foam.', feature1:'Solid Wood Frame', feature2:'High-Density Foam', feature3:'Stain-Resistant Fabric', images:['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80','https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&q=80'], branch_id:'', active:'YES' },
  { product_id:'P014', category:'Sofa', product_name:'L-Shaped Leather Sofa', brand:'Evok', price:68990, mrp:85000, emi:'₹2,875/mo', warranty:'1 Year', badge:'Premium', description:'Premium PU leather L-shaped sofa with recliner option.', feature1:'Premium PU Leather', feature2:'Recliner Option', feature3:'Storage Ottoman', images:['https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&q=80'], branch_id:'', active:'YES' },
  { product_id:'P015', category:'Mattress', product_name:'6" Memory Foam Queen Mattress', brand:'Sleepwell', price:22990, mrp:28000, emi:'₹958/mo', warranty:'5 Years', badge:'Ortho', description:'Orthopedic memory foam mattress with cooling gel technology.', feature1:'Memory Foam', feature2:'Cooling Gel Layer', feature3:'Orthopedic Support', images:['https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=500&q=80'], branch_id:'', active:'YES' },
  { product_id:'P016', category:'Bed', product_name:'Queen Platform Bed with Storage', brand:'Nilkamal', price:28990, mrp:36000, emi:'₹1,208/mo', warranty:'1 Year', badge:'', description:'Solid wood queen bed with hydraulic storage mechanism.', feature1:'Hydraulic Storage', feature2:'Solid Wood Construction', feature3:'Anti-Termite Treatment', images:['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80'], branch_id:'', active:'YES' },
  { product_id:'P017', category:'Inverter', product_name:'1500VA Pure Sine Wave Inverter', brand:'Luminous', price:7490, mrp:8990, emi:'₹312/mo', warranty:'2 Years', badge:'', description:'Pure sine wave output for safe use with all appliances.', feature1:'Pure Sine Wave', feature2:'Fast Charging', feature3:'LCD Display', images:['https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&q=80'], branch_id:'', active:'YES' },
  { product_id:'P018', category:'Water Purifier', product_name:'Grand Star RO+UV Purifier', brand:'Kent', price:14990, mrp:18490, emi:'₹625/mo', warranty:'1 Year', badge:'RO+UV', description:'7-stage RO+UV+TDS purification with mineral retention.', feature1:'7-Stage Purification', feature2:'TDS Controller', feature3:'Mineral Retention', images:['https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&q=80'], branch_id:'', active:'YES' },
  { product_id:'P019', category:'Kitchen', product_name:'28L Convection Microwave', brand:'Samsung', price:15990, mrp:19490, emi:'₹666/mo', warranty:'1 Year', badge:'Convection', description:'Convection microwave with SlimFry technology for healthy cooking.', feature1:'Convection + Grill', feature2:'SlimFry Technology', feature3:'Auto Cook Menu', images:['https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500&q=80'], branch_id:'', active:'YES' },
  { product_id:'P020', category:'Kitchen', product_name:'750W Mixer Grinder', brand:'Prestige', price:3490, mrp:4490, emi:'₹292/mo', warranty:'2 Years', badge:'', description:'Heavy-duty mixer grinder with 3 stainless steel jars.', feature1:'750W Motor', feature2:'3 SS Jars', feature3:'5-Year Motor Warranty', images:['https://images.unsplash.com/photo-1585515656973-eba4dd5d86ce?w=500&q=80'], branch_id:'', active:'YES' },
];

const DEFAULT_REVIEWS = [
  { customer_name:'Rakesh Sahu',   rating:5, review_text:'Bought a Samsung 65" QLED TV. Price was better than any online store and installation was done next day!', customer_image:'', active:'YES' },
  { customer_name:'Priya Mishra',  rating:5, review_text:'Got a great exchange deal on my old AC. Staff was very knowledgeable. Highly recommend!', customer_image:'', active:'YES' },
  { customer_name:'Anita Das',     rating:5, review_text:'Purchased complete bedroom set. Zero cost EMI and delivery was on time. Will definitely come back.', customer_image:'', active:'YES' },
  { customer_name:'Vikram Nayak',  rating:5, review_text:'iPhone was genuine and competitively priced. Got invoice and warranty card immediately.', customer_image:'', active:'YES' },
  { customer_name:'Sunita Panda',  rating:5, review_text:'My go-to store for all electronics. Bought refrigerator, washing machine and sofa set here!', customer_image:'', active:'YES' },
  { customer_name:'Mohammed Alam', rating:5, review_text:'After-sales service is outstanding. AC issue resolved within 24 hours under warranty. 10/10!', customer_image:'', active:'YES' },
];

const DEFAULT_OFFERS = [
  { title:'Beat the Heat', subtitle:'Up to <strong>₹8,000 OFF</strong> on all ACs. 5-Star rated. Free installation included.', tag:'Summer AC Sale', bg:'offer-blue', end_date:'2025-09-01', category:'AC', button_text:'Shop ACs Now', btn_class:'btn-offer', img:'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80', active:'YES' },
  { title:'Upgrade Your TV', subtitle:'Exchange old TV → get up to <strong>₹12,000</strong> bonus on 4K Smart TVs.', tag:'TV Exchange Offer', bg:'offer-yellow', end_date:'2025-08-15', category:'Smart TV', button_text:'Shop Smart TVs', btn_class:'btn-offer-dark', img:'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80', active:'YES' },
  { title:'Buy Now, Pay Zero Interest', subtitle:'0% EMI on Mobiles, Refrigerators, Washing Machines & more.', tag:'Zero Cost EMI', bg:'offer-light', end_date:'2025-12-31', category:'', button_text:'View All Products', btn_class:'btn-outline-dark', img:'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80', active:'YES' },
];

const CATEGORIES = [
  { id:'Mobile',          name:'Mobile Phones',     count:'500+', desc:'Latest smartphones from Samsung, Apple, OnePlus, Xiaomi & more.', img:'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=500&q=80' },
  { id:'Smart TV',        name:'Smart TVs',          count:'150+', desc:'32" to 85" 4K OLED, QLED and LED Smart TVs.', img:'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80' },
  { id:'AC',              name:'Air Conditioners',   count:'80+',  desc:'Split ACs, Window ACs from Voltas, Daikin, LG, Samsung.', img:'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80' },
  { id:'Refrigerator',    name:'Refrigerators',      count:'120+', desc:'Single door, double door, side-by-side refrigerators.', img:'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500&q=80' },
  { id:'Washing Machine', name:'Washing Machines',   count:'90+',  desc:'Top load, front load washing machines.', img:'https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=500&q=80' },
  { id:'Sofa',            name:'Sofas & Furniture',  count:'60+',  desc:'Premium fabric and leather sofas, recliners.', img:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80' },
  { id:'Mattress',        name:'Mattresses',         count:'50+',  desc:'Memory foam, orthopaedic, spring mattresses.', img:'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=500&q=80' },
  { id:'Bed',             name:'Beds',               count:'45+',  desc:'Wooden, metal and upholstered bed frames.', img:'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80' },
  { id:'Inverter',        name:'Inverters & UPS',    count:'60+',  desc:'Home inverters, solar inverters, 500VA to 5kVA.', img:'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&q=80' },
  { id:'Water Purifier',  name:'Water Purifiers',    count:'70+',  desc:'RO, UV, UF water purifiers from Kent, Livpure.', img:'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&q=80' },
  { id:'Kitchen',         name:'Kitchen Appliances', count:'300+', desc:'Microwaves, mixer grinders, chimneys & more.', img:'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500&q=80' },
];

// ============================================================
//  PAGE LOADER
// ============================================================
window.addEventListener('load', () => {
  loadAllData().then(() => {
    applyStoreInfo();
    initAll();
    setTimeout(() => document.getElementById('pageLoader')?.classList.add('done'), 1800);
  });
});

// ============================================================
//  GOOGLE SHEETS LOADER
// ============================================================
async function fetchSheet(name) {
  try {
    const res  = await fetch(SHEET_BASE + encodeURIComponent(name));
    if (!res.ok) throw new Error('fetch failed');
    const text = await res.text();
    const json = JSON.parse(text.substring(47).slice(0, -2));
    if (!json.table || !json.table.cols) return null;
    const cols = json.table.cols.map(c => c.label.toLowerCase().trim().replace(/\s+/g,'_'));
    return json.table.rows
      .filter(r => r.c && r.c.some(c => c && c.v !== null && c.v !== ''))
      .map(row => {
        const obj = {};
        row.c.forEach((cell, i) => { obj[cols[i]] = cell ? String(cell.v ?? '').trim() : ''; });
        return obj;
      });
  } catch { return null; }
}

async function loadAllData() {
  if (SHEET_ID === 'YOUR_GOOGLE_SHEET_ID_HERE') {
    // Use defaults
    STORE    = { ...DEFAULT_STORE };
    PRODUCTS = DEFAULT_PRODUCTS.map(normalizeProduct);
    OFFERS   = DEFAULT_OFFERS;
    REVIEWS  = DEFAULT_REVIEWS;
    BRANCHES = DEFAULT_BRANCHES;
    WA_NUMBER = DEFAULT_STORE.whatsapp;
    return;
  }

  const [storeRows, productRows, offerRows, reviewRows, branchRows] = await Promise.all([
    fetchSheet('store_info'),
    fetchSheet('products'),
    fetchSheet('offers'),
    fetchSheet('reviews'),
    fetchSheet('branches'),
  ]);

  // Store info
  STORE = { ...DEFAULT_STORE };
  if (storeRows) storeRows.forEach(r => { if (r.key) STORE[r.key] = r.value; });
  WA_NUMBER = STORE.whatsapp || DEFAULT_STORE.whatsapp;

  // Products
  PRODUCTS = (productRows && productRows.length)
    ? productRows.filter(r => r.active?.toUpperCase() !== 'NO').map(normalizeProduct)
    : DEFAULT_PRODUCTS.map(normalizeProduct);

  // Offers
  OFFERS = (offerRows && offerRows.length)
    ? offerRows.filter(r => r.active?.toUpperCase() !== 'NO').map(r => ({
        title:       r.title || r.offer_title || '',
        subtitle:    r.subtitle || r.offer_description || '',
        tag:         r.tag || '',
        bg:          r.bg_color || 'offer-light',
        end_date:    r.end_date || '',
        category:    r.category || '',
        button_text: r.button_text || 'Shop Now',
        btn_class:   'btn-offer',
        img:         r.image_url || r.banner_image || '',
      }))
    : DEFAULT_OFFERS;

  // Reviews
  REVIEWS = (reviewRows && reviewRows.length)
    ? reviewRows.filter(r => r.active?.toUpperCase() !== 'NO')
    : DEFAULT_REVIEWS;

  // Branches
  BRANCHES = (branchRows && branchRows.length)
    ? branchRows.filter(r => r.active?.toUpperCase() !== 'NO')
    : DEFAULT_BRANCHES;
}

function normalizeProduct(r) {
  const imgs = [r.image1||r.image_url||r.img, r.image2, r.image3, r.image4, r.image5]
    .filter(Boolean)
    .filter(u => u.trim() !== '');
  return {
    product_id:   r.product_id || r.id || String(Math.random()),
    cat:          r.category || r.cat || '',
    name:         r.product_name || r.name || '',
    brand:        r.brand || '',
    model:        r.model || '',
    price:        parseFloat(r.price) || 0,
    mrp:          parseFloat(r.mrp) || 0,
    emi:          r.emi || '',
    warranty:     r.warranty || '1 Year',
    badge:        r.badge || '',
    description:  r.description || '',
    feature1:     r.feature1 || '',
    feature2:     r.feature2 || '',
    feature3:     r.feature3 || '',
    images:       imgs.length ? imgs : ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80'],
    branch_id:    r.branch_id || '',
    active:       r.active || 'YES',
  };
}

// ============================================================
//  APPLY STORE INFO
// ============================================================
function applyStoreInfo() {
  document.querySelectorAll('[data-store]').forEach(el => {
    const k = el.getAttribute('data-store');
    if (STORE[k] !== undefined) el.textContent = STORE[k];
  });
  document.title = `${STORE.store_name} — Premium Electronics & Appliances in Salipur, Cuttack`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = `${STORE.store_name} – Salipur's most trusted showroom for Mobiles, TVs, ACs, Refrigerators, Furniture, Mattresses & more. Easy EMI, Free Delivery.`;
  applyWALinks();
}

function applyWALinks() {
  const num = ACTIVE_BRANCH?.whatsapp || WA_NUMBER;
  document.querySelectorAll('[data-store-href]').forEach(el => {
    const type  = el.getAttribute('data-store-href');
    const phone = ACTIVE_BRANCH?.phone || STORE.phone || DEFAULT_STORE.phone;
    const email = STORE.email || DEFAULT_STORE.email;
    if (type === 'wa_link')    el.href = `https://wa.me/${num}?text=Hi!%20I%20want%20to%20enquire%20about%20your%20products.`;
    if (type === 'wa_emi')     el.href = `https://wa.me/${num}?text=Hi!%20I%20want%20to%20apply%20for%20EMI.`;
    if (type === 'tel_link')   el.href = `tel:${phone.replace(/\s/g,'')}`;
    if (type === 'email_link') el.href = `mailto:${email}`;
  });
}

// ============================================================
//  INIT ALL
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
  renderBranches();
  renderBranchSelector();
  renderReviews();
  renderCRMDashboard();
  initCounters();
  initCountdowns();
  calcEMI();
  initGSAP();
  addRippleEffect();
  renderCompareBar();
}

// ============================================================
//  NAVIGATION
// ============================================================
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + id);
  if (target) { target.classList.add('active'); window.scrollTo({ top:0, behavior:'smooth' }); }
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', (l.getAttribute('onclick')||'').includes(`'${id}'`));
  });
  closeMenu();
}

function initNavbar() {
  window.addEventListener('scroll', () => {
    document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 20);
    const msb = document.getElementById('mobileStickyBar');
    if (msb) msb.style.display = window.scrollY > 300 ? 'flex' : 'none';
  });
  const msb = document.getElementById('mobileStickyBar');
  if (msb) msb.style.display = 'none';
}

function initHamburger() {
  document.getElementById('hamburger')?.addEventListener('click', () => {
    document.getElementById('hamburger').classList.toggle('active');
    document.getElementById('navLinks')?.classList.toggle('open');
  });
}

function closeMenu() {
  document.getElementById('hamburger')?.classList.remove('active');
  document.getElementById('navLinks')?.classList.remove('open');
}

// ============================================================
//  SEARCH
// ============================================================
function initSearch() {
  const toggle   = document.getElementById('searchToggle');
  const dropdown = document.getElementById('searchDropdown');
  const closeBtn = document.getElementById('searchClose');
  const input    = document.getElementById('searchInput');
  toggle?.addEventListener('click',   () => { dropdown?.classList.toggle('open'); if (dropdown?.classList.contains('open')) setTimeout(()=>input?.focus(),100); });
  closeBtn?.addEventListener('click', () => dropdown?.classList.remove('open'));
}

function liveSearch(q) {
  const box = document.getElementById('searchResults');
  if (!box) return;
  if (!q || q.length < 2) { box.innerHTML=''; return; }
  const results = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.brand.toLowerCase().includes(q.toLowerCase()) ||
    p.cat.toLowerCase().includes(q.toLowerCase())
  ).slice(0,6);
  if (!results.length) { box.innerHTML='<p style="color:var(--text-muted);padding:12px;font-size:.88rem;">No products found.</p>'; return; }
  box.innerHTML = results.map(p=>`
    <div class="sr-item" onclick="filterProductsPage('${p.cat}',null);showPage('products');document.getElementById('searchDropdown').classList.remove('open');">
      <img src="${p.images[0]}" alt="${p.name}"/>
      <div class="sr-item-info"><strong>${p.brand} ${p.name}</strong><span>₹${p.price.toLocaleString('en-IN')} · ${p.cat}</span></div>
    </div>`).join('');
}

// ============================================================
//  CATEGORIES
// ============================================================
function renderCategoryGrid() {
  const g = document.getElementById('categoryGrid');
  if (!g) return;
  g.innerHTML = CATEGORIES.slice(0,9).map((c,i)=>`
    <div class="cat-card" onclick="filterProductsPage('${c.id}',null);showPage('products');" data-aos="fade-up" data-aos-delay="${i*40}">
      <div class="cat-img"><img src="${c.img}" alt="${c.name}" loading="lazy"/></div>
      <div class="cat-info"><div class="cat-name">${c.name}</div><div class="cat-count">${c.count} Products</div></div>
    </div>`).join('');
}

function renderCategoriesFull() {
  const g = document.getElementById('categoriesFullGrid');
  if (!g) return;
  g.innerHTML = CATEGORIES.map((c,i)=>`
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
//  PRODUCT CARD HTML (with Compare button + slideshow)
// ============================================================
function productCardHTML(p) {
  const discount = p.mrp > p.price ? Math.round((1-p.price/p.mrp)*100) : 0;
  const imgs     = p.images?.length ? p.images : ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80'];
  const badgeCls = p.badge==='New'?'badge-new':(['Hot','Sale','Offer'].includes(p.badge)?'badge-hot':'');
  const waMsg    = encodeURIComponent(`Hi! I'm interested in ${p.brand} ${p.name} (₹${p.price.toLocaleString('en-IN')}). Please share details.`);
  const waNum    = ACTIVE_BRANCH?.whatsapp || WA_NUMBER;
  const imgJSON  = JSON.stringify(imgs).replace(/"/g,'&quot;');
  const isCompared = COMPARE_LIST.some(c=>c.product_id===p.product_id);

  const slideDots = imgs.length>1 ? `<div class="slide-dots">${imgs.map((_,i)=>`<button class="slide-dot${i===0?' active':''}" onclick="event.stopPropagation();slideGoTo(this,${i})"></button>`).join('')}</div>` : '';
  const arrows    = imgs.length>1 ? `<div class="slide-arrows"><button class="slide-arr" onclick="event.stopPropagation();slidePrev(this)">‹</button><button class="slide-arr" onclick="event.stopPropagation();slideNext(this)">›</button></div>` : '';

  return `
  <div class="product-card" data-cat="${p.cat}" data-id="${p.product_id}">
    <div class="product-slideshow" onclick="openLightbox(${imgJSON},0)">
      ${imgs.map((src,i)=>`<div class="slide-img${i===0?' active':''}"><img src="${src}" alt="${p.brand} ${p.name}" loading="lazy"/></div>`).join('')}
      ${slideDots}${arrows}
      <div class="product-badge-wrap">${p.badge?`<span class="product-badge ${badgeCls}">${p.badge}</span>`:''}</div>
    </div>
    <div class="product-body">
      <div class="product-brand">${p.brand}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-meta">
        <span>⚡ ${p.warranty}</span>
        ${p.model?`<span>${p.model}</span>`:''}
        ${imgs.length>1?`<span>📷 ${imgs.length} Photos</span>`:''}
      </div>
      ${p.feature1||p.feature2||p.feature3 ? `
      <div class="product-features">
        ${p.feature1?`<div class="pf-item"><span class="pf-dot"></span>${p.feature1}</div>`:''}
        ${p.feature2?`<div class="pf-item"><span class="pf-dot"></span>${p.feature2}</div>`:''}
        ${p.feature3?`<div class="pf-item"><span class="pf-dot"></span>${p.feature3}</div>`:''}
      </div>`:'' }
      <div class="product-pricing">
        <span class="product-price">₹${p.price.toLocaleString('en-IN')}</span>
        ${p.mrp>p.price?`<span class="product-mrp">₹${p.mrp.toLocaleString('en-IN')}</span>`:''}
        ${discount>3?`<span class="product-discount">${discount}% OFF</span>`:''}
        ${p.emi?`<span class="product-emi">EMI from <strong>${p.emi}</strong></span>`:''}
      </div>
      <div class="product-actions">
        <a href="https://wa.me/${waNum}?text=${waMsg}" class="btn-wa-product ripple" target="_blank" rel="noopener">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Get Price
        </a>
        <button class="btn-compare ripple ${isCompared?'compared':''}" onclick="toggleCompare('${p.product_id}')" title="Compare">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
          ${isCompared?'Added':'Compare'}
        </button>
      </div>
    </div>
  </div>`;
}

// ============================================================
//  SLIDESHOW CONTROLS
// ============================================================
function slideNext(btn) {
  const ss = btn.closest('.product-slideshow');
  const slides = ss.querySelectorAll('.slide-img');
  const dots   = ss.querySelectorAll('.slide-dot');
  let cur = [...slides].findIndex(s=>s.classList.contains('active'));
  slides[cur].classList.remove('active'); if(dots[cur]) dots[cur].classList.remove('active');
  cur = (cur+1)%slides.length;
  slides[cur].classList.add('active'); if(dots[cur]) dots[cur].classList.add('active');
}
function slidePrev(btn) {
  const ss = btn.closest('.product-slideshow');
  const slides = ss.querySelectorAll('.slide-img');
  const dots   = ss.querySelectorAll('.slide-dot');
  let cur = [...slides].findIndex(s=>s.classList.contains('active'));
  slides[cur].classList.remove('active'); if(dots[cur]) dots[cur].classList.remove('active');
  cur = (cur-1+slides.length)%slides.length;
  slides[cur].classList.add('active'); if(dots[cur]) dots[cur].classList.add('active');
}
function slideGoTo(dotBtn, idx) {
  const ss = dotBtn.closest('.product-slideshow');
  ss.querySelectorAll('.slide-img').forEach((s,i)=>s.classList.toggle('active',i===idx));
  ss.querySelectorAll('.slide-dot').forEach((d,i)=>d.classList.toggle('active',i===idx));
}

// ============================================================
//  LIGHTBOX
// ============================================================
function openLightbox(imgs, startIdx) {
  lbImages = Array.isArray(imgs) ? imgs : [imgs];
  lbIndex  = startIdx || 0;
  renderLightbox();
  document.getElementById('lightboxModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightboxModal').classList.remove('open');
  document.body.style.overflow = '';
}
function lightboxNav(dir) {
  lbIndex = (lbIndex+dir+lbImages.length)%lbImages.length;
  renderLightbox();
}
function renderLightbox() {
  const img  = document.getElementById('lightboxImg');
  const dots = document.getElementById('lightboxDots');
  if (img) { img.src=lbImages[lbIndex]; img.alt='Product Image'; }
  if (dots) dots.innerHTML = lbImages.map((_,i)=>`<button class="lb-dot${i===lbIndex?' active':''}" onclick="lbIndex=${i};renderLightbox()"></button>`).join('');
}

// ============================================================
//  RENDER PRODUCTS
// ============================================================
function getFilteredProducts(cat) {
  let list = PRODUCTS.filter(p => p.active?.toUpperCase() !== 'NO');
  if (ACTIVE_BRANCH) list = list.filter(p => !p.branch_id || p.branch_id === ACTIVE_BRANCH.branch_id);
  if (cat && cat !== 'all') list = list.filter(p => p.cat === cat);
  return list;
}

function renderHomeProducts(filter) {
  const g = document.getElementById('homeFeaturedProducts');
  if (!g) return;
  const list = getFilteredProducts(filter==='all'?null:filter).slice(0,8);
  g.innerHTML = list.length ? list.map(productCardHTML).join('') : '<p style="color:var(--text-muted);text-align:center;padding:40px;grid-column:1/-1;">No products available.</p>';
  AOS.refresh?.();
}

function renderProductsPage(filter) {
  const g = document.getElementById('productsPageGrid');
  if (!g) return;
  const list = getFilteredProducts(filter==='all'?null:filter);
  g.innerHTML = list.length ? list.map(productCardHTML).join('') : '<p style="color:var(--text-muted);text-align:center;padding:40px;grid-column:1/-1;">No products found.</p>';
  AOS.refresh?.();
}

function filterHomeProducts(cat, btn) {
  document.querySelectorAll('#homeTabsWrap .tab-btn').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  renderHomeProducts(cat);
}

function filterProductsPage(cat, btn) {
  if(btn) { document.querySelectorAll('#productsFilterBar .tab-btn').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); }
  else { document.querySelectorAll('#productsFilterBar .tab-btn').forEach(b=>{ const oc=b.getAttribute('onclick')||''; b.classList.toggle('active',cat==='all'?oc.includes("'all'"):oc.includes(`'${cat}'`)); }); }
  renderProductsPage(cat);
}

// ============================================================
//  ★ FEATURE 3: PRODUCT COMPARISON SYSTEM
// ============================================================
function toggleCompare(productId) {
  const p = PRODUCTS.find(x => x.product_id === productId);
  if (!p) return;

  const idx = COMPARE_LIST.findIndex(c => c.product_id === productId);
  if (idx > -1) {
    COMPARE_LIST.splice(idx, 1);
    showToast(`Removed ${p.name} from compare.`);
  } else {
    if (COMPARE_LIST.length >= 3) { showToast('⚠️ Max 3 products can be compared. Remove one first.'); return; }
    COMPARE_LIST.push(p);
    showToast(`✅ ${p.name} added to compare!`);
  }
  renderCompareBar();
  // Re-render current page to update button states
  const activePage = document.querySelector('.page.active');
  if (activePage?.id === 'page-products') renderProductsPage('all');
  else renderHomeProducts('all');
}

function renderCompareBar() {
  let bar = document.getElementById('compareBar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'compareBar';
    bar.className = 'compare-bar';
    document.body.appendChild(bar);
  }
  if (!COMPARE_LIST.length) { bar.classList.remove('visible'); return; }

  bar.classList.add('visible');
  bar.innerHTML = `
    <div class="cb-inner">
      <div class="cb-left">
        <span class="cb-title">Compare Products (${COMPARE_LIST.length}/3)</span>
        <div class="cb-items">
          ${COMPARE_LIST.map(p=>`
            <div class="cb-item">
              <img src="${p.images[0]}" alt="${p.name}"/>
              <div class="cb-item-info">
                <span class="cb-item-name">${p.brand} ${p.name}</span>
                <span class="cb-item-price">₹${p.price.toLocaleString('en-IN')}</span>
              </div>
              <button class="cb-remove" onclick="toggleCompare('${p.product_id}')">✕</button>
            </div>`).join('')}
          ${COMPARE_LIST.length < 3 ? `<div class="cb-item cb-empty"><span>+ Add Product</span></div>` : ''}
        </div>
      </div>
      <div class="cb-actions">
        ${COMPARE_LIST.length >= 2 ? `<button class="btn-primary ripple" onclick="openCompareModal()">Compare Now</button>` : `<span style="font-size:.82rem;color:var(--text-muted);">Add ${2-COMPARE_LIST.length} more to compare</span>`}
        <button class="btn-outline ripple" onclick="clearCompare()">Clear All</button>
      </div>
    </div>`;
}

function clearCompare() {
  COMPARE_LIST = [];
  renderCompareBar();
  renderHomeProducts('all');
  renderProductsPage('all');
}

function openCompareModal() {
  const modal = document.getElementById('compareModal');
  if (!modal) return;

  const props = ['brand','name','price','mrp','emi','warranty','feature1','feature2','feature3','cat'];
  const labels = { brand:'Brand', name:'Product', price:'Price', mrp:'MRP', emi:'EMI from', warranty:'Warranty', feature1:'Feature 1', feature2:'Feature 2', feature3:'Feature 3', cat:'Category' };

  const cols = COMPARE_LIST;

  let table = `
    <div class="compare-table-wrap">
      <table class="compare-table">
        <thead>
          <tr>
            <th>Feature</th>
            ${cols.map(p=>`
              <th>
                <img src="${p.images[0]}" alt="${p.name}" style="width:80px;height:80px;object-fit:cover;border-radius:8px;margin-bottom:8px;"/>
                <div style="font-size:.85rem;font-weight:700;">${p.brand}</div>
                <div style="font-size:.78rem;color:var(--text-muted);">${p.name}</div>
              </th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${props.map(key=>`
            <tr>
              <td class="ct-label">${labels[key]}</td>
              ${cols.map(p=>{
                let val = p[key] || '—';
                if (key==='price') val = `<strong style="color:var(--primary);">₹${p.price.toLocaleString('en-IN')}</strong>`;
                if (key==='mrp')   val = p.mrp>p.price ? `<span style="text-decoration:line-through;color:var(--text-light);">₹${p.mrp.toLocaleString('en-IN')}</span>` : '—';
                return `<td>${val}</td>`;
              }).join('')}
            </tr>`).join('')}
          <tr>
            <td class="ct-label">Action</td>
            ${cols.map(p=>{
              const waMsg = encodeURIComponent(`Hi! I want to buy ${p.brand} ${p.name} (₹${p.price.toLocaleString('en-IN')}). Please share best price.`);
              const waNum = ACTIVE_BRANCH?.whatsapp || WA_NUMBER;
              return `<td><a href="https://wa.me/${waNum}?text=${waMsg}" class="btn-primary ripple" style="font-size:.8rem;padding:8px 14px;" target="_blank">Get Price</a></td>`;
            }).join('')}
          </tr>
        </tbody>
      </table>
    </div>`;

  modal.querySelector('.compare-modal-body').innerHTML = table;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCompareModal() {
  document.getElementById('compareModal')?.classList.remove('open');
  document.body.style.overflow = '';
}

// ============================================================
//  ★ FEATURE 4: MULTI-BRANCH MANAGEMENT
// ============================================================
function renderBranchSelector() {
  const wrap = document.getElementById('branchSelector');
  if (!wrap || !BRANCHES.length) return;

  wrap.innerHTML = `
    <div class="branch-selector-wrap">
      <label class="branch-label">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
        Select Branch:
      </label>
      <select class="branch-select" onchange="switchBranch(this.value)">
        <option value="">All Branches</option>
        ${BRANCHES.map(b=>`<option value="${b.branch_id}">${b.branch_name}</option>`).join('')}
      </select>
    </div>`;
}

function switchBranch(branchId) {
  ACTIVE_BRANCH = branchId ? BRANCHES.find(b=>b.branch_id===branchId) || null : null;

  // Update all dynamic content
  applyWALinks();
  updateContactSection();
  renderHomeProducts('all');
  renderProductsPage('all');
  renderOfferBanners();

  if (ACTIVE_BRANCH) {
    showToast(`📍 Switched to ${ACTIVE_BRANCH.branch_name}`);
  } else {
    showToast('Showing products from all branches.');
  }
}

function updateContactSection() {
  const b = ACTIVE_BRANCH;
  if (!b) return;

  // Update contact items dynamically
  const phoneEls = document.querySelectorAll('[data-store="phone"]');
  phoneEls.forEach(el => el.textContent = b.phone || STORE.phone);

  const addrEls = document.querySelectorAll('[data-store="address_full"]');
  addrEls.forEach(el => el.textContent = b.address || STORE.address_full);

  const mapIframe = document.getElementById('contactMap');
  if (mapIframe && b.map_embed_url) mapIframe.src = b.map_embed_url;
}

function renderBranches() {
  const g = document.getElementById('branchesGrid');
  if (!g) return;

  g.innerHTML = BRANCHES.map((b,i)=>`
    <div class="branch-card" data-aos="fade-up" data-aos-delay="${i*80}">
      <div class="branch-card-header">
        <div class="branch-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </div>
        <div>
          <h3 class="branch-name">${b.branch_name}</h3>
          <span class="branch-status-badge">Open Now</span>
        </div>
      </div>
      <div class="branch-details">
        <div class="branch-detail-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>${b.address}</span>
        </div>
        <div class="branch-detail-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 010 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.08 6.08l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          <span>${b.phone}</span>
        </div>
        <div class="branch-detail-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>${b.opening_hours}</span>
        </div>
      </div>
      <div class="branch-actions">
        <a href="https://wa.me/${b.whatsapp}?text=Hi!%20I%20want%20to%20visit%20your%20${encodeURIComponent(b.branch_name)}%20branch." class="btn-primary ripple" style="font-size:.82rem;padding:9px 16px;" target="_blank">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp
        </a>
        <a href="tel:${b.phone.replace(/\s/g,'')}" class="btn-outline ripple" style="font-size:.82rem;padding:9px 16px;">Call</a>
        <button class="btn-outline ripple" style="font-size:.82rem;padding:9px 16px;" onclick="switchBranch('${b.branch_id}');showPage('products');">
          View Products
        </button>
      </div>
    </div>`).join('');
}

// ============================================================
//  ★ FEATURE 5: LIGHT CRM DASHBOARD
// ============================================================
function renderCRMDashboard() {
  const wrap = document.getElementById('crmDashboard');
  if (!wrap) return;

  // Fetch live CRM data from sheet (read-only stats)
  if (SHEET_ID !== 'YOUR_GOOGLE_SHEET_ID_HERE') {
    fetchSheet('leads').then(rows => {
      if (!rows) { renderCRMStatic(wrap); return; }
      const total = rows.length;
      const newL  = rows.filter(r=>(r.status||'').toLowerCase()==='new').length;
      const conv  = rows.filter(r=>(r.status||'').toLowerCase()==='converted').length;
      const lost  = rows.filter(r=>(r.status||'').toLowerCase()==='lost').length;
      const intr  = rows.filter(r=>(r.status||'').toLowerCase()==='interested').length;
      const rate  = total>0 ? Math.round((conv/total)*100) : 0;
      renderCRMCards(wrap, { total, newL, conv, lost, intr, rate });
    });
  } else {
    renderCRMStatic(wrap);
  }
}

function renderCRMStatic(wrap) {
  renderCRMCards(wrap, { total:0, newL:0, conv:0, lost:0, intr:0, rate:0 });
}

function renderCRMCards(wrap, d) {
  wrap.innerHTML = `
    <div class="crm-grid">
      <div class="crm-card crm-total">
        <div class="crm-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg></div>
        <div class="crm-data">
          <div class="crm-num">${d.total}</div>
          <div class="crm-label">Total Leads</div>
        </div>
      </div>
      <div class="crm-card crm-new">
        <div class="crm-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg></div>
        <div class="crm-data">
          <div class="crm-num">${d.newL}</div>
          <div class="crm-label">New Leads</div>
        </div>
      </div>
      <div class="crm-card crm-converted">
        <div class="crm-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg></div>
        <div class="crm-data">
          <div class="crm-num">${d.conv}</div>
          <div class="crm-label">Converted</div>
        </div>
      </div>
      <div class="crm-card crm-rate">
        <div class="crm-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg></div>
        <div class="crm-data">
          <div class="crm-num">${d.rate}%</div>
          <div class="crm-label">Conversion Rate</div>
        </div>
      </div>
      <div class="crm-card crm-interested">
        <div class="crm-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></div>
        <div class="crm-data">
          <div class="crm-num">${d.intr}</div>
          <div class="crm-label">Interested</div>
        </div>
      </div>
      <div class="crm-card crm-lost">
        <div class="crm-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></div>
        <div class="crm-data">
          <div class="crm-num">${d.lost}</div>
          <div class="crm-label">Lost</div>
        </div>
      </div>
    </div>
    <div class="crm-note">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
      Live data from Google Sheets. Manage all leads in your 
      <a href="https://docs.google.com/spreadsheets/d/${SHEET_ID}" target="_blank" rel="noopener" style="color:var(--primary);font-weight:700;">Leads Sheet →</a>
    </div>`;
}

// ============================================================
//  ★ FEATURE 1: LEAD TRACKING — write to Google Sheets
// ============================================================
async function writeLead(data) {
  if (APPS_SCRIPT_URL === 'YOUR_APPS_SCRIPT_WEB_APP_URL_HERE') {
    console.log('📋 Lead (demo mode — Apps Script not configured):', data);
    return;
  }
  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action:'addLead', ...data }),
    });
  } catch (err) {
    console.warn('Lead write failed (non-critical):', err);
  }
}

async function writeBooking(data) {
  if (APPS_SCRIPT_URL === 'YOUR_APPS_SCRIPT_WEB_APP_URL_HERE') {
    console.log('📅 Booking (demo mode):', data);
    return;
  }
  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action:'addBooking', ...data }),
    });
  } catch (err) {
    console.warn('Booking write failed (non-critical):', err);
  }
}

// ============================================================
//  OFFERS
// ============================================================
function countdownHTML(id, endDate) {
  return `<div class="countdown"><div class="ct-box"><span class="ct-num" id="${id}-d">00</span><span class="ct-lab">Days</span></div><span class="ct-sep">:</span><div class="ct-box"><span class="ct-num" id="${id}-h">00</span><span class="ct-lab">Hrs</span></div><span class="ct-sep">:</span><div class="ct-box"><span class="ct-num" id="${id}-m">00</span><span class="ct-lab">Min</span></div></div>`;
}

function renderOfferBanners() {
  const g = document.getElementById('offersGrid');
  if (!g) return;
  const active = OFFERS.filter(o=>o.active?.toUpperCase()!=='NO');
  g.innerHTML = active.map((o,i)=>{
    const cdId = `cd${i+1}`;
    const action = o.category ? `filterProductsPage('${o.category}',null);showPage('products');` : `showPage('products');`;
    return `
    <div class="offer-card ${o.bg}" onclick="${action}" data-aos="fade-up" data-aos-delay="${i*100}">
      <div class="offer-content">
        <div class="offer-tag">${o.tag}</div>
        <h3>${o.title}</h3>
        <p>${o.subtitle}</p>
        ${o.end_date ? countdownHTML(cdId, o.end_date) : ''}
        <button class="${o.btn_class} ripple" onclick="event.stopPropagation();${action}">${o.button_text}</button>
      </div>
      ${o.img?`<div class="offer-image"><img src="${o.img}" alt="${o.title}" loading="lazy"/></div>`:''}
    </div>`}).join('');
  initCountdowns();
}

function renderOffersPage() {
  const g = document.getElementById('offersPageGrid');
  if (!g) return;
  const bgMap = { 'offer-blue':'linear-gradient(135deg,#E8F0FB,#dce9f9)','offer-yellow':'linear-gradient(135deg,#FFF8E7,#fff2cc)','offer-light':'linear-gradient(135deg,#F7F8FA,#EEF2F7)' };
  g.innerHTML = OFFERS.filter(o=>o.active?.toUpperCase()!=='NO').map((o,i)=>{
    const action = o.category ? `filterProductsPage('${o.category}',null);showPage('products');` : `showPage('products');`;
    return `
    <div class="offer-page-card" style="background:${bgMap[o.bg]||bgMap['offer-light']};" data-aos="fade-up" data-aos-delay="${i*80}">
      <div class="opc-badge">${o.tag}</div>
      <h3>${o.title}</h3>
      <p>${o.subtitle}</p>
      <button class="btn-primary ripple" onclick="${action}">${o.button_text}</button>
    </div>`}).join('');
}

// ============================================================
//  REVIEWS (dynamic from sheet)
// ============================================================
function renderReviews() {
  const g = document.getElementById('testimonialsGrid');
  if (!g) return;
  const active = REVIEWS.filter(r=>r.active?.toUpperCase()!=='NO');
  if (!active.length) return;

  const colors = ['#0058A3','#12A150','#F5A623','#6B4EFF','#E53E3E','#0058A3'];
  const delays = [0,80,160,240,320,400];

  g.innerHTML = active.map((r,i)=>{
    const stars = '★'.repeat(Math.min(5,Math.max(1,parseInt(r.rating)||5)));
    const empty = '☆'.repeat(5-(parseInt(r.rating)||5));
    const initial = (r.customer_name||'C')[0].toUpperCase();
    return `
    <div class="testi-card" data-aos="fade-up" data-aos-delay="${delays[i]||0}">
      <div class="testi-stars" style="color:#F5A623;">${stars}<span style="color:#ddd;">${empty}</span></div>
      <p>"${r.review_text||r.review||''}"</p>
      <div class="testi-author">
        ${r.customer_image
          ? `<img src="${r.customer_image}" alt="${r.customer_name}" style="width:42px;height:42px;border-radius:50%;object-fit:cover;flex-shrink:0;"/>`
          : `<div class="testi-avatar" style="background:${colors[i%colors.length]}">${initial}</div>`}
        <div>
          <strong>${r.customer_name||''}</strong>
          <span>${r.product||r.source||'Verified Customer'}</span>
        </div>
      </div>
    </div>`}).join('');
}

// ============================================================
//  EMI CALCULATOR
// ============================================================
function calcEMI() {
  const price  = parseFloat(document.getElementById('emiPrice')?.value) || 0;
  const down   = parseFloat(document.getElementById('emiDown')?.value)  || 0;
  const months = parseInt(document.getElementById('emiMonths')?.value)  || 12;
  const rate   = parseFloat(document.getElementById('emiRate')?.value)  || 0;
  const loan   = Math.max(0, price-down);
  let emi=0, totalInterest=0, totalCost=loan;
  if(rate===0){ emi=loan/months; }
  else { const r=rate/12/100; emi=loan*r*Math.pow(1+r,months)/(Math.pow(1+r,months)-1); totalCost=emi*months; totalInterest=totalCost-loan; }
  const fmt=n=>'₹'+Math.round(n).toLocaleString('en-IN');
  const set=(id,v)=>{ const el=document.getElementById(id); if(el) el.textContent=v; };
  set('emiResult',fmt(emi)); set('emiLoan',fmt(loan)); set('emiInterest',fmt(totalInterest)); set('emiTotal',fmt(totalCost+down));
}

// ============================================================
//  COUNTERS & COUNTDOWNS
// ============================================================
function initCounters() {
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(!e.isIntersecting) return; animateCount(e.target,parseInt(e.target.dataset.target)); obs.unobserve(e.target); });
  },{ threshold:0.5 });
  document.querySelectorAll('.hstat-num[data-target]').forEach(n=>obs.observe(n));
}

function animateCount(el, target) {
  const dur=1800, start=performance.now();
  const update=t=>{ const p=Math.min((t-start)/dur,1); const ease=1-Math.pow(1-p,3); const cur=Math.round(target*ease); el.textContent=target>=1000?Math.floor(cur/1000):cur; if(p<1) requestAnimationFrame(update); else el.textContent=target>=1000?Math.floor(target/1000):target; };
  requestAnimationFrame(update);
}

function initCountdowns() {
  OFFERS.forEach((o,i)=>{ if(!o.end_date) return; tick(`cd${i+1}`,new Date(o.end_date)); });
}

function tick(id, end) {
  const run=()=>{ const diff=Math.max(0,end-new Date()); const d=Math.floor(diff/86400000); const h=Math.floor((diff%86400000)/3600000); const m=Math.floor((diff%3600000)/60000); const pad=n=>String(n).padStart(2,'0'); const set=(sfx,v)=>{ const el=document.getElementById(`${id}-${sfx}`); if(el) el.textContent=pad(v); }; set('d',d); set('h',h); set('m',m); };
  run(); setInterval(run,60000);
}

// ============================================================
//  GALLERY FILTER
// ============================================================
function filterGallery(dept, btn) {
  document.querySelectorAll('.gallery-tabs .tab-btn').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  document.querySelectorAll('.gallery-item').forEach(item=>{ const d=item.getAttribute('data-dept'); item.classList.toggle('hidden',dept!=='all'&&d!==dept&&d!=='all'); });
}

// ============================================================
//  ★ FEATURE 2: BOOKING SYSTEM
// ============================================================
function openBookDemo() {
  document.getElementById('demoModal').classList.add('open');
  document.body.style.overflow='hidden';
  // Populate branch selector in modal
  const sel = document.getElementById('demoBranch');
  if (sel && BRANCHES.length) {
    sel.innerHTML = `<option value="">Select Branch</option>${BRANCHES.map(b=>`<option value="${b.branch_id}">${b.branch_name}</option>`).join('')}`;
  }
}

function closeDemoModal() {
  document.getElementById('demoModal').classList.remove('open');
  document.body.style.overflow='';
}

async function submitDemo() {
  const name    = document.getElementById('demoName').value.trim();
  const phone   = document.getElementById('demoPhone').value.trim();
  const product = document.getElementById('demoProduct').value;
  const date    = document.getElementById('demoDate').value.trim();
  const time    = document.getElementById('demoTime')?.value || '';
  const branchId = document.getElementById('demoBranch')?.value || '';
  const branch  = BRANCHES.find(b=>b.branch_id===branchId)?.branch_name || STORE.store_name;
  const waNum   = BRANCHES.find(b=>b.branch_id===branchId)?.whatsapp || WA_NUMBER;

  if (!name)  { showToast('Please enter your name.'); return; }
  if (!phone || phone.replace(/\D/g,'').length < 10) { showToast('Please enter a valid phone number.'); return; }

  // Write to Google Sheets
  await writeBooking({ customer_name:name, mobile:phone, product:product||'To be discussed', preferred_date:date, preferred_time:time, branch });

  // WhatsApp message
  const waMsg = encodeURIComponent(`Hi! I want to book a FREE Home Demo.\n\nName: ${name}\nPhone: ${phone}\nProduct: ${product||'To discuss'}\nPreferred Date: ${date||'Flexible'}\nPreferred Time: ${time||'Flexible'}\nBranch: ${branch}\n\nPlease confirm the visit.`);
  window.open(`https://wa.me/${waNum}?text=${waMsg}`, '_blank');

  // Success message
  const box = document.querySelector('.modal-box');
  if (box) {
    box.innerHTML = `
      <div style="text-align:center;padding:20px 0;">
        <div style="width:64px;height:64px;background:#E6FAF3;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:2rem;">✅</div>
        <h3 style="font-family:var(--font-head);font-weight:800;margin-bottom:8px;">Booking Confirmed!</h3>
        <p style="color:var(--text-muted);font-size:.9rem;line-height:1.6;">Hi ${name}, your home demo request has been sent! Our team from ${branch} will contact you within 2 hours.</p>
        <button class="btn-primary ripple" onclick="closeDemoModal();resetDemoModal();" style="margin-top:20px;width:100%;justify-content:center;">Close</button>
      </div>`;
  }
}

function resetDemoModal() {
  const box = document.querySelector('#demoModal .modal-box');
  if (!box) return;
  box.innerHTML = `
    <div class="modal-header">
      <h3>📅 Book a Home Demo</h3>
      <button class="modal-close" onclick="closeDemoModal()">✕</button>
    </div>
    <p style="color:var(--text-muted);margin-bottom:24px;font-size:.9rem;">Our expert visits your home to demonstrate TVs, ACs, Mattresses & more. Completely free!</p>
    <div class="form-group"><label>Your Name *</label><input type="text" id="demoName" placeholder="Full name"/></div>
    <div class="form-group"><label>Mobile Number *</label><input type="tel" id="demoPhone" placeholder="+91 98765 43210"/></div>
    <div class="form-row-2">
      <div class="form-group"><label>Product for Demo</label><select id="demoProduct"><option value="">-- Select --</option><option>Smart TV</option><option>Air Conditioner</option><option>Mattress</option><option>Sofa / Furniture</option><option>Refrigerator</option><option>Washing Machine</option><option>Water Purifier</option><option>Multiple Products</option></select></div>
      <div class="form-group"><label>Branch</label><select id="demoBranch">${BRANCHES.map(b=>`<option value="${b.branch_id}">${b.branch_name}</option>`).join('')}</select></div>
    </div>
    <div class="form-row-2">
      <div class="form-group"><label>Preferred Date</label><input type="date" id="demoDate"/></div>
      <div class="form-group"><label>Preferred Time</label><select id="demoTime"><option value="">Flexible</option><option>9:00 AM – 11:00 AM</option><option>11:00 AM – 1:00 PM</option><option>2:00 PM – 4:00 PM</option><option>4:00 PM – 6:00 PM</option><option>6:00 PM – 8:00 PM</option></select></div>
    </div>
    <button class="btn-primary btn-full ripple" onclick="submitDemo()" style="margin-top:8px;">Book Demo on WhatsApp</button>`;
}

// ============================================================
//  FORM SUBMISSIONS (with lead tracking)
// ============================================================
async function submitEnquiry() {
  const name    = document.getElementById('enqName').value.trim();
  const phone   = document.getElementById('enqPhone').value.trim();
  const product = document.getElementById('enqProduct').value;
  const msg     = document.getElementById('enqMsg').value.trim();
  if(!name)  { showToast('Please enter your name.'); return; }
  if(!phone||phone.replace(/\D/g,'').length<10) { showToast('Please enter a valid mobile number.'); return; }

  // Write lead to sheet
  await writeLead({ customer_name:name, mobile:phone, product_interested:product||'General Enquiry', branch:ACTIVE_BRANCH?.branch_name||'', source:'Enquiry Form' });

  const waNum = ACTIVE_BRANCH?.whatsapp || WA_NUMBER;
  const waMsg = encodeURIComponent(`Hi! My name is ${name}.\nPhone: ${phone}\nInterested in: ${product||'General Enquiry'}\n${msg?'Message: '+msg:''}\n\nPlease help me.`);
  window.open(`https://wa.me/${waNum}?text=${waMsg}`,'_blank');
  ['enqName','enqPhone','enqMsg'].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
  document.getElementById('enqProduct').selectedIndex=0;
  showToast('✅ Enquiry sent! Opening WhatsApp...');
}

async function submitContact() {
  const name  = document.getElementById('ctcName').value.trim();
  const phone = document.getElementById('ctcPhone').value.trim();
  const prod  = document.getElementById('ctcProduct').value.trim();
  const msg   = document.getElementById('ctcMsg').value.trim();
  if(!name)  { showToast('Please enter your name.'); return; }
  if(!phone||phone.replace(/\D/g,'').length<10) { showToast('Please enter a valid phone number.'); return; }
  if(!msg)   { showToast('Please enter a message.'); return; }

  await writeLead({ customer_name:name, mobile:phone, product_interested:prod||'Contact Form', branch:ACTIVE_BRANCH?.branch_name||'', source:'Contact Form' });

  const waNum = ACTIVE_BRANCH?.whatsapp || WA_NUMBER;
  const waMsg = encodeURIComponent(`Hi! I'm ${name}.\nPhone: ${phone}\n${prod?'Product: '+prod+'\n':''}Message: ${msg}`);
  window.open(`https://wa.me/${waNum}?text=${waMsg}`,'_blank');
  ['ctcName','ctcPhone','ctcEmail','ctcProduct','ctcMsg'].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
  showToast('✅ Redirecting to WhatsApp...');
}

async function submitService() {
  const name  = document.getElementById('srvName').value.trim();
  const phone = document.getElementById('srvPhone').value.trim();
  const brand = document.getElementById('srvBrand').value.trim();
  const prod  = document.getElementById('srvProduct').value;
  const issue = document.getElementById('srvIssue').value.trim();
  if(!name)  { showToast('Please enter your name.'); return; }
  if(!phone||phone.replace(/\D/g,'').length<10) { showToast('Please enter a valid phone number.'); return; }
  if(!issue) { showToast('Please describe the issue.'); return; }

  await writeLead({ customer_name:name, mobile:phone, product_interested:(brand?brand+' ':'')+prod, branch:ACTIVE_BRANCH?.branch_name||'', source:'Service Request' });

  const waNum = ACTIVE_BRANCH?.whatsapp || WA_NUMBER;
  const waMsg = encodeURIComponent(`Hi! SERVICE REQUEST:\n\nName: ${name}\nPhone: ${phone}\nBrand: ${brand||'Not specified'}\nProduct: ${prod||'Not specified'}\nIssue: ${issue}\n\nPlease help me.`);
  window.open(`https://wa.me/${waNum}?text=${waMsg}`,'_blank');
  ['srvName','srvPhone','srvBrand','srvIssue'].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
  document.getElementById('srvProduct').selectedIndex=0;
  showToast('✅ Service request sent via WhatsApp!');
}

function quickEnquire(name) {
  const msg = encodeURIComponent(`Hi! I want to enquire about ${name}. Please share details and best price.`);
  const waNum = ACTIVE_BRANCH?.whatsapp || WA_NUMBER;
  window.open(`https://wa.me/${waNum}?text=${msg}`,'_blank');
}

// ============================================================
//  TOAST
// ============================================================
function showToast(msg) {
  const t=document.getElementById('toast');
  if(!t) return;
  t.textContent=msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3500);
}

// ============================================================
//  GSAP ANIMATIONS
// ============================================================
function initGSAP() {
  if(typeof gsap==='undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  const heroBg=document.querySelector('.hero-bg-image img');
  if(heroBg) gsap.to(heroBg,{ yPercent:18,ease:'none',scrollTrigger:{ trigger:'.hero-section',start:'top top',end:'bottom top',scrub:true } });
  gsap.utils.toArray('.why-card').forEach((c,i)=>{ gsap.fromTo(c,{opacity:0,y:30},{opacity:1,y:0,duration:.6,delay:i*.06,scrollTrigger:{trigger:c,start:'top 86%',toggleActions:'play none none none'}}); });
  gsap.to('.wa-float',{y:-8,duration:2,yoyo:true,repeat:-1,ease:'power1.inOut'});
}

// ============================================================
//  RIPPLE
// ============================================================
function addRippleEffect() {
  document.addEventListener('click',e=>{
    const btn=e.target.closest('.ripple');
    if(!btn) return;
    const rect=btn.getBoundingClientRect();
    const size=Math.max(rect.width,rect.height)*2;
    const r=document.createElement('span');
    r.style.cssText=`position:absolute;border-radius:50%;background:rgba(255,255,255,.25);pointer-events:none;width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px;transform:scale(0);animation:rippleA .6s ease-out forwards;`;
    btn.appendChild(r);
    setTimeout(()=>r.remove(),700);
  });
  const s=document.createElement('style');
  s.textContent='@keyframes rippleA{to{transform:scale(1);opacity:0}}';
  document.head.appendChild(s);
}

// Keyboard shortcuts
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){ closeLightbox(); closeDemoModal(); closeCompareModal(); closeMenu(); document.getElementById('searchDropdown')?.classList.remove('open'); }
  if(e.key==='ArrowRight') lightboxNav(1);
  if(e.key==='ArrowLeft')  lightboxNav(-1);
});
