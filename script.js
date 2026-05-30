/* =============================================
   Sanjay Electronics – Full Premium Stylesheet
   IKEA-Inspired | Blue #0058A3 + Yellow #FFDA1A
   Version: 2.0 | All sections fully expanded
   ============================================= */

/* ============================================
   CSS VARIABLES
   ============================================ */
:root {
  --primary:       #0058A3;
  --primary-dark:  #003d7a;
  --primary-light: #1a72c4;
  --accent:        #FFDA1A;
  --accent-dark:   #e6c200;
  --green:         #12A150;
  --red:           #E53E3E;
  --purple:        #6B4EFF;
  --orange:        #F5A623;

  --bg:            #FFFFFF;
  --bg-section:    #F7F8FA;
  --border:        #E8ECF0;
  --border-light:  #F0F3F7;

  --text:          #111111;
  --text-muted:    #636E7B;
  --text-light:    #9AA3AE;

  --font-head:     'Poppins', sans-serif;
  --font-body:     'Inter', sans-serif;

  --radius:        12px;
  --radius-lg:     20px;
  --radius-xl:     28px;

  --shadow-sm:     0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow:        0 4px 20px rgba(0, 0, 0, 0.08);
  --shadow-lg:     0 12px 40px rgba(0, 0, 0, 0.12);
  --shadow-blue:   0 8px 30px rgba(0, 88, 163, 0.18);
  --shadow-green:  0 8px 24px rgba(37, 211, 102, 0.30);
}

/* ============================================
   RESET & BASE
   ============================================ */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  overflow-x: hidden;
  padding-top: 107px;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
  object-fit: cover;
}

input,
select,
textarea,
button {
  font-family: var(--font-body);
  outline: none;
  border: none;
  background: none;
}

ul {
  list-style: none;
}

/* ============================================
   SCROLLBAR
   ============================================ */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: var(--primary);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--primary-dark);
}

/* ============================================
   UTILITIES
   ============================================ */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

.section {
  padding: 90px 0;
}

.section-header {
  text-align: center;
  margin-bottom: 56px;
}

.section-chip {
  display: inline-block;
  background: #E8F0FB;
  color: var(--primary);
  font-size: 0.72rem;
  font-weight: 700;
  font-family: var(--font-head);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 6px 18px;
  border-radius: 99px;
  margin-bottom: 14px;
}

.section-title {
  font-family: var(--font-head);
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 800;
  color: var(--text);
  line-height: 1.2;
  margin-bottom: 14px;
}

.section-subtitle {
  color: var(--text-muted);
  font-size: 1.05rem;
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.7;
}

.section-cta {
  text-align: center;
  margin-top: 48px;
}

/* ============================================
   BUTTONS
   ============================================ */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--primary);
  color: white;
  padding: 14px 28px;
  border-radius: var(--radius);
  font-family: var(--font-head);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  border: 2px solid var(--primary);
  position: relative;
  overflow: hidden;
  white-space: nowrap;
}
.btn-primary:hover {
  background: var(--primary-dark);
  border-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-blue);
}

.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: var(--primary);
  padding: 13px 28px;
  border-radius: var(--radius);
  font-family: var(--font-head);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  border: 2px solid var(--primary);
  position: relative;
  overflow: hidden;
}
.btn-outline:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-2px);
  box-shadow: var(--shadow-blue);
}

.btn-full {
  width: 100%;
  justify-content: center;
}

/* Ripple */
.ripple {
  position: relative;
  overflow: hidden;
}

/* ============================================
   PAGE LOADER
   ============================================ */
.page-loader {
  position: fixed;
  inset: 0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: opacity 0.5s ease, visibility 0.5s ease;
}
.page-loader.done {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
.loader-inner {
  text-align: center;
}
.loader-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  font-family: var(--font-head);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text);
  justify-content: center;
}
.loader-logo .ll-mark {
  width: 44px;
  height: 44px;
  background: var(--primary);
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: 800;
}
.loader-bar {
  width: 220px;
  height: 4px;
  background: #e8ecf0;
  border-radius: 99px;
  overflow: hidden;
  margin: 0 auto 16px;
}
.loader-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  border-radius: 99px;
  animation: loaderAnim 1.5s ease forwards;
}
@keyframes loaderAnim {
  to { width: 100%; }
}
.loader-text {
  font-size: 0.82rem;
  color: var(--text-light);
  font-family: var(--font-head);
}

/* ============================================
   NAVBAR – TOP BAR
   ============================================ */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: box-shadow 0.3s ease;
}
.navbar.scrolled {
  box-shadow: var(--shadow);
}

.nav-top-bar {
  background: var(--primary);
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.78rem;
  padding: 6px 0;
}
.nav-top-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 4px;
}
.nav-top-right {
  display: flex;
  align-items: center;
  gap: 10px;
}
.nav-top-right a {
  color: rgba(255, 255, 255, 0.9);
  transition: color 0.2s;
}
.nav-top-right a:hover {
  color: var(--accent);
}
.sep {
  opacity: 0.4;
}
.nav-offer-blink {
  color: var(--accent);
  font-weight: 700;
  animation: offerBlink 2s ease-in-out infinite;
}
@keyframes offerBlink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.5; }
}

