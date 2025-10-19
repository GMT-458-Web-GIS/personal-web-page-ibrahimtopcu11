// script.js - Tüm JavaScript fonksiyonları

// ====================================
// Sayfa Yükleme ve Animasyonlar
// ====================================
document.addEventListener('DOMContentLoaded', () => {
  // Sayfa yükleme animasyonu
  setTimeout(() => {
    document.body.classList.add('page-loaded');
  }, 100);

  // ENV değişkenlerini al
  const ENV = window.ENV || {};

  // Navigasyon aktif link
  initNavigation();

  // Çevresel değişkenleri DOM'a yerleştir
  populateEnvData(ENV);

  // Hobileri doldur
  populateHobbies(ENV);

  // Projeleri doldur
  populateProjects(ENV);

  // Sosyal medya linklerini doldur
  populateSocialLinks(ENV);

  // Haritayı başlat (eğer sayfa index.html ise)
  initMap(ENV);

  // Smooth scroll butonları
  initSmoothScroll();

  // Animasyonlu scroll efektleri
  initScrollAnimations();
});

// ====================================
// Navigasyon İşlemleri
// ====================================
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Aktif sayfa kontrolü
    if ((currentPath === '' && href === 'index.html') || href === currentPath) {
      link.classList.add('active');
    }

    // Sayfa geçiş animasyonu
    link.addEventListener('click', (e) => {
      if (href && !href.startsWith('#')) {
        e.preventDefault();
        document.body.classList.add('page-leave');
        
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      }
    });
  });
}

// ====================================
// ENV Verilerini DOM'a Yerleştirme
// ====================================
function populateEnvData(ENV) {
  const safeText = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = value || '';
  };

  // Temel bilgiler
  safeText('[data-name]', ENV.NAME);
  safeText('[data-surname]', ENV.SURNAME);
  safeText('[data-university]', ENV.UNIVERSITY);
  safeText('[data-university-text]', ENV.UNIVERSITY);
  safeText('[data-department]', ENV.DEPARTMENT);
  safeText('[data-department-text]', ENV.DEPARTMENT);

  // Tam isim
  const fullName = `${ENV.NAME || ''} ${ENV.SURNAME || ''}`.trim();
  document.querySelectorAll('[data-name-full]').forEach(el => {
    el.textContent = fullName;
  });
}

// ====================================
// Hobileri Doldurma
// ====================================
function populateHobbies(ENV) {
  const hobbyContainer = document.querySelector('[data-hobbies]');
  
  if (hobbyContainer && Array.isArray(ENV.HOBBIES)) {
    hobbyContainer.innerHTML = '';
    
    ENV.HOBBIES.forEach((hobby, index) => {
      const chip = document.createElement('span');
      chip.textContent = hobby;
      chip.style.animationDelay = `${index * 0.1}s`;
      hobbyContainer.appendChild(chip);
    });
  }
}

