# Igloo - 3D Art Showcase

An immersive 3D art showcase and interactive gallery featuring stunning WebGL animations powered by Three.js. This project demonstrates cutting-edge web technologies to create beautiful, interactive digital art experiences.

## Features

### 3D Animations & WebGL
- **Animated Hero Section** - Interactive 3D icosahedron with particle effects that respond to mouse movement
- **Interactive Gallery** - Six unique 3D artworks with different geometries (Torus, Octahedron, Tetrahedron, etc.)
- **3D Model Showcase** - Draggable and interactive 3D models with shape switching capabilities
- **Particle Systems** - Beautiful particle animations throughout the site
- **Custom Cursor** - Smooth, animated custom cursor with blend modes
- **Loading Screen** - Elegant loading animation with progress bar

### Design & Interactivity
- **Modern Dark UI** - Beautiful dark theme with gradient accents
- **Smooth Animations** - CSS and JavaScript animations throughout
- **Responsive Design** - Fully responsive across desktop, tablet, and mobile
- **Interactive Elements** - Hover effects, transitions, and micro-interactions
- **Scroll Animations** - Elements animate as you scroll
- **Number Counters** - Animated statistics that count up when visible
- **Floating Cards** - Subtle floating animation on feature cards

### Performance Optimizations
- **Intersection Observer** - Lazy rendering of 3D scenes for better performance
- **Efficient Animation Loops** - Optimized requestAnimationFrame usage
- **Responsive Resizing** - Proper canvas resizing on window resize
- **Conditional Rendering** - 3D scenes only animate when visible

## Project Structure

```
igloo-website-clone/
├── index.html          # Main HTML structure
├── styles.css          # Modern CSS with gradients and animations
├── script.js           # Three.js and interaction logic
├── images/
│   ├── favicon.svg     # Site favicon
│   ├── logo.svg        # Logo graphic
│   ├── hero-image.svg  # Hero section image
│   └── about-image.svg # About section image
└── README.md           # This file
```

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern layouts with Grid and Flexbox, custom animations
- **JavaScript (ES6+)** - Modern JavaScript features
- **Three.js (r128)** - 3D graphics and WebGL
- **Font Awesome 6** - Icon library
- **Intersection Observer API** - Performance optimization

## Sections

### 1. Hero Section
Full-screen hero with animated 3D geometry, particles, and mouse-tracking camera movement.

### 2. Gallery
Interactive gallery featuring six unique 3D artworks:
- Abstract Forms (Torus)
- Fluid Dynamics (Octahedron)
- Crystalline Structures (Tetrahedron)
- Cosmic Landscapes (Dodecahedron)
- Neon Dreams (Torus Knot)
- Minimal Elegance (Icosahedron)

### 3. Interactive Showcase
Full-screen draggable 3D model viewer with shape switching:
- Sphere
- Cube
- Torus
- Knot

### 4. Experience Section
Particle-filled section showcasing features with animated statistics.

### 5. Contact Section
Modern contact form with validation and success notifications.

## Getting Started

### Local Development

1. Clone this repository:
```bash
git clone https://github.com/Ja178411/igloo-website-clone.git
cd igloo-website-clone
```

2. Open `index.html` in your browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

### Deploying to GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. In the left sidebar, click on "Pages"
4. Under "Source", select "Deploy from a branch"
5. Select the branch you want to deploy (e.g., "main")
6. Click "Save"
7. Wait a few minutes for your site to be published
8. Access your site at `https://username.github.io/igloo-website-clone`

## Browser Support

This project uses modern web technologies and works best on:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

**Note:** WebGL support is required. Some 3D features may not work on older browsers or low-end devices.

## Performance Considerations

- 3D scenes use Intersection Observer for lazy rendering
- Particle counts are optimized for smooth 60fps performance
- Canvas resolution is capped at 2x device pixel ratio
- Mobile devices automatically disable the custom cursor
- Animations pause when elements are off-screen

## Customization

### Changing Colors

Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
    /* ... */
}
```

### Modifying 3D Elements

Edit the Three.js scenes in `script.js`. Look for sections marked with comments like:
- `// Hero Scene`
- `// Gallery Items`
- `// Showcase Scene`
- `// Particles Canvas`

### Adding More Gallery Items

Add new HTML gallery items in `index.html` and the JavaScript will automatically create 3D scenes for them with different geometries and colors.

## Credits

- **Three.js** - 3D library
- **Font Awesome** - Icons
- Inspired by modern 3D web experiences and the original igloo.inc aesthetic

## License

This project is created for educational and portfolio purposes.

## Future Enhancements

- [ ] Add GLTF model loading for custom 3D models
- [ ] Implement shader effects and post-processing
- [ ] Add sound effects and audio reactivity
- [ ] Create fullscreen gallery modal view
- [ ] Add more advanced particle systems
- [ ] Implement VR support
- [ ] Add admin panel for content management

---

**Built with passion for creative web experiences** ✨
