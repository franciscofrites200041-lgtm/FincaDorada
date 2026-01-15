// FINCA DORADA - JavaScript con Animaciones

document.addEventListener('DOMContentLoaded', () => {

    const header = document.getElementById('site-header');
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    // 1. Navbar: Transparente al inicio, sólida al scrollear
    function updateHeader() {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateHeader);
    updateHeader(); // Estado inicial

    // 2. Menú móvil
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Forzar navbar sólida cuando el menú está abierto
            if (mainNav.classList.contains('active')) {
                header.classList.add('scrolled');
            } else {
                updateHeader();
            }
        });
    }

    // 3. Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Cerrar menú móvil
                if (mainNav) mainNav.classList.remove('active');
            }
        });
    });

    // 4. Scroll Reveal: Animar elementos al entrar en viewport
    const revealElements = document.querySelectorAll(
        '.split-block, .service-card, .content-centered, .section-header, .contact-grid'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '-30px'
    });

    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${index * 0.1}s`;
        revealObserver.observe(el);
    });
});
