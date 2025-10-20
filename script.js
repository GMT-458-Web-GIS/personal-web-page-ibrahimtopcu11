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
  initSmoothScroll();
  initScrollAnimations();
  initBlurEffect();
  
  setTimeout(() => {
    initMap(ENV);
  }, 1000);
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
  safeText('[data-about-text]', ENV.ABOUT_TEXT);

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
    card.className = 'project-card blur-on-scroll';
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

  if (typeof L === 'undefined') {
    console.error('Leaflet yüklenemedi');
    mapElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#f5f5f5;border-radius:20px;color:#6b7280;font-size:14px;">Harita yüklenemedi</div>';
    return;
  }

  const mapConfig = ENV.MAP || {};
  const lat = mapConfig.center && mapConfig.center[1] ? mapConfig.center[1] : 39.9334;
  const lng = mapConfig.center && mapConfig.center[0] ? mapConfig.center[0] : 32.8597;
  const zoom = mapConfig.zoom || 11;

  try {
    const map = L.map('map', {
      zoomControl: true,
      attributionControl: false
    }).setView([lat, lng], zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 10
    }).addTo(map);

    if (ENV.WORK_PLACES && Array.isArray(ENV.WORK_PLACES)) {
      ENV.WORK_PLACES.forEach((place, index) => {
        const customIcon = L.divIcon({
          className: 'custom-work-marker',
          html: `<div style="position:relative;animation:markerBounce 2s ease-in-out infinite;animation-delay:${index * 0.3}s;">
                   <div style="width:30px;height:30px;background:#111111;border:3px solid #fff;border-radius:50%;box-shadow:0 4px 12px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:12px;">${index + 1}</div>
                 </div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        });

        const marker = L.marker([place.coordinates[1], place.coordinates[0]], { 
          icon: customIcon 
        }).addTo(map);

        marker.bindPopup(`
          <div style="font-family:system-ui;padding:8px;">
            <h3 style="margin:0 0 6px;font-size:14px;font-weight:600;color:#111;">${place.name}</h3>
            <p style="margin:0 0 4px;font-size:12px;color:#666;"><strong>${place.type}</strong></p>
            <p style="margin:0;font-size:11px;color:#888;">${place.description}</p>
          </div>
        `);
      });
    }

    setTimeout(() => {
      map.invalidateSize();
      mapElement.classList.add('loaded');
      console.log('Harita başarıyla yüklendi');
    }, 200);

  } catch (error) {
    console.error('Harita hatası:', error);
    mapElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#f5f5f5;border-radius:20px;color:#6b7280;font-size:14px;">Harita oluşturulamadı</div>';
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

function initBlurEffect() {
  const blurElements = document.querySelectorAll('.blur-on-scroll');
  
  const blurObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const distanceFromTop = entry.boundingClientRect.top;
      const windowHeight = window.innerHeight;
      
      if (distanceFromTop > windowHeight * 0.7) {
        const blurAmount = Math.min(8, (distanceFromTop - windowHeight * 0.7) / 50);
        entry.target.style.filter = `blur(${blurAmount}px)`;
        entry.target.style.opacity = Math.max(0.3, 1 - blurAmount / 8);
      } else {
        entry.target.style.filter = 'blur(0px)';
        entry.target.style.opacity = '1';
      }
    });
  }, {
    threshold: Array.from({length: 100}, (_, i) => i / 100)
  });

  blurElements.forEach(el => {
    blurObserver.observe(el);
  });
  
  window.addEventListener('scroll', () => {
    blurElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const distanceFromTop = rect.top;
      const windowHeight = window.innerHeight;
      
      if (distanceFromTop > windowHeight * 0.7) {
        const blurAmount = Math.min(8, (distanceFromTop - windowHeight * 0.7) / 50);
        el.style.filter = `blur(${blurAmount}px)`;
        el.style.opacity = Math.max(0.3, 1 - blurAmount / 8);
        el.style.transition = 'filter 0.3s ease, opacity 0.3s ease';
      } else {
        el.style.filter = 'blur(0px)';
        el.style.opacity = '1';
      }
    });
  });
}