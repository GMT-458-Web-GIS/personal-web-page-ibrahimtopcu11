document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('page-loaded');
  }, 100);

  const currentLang = sessionStorage.getItem('language') || 'en';
  const ENV = window.ENV[currentLang] || window.ENV.en;

  initNavigation();
  populateEnvData(ENV);
  populateHobbies(ENV);
  populateProjects(ENV);
  populateSocialLinks(ENV);
  initSmoothScroll();
  initScrollAnimations();
  initInteractiveBackground();
  initImageModal();
  
  setTimeout(() => {
    initMap();
  }, 1000);
});

window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    document.body.classList.remove('page-leave');
    document.body.classList.add('page-loaded');
    
    const currentLang = sessionStorage.getItem('language') || 'en';
    if (window.i18n) {
      window.i18n.updateLanguage(currentLang);
    }
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
  const currentLang = sessionStorage.getItem('language') || 'en';
  const data = window.ENV[currentLang] || window.ENV.en;
  
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
  const currentLang = sessionStorage.getItem('language') || 'en';
  const data = window.ENV[currentLang] || window.ENV.en;
  const projectsGrid = document.querySelector('[data-projects-grid]');

  if (!projectsGrid || !data.PROJECTS || !Array.isArray(data.PROJECTS)) return;

  projectsGrid.innerHTML = '';
  
  const viewProjectText = data.BUTTONS?.VIEW_PROJECT || 'View Project';
  
  data.PROJECTS.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card animate-on-scroll';
    card.innerHTML = `
      <img src="${project.image}" 
           alt="${project.title}" 
           loading="lazy"
           class="project-image-clickable"
           data-full-image="${project.image}"
           onclick="openImageModal('${project.image}')">
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
  
  if (window.initScrollAnimations) {
    setTimeout(() => window.initScrollAnimations(), 100);
  }
}

window.populateSocialLinks = function(ENV) {
  const currentLang = sessionStorage.getItem('language') || 'en';
  const data = window.ENV[currentLang] || window.ENV.en;
  
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

window.currentMap = null;

function initMap() {
  const mapElement = document.getElementById('map');
  
  if (!mapElement) {
    return;
  }

  if (typeof L === 'undefined') {
    console.error('Leaflet yüklenemedi');
    return;
  }

  const mapConfig = window.ENV.MAP || {};
  const lat = mapConfig.center && mapConfig.center[1] ? mapConfig.center[1] : 39.9334;
  const lng = mapConfig.center && mapConfig.center[0] ? mapConfig.center[0] : 32.8597;
  const zoom = mapConfig.zoom || 12;
  
  const currentLang = sessionStorage.getItem('language') || 'en';

  try {
    if (window.currentMap) {
      window.currentMap.remove();
    }

    const map = L.map('map', {
      zoomControl: true,
      attributionControl: false,
      minZoom: 8,
      maxZoom: 18,
      scrollWheelZoom: true
    }).setView([lat, lng], zoom);

    window.currentMap = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 8
    }).addTo(map);

    updateMapMarkers(map, currentLang);

    setTimeout(() => {
      map.invalidateSize();
      mapElement.classList.add('loaded');
    }, 200);

  } catch (error) {
    console.error('Harita hatası:', error);
  }
}

window.updateMapMarkers = function(map, lang) {
  if (!map) return;
  
  map.eachLayer(layer => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });
  
  const data = window.ENV[lang] || window.ENV.en;
  
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
        <div class="popup-scroll-container">
          <img src="${place.image}" 
               alt="${place.name}" 
               class="popup-image-clickable"
               data-full-image="${place.image}"
               style="width:100%;height:180px;object-fit:cover;border-radius:8px;margin-bottom:12px;cursor:pointer;transition:transform 0.3s;" 
               onerror="this.style.display='none'"
               onmouseover="this.style.transform='scale(1.05)'"
               onmouseout="this.style.transform='scale(1)'">
          <h3 style="margin:0 0 8px;font-size:16px;font-weight:600;color:#111;line-height:1.3;">${place.name}</h3>
          <p style="margin:0 0 8px;font-size:13px;color:#666;"><strong>${place.type}</strong></p>
          <p style="margin:0;font-size:12px;color:#888;line-height:1.5;">${place.description}</p>
        </div>
      `, {
        maxWidth: 280,
        maxHeight: 400,
        className: 'custom-popup-scrollable',
        autoPan: true,
        autoPanPadding: [50, 50]
      });
      
      marker.on('popupopen', function() {
        const popupImages = document.querySelectorAll('.popup-image-clickable');
        popupImages.forEach(img => {
          img.addEventListener('click', function() {
            const fullImageSrc = this.getAttribute('data-full-image');
            openImageModal(fullImageSrc);
          });
        });
      });
    });
  }
}

function initImageModal() {
  const modalHTML = `
    <div id="imageModal" class="image-modal">
      <span class="image-modal-close">&times;</span>
      <img class="image-modal-content" id="modalImage">
      <div class="image-modal-caption"></div>
    </div>
  `;
  
  if (!document.getElementById('imageModal')) {
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }
  
  const closeBtn = document.querySelector('.image-modal-close');
  const modal = document.getElementById('imageModal');
  
  if (closeBtn) {
    closeBtn.addEventListener('click', closeImageModal);
  }
  
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeImageModal();
      }
    });
  }
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeImageModal();
    }
  });
}

function openImageModal(imageSrc) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  
  if (modal && modalImg) {
    modal.style.display = 'flex';
    modalImg.src = imageSrc;
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
      modal.classList.add('active');
    }, 10);
  }
}

function closeImageModal() {
  const modal = document.getElementById('imageModal');
  
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
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
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll, .section, .social-card, .project-card, h2, h3, p, .chips').forEach(el => {
    observer.observe(el);
  });
}

function initInteractiveBackground() {
  const canvas = document.getElementById('interactive-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  
  const particles = [];
  const particleCount = 100;
  const mouse = { x: null, y: null, radius: 150 };
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = Math.random() * 30 + 1;
      this.distance = 0;
    }
    
    update() {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const maxDistance = mouse.radius;
      const force = (maxDistance - distance) / maxDistance;
      const directionX = forceDirectionX * force * this.density;
      const directionY = forceDirectionY * force * this.density;
      
      if (distance < mouse.radius) {
        this.x -= directionX;
        this.y -= directionY;
      } else {
        if (this.x !== this.baseX) {
          const dx = this.x - this.baseX;
          this.x -= dx / 10;
        }
        if (this.y !== this.baseY) {
          const dy = this.y - this.baseY;
          this.y -= dy / 10;
        }
      }
    }
    
    draw() {
      ctx.fillStyle = 'rgba(17, 17, 17, 0.6)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
  }
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          ctx.strokeStyle = `rgba(17, 17, 17, ${0.2 * (1 - distance / 120)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    connectParticles();
    requestAnimationFrame(animate);
  }
  
  animate();
  
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });
  
  window.addEventListener('resize', resizeCanvas);
}