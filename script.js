// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // ==================== CUSTOM CURSOR ====================
    const cursor = {
        dot: document.querySelector('.cursor-dot'),
        ring: document.querySelector('.cursor-ring')
    };

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth cursor dot
        cursorX += (mouseX - cursorX) * 0.3;
        cursorY += (mouseY - cursorY) * 0.3;
        cursor.dot.style.left = cursorX + 'px';
        cursor.dot.style.top = cursorY + 'px';

        // Smooth cursor ring with delay
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        cursor.ring.style.left = ringX + 'px';
        cursor.ring.style.top = ringY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .gallery-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.dot.style.width = '30px';
            cursor.dot.style.height = '30px';
            cursor.ring.style.width = '60px';
            cursor.ring.style.height = '60px';
        });
        el.addEventListener('mouseleave', () => {
            cursor.dot.style.width = '8px';
            cursor.dot.style.height = '8px';
            cursor.ring.style.width = '40px';
            cursor.ring.style.height = '40px';
        });
    });

    // ==================== LOADING SCREEN ====================
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('loading-screen').classList.add('hidden');
        }, 2000);
    });

    // ==================== HEADER SCROLL ====================
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==================== SMOOTH SCROLLING ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ==================== BACK TO TOP BUTTON ====================
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==================== NUMBER COUNTER ANIMATION ====================
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target;
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Intersection Observer for counter animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(counter => {
        counterObserver.observe(counter);
    });

    // ==================== FORM HANDLING ====================
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                project: document.getElementById('project').value,
                message: document.getElementById('message').value
            };

            console.log('Form submitted:', formData);

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.style.cssText = `
                position: fixed;
                top: 100px;
                right: 40px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 20px 30px;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
                z-index: 10000;
                animation: slideIn 0.5s ease;
            `;
            successMessage.textContent = 'Message sent successfully!';
            document.body.appendChild(successMessage);

            // Reset form
            contactForm.reset();

            // Remove success message
            setTimeout(() => {
                successMessage.style.animation = 'slideOut 0.5s ease';
                setTimeout(() => successMessage.remove(), 500);
            }, 3000);
        });
    }

    // ==================== THREE.JS SETUP ====================

    // Hero Scene
    const heroCanvas = document.getElementById('hero-canvas');
    if (heroCanvas) {
        const heroScene = new THREE.Scene();
        const heroCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const heroRenderer = new THREE.WebGLRenderer({ canvas: heroCanvas, alpha: true, antialias: true });

        heroRenderer.setSize(window.innerWidth, window.innerHeight);
        heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        heroCamera.position.z = 5;

        // Create animated geometry
        const geometry = new THREE.IcosahedronGeometry(2, 1);
        const material = new THREE.MeshNormalMaterial({
            wireframe: false,
            flatShading: true
        });
        const mesh = new THREE.Mesh(geometry, material);
        heroScene.add(mesh);

        // Add particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        const positions = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 20;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            color: 0x6366f1,
            size: 0.05,
            transparent: true,
            opacity: 0.8
        });
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        heroScene.add(particles);

        // Mouse movement
        let mouseXHero = 0, mouseYHero = 0;
        document.addEventListener('mousemove', (e) => {
            mouseXHero = (e.clientX / window.innerWidth) * 2 - 1;
            mouseYHero = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        // Animation
        function animateHero() {
            requestAnimationFrame(animateHero);

            mesh.rotation.x += 0.003;
            mesh.rotation.y += 0.005;

            particles.rotation.x += 0.0005;
            particles.rotation.y += 0.001;

            // Smooth camera movement based on mouse
            heroCamera.position.x += (mouseXHero * 0.5 - heroCamera.position.x) * 0.05;
            heroCamera.position.y += (mouseYHero * 0.5 - heroCamera.position.y) * 0.05;

            heroRenderer.render(heroScene, heroCamera);
        }
        animateHero();

        // Handle resize
        window.addEventListener('resize', () => {
            heroCamera.aspect = window.innerWidth / window.innerHeight;
            heroCamera.updateProjectionMatrix();
            heroRenderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // Gallery Items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        const canvas = item.querySelector('.gallery-canvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        camera.position.z = 3;

        // Different geometry for each item
        const geometries = [
            new THREE.TorusGeometry(1, 0.4, 16, 100),
            new THREE.OctahedronGeometry(1.5, 0),
            new THREE.TetrahedronGeometry(1.5, 0),
            new THREE.DodecahedronGeometry(1.3, 0),
            new THREE.TorusKnotGeometry(1, 0.3, 100, 16),
            new THREE.IcosahedronGeometry(1.5, 0)
        ];

        const colors = [0x6366f1, 0x8b5cf6, 0xec4899, 0x14b8a6, 0xf59e0b, 0x06b6d4];

        const geometry = geometries[index % geometries.length];
        const material = new THREE.MeshPhongMaterial({
            color: colors[index % colors.length],
            wireframe: false,
            shininess: 100
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Add lighting
        const light = new THREE.PointLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        scene.add(light);
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);

        let isAnimating = false;
        let rotationSpeed = 0.01;

        function animateGallery() {
            if (!isAnimating) return;
            requestAnimationFrame(animateGallery);

            mesh.rotation.x += rotationSpeed;
            mesh.rotation.y += rotationSpeed;

            renderer.render(scene, camera);
        }

        // Intersection Observer for lazy rendering
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    isAnimating = true;
                    animateGallery();
                } else {
                    isAnimating = false;
                }
            });
        }, { threshold: 0.1 });

        observer.observe(item);

        // Hover effect
        item.addEventListener('mouseenter', () => {
            rotationSpeed = 0.03;
        });
        item.addEventListener('mouseleave', () => {
            rotationSpeed = 0.01;
        });
    });

    // Showcase Scene
    const showcaseCanvas = document.getElementById('showcase-canvas');
    if (showcaseCanvas) {
        const showcaseScene = new THREE.Scene();
        const showcaseCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const showcaseRenderer = new THREE.WebGLRenderer({ canvas: showcaseCanvas, alpha: true, antialias: true });

        showcaseRenderer.setSize(window.innerWidth, window.innerHeight);
        showcaseRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        showcaseCamera.position.z = 5;

        // Initial geometry
        let currentGeometry = new THREE.SphereGeometry(1.5, 32, 32);
        const showcaseMaterial = new THREE.MeshStandardMaterial({
            color: 0x6366f1,
            metalness: 0.7,
            roughness: 0.2,
            wireframe: false
        });
        let showcaseMesh = new THREE.Mesh(currentGeometry, showcaseMaterial);
        showcaseScene.add(showcaseMesh);

        // Lighting
        const spotLight = new THREE.SpotLight(0xffffff, 1);
        spotLight.position.set(10, 10, 10);
        showcaseScene.add(spotLight);
        const ambLight = new THREE.AmbientLight(0x404040, 0.5);
        showcaseScene.add(ambLight);

        // Controls
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };

        showcaseCanvas.addEventListener('mousedown', () => isDragging = true);
        showcaseCanvas.addEventListener('mouseup', () => isDragging = false);
        showcaseCanvas.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const deltaX = e.clientX - previousMousePosition.x;
                const deltaY = e.clientY - previousMousePosition.y;

                showcaseMesh.rotation.y += deltaX * 0.01;
                showcaseMesh.rotation.x += deltaY * 0.01;
            }
            previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        // Model switching
        const controlBtns = document.querySelectorAll('.control-btn');
        controlBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                controlBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                showcaseScene.remove(showcaseMesh);

                const model = btn.getAttribute('data-model');
                switch(model) {
                    case 'sphere':
                        currentGeometry = new THREE.SphereGeometry(1.5, 32, 32);
                        break;
                    case 'cube':
                        currentGeometry = new THREE.BoxGeometry(2, 2, 2);
                        break;
                    case 'torus':
                        currentGeometry = new THREE.TorusGeometry(1.5, 0.5, 16, 100);
                        break;
                    case 'knot':
                        currentGeometry = new THREE.TorusKnotGeometry(1.2, 0.4, 100, 16);
                        break;
                }

                showcaseMesh = new THREE.Mesh(currentGeometry, showcaseMaterial);
                showcaseScene.add(showcaseMesh);
            });
        });

        if (controlBtns.length > 0) {
            controlBtns[0].classList.add('active');
        }

        // Animation
        let showcaseIsVisible = false;
        const showcaseObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                showcaseIsVisible = entry.isIntersecting;
            });
        }, { threshold: 0.1 });

        showcaseObserver.observe(document.getElementById('showcase'));

        function animateShowcase() {
            requestAnimationFrame(animateShowcase);

            if (showcaseIsVisible && !isDragging) {
                showcaseMesh.rotation.x += 0.005;
                showcaseMesh.rotation.y += 0.005;
            }

            showcaseRenderer.render(showcaseScene, showcaseCamera);
        }
        animateShowcase();

        // Handle resize
        window.addEventListener('resize', () => {
            const showcaseSection = document.getElementById('showcase');
            if (showcaseSection) {
                showcaseCamera.aspect = window.innerWidth / window.innerHeight;
                showcaseCamera.updateProjectionMatrix();
                showcaseRenderer.setSize(window.innerWidth, window.innerHeight);
            }
        });
    }

    // Particles Canvas
    const particlesCanvas = document.getElementById('particles-canvas');
    if (particlesCanvas) {
        const particlesScene = new THREE.Scene();
        const particlesCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const particlesRenderer = new THREE.WebGLRenderer({ canvas: particlesCanvas, alpha: true, antialias: true });

        particlesRenderer.setSize(window.innerWidth, window.innerHeight);
        particlesRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        particlesCamera.position.z = 5;

        // Create particles
        const particleCount = 5000;
        const particleGeo = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i++) {
            particlePositions[i] = (Math.random() - 0.5) * 50;
        }

        particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        const particleMat = new THREE.PointsMaterial({
            color: 0x6366f1,
            size: 0.05,
            transparent: true,
            opacity: 0.6
        });
        const particleSystem = new THREE.Points(particleGeo, particleMat);
        particlesScene.add(particleSystem);

        let particlesIsVisible = false;
        const particlesObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                particlesIsVisible = entry.isIntersecting;
            });
        }, { threshold: 0.1 });

        particlesObserver.observe(document.getElementById('experience'));

        function animateParticles() {
            requestAnimationFrame(animateParticles);

            if (particlesIsVisible) {
                particleSystem.rotation.x += 0.0005;
                particleSystem.rotation.y += 0.001;
            }

            particlesRenderer.render(particlesScene, particlesCamera);
        }
        animateParticles();

        // Handle resize
        window.addEventListener('resize', () => {
            const experienceSection = document.getElementById('experience');
            if (experienceSection) {
                particlesCamera.aspect = window.innerWidth / window.innerHeight;
                particlesCamera.updateProjectionMatrix();
                particlesRenderer.setSize(window.innerWidth, window.innerHeight);
            }
        });
    }

    // ==================== MOBILE MENU ====================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');

    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', () => {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '70px';
            nav.style.left = '0';
            nav.style.width = '100%';
            nav.style.background = 'rgba(15, 15, 30, 0.98)';
            nav.style.padding = '20px';
            nav.style.backdropFilter = 'blur(10px)';

            mobileMenuToggle.classList.toggle('active');
        });

        // Close mobile menu on link click
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    nav.style.display = 'none';
                    mobileMenuToggle.classList.remove('active');
                }
            });
        });

        // Reset nav on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                nav.style = '';
                mobileMenuToggle.classList.remove('active');
            }
        });
    }

    console.log('3D Art Showcase initialized!');
});