/* ============================================
   NAVBAR – MAIN
   ============================================ */
.nav-main {
  background: white;
  border-bottom: 1px solid var(--border);
}
.nav-main-inner {
  display: flex;
  align-items: center;
  padding: 14px 24px;
  gap: 28px;
  max-width: 1280px;
  margin: 0 auto;
}

/* Logo */
.nav-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  text-decoration: none;
}
.logo-mark {
  width: 42px;
  height: 42px;
  background: var(--primary);
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-head);
  font-size: 1.3rem;
  font-weight: 800;
  flex-shrink: 0;
}
.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}
.logo-name {
  font-family: var(--font-head);
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--text);
}
.logo-tagline {
  font-size: 0.68rem;
  color: var(--text-muted);
  font-weight: 500;
  letter-spacing: 0.04em;
  margin-top: 2px;
}

/* Nav links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 2px;
  flex: 1;
  justify-content: center;
}
.nav-link {
  padding: 8px 12px;
  color: var(--text-muted);
  font-size: 0.86rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease;
  white-space: nowrap;
  position: relative;
  cursor: pointer;
}
.nav-link:hover,
.nav-link.active {
  color: var(--primary);
  background: #E8F0FB;
}
.nav-link.has-badge {
  padding-right: 36px;
}
.nav-badge {
  position: absolute;
  top: 4px;
  right: 6px;
  background: var(--red);
  color: white;
  font-size: 0.55rem;
  font-weight: 800;
  padding: 2px 5px;
  border-radius: 4px;
  letter-spacing: 0.04em;
  animation: offerBlink 2s ease-in-out infinite;
}

/* Nav actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.nav-search-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-muted);
  transition: all 0.2s ease;
  background: white;
}
.nav-search-btn:hover {
  background: #E8F0FB;
  color: var(--primary);
  border-color: var(--primary);
}
.btn-wa-nav {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: #25D366;
  color: white;
  padding: 9px 16px;
  border-radius: 8px;
  font-size: 0.86rem;
  font-weight: 600;
  font-family: var(--font-head);
  transition: all 0.2s ease;
  white-space: nowrap;
}
.btn-wa-nav:hover {
  background: #1da851;
  transform: translateY(-1px);
  box-shadow: var(--shadow-green);
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: white;
}
.hamburger span {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
  transition: all 0.3s ease;
}
.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.hamburger.active span:nth-child(2) {
  opacity: 0;
  transform: translateX(-8px);
}
.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* ============================================
   SEARCH DROPDOWN
   ============================================ */
.search-dropdown {
  background: white;
  border-top: 1px solid var(--border);
  padding: 16px 0;
  display: none;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}
.search-dropdown.open {
  display: block;
  animation: slideDown 0.2s ease;
}
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.search-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--bg-section);
  border-radius: 12px;
  padding: 12px 18px;
  border: 2px solid var(--border);
  transition: border 0.2s;
}
.search-wrap:focus-within {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(0, 88, 163, 0.08);
}
.search-wrap input {
  flex: 1;
  font-size: 1rem;
  color: var(--text);
  background: transparent;
}
.search-wrap input::placeholder {
  color: var(--text-light);
}
.search-close {
  cursor: pointer;
  color: var(--text-muted);
  font-size: 1rem;
  padding: 4px;
  transition: color 0.2s;
}
.search-close:hover {
  color: var(--text);
}
.search-results {
  margin-top: 12px;
  max-height: 320px;
  overflow-y: auto;
}
.sr-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s;
}
.sr-item:hover {
  background: var(--bg-section);
}
.sr-item img {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}
.sr-item-info strong {
  display: block;
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text);
}
.sr-item-info span {
  font-size: 0.78rem;
  color: var(--text-muted);
}

/* ============================================
   MOBILE STICKY BOTTOM BAR
   ============================================ */
