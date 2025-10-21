const i18n = {
  currentLang: sessionStorage.getItem('language') || 'en',
 
  init() {
    this.updateLanguage(this.currentLang);
    this.setupLanguageSwitcher();
  },
 
  setupLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
   
    langButtons.forEach(btn => {
      const lang = btn.getAttribute('data-lang');
      if (lang === this.currentLang) {
        btn.classList.add('active');
      }
     
      btn.addEventListener('click', () => {
        this.switchLanguage(lang);
      });
    });
  },
 
  switchLanguage(lang) {
    this.currentLang = lang;
    sessionStorage.setItem('language', lang);
   
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      }
    });
   
    this.updateLanguage(lang);
   
    if (window.populateHobbies) window.populateHobbies(window.ENV);
    if (window.populateProjects) window.populateProjects(window.ENV);
    if (window.populateSocialLinks) window.populateSocialLinks(window.ENV);
   
    if (window.currentMap && window.updateMapMarkers) {
      window.updateMapMarkers(window.currentMap, lang);
    }
  },
 
  updateLanguage(lang) {
    const data = window.ENV[lang];
    if (!data) return;
   
    document.querySelectorAll('[data-name-full]').forEach(el => {
      el.textContent = `${data.NAME} ${data.SURNAME}`;
    });
   
    document.querySelectorAll('[data-university]').forEach(el => {
      el.textContent = data.UNIVERSITY;
    });
   
    document.querySelectorAll('[data-department]').forEach(el => {
      el.textContent = data.DEPARTMENT;
    });
   
    document.querySelectorAll('[data-about-text]').forEach(el => {
      el.textContent = data.ABOUT_TEXT;
    });
   
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = this.getNestedValue(data, key);
      if (value) el.textContent = value;
    });
   
    ['instagram', 'linkedin', 'github'].forEach(platform => {
      const titleEl = document.querySelector(`[data-social-title="${platform}"]`);
      const descEl = document.querySelector(`[data-social-desc="${platform}"]`);
     
      if (titleEl && data.SOCIAL[platform.toUpperCase()]) {
        titleEl.textContent = data.SOCIAL[platform.toUpperCase()].title;
      }
      if (descEl && data.SOCIAL[platform.toUpperCase()]) {
        descEl.textContent = data.SOCIAL[platform.toUpperCase()].desc;
      }
    });
  },
 
  getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => {
      if (key === 'nav') return current.NAV;
      if (key === 'sections') return current.SECTIONS;
      if (key === 'buttons') return current.BUTTONS;
      if (key === 'hero') return current;
     
      const mapping = {
        'home': 'HOME',
        'projects': 'PROJECTS',
        'contact': 'CONTACT',
        'about': 'ABOUT',
        'hobbies': 'HOBBIES',
        'workPlaces': 'WORK_PLACES',
        'workDesc': 'WORK_DESC',
        'portfolio': 'PORTFOLIO',
        'projectsSubtitle': 'PROJECTS_SUBTITLE',
        'contactTitle': 'CONTACT_TITLE',
        'contactSubtitle': 'CONTACT_SUBTITLE',
        'contactInfo': 'CONTACT_INFO',
        'contactText': 'CONTACT_TEXT',
        'explore': 'EXPLORE',
        'viewProject': 'VIEW_PROJECT',
        'scrollTip': 'SCROLL_TIP',
        'subtitle': 'HERO_SUBTITLE'
      };
     
      return current ? current[mapping[key] || key] : undefined;
    }, obj);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => i18n.init());
} else {
  i18n.init();
}

window.i18n = i18n;