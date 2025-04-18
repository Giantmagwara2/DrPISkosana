// Mobile Menu Toggle
function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
        // Prevent scrolling when the mobile menu is open
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed headers or navigation bars
                behavior: 'smooth'
            });
        }
    });
});

// Form Validation
function validateForm(form) {
    const name = form.querySelector('#name')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const phone = form.querySelector('#phone')?.value.trim();
    const message = form.querySelector('#message')?.value.trim();

    // Ensure all fields are filled
    if (!name || !email || !phone || !message) {
        alert('Please fill out all fields.');
        return false;
    }

    // Validate email format
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    return true;
}

document.querySelector('form')?.addEventListener('submit', function (e) {
    if (!validateForm(this)) {
        e.preventDefault(); // Prevent form submission if validation fails
    }
});

// Email Validation Function
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Fetch Testimonials Dynamically
async function fetchTestimonials() {
    try {
        const response = await fetch('testimonials.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        const testimonialsContainer = document.getElementById('testimonials');
        if (testimonialsContainer) {
            data.forEach(testimonial => {
                const testimonialHTML = `
                    <div class="testimonial animate-on-scroll">
                        <p class="text-gray-600">${testimonial.text}</p>
                        <p class="text-brand-primary font-bold">${testimonial.author}</p>
                    </div>
                `;
                testimonialsContainer.insertAdjacentHTML('beforeend', testimonialHTML);
            });

            // Reapply scroll animations after loading testimonials
            applyScrollAnimations();
        }
    } catch (error) {
        console.error('Error fetching testimonials:', error);
    }
}

fetchTestimonials();

// Scroll Animation Observer
const scrollObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                scrollObserver.unobserve(entry.target); // Stop observing after animation
            }
        });
    },
    { threshold: 0.1 } // Trigger when 10% of the element is visible
);

// Apply Scroll Animations to Elements
function applyScrollAnimations() {
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        scrollObserver.observe(element);
    });
}

// Lazy Load Images
document.addEventListener("DOMContentLoaded", () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyLoadObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src; // Set the actual image source
                    img.onload = () => img.classList.add('loaded'); // Add a class when the image is fully loaded
                    observer.unobserve(img); // Stop observing after loading
                }
            });
        },
        { rootMargin: '50px 0px' } // Start loading images slightly before they enter the viewport
    );

    lazyImages.forEach(img => lazyLoadObserver.observe(img));
});

// Track Button Clicks with Google Analytics
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', () => {
        if (typeof gtag === 'function') {
            gtag('event', 'click', {
                event_category: 'Button',
                event_label: button.textContent.trim() // Use trimmed text for accurate tracking
            });
        }
    });
});

// Accessibility Enhancements
document.querySelectorAll('button, a').forEach(element => {
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            element.click(); // Trigger click on Enter or Space key press for accessibility
        }
    });
});