.mobile-sticky-bar {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 990;
  background: white;
  border-top: 1px solid var(--border);
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.1);
}
.mobile-sticky-bar a,
.mobile-sticky-bar button {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 4px;
  font-size: 0.68rem;
  font-weight: 700;
  font-family: var(--font-head);
  color: var(--text-muted);
  cursor: pointer;
  border: none;
  background: none;
  transition: all 0.2s;
  text-decoration: none;
}
.mobile-sticky-bar a:hover,
.mobile-sticky-bar button:hover {
  background: var(--bg-section);
}
.mobile-sticky-bar .msb-call    { color: var(--green); }
.mobile-sticky-bar .msb-wa      { color: #25D366; }
.mobile-sticky-bar .msb-products{ color: var(--primary); }
.mobile-sticky-bar .msb-demo    { color: var(--orange); }

/* ============================================
   PAGES
   ============================================ */
.page {
  display: none;
  min-height: 60vh;
}
.page.active {
  display: block;
  animation: pageFade 0.3s ease;
}
@keyframes pageFade {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ============================================
   HERO SECTION
   ============================================ */
.hero-section {
  position: relative;
  min-height: 88vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.hero-bg-image {
  position: absolute;
  inset: 0;
}
.hero-bg-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    rgba(0, 30, 70, 0.88) 0%,
    rgba(0, 58, 120, 0.70) 50%,
    rgba(0, 88, 163, 0.30) 100%
  );
}

/* Hero floating shapes */
.hero-shapes {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
.hs {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 218, 26, 0.06);
  animation: floatShape 8s ease-in-out infinite;
}
.hs1 {
  width: 400px;
  height: 400px;
  top: -100px;
  right: -100px;
  animation-delay: 0s;
}
.hs2 {
  width: 250px;
  height: 250px;
  bottom: 10%;
  right: 20%;
  animation-delay: 2s;
}
.hs3 {
  width: 180px;
  height: 180px;
  top: 30%;
  right: 5%;
  animation-delay: 4s;
}
@keyframes floatShape {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%       { transform: translateY(-20px) rotate(10deg); }
}

/* Hero content */
.hero-content-wrap {
  position: relative;
  z-index: 1;
  padding: 80px 24px;
}
.hero-content {
  max-width: 680px;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 218, 26, 0.15);
  border: 1px solid rgba(255, 218, 26, 0.4);
  color: var(--accent);
  font-size: 0.82rem;
  font-weight: 600;
  font-family: var(--font-head);
  padding: 8px 18px;
  border-radius: 99px;
  margin-bottom: 24px;
}
.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  animation: pulseDot 2s infinite;
  flex-shrink: 0;
}
@keyframes pulseDot {
  0%, 100% { transform: scale(1);   opacity: 1; }
  50%       { transform: scale(1.4); opacity: 0.6; }
}
.hero-title {
  font-family: var(--font-head);
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  font-weight: 900;
  color: white;
  line-height: 1.1;
  margin-bottom: 20px;
  letter-spacing: -0.02em;
}
.hero-accent {
  color: var(--accent);
}
.hero-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.82);
  margin-bottom: 36px;
  line-height: 1.7;
  max-width: 540px;
}

/* Hero CTA buttons */
.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 48px;
}
.btn-wa-hero {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  background: #25D366;
  color: white;
  padding: 14px 28px;
  border-radius: var(--radius);
  font-family: var(--font-head);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  border: 2px solid #25D366;
  white-space: nowrap;
}
.btn-wa-hero:hover {
  background: #1da851;
  border-color: #1da851;
  transform: translateY(-2px);
  box-shadow: var(--shadow-green);
}
.btn-demo-hero {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  background: var(--accent);
  color: var(--text);
  padding: 14px 24px;
  border-radius: var(--radius);
  font-family: var(--font-head);
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
  border: 2px solid var(--accent);
  white-space: nowrap;
}
.btn-demo-hero:hover {
  background: var(--accent-dark);
  border-color: var(--accent-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 218, 26, 0.4);
}

/* Hero stats */
.hero-stats {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}
.hstat {
  text-align: center;
  min-width: 80px;
}
.hstat-num {
  display: block;
  font-family: var(--font-head);
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--accent);
  line-height: 1;
}
.hstat-plus {
  font-family: var(--font-head);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--accent);
}
.hstat-label {
  display: block;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 4px;
  white-space: nowrap;
}
.hstat-div {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
}

/* ============================================
   TRUST BAR
   ============================================ */
.trust-bar {
  background: var(--primary);
  padding: 14px 0;
}
.trust-bar-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0;
}
.tb-item {
  display: flex;
  align-items: center;
  gap: 7px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.82rem;
  font-weight: 600;
  font-family: var(--font-head);
  padding: 4px 20px;
  white-space: nowrap;
}
.tb-div {
  width: 1px;
  height: 18px;
  background: rgba(255, 255, 255, 0.25);
  flex-shrink: 0;
}

/* ============================================
   BRAND MARQUEE
   ============================================ */
.brand-marquee {
  background: white;
  border-bottom: 1px solid var(--border);
  overflow: hidden;
  padding: 20px 0;
}
.marquee-track {
  overflow: hidden;
}
.marquee-inner {
  display: flex;
  align-items: center;
  gap: 32px;
  white-space: nowrap;
  animation: marqueeAnim 30s linear infinite;
  width: max-content;
}
.marquee-inner span {
  font-family: var(--font-head);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: color 0.2s;
}
.marquee-inner span.dot {
  color: var(--border);
}
.marquee-inner span:not(.dot):hover {
  color: var(--primary);
}
@keyframes marqueeAnim {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.brand-marquee:hover .marquee-inner {
  animation-play-state: paused;
}

/* ============================================
   WHY CHOOSE US
   ============================================ */
.why-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}
.why-card {
  background: white;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px 24px;
  transition: all 0.3s ease;
  cursor: default;
}
.why-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: transparent;
}
.why-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  flex-shrink: 0;
}
.why-card h3 {
  font-family: var(--font-head);
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--text);
}
.why-card p {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.65;
}

/* ============================================
   CATEGORY GRIDS
   ============================================ */
.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}
.cat-card {
  background: white;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}
.cat-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary);
}
.cat-img {
  height: 160px;
  overflow: hidden;
  background: var(--bg-section);
}
.cat-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.cat-card:hover .cat-img img {
  transform: scale(1.08);
}
.cat-info {
  padding: 14px 16px;
}
.cat-name {
  font-family: var(--font-head);
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 4px;
}
.cat-count {
  font-size: 0.78rem;
  color: var(--primary);
  font-weight: 600;
}

