document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('page-loaded');
  }, 100);

  const currentLang = localStorage.getItem('language') || 'tr';
  const ENV = window.ENV[currentLang] || window.ENV.tr;

  initNavigation();
  populateEnvData(ENV);
  populateHobbies(ENV);
  populateProjects(ENV);
  populateSocialLinks(ENV);
  initSmoothScroll();
  initScrollAnimations();
  initBlurEffect();
  initWorldMapAnimation();
  
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

window.populateEnvData = function(ENV) {
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

window.populateHobbies = function(ENV) {
  const currentLang = localStorage.getItem('language') || 'tr';
  const data = window.ENV[currentLang] || window.ENV.tr;
  
  const hobbyContainer = document.querySelector('[data-hobbies]');
  
  if (hobbyContainer && Array.isArray(data.HOBBIES)) {
    hobbyContainer.innerHTML = '';
    
    data.HOBBIES.forEach(hobby => {
      const chip = document.createElement('span');
      chip.textContent = hobby;
      hobbyContainer.appendChild(chip);
    });
  }
}

window.populateProjects = function(ENV) {
  const currentLang = localStorage.getItem('language') || 'tr';
  const data = window.ENV[currentLang] || window.ENV.tr;
  const projectsGrid = document.querySelector('[data-projects-grid]');

  if (!projectsGrid || !data.PROJECTS || !Array.isArray(data.PROJECTS)) return;

  projectsGrid.innerHTML = '';
  
  const viewProjectText = data.BUTTONS?.VIEW_PROJECT || 'Projeyi Görüntüle';
  
  data.PROJECTS.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card blur-on-scroll';
    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" loading="lazy">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <p class="project-tech">${project.tech}</p>
      <a class="btn" href="${project.link}" target="_blank" rel="noopener">
        <span>${viewProjectText}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </a>
    `;
    projectsGrid.appendChild(card);
  });
  
  if (window.initBlurEffect) {
    setTimeout(() => window.initBlurEffect(), 100);
  }
}

window.populateSocialLinks = function(ENV) {
  const currentLang = localStorage.getItem('language') || 'tr';
  const data = window.ENV[currentLang] || window.ENV.tr;
  
  const safeLink = (value) => {
    return (typeof value === 'string' && value.trim() && value !== '#') ? value : '#';
  };

  const linkInstagram = document.querySelector('[data-link="instagram"]');
  const linkLinkedin = document.querySelector('[data-link="linkedin"]');
  const linkGithub = document.querySelector('[data-link="github"]');

  if (linkInstagram && data.SOCIAL?.INSTAGRAM) {
    linkInstagram.href = safeLink(data.SOCIAL.INSTAGRAM.url);
  }
  if (linkLinkedin && data.SOCIAL?.LINKEDIN) {
    linkLinkedin.href = safeLink(data.SOCIAL.LINKEDIN.url);
  }
  if (linkGithub && data.SOCIAL?.GITHUB) {
    linkGithub.href = safeLink(data.SOCIAL.GITHUB.url);
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

  const mapConfig = window.ENV.MAP || {};
  const lat = mapConfig.center && mapConfig.center[1] ? mapConfig.center[1] : 39.9334;
  const lng = mapConfig.center && mapConfig.center[0] ? mapConfig.center[0] : 32.8597;
  const zoom = mapConfig.zoom || 12;
  
  const currentLang = localStorage.getItem('language') || 'tr';
  const data = window.ENV[currentLang] || window.ENV.tr;

  try {
    const map = L.map('map', {
      zoomControl: true,
      attributionControl: false,
      minZoom: 8,
      maxZoom: 18
    }).setView([lat, lng], zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 8
    }).addTo(map);

    if (data.WORK_PLACES && Array.isArray(data.WORK_PLACES)) {
      data.WORK_PLACES.forEach((place, index) => {
        const customIcon = L.divIcon({
          className: 'custom-work-marker',
          html: `<div style="position:relative;animation:markerBounce 2s ease-in-out infinite;animation-delay:${index * 0.3}s;">
                   <div style="width:35px;height:35px;background:#111111;border:3px solid #fff;border-radius:50%;box-shadow:0 6px 16px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:14px;">${index + 1}</div>
                 </div>`,
          iconSize: [35, 35],
          iconAnchor: [17.5, 17.5]
        });

        const marker = L.marker([place.coordinates[1], place.coordinates[0]], { 
          icon: customIcon 
        }).addTo(map);

        marker.bindPopup(`
          <div style="font-family:system-ui;padding:12px;min-width:200px;">
            <img src="${place.image}" alt="${place.name}" style="width:100%;height:120px;object-fit:cover;border-radius:8px;margin-bottom:10px;" onerror="this.style.display='none'">
            <h3 style="margin:0 0 8px;font-size:15px;font-weight:600;color:#111;">${place.name}</h3>
            <p style="margin:0 0 6px;font-size:12px;color:#666;"><strong>${place.type}</strong></p>
            <p style="margin:0;font-size:11px;color:#888;line-height:1.4;">${place.description}</p>
          </div>
        `, {
          maxWidth: 250,
          className: 'custom-popup'
        });
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
        const startPosition = window.pageYOffset;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
        const distance = targetPosition - startPosition;
        const duration = 1200;
        let start = null;
        
        function animation(currentTime) {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const progress = Math.min(timeElapsed / duration, 1);
          
          const ease = t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
          
          window.scrollTo(0, startPosition + distance * ease(progress));
          
          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          }
        }
        
        requestAnimationFrame(animation);
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

window.initBlurEffect = function() {
  const blurElements = document.querySelectorAll('.blur-on-scroll');
  
  function updateBlur() {
    blurElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const distanceFromTop = rect.top;
      const windowHeight = window.innerHeight;
      
      if (distanceFromTop > windowHeight * 0.6) {
        const blurAmount = Math.min(10, (distanceFromTop - windowHeight * 0.6) / 40);
        el.style.filter = `blur(${blurAmount}px)`;
        el.style.opacity = Math.max(0.2, 1 - blurAmount / 10);
      } else {
        el.style.filter = 'blur(0px)';
        el.style.opacity = '1';
      }
    });
  }
  
  const blurObserver = new IntersectionObserver((entries) => {
    updateBlur();
  }, {
    threshold: Array.from({length: 20}, (_, i) => i / 20)
  });

  blurElements.forEach(el => {
    el.style.transition = 'filter 0.3s ease, opacity 0.3s ease';
    blurObserver.observe(el);
  });
  
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateBlur();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

function initWorldMapAnimation() {
  const worldMapBg = document.querySelector('.world-map-bg');
  if (!worldMapBg) return;
  
  let scrollY = 0;
  
  window.addEventListener('scroll', () => {
    scrollY = window.pageYOffset;
    worldMapBg.style.transform = `translateY(${scrollY * 0.3}px) scale(1.1)`;
  }, { passive: true });
}