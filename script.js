
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-loaded');

  document.querySelectorAll('.nav a').forEach(a => {
    const url = a.getAttribute('href');

    const path = (location.pathname.split('/').pop() || 'index.html');
    if ((path === '' && url === 'index.html') || url === path) {
      a.classList.add('active');
    }

    a.addEventListener('click', (e) => {
      if (url && !url.startsWith('#')) {
        e.preventDefault();
        document.body.classList.add('page-leave');
        setTimeout(() => { window.location.href = url; }, 280);
      }
    });
  });


  const E = window.ENV || {};
  const qs = (sel) => document.querySelector(sel);


  const hobbyWrap = qs('[data-hobbies]');
  if (hobbyWrap && Array.isArray(E.HOBBIES)) {
    hobbyWrap.innerHTML = '';
    E.HOBBIES.forEach(h => {
      const chip = document.createElement('span');
      chip.textContent = h;
      hobbyWrap.appendChild(chip);
    });
  }


  const safe = (v) => (typeof v === 'string' && v.trim() ? v : '#');
  const linkInstagram = qs('[data-link="instagram"]');
  const linkLinkedin  = qs('[data-link="linkedin"]');
  const linkGithub    = qs('[data-link="github"]');
  if (linkInstagram) linkInstagram.href = safe(E.SOCIAL?.INSTAGRAM);
  if (linkLinkedin)  linkLinkedin.href  = safe(E.SOCIAL?.LINKEDIN);
  if (linkGithub)    linkGithub.href    = safe(E.SOCIAL?.GITHUB);


  const mapEl = document.getElementById('map');
  if (mapEl && window.ol && Array.isArray(E.MAP?.center) && E.MAP.center.length === 2) {
    const [lon, lat] = E.MAP.center;
    const map = new ol.Map({
      target: 'map',
      layers: [ new ol.layer.Tile({ source: new ol.source.OSM() }) ],
      view: new ol.View({
        center: ol.proj.fromLonLat([lon, lat]),
        zoom: E.MAP.zoom || 6
      })
    });
    const marker = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat]))
    });
    const vectorSource = new ol.source.Vector({ features: [marker] });
    const vectorLayer = new ol.layer.Vector({ source: vectorSource });
    map.addLayer(vectorLayer);
  }


  document.querySelectorAll('[data-scroll-to]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const sel = btn.getAttribute('data-scroll-to');
      const el = document.querySelector(sel);
      if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
    });
  });

  if (qs('[data-name]'))    qs('[data-name]').textContent = E.NAME || '';
  if (qs('[data-surname]')) qs('[data-surname]').textContent = E.SURNAME || '';
  if (qs('[data-uni]'))     qs('[data-uni]').textContent = E.UNIVERSITY || '';
  if (qs('[data-dept]'))    qs('[data-dept]').textContent = E.DEPARTMENT || '';
});