/* Full categories page grid */
.categories-full-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}
.cat-full-card {
  background: white;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}
.cat-full-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary);
}
.cat-full-img {
  height: 200px;
  overflow: hidden;
}
.cat-full-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.cat-full-card:hover .cat-full-img img {
  transform: scale(1.08);
}
.cat-full-body {
  padding: 20px;
}
.cat-full-name {
  font-family: var(--font-head);
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 6px;
  color: var(--text);
}
.cat-full-desc {
  font-size: 0.83rem;
  color: var(--text-muted);
  margin-bottom: 12px;
  line-height: 1.55;
}
.cat-full-count {
  font-size: 0.82rem;
  color: var(--primary);
  font-weight: 700;
}

/* ============================================
   OFFERS BANNERS
   ============================================ */
.offers-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.offer-card {
  border-radius: var(--radius-xl);
  overflow: hidden;
  display: flex;
  align-items: stretch;
  min-height: 220px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}
.offer-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
.offer-blue {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
}
.offer-yellow {
  background: linear-gradient(135deg, #FFDA1A 0%, #f0c800 100%);
  color: var(--text);
}
.offer-light {
  background: var(--bg-section);
  border: 1px solid var(--border);
  color: var(--text);
}
.offer-content {
  flex: 1;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
}
.offer-tag {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 4px 14px;
  border-radius: 99px;
  font-size: 0.72rem;
  font-weight: 700;
  font-family: var(--font-head);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  width: fit-content;
}
.offer-yellow .offer-tag {
  background: rgba(0, 0, 0, 0.1);
  border-color: rgba(0, 0, 0, 0.15);
  color: var(--text);
}
.offer-light .offer-tag {
  background: var(--primary);
  color: white;
  border: none;
}
.offer-content h3 {
  font-family: var(--font-head);
  font-size: 1.25rem;
  font-weight: 800;
  line-height: 1.2;
}
.offer-content p {
  font-size: 0.88rem;
  opacity: 0.85;
  line-height: 1.55;
}
.offer-image {
  width: 180px;
  flex-shrink: 0;
  overflow: hidden;
}
.offer-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}
.offer-card:hover .offer-image img {
  transform: scale(1.06);
}

/* Offer buttons */
.btn-offer {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: white;
  color: var(--primary);
  padding: 9px 18px;
  border-radius: 8px;
  font-family: var(--font-head);
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  width: fit-content;
  border: none;
}
.btn-offer:hover {
  background: var(--accent);
  color: var(--text);
}
.btn-offer-dark {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: var(--primary);
  color: white;
  padding: 9px 18px;
  border-radius: 8px;
  font-family: var(--font-head);
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  width: fit-content;
  border: none;
}
.btn-offer-dark:hover {
  background: var(--primary-dark);
}
.btn-outline-dark {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: transparent;
  color: var(--text);
  padding: 9px 18px;
  border-radius: 8px;
  font-family: var(--font-head);
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  width: fit-content;
  border: 2px solid var(--text);
}
.btn-outline-dark:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

/* Countdown Timer */
.countdown {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 4px 0;
}
.ct-box {
  text-align: center;
}
.ct-num {
  display: block;
  font-family: var(--font-head);
  font-size: 1.2rem;
  font-weight: 900;
  line-height: 1;
}
.ct-lab {
  font-size: 0.62rem;
  opacity: 0.7;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.ct-sep {
  font-size: 1.4rem;
  font-weight: 900;
  opacity: 0.5;
  line-height: 1;
}

/* ============================================
   SHOP BY ROOM (IKEA Style)
   ============================================ */
.room-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 20px;
}
.room-large {
  grid-row: span 2;
}
.room-card {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  cursor: pointer;
  min-height: 250px;
}
.room-large {
  min-height: 520px;
}
.room-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.room-card:hover img {
  transform: scale(1.05);
}
.room-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.1) 60%);
  display: flex;
  align-items: flex-end;
  padding: 28px;
  transition: background 0.3s ease;
}
.room-card:hover .room-overlay {
  background: linear-gradient(to top, rgba(0, 58, 120, 0.82) 0%, rgba(0, 58, 120, 0.2) 60%);
}
.room-info {
  color: white;
}
.room-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  font-family: var(--font-head);
  margin-bottom: 8px;
}
.room-info h3 {
  font-family: var(--font-head);
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 12px;
  line-height: 1.2;
}
.room-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}
.room-tags span {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  color: white;
  font-size: 0.73rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 99px;
}
.btn-room {
  background: var(--accent);
  color: var(--text);
  padding: 9px 20px;
  border-radius: 8px;
  font-family: var(--font-head);
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  border: none;
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.3s ease;
}
.room-card:hover .btn-room {
  opacity: 1;
  transform: translateY(0);
}
.btn-room:hover {
  background: var(--accent-dark);
}

/* ============================================
   PRODUCT FILTER TABS
   ============================================ */
