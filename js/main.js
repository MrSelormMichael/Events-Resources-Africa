// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });
}

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Hero Slider (for homepage)
const slides = document.querySelectorAll('.slide');
let currentSlideIndex = 0;
let slideInterval;

function showSlide(n) {
    if (slides.length === 0) return;
    
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlideIndex = (n + slides.length) % slides.length;
    slides[currentSlideIndex].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlideIndex + 1);
}

// Initialize homepage hero slider
if (slides.length > 0) {
    showSlide(0);
    slideInterval = setInterval(nextSlide, 5000);
}

// Hero Slideshow (for venues page)
let heroSlideIndex = 0;
let heroSlideTimer;

function showHeroSlides() {
    const heroSlides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slideshow-dots .dot');
    
    if (heroSlides.length === 0) return;
    
    // Remove active class from all slides and dots
    heroSlides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Increment index
    heroSlideIndex++;
    if (heroSlideIndex >= heroSlides.length) {
        heroSlideIndex = 0;
    }
    
    // Add active class to current slide and dot
    heroSlides[heroSlideIndex].classList.add('active');
    if (dots[heroSlideIndex]) {
        dots[heroSlideIndex].classList.add('active');
    }
    
    // Change slide every 4 seconds
    heroSlideTimer = setTimeout(showHeroSlides, 4000);
}

function currentSlide(n) {
    clearTimeout(heroSlideTimer);
    heroSlideIndex = n;
    
    const heroSlides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slideshow-dots .dot');
    
    if (heroSlides.length === 0) return;
    
    // Remove active class from all
    heroSlides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to selected
    if (heroSlides[heroSlideIndex]) {
        heroSlides[heroSlideIndex].classList.add('active');
    }
    if (dots[heroSlideIndex]) {
        dots[heroSlideIndex].classList.add('active');
    }
    
    // Restart auto-play
    heroSlideTimer = setTimeout(showHeroSlides, 4000);
}

// Testimonial Slider
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonialIndex = 0;
let testimonialInterval;

function showTestimonial(n) {
    if (testimonials.length === 0) return;
    
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    currentTestimonialIndex = (n + testimonials.length) % testimonials.length;
    testimonials[currentTestimonialIndex].classList.add('active');
}

function nextTestimonial() {
    showTestimonial(currentTestimonialIndex + 1);
}

// Initialize testimonials
if (testimonials.length > 0) {
    showTestimonial(0);
    testimonialInterval = setInterval(nextTestimonial, 7000);
}

// Image Modal Variables
let currentImageIndex = 0;
let currentGalleryImages = [];

// Image modal functions
function openImageModal(element) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCounter = document.getElementById('modalCounter');
    
    // Get all images from the same gallery
    const gallery = element.closest('.venue-gallery');
    if (!gallery) return;
    
    currentGalleryImages = Array.from(gallery.querySelectorAll('.gallery-item img'));
    const clickedImg = element.querySelector('img');
    currentImageIndex = currentGalleryImages.indexOf(clickedImg);

    if (modal && modalImg && clickedImg) {
        modal.style.display = 'block';
        modalImg.src = clickedImg.src;
        modalImg.alt = clickedImg.alt;
        
        // Update counter
        if (modalCounter) {
            modalCounter.textContent = `${currentImageIndex + 1} / ${currentGalleryImages.length}`;
        }
        
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    }
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        // Re-enable body scroll
        document.body.style.overflow = 'auto';
        // Reset gallery images
        currentGalleryImages = [];
        currentImageIndex = 0;
    }
}

// Navigate through images in modal
function navigateImage(direction) {
    if (currentGalleryImages.length === 0) return;
    
    currentImageIndex += direction;
    
    // Loop around
    if (currentImageIndex >= currentGalleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = currentGalleryImages.length - 1;
    }
    
    const modalImg = document.getElementById('modalImage');
    const modalCounter = document.getElementById('modalCounter');
    const newImg = currentGalleryImages[currentImageIndex];
    
    if (modalImg && newImg) {
        // Fade out
        modalImg.style.opacity = '0';
        modalImg.style.transition = 'opacity 0.15s ease';
        
        setTimeout(() => {
            modalImg.src = newImg.src;
            modalImg.alt = newImg.alt;
            // Fade in
            modalImg.style.opacity = '1';
        }, 150);
    }
    
    // Update counter
    if (modalCounter) {
        modalCounter.textContent = `${currentImageIndex + 1} / ${currentGalleryImages.length}`;
    }
}

// Close modal when clicking outside the image
window.addEventListener('click', (e) => {
    const modal = document.getElementById('imageModal');
    if (e.target === modal) {
        closeImageModal();
    }
});

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('imageModal');
    if (modal && modal.style.display === 'block') {
        if (e.key === 'Escape') {
            closeImageModal();
        } else if (e.key === 'ArrowLeft') {
            navigateImage(-1);
        } else if (e.key === 'ArrowRight') {
            navigateImage(1);
        }
    }
});

// Initialize swipe gesture for mobile
function initializeSwipeGesture() {
    const modal = document.getElementById('imageModal');
    if (!modal) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    modal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    modal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            navigateImage(1); // Swipe left - next image
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            navigateImage(-1); // Swipe right - previous image
        }
    }
}

// Venue Gallery Thumbnail Navigation
function changeMainImage(thumbnail, venueId) {
    const venue = document.querySelector(venueId);
    if (!venue) return;
    
    const mainImg = venue.parentElement.querySelector('.venue-main-image img');
    const newSrc = thumbnail.querySelector('img')?.dataset.main;
    
    if (newSrc && mainImg) {
        mainImg.src = newSrc;
        mainImg.dataset.full = newSrc.replace('w=800&h=500', 'w=1200&h=800');
    }
}

// Initialize thumbnail navigation
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.querySelector('.main-image img');

if (thumbnails.length && mainImage) {
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            thumbnail.classList.add('active');
            
            // Update main image
            const newImageSrc = thumbnail.querySelector('img')?.src;
            if (newImageSrc) {
                mainImage.src = newImageSrc;
            }
        });
    });
}

// Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name')?.value;
        const email = document.getElementById('email')?.value;
        const subject = document.getElementById('subject')?.value;
        const message = document.getElementById('message')?.value;
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', { name, email, subject, message });
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// DOM Content Loaded - Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Start hero slideshow for venues page
    const heroSlides = document.querySelectorAll('.hero-slide');
    if (heroSlides.length > 0) {
        showHeroSlides();
    }
    
    // Initialize swipe gesture for mobile image modal
    initializeSwipeGesture();
    
    // Gallery Image Lazy Loading
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    if (galleryImages.length > 0 && 'IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease';
                    
                    // Fade in when loaded
                    img.addEventListener('load', () => {
                        img.style.opacity = '1';
                    });
                    
                    // If image is already loaded (cached)
                    if (img.complete) {
                        img.style.opacity = '1';
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        galleryImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for links that just have "#"
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});