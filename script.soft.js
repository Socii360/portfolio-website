document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Navbar and Smooth Scrolling ---
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const menuToggle = document.getElementById('menuToggle');
    const navUl = document.querySelector('.nav-links');

    // Handle Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        navUl.classList.toggle('open');
    });

    // Handle Sticky Navbar and Active Link Highlight on Scroll
    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }

        // Active Link Highlight
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Check if the current scroll position is within the section bounds
            if (window.scrollY >= sectionTop - 100) { 
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    });

    // Smooth Scrolling and close mobile menu on click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Offset for fixed navbar
                    behavior: 'smooth'
                });
            }
            
            // Close the mobile menu after clicking a link
            navUl.classList.remove('open');
        });
    });
    
    // --- 2. Animated Stats Counter ---
    const statsSection = document.getElementById('stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    // Function to start the counter animation
    function animateCounters() {
        statNumbers.forEach(numberElement => {
            const target = parseInt(numberElement.getAttribute('data-target'));
            let count = 0;
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // ~60 steps per second

            const updateCount = () => {
                if (count < target) {
                    count += step;
                    numberElement.textContent = Math.ceil(count);
                    requestAnimationFrame(updateCount);
                } else {
                    numberElement.textContent = target; // Ensure it stops exactly at the target
                }
            };
            updateCount();
        });
        hasAnimated = true; // Prevents re-running the animation
    }

    // Intersection Observer to trigger animation when the stats section is in view
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                animateCounters();
                observer.unobserve(statsSection); // Stop observing after animation runs
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // --- 3. Skills Progress Bar Animation (for visual effect) ---
    const skillsSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.progress-bar');
    let skillsAnimated = false;
    
    const skillsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                progressBars.forEach(bar => {
                    // The CSS width is set in HTML, this just forces the transition
                    bar.style.width = bar.style.width; 
                });
                skillsAnimated = true;
                skillsObserver.unobserve(skillsSection);
            }
        });
    }, { threshold: 0.5 });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // --- 4. Basic Form Validation ---
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset errors
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        let isValid = true;
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Name validation
        if (name.length < 2) {
            document.getElementById('nameError').textContent = 'Name must be at least 2 characters.';
            isValid = false;
        }

        // Email validation (basic regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        // Message validation
        if (message.length < 10) {
            document.getElementById('messageError').textContent = 'Message must be at least 10 characters.';
            isValid = false;
        }

        if (isValid) {
            // Success message (since there's no backend)
            alert('Form submitted successfully! (No backend connection)');
            contactForm.reset();
        }
    });

    // --- 5. Footer Dynamic Year ---
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    console.log("Website scripts loaded and initialized.");
});