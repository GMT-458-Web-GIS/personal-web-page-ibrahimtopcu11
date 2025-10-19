// env.js 
window.ENV = {
  // Kişisel Bilgiler
  NAME: "İbrahim",
  SURNAME: "Topcu",
  UNIVERSITY: "Hacettepe Üniversitesi",
  DEPARTMENT: "Geomatik Mühendisliği",
  
  // Hobiler
  HOBBIES: [
    "Sinema izlemek",
    "Oyun oynamak", 
    "Bisiklet sürmek"
  ],
  
  // Harita Ayarları (Ankara merkez)
  MAP: { 
    center: [32.8597, 39.9334], // [lon, lat]
    zoom: 6 
  },
  
  // Sosyal Medya Linkleri
  SOCIAL: {
    INSTAGRAM: "https://instagram.com/kullanici_adin",  
    LINKEDIN:  "https://linkedin.com/in/kullanici_adin",
    GITHUB:    "https://github.com/kullanici_adin"
  },
  
  // Projeler
  PROJECTS: [
    {
      title: "OSM Tabanlı Ağ ve En Kısa Yol Analizi",
      description: "OpenStreetMap verileriyle ağ analizi ve rota optimizasyonu",
      tech: "Python, OSMnx, GeoPandas, NetworkX",
      image: "assets/proj1.jpg",
      link: "https://github.com/kullanici_adin/proje1"
    },
    {
      title: "OpenLayers ile İnteraktif Web Harita",
      description: "Çoklu katman destekli modern web harita uygulaması",
      tech: "OpenLayers, JavaScript, HTML/CSS",
      image: "assets/proj2.jpg",
      link: "https://kullanici_adin.github.io/ol-demo"
    },
    {
      title: "QGIS + PostGIS Afet Yönetimi Sistemi",
      description: "Gerçek zamanlı afet takip ve koordinasyon platformu",
      tech: "Node.js, React, PostGIS, Leaflet",
      image: "assets/proj3.jpg",
      link: "https://github.com/kullanici_adin/afet-yonetimi"
    }
  ]
};