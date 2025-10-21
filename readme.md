# 🌐 Personal Portfolio Website

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=flat-square&logo=leaflet&logoColor=white)

**Modern, interactive portfolio website with multilingual support and interactive maps**

[Live Demo](https://ibrahimtopcu11.github.io) • [Report Bug](https://github.com/ibrahimtopcu11/portfolio/issues)

</div>

---
##  Screenshots

<div align="center">

### Desktop View
![Desktop Home](screenshots/desktop-home.png)
*Home page with interactive particle background and hero section*

![Desktop Projects](screenshots/desktop-projects.png)
*Projects showcase with hover effects*

![Desktop Map](screenshots/desktop-map.png)
*Interactive map with work experience markers*

### Mobile View
<p>
<img src="screenshots/mobile-home.png" width="250" alt="Mobile Home">
<img src="screenshots/mobile-projects.png" width="250" alt="Mobile Projects">
<img src="screenshots/mobile-contact.png" width="250" alt="Mobile Contact">
</p>

##  Key Features

-  **Interactive Canvas Background** - Mouse-responsive particle system with dynamic connections
-  **Bilingual Support** - Seamless Turkish/English switching with sessionStorage persistence
-  **Interactive Map** - Leaflet.js powered map with custom markers for work experience
-  **Fully Responsive** - Mobile-first design optimized for all screen sizes
-  **Scroll Animations** - Intersection Observer API for smooth element reveals
-  **Performance Optimized** - Pure vanilla JavaScript, no frameworks

---



---

##  Project Structure
```
portfolio-website/
├── index.html              # Home page with hero, about, and map
├── projects.html           # Project showcase page
├── social.html             # Contact and social links page
├── styles.css              # Main stylesheet with animations
├── script.js               # Core functionality and animations
├── i18n.js                 # Multilingual system
├── env.js                  # Configuration and content data
└── assets/                 # Images and icons
    ├── me.jpg
    ├── work1.jpg, work2.jpg
    ├── proj1.jpg, proj2.jpg, proj3.jpg
    └── instagram.svg, linkedin.svg, github.svg
```

---


###  Customize Colors

Edit CSS variables in `styles.css`:
```css
:root {
  --bg: #f8f9fa;           /* Background */
  --text: #111111;         /* Primary text */
  --text-light: #737373;   /* Secondary text */
  --border: #e4e4e7;       /* Borders */
  --accent: #111111;       /* Accent color */
  --hover: #fafafa;        /* Hover state */
}
```

---

##  Technology Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | HTML5, CSS3, JavaScript ES6+ |
| **Mapping** | Leaflet.js 1.9.4 |
| **Storage** | SessionStorage API |
| **Animations** | Canvas API, Intersection Observer API |
| **Styling** | CSS Grid, Flexbox, Custom Properties |

---

##  Features in Detail

### Interactive Canvas Background
- 100 particles with physics-based movement
- Mouse interaction within 150px radius
- Dynamic particle connections
- Smooth animations at 60fps

### Multilingual System
- Language toggle with active state
- Content updates via data attributes
- SessionStorage for persistence across pages
- Automatic map popup translation

### Scroll Animations
- Intersection Observer for performance
- Fade-in and slide-up effects
- Staggered animations on cards
- 15% threshold visibility trigger

### Interactive Map
- Custom numbered markers
- Rich popup content (images, text)
- Bounce animations on markers
- Responsive and touch-optimized

---

## Deployment

### GitHub Pages
```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/GMT-458-Web-GIS/personal-web-page-ibrahimtopcu11.git
git push -u origin master

# Enable GitHub Pages
# Settings → Pages → Source: main branch → Save
# Site: 
```

##  Troubleshooting

| Issue | Solution |
|-------|----------|
| **Map not loading** | Check Leaflet.js CDN link, verify coordinates format [lng, lat] |
| **Language not switching** | Verify sessionStorage support, check i18n.js loaded |
| **Images not showing** | Check file paths (case-sensitive), use relative paths |
| **Animations laggy** | Reduce particle count to 50, increase distance threshold |

---

##  Performance

- **Bundle Size:** < 500 KB
- **Load Time:** < 1 second
- **Lighthouse Score:** 95+
- **Dependencies:** 1 (Leaflet.js only)

---


##  Author

**İbrahim Topcu**

- GitHub: [@ibrahimtopcu11](https://github.com/ibrahimtopcu11)
- LinkedIn: [İbrahim Topcu](https://linkedin.com/in/ibrahim-topcu-1a411a2b8)
- Instagram: [@ibrahim__tpc](https://instagram.com/ibrahim__tpc)

---

## 🙏 Acknowledgments

- [Leaflet.js](https://leafletjs.com/) - Interactive mapping library
- [OpenStreetMap](https://www.openstreetmap.org/) - Map data provider
- [Tympanus](https://tympanus.net/) - Interactive background inspiration

---

<div align="center">


</div>