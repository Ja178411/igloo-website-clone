// ===================================
// 3D Art Showcase - JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // ===================================
    // Loading Screen
    // ===================================
    const loadingScreen = document.getElementById('loadingScreen');
    const loaderBar = document.getElementById('loaderBar');

    let loadProgress = 0;
    const loadInterval = setInterval(() => {
        loadProgress += Math.random() * 15;
        if (loadProgress >= 100) {
            loadProgress = 100;
            clearInterval(loadInterval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                initializeAll();
            }, 500);
        }
        loaderBar.style.width = loadProgress + '%';
    }, 200);

    // ===================================
    // Global 3D Setup
    // ===================================
    function initializeAll() {
        initWebGLBackground();
        initHero3D();
        initGallery3D();
        initShowcase3D();
        initAboutParticles();
        initContact3D();
        initScrollAnimations();
        initBackToTop();
        initMobileMenu();
        initFormValidation();
    }

    // ===================================
    // WebGL Background
    // ===================================
    function initWebGLBackground() {
        const canvas = document.getElementById('webgl-canvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        camera.position.z = 5;

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 20;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x6366f1,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Mouse movement effect
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);

            particlesMesh.rotation.y += 0.0005;
            particlesMesh.rotation.x += 0.0003;

            // Subtle mouse follow
            particlesMesh.rotation.x = mouseY * 0.1;
            particlesMesh.rotation.y = mouseX * 0.1;

            renderer.render(scene, camera);
        }
        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // ===================================
    // Hero 3D Scene
    // ===================================
    function initHero3D() {
        const container = document.getElementById('hero3D');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Create torus knot
        const geometry = new THREE.TorusKnotGeometry(2, 0.5, 200, 32);
        const material = new THREE.MeshNormalMaterial({
            wireframe: false,
            transparent: true,
            opacity: 0.8
        });
        const torusKnot = new THREE.Mesh(geometry, material);
        scene.add(torusKnot);

        camera.position.z = 8;

        // Animation
        function animate() {
            requestAnimationFrame(animate);
            torusKnot.rotation.x += 0.005;
            torusKnot.rotation.y += 0.007;
            renderer.render(scene, camera);
        }
        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }

    // ===================================
    // Gallery 3D Scenes
    // ===================================
    function initGallery3D() {
        const galleryScenes = document.querySelectorAll('.gallery-3d-scene');

        galleryScenes.forEach((container, index) => {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            container.appendChild(renderer.domElement);

            // Different geometry for each scene
            let geometry, material, mesh;

            switch(index) {
                case 0: // Geometric Dreams
                    geometry = new THREE.IcosahedronGeometry(1.5, 1);
                    material = new THREE.MeshNormalMaterial({ wireframe: true });
                    break;
                case 1: // Fluid Dynamics
                    geometry = new THREE.SphereGeometry(1.5, 32, 32);
                    material = new THREE.MeshPhongMaterial({
                        color: 0x8b5cf6,
                        wireframe: false,
                        shininess: 100
                    });
                    const light = new THREE.PointLight(0xffffff, 1, 100);
                    light.position.set(5, 5, 5);
                    scene.add(light);
                    break;
                case 2: // Digital Landscapes
                    geometry = new THREE.BoxGeometry(2, 2, 2);
                    material = new THREE.MeshNormalMaterial();
                    break;
                case 3: // Particle Universe
                    geometry = new THREE.OctahedronGeometry(1.5, 0);
                    material = new THREE.MeshNormalMaterial({ wireframe: true });
                    break;
                case 4: // Crystalline Forms
                    geometry = new THREE.TetrahedronGeometry(2, 0);
                    material = new THREE.MeshPhongMaterial({
                        color: 0x6366f1,
                        wireframe: false,
                        shininess: 100
                    });
                    const light2 = new THREE.PointLight(0xffffff, 1, 100);
                    light2.position.set(5, 5, 5);
                    scene.add(light2);
                    break;
                case 5: // Neon Structures
                    geometry = new THREE.TorusGeometry(1.2, 0.4, 16, 100);
                    material = new THREE.MeshNormalMaterial();
                    break;
            }

            mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
            camera.position.z = 5;

            // Animation
            function animate() {
                requestAnimationFrame(animate);
                mesh.rotation.x += 0.01;
                mesh.rotation.y += 0.01;
                renderer.render(scene, camera);
            }
            animate();

            // Hover interaction
            const galleryItem = container.closest('.gallery-item');
            if (galleryItem) {
                galleryItem.addEventListener('mouseenter', () => {
                    gsap.to(mesh.rotation, {
                        x: mesh.rotation.x + Math.PI,
                        y: mesh.rotation.y + Math.PI,
                        duration: 1,
                        ease: 'power2.out'
                    });
                });
            }
        });
    }

    // ===================================
    // Showcase 3D Viewer
    // ===================================
    function initShowcase3D() {
        const container = document.getElementById('showcase3D');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x6366f1, 1, 100);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // Create complex geometry
        const geometry = new THREE.TorusKnotGeometry(1.5, 0.4, 200, 32);
        const material = new THREE.MeshPhongMaterial({
            color: 0x8b5cf6,
            wireframe: false,
            shininess: 100
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        camera.position.z = 6;

        let autoRotate = true;
        let isWireframe = false;

        // Controls
        const rotateBtn = document.getElementById('rotateBtn');
        const wireframeBtn = document.getElementById('wireframeBtn');
        const resetBtn = document.getElementById('resetBtn');

        if (rotateBtn) {
            rotateBtn.addEventListener('click', () => {
                autoRotate = !autoRotate;
                rotateBtn.classList.toggle('active');
            });
        }

        if (wireframeBtn) {
            wireframeBtn.addEventListener('click', () => {
                isWireframe = !isWireframe;
                material.wireframe = isWireframe;
                wireframeBtn.classList.toggle('active');
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                gsap.to(mesh.rotation, {
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 1,
                    ease: 'power2.out'
                });
            });
        }

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        });

        // Animation
        function animate() {
            requestAnimationFrame(animate);

            if (autoRotate) {
                mesh.rotation.x += 0.005;
                mesh.rotation.y += 0.007;
            } else {
                targetX = mouseY * 0.5;
                targetY = mouseX * 0.5;
                mesh.rotation.x += 0.05 * (targetX - mesh.rotation.x);
                mesh.rotation.y += 0.05 * (targetY - mesh.rotation.y);
            }

            renderer.render(scene, camera);
        }
        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }

    // ===================================
    // About Particles
    // ===================================
    function initAboutParticles() {
        const container = document.getElementById('aboutParticles');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Create particle system
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 5000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.01,
            color: 0x6366f1,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        camera.position.z = 3;

        // Animation
        function animate() {
            requestAnimationFrame(animate);
            particlesMesh.rotation.y += 0.001;
            renderer.render(scene, camera);
        }
        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }

    // ===================================
    // Contact 3D Background
    // ===================================
    function initContact3D() {
        const container = document.getElementById('contact3D');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Create flowing waves
        const geometry = new THREE.PlaneGeometry(20, 20, 50, 50);
        const material = new THREE.MeshNormalMaterial({
            wireframe: true,
            side: THREE.DoubleSide
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        camera.position.z = 5;
        mesh.rotation.x = -Math.PI / 3;

        // Animation
        let frame = 0;
        function animate() {
            requestAnimationFrame(animate);
            frame += 0.05;

            const positions = geometry.attributes.position;
            for (let i = 0; i < positions.count; i++) {
                const x = positions.getX(i);
                const y = positions.getY(i);
                const z = Math.sin(x + frame) * 0.5 + Math.cos(y + frame) * 0.5;
                positions.setZ(i, z);
            }
            positions.needsUpdate = true;

            mesh.rotation.z += 0.001;
            renderer.render(scene, camera);
        }
        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // ===================================
    // GSAP Scroll Animations
    // ===================================
    function initScrollAnimations() {
        // Fade in sections
        gsap.utils.toArray('section').forEach(section => {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'top 50%',
                    scrub: 1
                }
            });
        });

        // Gallery items stagger
        gsap.from('.gallery-item', {
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 1,
            scrollTrigger: {
                trigger: '.gallery-grid',
                start: 'top 80%'
            }
        });

        // Stats counter animation
        const stats = document.querySelectorAll('.stat h3');
        stats.forEach(stat => {
            const endValue = stat.textContent;
            const numericValue = parseInt(endValue.replace(/\D/g, ''));

            if (!isNaN(numericValue)) {
                gsap.from(stat, {
                    textContent: 0,
                    duration: 2,
                    ease: 'power1.out',
                    snap: { textContent: 1 },
                    scrollTrigger: {
                        trigger: stat,
                        start: 'top 80%'
                    },
                    onUpdate: function() {
                        stat.textContent = Math.ceil(this.targets()[0].textContent) + endValue.replace(/\d/g, '');
                    }
                });
            }
        });

        // Header scroll effect
        const header = document.querySelector('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ===================================
    // Back to Top Button
    // ===================================
    function initBackToTop() {
        const backToTop = document.getElementById('backToTop');
        if (!backToTop) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===================================
    // Mobile Menu
    // ===================================
    function initMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('nav');
        const ctaButtons = document.querySelector('.cta-buttons');

        if (!mobileMenuToggle) return;

        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');

            if (nav.style.display === 'flex') {
                nav.style.display = 'none';
                if (ctaButtons) ctaButtons.style.display = 'none';
            } else {
                nav.style.display = 'flex';
                nav.style.flexDirection = 'column';
                nav.style.position = 'absolute';
                nav.style.top = '80px';
                nav.style.left = '0';
                nav.style.width = '100%';
                nav.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
                nav.style.padding = '20px';
                nav.style.backdropFilter = 'blur(20px)';
                nav.style.borderBottom = '1px solid rgba(99, 102, 241, 0.2)';

                if (ctaButtons) {
                    ctaButtons.style.display = 'flex';
                    ctaButtons.style.flexDirection = 'column';
                    ctaButtons.style.position = 'absolute';
                    ctaButtons.style.top = nav.offsetHeight + 80 + 'px';
                    ctaButtons.style.left = '0';
                    ctaButtons.style.width = '100%';
                    ctaButtons.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
                    ctaButtons.style.padding = '0 20px 20px';
                    ctaButtons.style.backdropFilter = 'blur(20px)';
                }
            }
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                nav.style = '';
                if (ctaButtons) ctaButtons.style = '';
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    if (window.innerWidth <= 768 && nav.style.display === 'flex') {
                        mobileMenuToggle.click();
                    }

                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===================================
    // Form Validation
    // ===================================
    function initFormValidation() {
        const contactForm = document.querySelector('.contact-form form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                interest: document.getElementById('interest').value,
                message: document.getElementById('message').value
            };

            // Here you would typically send the data to your server
            console.log('Form submitted:', formData);

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.style.cssText = `
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                padding: 20px;
                border-radius: 12px;
                margin-top: 20px;
                text-align: center;
                font-weight: 600;
                box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
            `;
            successMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';

            contactForm.appendChild(successMessage);

            // Reset form
            contactForm.reset();

            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
});
