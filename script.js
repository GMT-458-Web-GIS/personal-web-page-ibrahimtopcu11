<!-- script.js -->
<script>

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-loaded');


  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a => {
    const href = a.getAttribute('href');
    if ((path === '' && href === 'index.html') || href === path) {
      a.classList.add('active');
    }

    a.addEventListener('click', (e) => {
      const url = a.getAttribute('href');
      if (url && !url.startsWith('#')) {
        e.preventDefault();
        document.body.classList.add('page-leave');
        setTimeout(() => { window.location.href = url; }, 280);
      }
    });
  });

  const hobbyWrap = document.querySelector('[data-hobbies]');
  if (hobbyWrap && window.ENV?.HOBBIES) {
    hobbyWrap.innerHTML = '';
    window.ENV.HOBBIES.forEach(h => {
      const chip = document.createElement('span');
      chip.textContent = h;
      hobbyWrap.appendChild(chip);
    });
  }


  const linkInstagram = document.querySelector('[data-link="instagram"]');
  const linkLinkedin  = document.querySelector('[data-link="linkedin"]');
  const linkGithub    = document.querySelector('[data-link="github"]');
  if (linkInstagram && window.ENV?.SOCIAL?.INSTAGRAM) linkInstagram.href = window.ENV.SOCIAL.INSTAGRAM;
  if (linkLinkedin  && window.ENV?.SOCIAL?.LINKEDIN)  linkLinkedin.href  = window.ENV.SOCIAL.LINKEDIN;
  if (linkGithub    && window.ENV?.SOCIAL?.GITHUB)    linkGithub.href    = window.ENV.SOCIAL.GITHUB;


  const mapEl = document.getElementById('map');
  if (mapEl && window.ol && window.ENV?.MAP) {
    const lon = window.ENV.MAP.center[0];
    const lat = window.ENV.MAP.center[1];

    const map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([lon, lat]),
        zoom: window.ENV.MAP.zoom || 6
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
});
</script>