.product-tabs,
.products-filter-bar {
  margin-bottom: 36px;
  overflow-x: auto;
  scrollbar-width: none;
}
.product-tabs::-webkit-scrollbar,
.products-filter-bar::-webkit-scrollbar {
  display: none;
}
.pfb-scroll {
  display: flex;
  gap: 8px;
  min-width: max-content;
}
.tab-btn {
  padding: 9px 20px;
  border-radius: 99px;
  border: 1.5px solid var(--border);
  background: white;
  color: var(--text-muted);
  font-family: var(--font-head);
  font-size: 0.83rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.tab-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: #E8F0FB;
}
.tab-btn.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

/* ============================================
   PRODUCT GRID
   ============================================ */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 24px;
}

/* ============================================
   PRODUCT CARD
   ============================================ */
.product-card {
  background: white;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
}
.product-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: transparent;
}

/* Product Slideshow */
.product-slideshow {
  position: relative;
  height: 230px;
  overflow: hidden;
  background: var(--bg-section);
  cursor: zoom-in;
}
.slide-img {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.4s ease;
}
.slide-img.active {
  opacity: 1;
}
.slide-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.product-card:hover .slide-img.active img {
  transform: scale(1.06);
}

/* Slideshow dots */
.slide-dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
  z-index: 2;
}
.slide-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  padding: 0;
  flex-shrink: 0;
}
.slide-dot.active {
  background: white;
  width: 18px;
  border-radius: 3px;
}
.slide-dot:hover {
  background: white;
}

/* Slideshow arrows */
.slide-arrows {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 2;
  pointer-events: none;
}
.product-slideshow:hover .slide-arrows {
  opacity: 1;
  pointer-events: auto;
}
.slide-arr {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);
  line-height: 1;
}
.slide-arr:hover {
  background: white;
  box-shadow: var(--shadow);
  transform: scale(1.1);
}

/* Product badge */
.product-badge-wrap {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.product-badge {
  display: inline-block;
  background: var(--primary);
  color: white;
  font-size: 0.68rem;
  font-weight: 700;
  font-family: var(--font-head);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 6px;
  width: fit-content;
}
.product-badge.badge-new  { background: var(--green); }
.product-badge.badge-hot  { background: var(--red); }

/* Product body */
.product-body {
  padding: 18px;
}
.product-brand {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--primary);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-family: var(--font-head);
  margin-bottom: 4px;
}
.product-name {
  font-family: var(--font-head);
  font-size: 0.96rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 10px;
  line-height: 1.3;
}
.product-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 12px;
}
.product-meta span {
  background: var(--bg-section);
  color: var(--text-muted);
  font-size: 0.72rem;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 99px;
}
.product-pricing {
  margin-bottom: 14px;
}
.product-price {
  font-family: var(--font-head);
  font-size: 1.28rem;
  font-weight: 800;
  color: var(--text);
}
.product-mrp {
  font-size: 0.83rem;
  color: var(--text-light);
  text-decoration: line-through;
  margin-left: 7px;
}
.product-discount {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--green);
  margin-left: 7px;
}
.product-emi {
  font-size: 0.78rem;
  color: var(--text-muted);
  display: block;
  margin-top: 4px;
}
.product-emi strong {
  color: var(--primary);
}

/* Product action buttons */
.product-actions {
  display: flex;
  gap: 7px;
}
.btn-wa-product {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: #25D366;
  color: white;
  padding: 10px 12px;
  border-radius: 8px;
  font-family: var(--font-head);
  font-size: 0.83rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  text-decoration: none;
}
.btn-wa-product:hover {
  background: #1da851;
  transform: translateY(-1px);
}
.btn-enquire {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #E8F0FB;
  color: var(--primary);
  padding: 10px 12px;
  border-radius: 8px;
  font-family: var(--font-head);
  font-size: 0.83rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}
.btn-enquire:hover {
  background: var(--primary);
  color: white;
}

/* ============================================
   EMI CALCULATOR
   ============================================ */
.emi-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}
.emi-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 8px;
}
.emi-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.emi-field label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-muted);
  font-family: var(--font-head);
}
.emi-field input,
.emi-field select {
  padding: 12px 16px;
  border: 1.5px solid var(--border);
  border-radius: 10px;
  font-size: 0.95rem;
  color: var(--text);
  background: white;
  transition: border 0.2s;
  font-family: var(--font-body);
}
.emi-field input:focus,
.emi-field select:focus {
  border-color: var(--primary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 88, 163, 0.08);
}
.emi-result-card {
  background: white;
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 32px;
  box-shadow: var(--shadow-lg);
}
.emi-result-header {
  font-family: var(--font-head);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 20px;
}
.emi-monthly {
  text-align: center;
  padding: 24px;
  background: var(--primary);
  border-radius: var(--radius-lg);
  margin-bottom: 20px;
}
.emi-label {
  display: block;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  margin-bottom: 8px;
  font-family: var(--font-head);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.emi-value {
  font-family: var(--font-head);
  font-size: 2.4rem;
  font-weight: 900;
  color: var(--accent);
  line-height: 1;
}
.emi-details {
  margin-bottom: 24px;
}
.emi-detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
  font-size: 0.9rem;
  color: var(--text-muted);
}
.emi-detail-row:last-child {
  border-bottom: none;
}
.emi-detail-row span:last-child {
  font-weight: 700;
  color: var(--text);
}
.total-row {
  font-weight: 700;
}
.total-row span {
  color: var(--primary) !important;
  font-size: 1rem;
}

