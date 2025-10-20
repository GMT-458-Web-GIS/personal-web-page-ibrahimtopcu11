window.ENV = {
  NAME: "İbrahim",
  SURNAME: "Topcu",
  UNIVERSITY: "Hacettepe Üniversitesi",
  DEPARTMENT: "Geomatik Mühendisliği",
  
  ABOUT_TEXT: "Hacettepe Üniversitesi Geomatik Mühendisliği bölümünde lisans eğitimime devam ediyorum. Harita teknolojileri, coğrafi bilgi sistemleri ve web geliştirme alanlarında kendimi geliştiriyorum. Staj deneyimlerimde hem özel sektörde hem de kamu kurumlarında çalışma fırsatı buldum. Modern web teknolojileri, veri görselleştirme ve mekansal analiz konularına ilgi duyuyorum. Projelerimde OpenLayers, Leaflet gibi harita kütüphaneleri ve Python, JavaScript gibi programlama dilleriyle çalışıyorum.",
 
  HOBBIES: [
    "Sinema izlemek",
    "Oyun oynamak",
    "Bisiklet sürmek"
  ],
 
  MAP: {
    center: [32.8597, 39.9334],
    zoom: 11
  },
  
  WORK_PLACES: [
    {
      name: "HGG İnşaat",
      type: "Staj",
      coordinates: [32.8095, 39.9508],
      description: "Özel sektör staj deneyimi"
    },
    {
      name: "T.C. Ulaştırma ve Altyapı Bakanlığı",
      type: "Staj",
      coordinates: [32.8551, 39.9208],
      description: "Kamu kurumu staj deneyimi"
    }
  ],
  SOCIAL: {
    INSTAGRAM: "https://www.instagram.com/ibrahim__tpc/",
    LINKEDIN: "https://linkedin.com/in/ibrahim-topcu-1a411a2b8",
    GITHUB: "https://github.com/ibrahimtopcu11"
  },
 
  PROJECTS: [
    {
      title: "OSM Tabanlı Ağ ve En Kısa Yol Analizi",
      description: "OpenStreetMap verileriyle ağ analizi ve rota optimizasyonu",
      tech: "Python, OSMnx, GeoPandas, NetworkX",
      image: "assets/proj1.jpg",
      link: "https://github.com/ibrahimtopcu11/proje1"
    },
    {
      title: "OpenLayers ile İnteraktif Web Harita",
      description: "Çoklu katman destekli modern web harita uygulaması",
      tech: "OpenLayers, JavaScript, HTML/CSS",
      image: "assets/proj2.jpg",
      link: "https://ibrahimtopcu11.github.io/ol-demo"
    },
    {
      title: "QGIS + PostGIS Afet Yönetimi Sistemi",
      description: "Gerçek zamanlı afet takip ve koordinasyon platformu",
      tech: "Node.js, React, PostGIS, Leaflet",
      image: "assets/proj3.jpg",
      link: "https://github.com/ibrahimtopcu11/afet-yonetimi"
    }
  ]
};