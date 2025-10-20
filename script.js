// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    const ctaButtons = document.querySelector('.cta-buttons');
    
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenuToggle.classList.toggle('active');
        
        if (nav.style.display === 'flex') {
            nav.style.display = 'none';
            ctaButtons.style.display = 'none';
        } else {
            nav.style.display = 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '80px';
            nav.style.left = '0';
            nav.style.width = '100%';
            nav.style.backgroundColor = '#fff';
            nav.style.padding = '20px';
            nav.style.boxShadow = '0 10px 10px rgba(0, 0, 0, 0.1)';
            
            ctaButtons.style.display = 'flex';
            ctaButtons.style.flexDirection = 'column';
            ctaButtons.style.position = 'absolute';
            ctaButtons.style.top = nav.offsetHeight + 80 + 'px';
            ctaButtons.style.left = '0';
            ctaButtons.style.width = '100%';
            ctaButtons.style.backgroundColor = '#fff';
            ctaButtons.style.padding = '0 20px 20px';
            ctaButtons.style.boxShadow = '0 10px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 767) {
            nav.style = '';
            ctaButtons.style = '';
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
                if (window.innerWidth <= 767 && nav.style.display === 'flex') {
                    mobileMenuToggle.click();
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                company: document.getElementById('company').value,
                message: document.getElementById('message').value
            };
            
            // Here you would typically send the data to your server
            console.log('Form submitted:', formData);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            successMessage.style.backgroundColor = '#dff0d8';
            successMessage.style.color = '#3c763d';
            successMessage.style.padding = '15px';
            successMessage.style.borderRadius = '4px';
            successMessage.style.marginTop = '20px';
            
            contactForm.appendChild(successMessage);
            
            // Reset form
            contactForm.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
    
    // Sticky header
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > headerHeight) {
            header.classList.add('sticky');
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.classList.remove('sticky');
            header.style.boxShadow = 'none';
        }
    });
    
    // Animation on scroll
    const animateElements = document.querySelectorAll('.feature-card, .pricing-card, .hero-content, .about-content, .about-image, .hero-image');
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (elementPosition.top < windowHeight * 0.8) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animation
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check if elements are in view on load and scroll
    window.addEventListener('load', checkIfInView);
    window.addEventListener('scroll', checkIfInView);
    
    // Testimonial slider
    const createTestimonialSlider = () => {
        const testimonialSlider = document.querySelector('.testimonial-slider');
        if (!testimonialSlider) return;

        const testimonials = testimonialSlider.querySelectorAll('.testimonial-item');
        const totalSlides = testimonials.length;
        let currentSlide = 0;
        let autoSlideInterval;

        // Create dots
        const dotsContainer = document.querySelector('.testimonial-dots');
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentSlide = i;
                updateSlidePosition();
                resetAutoSlide();
            });
            dotsContainer.appendChild(dot);
        }

        // Set initial position
        testimonials.forEach((testimonial, index) => {
            testimonial.style.transform = `translateX(${index * 100}%)`;
        });

        // Update slide positions and dots
        const updateSlidePosition = () => {
            testimonials.forEach((testimonial, index) => {
                testimonial.style.transform = `translateX(${(index - currentSlide) * 100}%)`;
            });

            // Update dots
            document.querySelectorAll('.testimonial-dot').forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        // Next slide function
        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlidePosition();
        };

        // Previous slide function
        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlidePosition();
        };

        // Reset auto slide
        const resetAutoSlide = () => {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 5000);
        };

        // Start auto slide
        autoSlideInterval = setInterval(nextSlide, 5000);

        // Add navigation buttons
        const prevButton = document.querySelector('.testimonial-prev');
        const nextButton = document.querySelector('.testimonial-next');

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                prevSlide();
                resetAutoSlide();
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                nextSlide();
                resetAutoSlide();
            });
        }
    };

    // Initialize testimonial slider if it exists
    createTestimonialSlider();
});