/* ============================================
   TESTIMONIALS
   ============================================ */
.google-rating {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 12px;
}
.gr-stars {
  font-size: 1.3rem;
  color: #F5A623;
}
.gr-text {
  font-size: 0.95rem;
  color: var(--text-muted);
}
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 24px;
}
.testi-card {
  background: white;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  transition: all 0.3s ease;
}
.testi-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: transparent;
}
.testi-stars {
  font-size: 1rem;
  color: #F5A623;
  margin-bottom: 12px;
}
.testi-card p {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.75;
  margin-bottom: 18px;
  font-style: italic;
}
.testi-author {
  display: flex;
  align-items: center;
  gap: 12px;
}
.testi-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-head);
  font-size: 1rem;
  font-weight: 800;
  color: white;
  flex-shrink: 0;
}
.testi-author strong {
  display: block;
  font-size: 0.9rem;
  font-weight: 700;
  font-family: var(--font-head);
  color: var(--text);
}
.testi-author span {
  font-size: 0.76rem;
  color: var(--text-muted);
}

/* ============================================
   ENQUIRY FORM
   ============================================ */
.enquiry-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}
.enquiry-trust {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 8px;
}
.et-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: var(--text-muted);
}
.enquiry-form-card {
  background: white;
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 36px;
  box-shadow: var(--shadow-lg);
}

/* Form groups */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-bottom: 16px;
}
.form-group label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-muted);
  font-family: var(--font-head);
}
.form-group input,
.form-group select,
.form-group textarea {
  padding: 12px 16px;
  border: 1.5px solid var(--border);
  border-radius: 10px;
  font-size: 0.95rem;
  color: var(--text);
  background: white;
  transition: all 0.2s ease;
  resize: vertical;
  font-family: var(--font-body);
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--primary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 88, 163, 0.08);
}
.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--text-light);
}
.form-row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

/* ============================================
   PAGE HERO MINI (inner pages)
   ============================================ */
.page-hero-mini {
  background: linear-gradient(135deg, #F7F8FA, #EEF2F7);
  padding: 56px 0 44px;
  border-bottom: 1px solid var(--border);
}
.page-hero-mini h1 {
  font-family: var(--font-head);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  color: var(--text);
  margin-bottom: 8px;
}
.page-hero-mini p {
  font-size: 1rem;
  color: var(--text-muted);
}

/* ============================================
   GALLERY
   ============================================ */
.gallery-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 36px;
}
.gallery-masonry {
  columns: 4;
  column-gap: 16px;
}
.gallery-item {
  break-inside: avoid;
  margin-bottom: 16px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  position: relative;
  cursor: pointer;
}
.gallery-item img {
  width: 100%;
  display: block;
  transition: transform 0.5s ease;
  border-radius: var(--radius-lg);
}
.gallery-item:hover img {
  transform: scale(1.04);
}
.gallery-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 24px 14px 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
  font-family: var(--font-head);
}
.gallery-item:hover .gallery-caption {
  opacity: 1;
}
.gallery-item.hidden {
  display: none;
}

/* ============================================
   SERVICE PAGE
   ============================================ */
.service-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}
.service-features {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 8px;
}
.sf-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}
.sf-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sf-item strong {
  display: block;
  font-family: var(--font-head);
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 3px;
  color: var(--text);
}
.sf-item p {
  font-size: 0.84rem;
  color: var(--text-muted);
  line-height: 1.5;
}
.service-form-wrap .enquiry-form-card h3 {
  font-family: var(--font-head);
  font-size: 1.2rem;
  font-weight: 800;
  margin-bottom: 24px;
}

/* ============================================
   ABOUT PAGE
   ============================================ */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}
.about-left {
  position: relative;
}
.about-img {
  width: 100%;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}
.about-badge-float {
  position: absolute;
  bottom: -20px;
  right: -20px;
  background: var(--accent);
  color: var(--text);
  border-radius: var(--radius-lg);
  padding: 20px 24px;
  text-align: center;
  box-shadow: var(--shadow-lg);
}
.abf-num {
  display: block;
  font-family: var(--font-head);
  font-size: 2rem;
  font-weight: 900;
  line-height: 1;
}
.about-badge-float span:last-child {
  font-size: 0.78rem;
  font-weight: 700;
}
.about-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 32px;
}
.about-stat {
  text-align: center;
  padding: 16px;
  background: var(--bg-section);
  border-radius: var(--radius);
}
.as-num {
  display: block;
  font-family: var(--font-head);
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary);
}
.as-lab {
  font-size: 0.74rem;
  color: var(--text-muted);
  font-weight: 600;
}

