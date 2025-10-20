document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('page-loaded');
  }, 100);

  const ENV = window.ENV || {};

  initNavigation();
  populateEnvData(ENV);
  populateHobbies(ENV);
  populateProjects(ENV);
  populateSocialLinks(ENV);
  
  setTimeout(() => {
    initMap(ENV);
  }, 500);
  
  initSmoothScroll();
  initScrollAnimations();
});

window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    document.body.classList.remove('page-leave');
    document.body.classList.add('page-loaded');
  }
});

window.addEventListener('load', () => {
  document.body.classList.remove('page-leave');
  document.body.classList.add('page-loaded');
});

function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    if ((currentPath === '' && href === 'index.html') || href === currentPath) {
      link.classList.add('active');
    }

    link.addEventListener('click', (e) => {
      if (href && !href.startsWith('#')) {
        e.preventDefault();
        document.body.classList.add('page-leave');
        
        setTimeout(() => {
          window.location.href = href;
        }, 400);
      }
    });
  });
}

function populateEnvData(ENV) {
  const safeText = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = value || '';
  };

  safeText('[data-name]', ENV.NAME);
  safeText('[data-surname]', ENV.SURNAME);
  safeText('[data-university]', ENV.UNIVERSITY);
  safeText('[data-university-text]', ENV.UNIVERSITY);
  safeText('[data-department]', ENV.DEPARTMENT);
  safeText('[data-department-text]', ENV.DEPARTMENT);

  const fullName = `${ENV.NAME || ''} ${ENV.SURNAME || ''}`.trim();
  document.querySelectorAll('[data-name-full]').forEach(el => {
    el.textContent = fullName;
  });
}

function populateHobbies(ENV) {
  const hobbyContainer = document.querySelector('[data-hobbies]');
  
  if (hobbyContainer && Array.isArray(ENV.HOBBIES)) {
    hobbyContainer.innerHTML = '';
    
    ENV.HOBBIES.forEach(hobby => {
      const chip = document.createElement('span');
      chip.textContent = hobby;
      hobbyContainer.appendChild(chip);
    });
  }
}

function populateProjects(ENV) {
  const projectsGrid = document.querySelector('[data-projects-grid]');

  if (!projectsGrid || !ENV.PROJECTS || !Array.isArray(ENV.PROJECTS)) return;

  projectsGrid.innerHTML = '';
  
  ENV.PROJECTS.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" loading="lazy">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <p class="project-tech">${project.tech}</p>
      <a class="btn" href="${project.link}" target="_blank" rel="noopener">
        <span>Projeyi Görüntüle</span>
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

function initMap(ENV) {
  const mapElement = document.getElementById('map');
  
  if (!mapElement) {
    console.log('Harita elementi bulunamadı');
    return;
  }

  if (typeof ol === 'undefined') {
    console.error('OpenLayers yüklenemedi');
    mapElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#f5f5f5;border-radius:12px;color:#6b7280;font-size:14px;">Harita yüklenemedi</div>';
    return;
  }

  const mapConfig = ENV.MAP || {};
  const center = Array.isArray(mapConfig.center) && mapConfig.center.length === 2 
    ? mapConfig.center 
    : [32.8597, 39.9334];
  const zoom = mapConfig.zoom || 6;

  try {
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

    const markerFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat(center))
    });

    const markerStyle = new ol.style.Style({
      image: new ol.style.Circle({
        radius: 10,
        fill: new ol.style.Fill({ color: '#0a0a0a' }),
        stroke: new ol.style.Stroke({
          color: '#ffffff',
          width: 3
        })
      })
    });

    markerFeature.setStyle(markerStyle);

    const vectorSource = new ol.source.Vector({
      features: [markerFeature]
    });

    const vectorLayer = new ol.layer.Vector({
      source: vectorSource
    });

    map.addLayer(vectorLayer);

    setTimeout(() => {
      map.updateSize();
      mapElement.classList.add('loaded');
      console.log('Harita başarıyla yüklendi');
    }, 300);

  } catch (error) {
    console.error('Harita hatası:', error);
    mapElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#f5f5f5;border-radius:12px;color:#6b7280;font-size:14px;">Harita oluşturulamadı</div>';
  }
}

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

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section, .social-card, .project-card').forEach(el => {
    if (!el.style.animation) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(el);
    }
  });
}