// ====================================
// Projeleri Doldurma
// ====================================
function populateProjects(ENV) {
  const tableBody = document.querySelector('[data-projects-table]');
  const projectsGrid = document.querySelector('[data-projects-grid]');

  if (!ENV.PROJECTS || !Array.isArray(ENV.PROJECTS)) return;

  // Tablo görünümü için
  if (tableBody) {
    tableBody.innerHTML = '';
    
    ENV.PROJECTS.forEach((project, index) => {
      const row = document.createElement('tr');
      row.style.animationDelay = `${index * 0.1}s`;
      row.innerHTML = `
        <td><img src="${project.image}" alt="${project.title}" class="proj-thumb" loading="lazy"></td>
        <td>
          <strong>${project.title}</strong><br>
          <small style="color: var(--muted);">${project.description}</small>
        </td>
        <td>${project.tech}</td>
        <td><a class="btn" href="${project.link}" target="_blank" rel="noopener">
          <span>Görüntüle</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a></td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Kart görünümü için (mobil)
  if (projectsGrid) {
    projectsGrid.innerHTML = '';
    
    ENV.PROJECTS.forEach((project, index) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.style.animationDelay = `${index * 0.15}s`;
      card.innerHTML = `
        <img src="${project.image}" alt="${project.title}" loading="lazy">
        <h3>${project.title}</h3>
        <p style="color: var(--muted); font-size: 0.9rem;">${project.description}</p>
        <p style="font-size: 0.85rem; color: var(--primary); font-weight: 500;">${project.tech}</p>
        <a class="btn" href="${project.link}" target="_blank" rel="noopener" style="width: 100%; justify-content: center;">
          <span>Görüntüle</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      `;
      projectsGrid.appendChild(card);
    });
  }
}

// ====================================
// Sosyal Medya Linklerini Doldurma
// ====================================
function populateSocialLinks(ENV) {
  const safeLink = (value) => {
    return (typeof value === 'string' && value.trim() && value !== '#') ? value : '#';
  };

  const linkInstagram = document.querySelector('[data-link="instagram"]');
  const linkLinkedin = document.querySelector('[data-link="linkedin"]');
  const linkGithub = document.querySelector('[data-link="github"]');

  if (linkInstagram) {
    linkInstagram.href = safeLink(ENV.SOCIAL?.INSTAGRAM);
  }
  if (linkLinkedin) {
    linkLinkedin.href = safeLink(ENV.SOCIAL?.LINKEDIN);
  }
  if (linkGithub) {
    linkGithub.href = safeLink(ENV.SOCIAL?.GITHUB);
  }
}

// ====================================
// Harita Başlatma (OpenLayers)
// ====================================
function initMap(ENV) {
  const mapElement = document.getElementById('map');
  
  // Harita elementi ve OpenLayers kütüphanesi kontrolü
  if (!mapElement || !window.ol) return;
  
  // Harita ayarları
  const mapConfig = ENV.MAP || {};
  const center = Array.isArray(mapConfig.center) && mapConfig.center.length === 2 
    ? mapConfig.center 
    : [32.8597, 39.9334]; // Varsayılan: Ankara
  const zoom = mapConfig.zoom || 6;

  try {
    // Harita oluştur
    const map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat(center),
        zoom: zoom
      }),
      controls: ol.control.defaults({
        attribution: false,
        zoom: true
      })
    });

    // Marker ekle
    const markerFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat(center))
    });

    // Marker stili
    const markerStyle = new ol.style.Style({
      image: new ol.style.Circle({
        radius: 8,
        fill: new ol.style.Fill({ color: '#60a5fa' }),
        stroke: new ol.style.Stroke({
          color: '#fff',
          width: 3
        })
      })
    });

    markerFeature.setStyle(markerStyle);

    // Marker katmanı
    const vectorSource = new ol.source.Vector({
      features: [markerFeature]
    });

    const vectorLayer = new ol.layer.Vector({
      source: vectorSource
    });

    map.addLayer(vectorLayer);

    // Harita yüklenme animasyonu
    setTimeout(() => {
      mapElement.style.opacity = '1';
    }, 300);

  } catch (error) {
    console.error('Harita yüklenirken hata oluştu:', error);
  }
}

// ====================================
// Smooth Scroll
// ====================================
function initSmoothScroll() {
  document.querySelectorAll('[data-scroll-to]').forEach(button => {
    button.addEventListener('click', () => {
      const targetSelector = button.getAttribute('data-scroll-to');
      const targetElement = document.querySelector(targetSelector);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ====================================
// Scroll Animasyonları (Intersection Observer)
// ====================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Animasyon yapılacak elementleri seç
  document.querySelectorAll('.section, .social-card, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ====================================
// Yardımcı Fonksiyonlar
// ====================================

// Güvenli element seçici
function safeQuery(selector) {
  return document.querySelector(selector);
}

// Güvenli element seçici (çoklu)
function safeQueryAll(selector) {
  return document.querySelectorAll(selector);
}

// Konsol log (development)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  console.log('🚀 Site başarıyla yüklendi!');
  console.log('📊 ENV Verileri:', window.ENV);
}