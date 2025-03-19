// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    const ctaButtons = document.querySelector('.cta-buttons');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        ctaButtons.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    ctaButtons.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    // Sticky header with scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Form validation
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let valid = true;
            const inputs = this.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    valid = false;
                    input.classList.add('error');
                } else if (input.type === 'email' && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value.trim())) {
                        valid = false;
                        input.classList.add('error');
                    } else {
                        input.classList.remove('error');
                    }
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (valid) {
                // In a real application, you would send the form data to a server
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
            }
        });
    }

    // Animation on scroll
    const animateElements = document.querySelectorAll('.feature-card, .about-content, .about-image, .pricing-card');
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', checkIfInView);
    checkIfInView(); // Check on page load

    // Testimonial slider (if added to the page later)
    const setupTestimonialSlider = () => {
        const testimonialSlider = document.querySelector('.testimonial-slider');
        if (!testimonialSlider) return;
        
        const slides = testimonialSlider.querySelectorAll('.testimonial');
        const prevBtn = testimonialSlider.querySelector('.prev-btn');
        const nextBtn = testimonialSlider.querySelector('.next-btn');
        let currentSlide = 0;
        
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
            });
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
        
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        
        showSlide(currentSlide);
        
        // Auto-advance slides
        setInterval(nextSlide, 5000);
    };
    
    setupTestimonialSlider();
});

// Add some CSS styling for additional effects
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        /* Mobile menu styles */
        @media (max-width: 767px) {
            nav.active {
                display: block;
                position: absolute;
                top: 80px;
                left: 0;
                width: 100%;
                background-color: #fff;
                box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
            }
            
            nav.active ul {
                flex-direction: column;
            }
            
            nav.active ul li {
                margin-left: 0;
                margin-bottom: 15px;
            }
            
            .cta-buttons.active {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-top: 20px;
                padding: 0 20px 20px;
                background-color: #fff;
            }
            
            .mobile-menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(5px, -5px);
            }
        }
        
        /* Scroll effect for header */
        header {
            transition: transform 0.3s ease;
        }
        
        header.scrolled {
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            padding: 10px 0;
        }
        
        /* Form validation styles */
        .form-group input.error,
        .form-group textarea.error {
            border-color: var(--danger-color);
        }
        
        .success-message {
            padding: 20px;
            background-color: var(--success-color);
            color: #fff;
            border-radius: var(--border-radius);
            text-align: center;
            font-weight: 600;
        }
        
        /* Animation styles */
        .feature-card, .about-content, .about-image, .pricing-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .feature-card.animate, .about-content.animate, .about-image.animate, .pricing-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-card:nth-child(2) {
            transition-delay: 0.1s;
        }
        
        .feature-card:nth-child(3) {
            transition-delay: 0.2s;
        }
        
        .feature-card:nth-child(4) {
            transition-delay: 0.3s;
        }
        
        .pricing-card:nth-child(2) {
            transition-delay: 0.1s;
        }
        
        .pricing-card:nth-child(3) {
            transition-delay: 0.2s;
        }
    `;
    
    document.head.appendChild(style);
});