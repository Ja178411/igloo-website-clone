# Igloo 3D Art Showcase

An immersive 3D art gallery featuring interactive WebGL experiences, particle systems, and generative digital art. Built with modern web technologies to push the boundaries of browser-based 3D visualization.

## Features

- **Interactive 3D Gallery** - Six unique 3D artworks with different geometries and materials
- **WebGL Background** - Animated particle system that responds to mouse movement
- **Showcase Viewer** - Interactive 3D viewer with rotation, wireframe, and reset controls
- **Particle Effects** - Dynamic particle systems throughout the site
- **Smooth Animations** - GSAP-powered scroll animations and transitions
- **Responsive Design** - Fully responsive on mobile, tablet, and desktop
- **Modern UI** - Dark theme with glassmorphism and gradient accents
- **Loading Screen** - Animated loading experience with progress bar

## Technologies

### Core
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables, gradients, and animations
- **JavaScript (ES6+)** - Vanilla JavaScript for all interactions

### 3D & Animation
- **Three.js (r128)** - WebGL 3D rendering engine
- **GSAP 3** - Professional-grade animation library
- **ScrollTrigger** - Scroll-based animations

### Assets
- **Font Awesome 6** - Icon library
- **SVG Graphics** - Scalable vector images

## Project Structure

```
igloo-website-clone/
├── index.html          # Main HTML document
├── styles.css          # Complete CSS styling
├── script.js           # JavaScript with 3D functionality
├── README.md           # Project documentation
└── images/             # Image assets
    ├── logo.svg
    ├── hero-image.svg
    ├── about-image.svg
    └── favicon.svg
```

## Sections

1. **Hero** - Animated 3D torus knot with glitch effect title
2. **Gallery** - Six interactive 3D artworks:
   - Geometric Dreams - Wireframe icosahedron
   - Fluid Dynamics - Shiny sphere with lighting
   - Digital Landscapes - Rotating cube
   - Particle Universe - Octahedron wireframe
   - Crystalline Forms - Tetrahedron with lighting
   - Neon Structures - Torus geometry
3. **Showcase** - Interactive 3D viewer with controls
4. **About** - Information with particle background
5. **Contact** - Form with animated wave background
6. **Footer** - Links and social media

## Getting Started

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/Ja178411/igloo-website-clone.git
cd igloo-website-clone
```

2. Open `index.html` in your browser or use a local server:
```bash
# Python 3
python -m http.server 8000

# Node.js (with http-server)
npx http-server

# VS Code Live Server extension
# Right-click index.html > Open with Live Server
```

3. Visit `http://localhost:8000` in your browser

### Deployment

#### GitHub Pages

1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the sidebar
3. Under "Source", select "Deploy from a branch"
4. Choose the "main" branch and "/" (root) folder
5. Click "Save"
6. Your site will be live at `https://username.github.io/igloo-website-clone`

#### Other Platforms

This is a static site and can be deployed to:
- Netlify
- Vercel
- Cloudflare Pages
- AWS S3 + CloudFront
- Any static hosting service

## Browser Support

- Chrome/Edge (recommended for best WebGL performance)
- Firefox
- Safari
- Opera

**Note**: This site uses modern WebGL and ES6+ features. For best experience, use the latest browser versions.

## Performance

- Optimized 3D rendering with `requestAnimationFrame`
- Pixel ratio capping for performance on high-DPI displays
- Efficient particle systems
- Smooth 60fps animations
- Lazy-loaded 3D scenes

## Customization

### Colors

Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
    --bg-dark: #0f172a;
    --bg-darker: #020617;
}
```

### 3D Scenes

Modify geometries and materials in `script.js`:
```javascript
// Example: Change gallery item geometry
geometry = new THREE.IcosahedronGeometry(1.5, 1);
material = new THREE.MeshNormalMaterial({ wireframe: true });
```

### Content

Update text and images directly in `index.html`

## Future Enhancements

- [ ] Add more 3D artworks
- [ ] Implement VR/AR support
- [ ] Add sound/music integration
- [ ] Create custom GLSL shaders
- [ ] Add artwork detail modal views
- [ ] Implement fullscreen gallery mode
- [ ] Add artist collaboration features
- [ ] Create admin panel for content management

## Credits

- Built with [Three.js](https://threejs.org/)
- Animations powered by [GSAP](https://greensock.com/gsap/)
- Icons from [Font Awesome](https://fontawesome.com/)

## License

This project is created for educational and portfolio purposes. Feel free to use as inspiration for your own projects.

## Author

Created with Claude Code - Exploring the intersection of art, code, and imagination.

---

**Live Demo**: [View Site](#)
**Repository**: [GitHub](https://github.com/Ja178411/igloo-website-clone)
