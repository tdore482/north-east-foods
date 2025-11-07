// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Section scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Product Modal JavaScript
    const productCards = document.querySelectorAll('.product-card');
    const modalContainer = document.getElementById('modal-container');
    const modalCloseBtn = document.getElementById('modal-close');
    
    const modalImg = document.getElementById('modal-product-image');
    const modalName = document.getElementById('modal-product-name');
    const modalLatin = document.getElementById('modal-product-latin');
    const modalSpecsContainer = document.getElementById('modal-product-specs');

    const openModal = (card) => {
        const name = card.dataset.name;
        const latin = card.dataset.latin;
        const imgSrc = card.dataset.imgSrc;
        const specsId = card.dataset.specsId;
        const specsHtml = document.getElementById(specsId)?.innerHTML;

        modalName.textContent = name;
        modalLatin.textContent = latin;
        modalImg.style.backgroundImage = `url('${imgSrc}')`;
        modalSpecsContainer.innerHTML = specsHtml || '<p>Details not available.</p>';

        modalContainer.classList.add('visible');
        document.body.classList.add('modal-open');
    };

    const closeModal = () => {
        modalContainer.classList.remove('visible');
        document.body.classList.remove('modal-open');
    };

    productCards.forEach(card => {
        // Click event
        card.addEventListener('click', () => openModal(card));
        
        // A11y: Allow opening with Enter/Space key when focused
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(card);
            }
        });
    });

    modalCloseBtn.addEventListener('click', closeModal);
    
    modalContainer.addEventListener('click', (e) => {
        // Close if clicking on the dark background overlay
        if (e.target === modalContainer) {
            closeModal();
        }
    });

    // A11y: Allow closing modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('visible')) {
            closeModal();
        }
    });

    // Set Copyright Year
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
});