/* ============================================
   CONTACT PAGE
   ============================================ */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
}
.contact-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 28px;
}
.contact-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}
.ci-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.contact-item strong {
  display: block;
  font-family: var(--font-head);
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 4px;
  color: var(--text);
}
.contact-item p {
  font-size: 0.86rem;
  color: var(--text-muted);
  line-height: 1.65;
}
.contact-item a {
  color: var(--primary);
  transition: color 0.2s;
}
.contact-item a:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}
.contact-social {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.cs-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 16px;
  border-radius: 8px;
  border: 1.5px solid var(--border);
  font-size: 0.84rem;
  font-weight: 600;
  font-family: var(--font-head);
  color: var(--text-muted);
  transition: all 0.2s ease;
  cursor: pointer;
  background: white;
}
.cs-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: #E8F0FB;
}
.contact-form-card {
  background: white;
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 32px;
  box-shadow: var(--shadow);
  margin-bottom: 24px;
}
.contact-form-card h3 {
  font-family: var(--font-head);
  font-size: 1.2rem;
  font-weight: 800;
  margin-bottom: 24px;
  color: var(--text);
}
.contact-map {
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

/* ============================================
   OFFERS PAGE GRID
   ============================================ */
.offers-page-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}
.offer-page-card {
  border-radius: var(--radius-xl);
  padding: 32px;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}
.offer-page-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
.opc-badge {
  display: inline-block;
  background: var(--primary);
  color: white;
  font-size: 0.72rem;
  font-weight: 700;
  font-family: var(--font-head);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 99px;
  margin-bottom: 16px;
}
.offer-page-card h3 {
  font-family: var(--font-head);
  font-size: 1.1rem;
  font-weight: 800;
  margin-bottom: 10px;
  color: var(--text);
  line-height: 1.3;
}
.offer-page-card p {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.65;
  margin-bottom: 20px;
}

/* ============================================
   MODALS (Demo & Lightbox)
   ============================================ */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  z-index: 2000;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 20px;
  backdrop-filter: blur(4px);
}
.modal-overlay.open {
  display: flex;
  animation: modalFadeIn 0.25s ease;
}
@keyframes modalFadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
.modal-box {
  background: white;
  border-radius: var(--radius-xl);
  padding: 32px;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.25);
  animation: modalSlideUp 0.25s ease;
  max-height: 90vh;
  overflow-y: auto;
}
@keyframes modalSlideUp {
  from { transform: translateY(20px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.modal-header h3 {
  font-family: var(--font-head);
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--text);
}
.modal-close {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--border);
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  transition: all 0.2s;
  background: white;
}
.modal-close:hover {
  background: var(--bg-section);
  color: var(--text);
}

/* ============================================
   LIGHTBOX
   ============================================ */
.lightbox-box {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.lightbox-close {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: white;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-lg);
  z-index: 10;
  transition: all 0.2s;
}
.lightbox-close:hover {
  background: var(--bg-section);
  transform: scale(1.1);
}
.lightbox-img-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
.lightbox-img-wrap img {
  max-width: 80vw;
  max-height: 78vh;
  object-fit: contain;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  animation: lightboxImgIn 0.2s ease;
}
@keyframes lightboxImgIn {
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
}
.lightbox-nav {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: white;
  border: none;
  cursor: pointer;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-lg);
  transition: all 0.2s;
  z-index: 10;
  color: var(--text);
}
.lightbox-nav:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-50%) scale(1.05);
}
.lightbox-prev { left: 20px; }
.lightbox-next { right: 20px; }
.lightbox-dots {
  display: flex;
  gap: 8px;
}
.lb-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  padding: 0;
}
.lb-dot.active {
  background: white;
  width: 24px;
  border-radius: 4px;
}
.lb-dot:hover {
  background: rgba(255, 255, 255, 0.8);
}

/* ============================================
   FLOATING WHATSAPP
   ============================================ */
.wa-float {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 999;
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: #25D366;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 24px rgba(37, 211, 102, 0.4);
  transition: all 0.3s ease;
  text-decoration: none;
}
.wa-float:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 36px rgba(37, 211, 102, 0.55);
}
.wa-pulse {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: rgba(37, 211, 102, 0.3);
  animation: waPulse 2.5s ease-out infinite;
}
@keyframes waPulse {
  0%   { transform: scale(1);   opacity: 0.6; }
  100% { transform: scale(1.5); opacity: 0; }
}

/* ============================================
   FOOTER
   ============================================ */
.footer {
  background: #0a1628;
  color: rgba(255, 255, 255, 0.8);
}
.footer-top {
  padding: 64px 0 48px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.footer-top-inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 40px;
}
.footer-brand-col p {
  font-size: 0.86rem;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.55);
  margin-top: 16px;
  margin-bottom: 24px;
}
.footer-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}
.footer-logo .logo-mark {
  background: var(--primary);
}
.footer-logo .logo-name {
  color: white;
}
.footer-logo .logo-tagline {
  color: rgba(255, 255, 255, 0.45);
}
.footer-social {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.fsoc {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.2s ease;
  text-decoration: none;
}
.fsoc:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
  transform: translateY(-2px);
}
.footer-links-col h4,
.footer-cat-col h4,
.footer-contact-col h4 {
  font-family: var(--font-head);
  font-size: 0.86rem;
  font-weight: 700;
  color: white;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 20px;
}
.footer-links-col ul,
.footer-cat-col ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.footer-links-col a,
.footer-cat-col a {
  font-size: 0.86rem;
  color: rgba(255, 255, 255, 0.55);
  transition: color 0.2s ease;
  cursor: pointer;
}
.footer-links-col a:hover,
.footer-cat-col a:hover {
  color: var(--accent);
}
.footer-contact-info p {
  font-size: 0.84rem;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 10px;
  line-height: 1.6;
}
.footer-contact-info a {
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.2s;
}
.footer-contact-info a:hover {
  color: var(--accent);
}
.footer-bottom {
  padding: 20px 0;
  background: rgba(0, 0, 0, 0.25);
}
.footer-bottom-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.35);
}

