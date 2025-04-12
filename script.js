// script.js

// Mobile Menu Toggle
function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed headers
                behavior: 'smooth'
            });
        }
    });
});

// Form Validation
document.querySelector('form').addEventListener('submit', function (e) {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !phone || !message) {
        e.preventDefault(); // Prevent form submission
        alert('Please fill out all fields.');
    } else if (!validateEmail(email)) {
        e.preventDefault();
        alert('Please enter a valid email address.');
    }
});

// Email Validation Function
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Fetch Testimonials Dynamically
fetch('testimonials.json')
    .then(response => response.json())
    .then(data => {
        const testimonialsContainer = document.getElementById('testimonials');
        data.forEach(testimonial => {
            const testimonialHTML = `
                <div class="testimonial">
                    <p class="text-gray-600">${testimonial.text}</p>
                    <p class="text-brand-primary font-bold">${testimonial.author}</p>
                </div>
            `;
            testimonialsContainer.innerHTML += testimonialHTML;
        });
    })
    .catch(error => console.error('Error fetching testimonials:', error));
	
	// Scroll Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, {
    threshold: 0.1
});

// Apply Observer to Elements
document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// Lazy Load Images
document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => observer.observe(img));
});

// Track Button Clicks with Google Analytics
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', () => {
        gtag('event', 'click', {
            event_category: 'Button',
            event_label: button.textContent
        });
    });
});