/* ============================================
   TOAST NOTIFICATION
   ============================================ */
.toast {
  position: fixed;
  bottom: 100px;
  right: 28px;
  z-index: 9999;
  background: #1a1a2e;
  color: white;
  padding: 14px 20px;
  border-radius: var(--radius);
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: var(--shadow-lg);
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  pointer-events: none;
  max-width: 300px;
  border-left: 4px solid var(--green);
}
.toast.show {
  opacity: 1;
  transform: translateY(0);
}

/* ============================================
   RESPONSIVE – 1100px
   ============================================ */
@media (max-width: 1100px) {
  .footer-top-inner {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
  .emi-wrap {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .enquiry-wrap {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .gallery-masonry {
    columns: 3;
  }
  .service-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .emi-form {
    grid-template-columns: 1fr 1fr;
  }
}

/* ============================================
   RESPONSIVE – 900px (tablet / mobile)
   ============================================ */
@media (max-width: 900px) {
  body {
    padding-top: 70px;
    padding-bottom: 70px;
  }
  .nav-top-bar {
    display: none;
  }

  /* Mobile nav */
  .nav-links {
    display: none;
    flex-direction: column;
    gap: 4px;
  }
  .nav-links.open {
    display: flex;
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    z-index: 999;
    padding: 24px;
    overflow-y: auto;
    border-top: 1px solid var(--border);
    animation: slideInNav 0.25s ease;
  }
  .nav-links.open .nav-link {
    font-size: 1rem;
    padding: 12px 16px;
    border-radius: 10px;
  }
  @keyframes slideInNav {
    from { opacity: 0; transform: translateX(-8px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .hamburger {
    display: flex;
  }
  .nav-main-inner {
    padding: 12px 16px;
  }

  /* Mobile sticky bar */
  .mobile-sticky-bar {
    display: flex;
  }
  .wa-float {
    bottom: 86px;
  }
  .toast {
    bottom: 120px;
  }

  /* Sections */
  .room-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
  .room-large {
    grid-row: auto;
    min-height: 320px;
  }
  .about-grid {
    grid-template-columns: 1fr;
    gap: 50px;
  }
  .about-badge-float {
    bottom: 16px;
    right: 16px;
  }
  .about-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .emi-form {
    grid-template-columns: 1fr;
  }
  .form-row-2 {
    grid-template-columns: 1fr;
  }
  .offers-grid {
    grid-template-columns: 1fr;
  }
}

/* ============================================
   RESPONSIVE – 640px (small mobile)
   ============================================ */
@media (max-width: 640px) {
  .section {
    padding: 56px 0;
  }
  .container {
    padding: 0 16px;
  }
  .section-header {
    margin-bottom: 40px;
  }
  .hero-section {
    min-height: 75vh;
  }
  .hero-content-wrap {
    padding: 60px 16px;
  }
  .hero-title {
    font-size: 2rem;
  }
  .hero-subtitle {
    font-size: 1rem;
  }
  .hero-cta {
    flex-direction: column;
  }
  .hero-cta > * {
    width: 100%;
    justify-content: center;
  }
  .hero-stats {
    gap: 4px;
  }
  .hstat {
    min-width: 60px;
  }
  .hstat-num {
    font-size: 1.4rem;
  }
  .why-grid {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .why-card {
    padding: 18px 14px;
  }
  .offer-image {
    display: none;
  }
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
  .gallery-masonry {
    columns: 2;
  }
  .footer-top-inner {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .footer-bottom-inner {
    flex-direction: column;
    text-align: center;
  }
  .trust-bar-inner {
    justify-content: flex-start;
    flex-wrap: nowrap;
    overflow-x: auto;
    scrollbar-width: none;
    padding-bottom: 4px;
  }
  .trust-bar-inner::-webkit-scrollbar {
    display: none;
  }
  .tb-div {
    display: none;
  }
  .enquiry-form-card {
    padding: 24px 20px;
  }
  .emi-result-card {
    padding: 24px 20px;
  }
  .modal-box {
    padding: 24px 20px;
  }
  .lightbox-nav {
    width: 36px;
    height: 36px;
    font-size: 1.2rem;
  }
  .lightbox-prev { left: 8px; }
  .lightbox-next { right: 8px; }
}

/* ============================================
   RESPONSIVE – 400px (very small)
   ============================================ */
@media (max-width: 400px) {
  .gallery-masonry {
    columns: 1;
  }
  .why-grid {
    grid-template-columns: 1fr;
  }
  .about-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  .hero-badge {
    font-size: 0.72rem;
    padding: 6px 12px;
  }
  .products-grid {
    grid-template-columns: 1fr;
  }
}
