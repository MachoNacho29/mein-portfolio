document.addEventListener('DOMContentLoaded', () => {
    const digits = [
        document.getElementById('digit-1'),
        document.getElementById('digit-2'),
        document.getElementById('digit-3'),
        document.getElementById('digit-4')
    ];
    
    const sections = document.querySelectorAll('.year-section');
    const bgImages = document.querySelectorAll('.bg-image');
    const filterLinks = document.querySelectorAll('.filter-link');

    function updateYear(yearString) {
        const yearArray = yearString.split('');
        yearArray.forEach((digit, index) => {
            const val = parseInt(digit);
            const wrapper = digits[index] ? digits[index].querySelector('.digit-wrapper') : null;
            if (wrapper) wrapper.style.transform = `translateY(-${val * 10}%)`;
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const year = entry.target.getAttribute('data-year');
                const bgId = entry.target.getAttribute('data-bg');
                updateYear(year);
                document.body.setAttribute('data-active-year', year);
                bgImages.forEach(img => img.classList.remove('active'));
                const activeBg = document.getElementById(bgId);
                if (activeBg) activeBg.classList.add('active');
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(s => observer.observe(s));

    filterLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const filter = link.getAttribute('data-filter');
            document.body.classList.add('filter-active');
            if (filter === 'fotografie') document.body.classList.add('highlight-bg');
            document.querySelectorAll('.portfolio-item').forEach(item => {
                if (item.classList.contains(filter)) {
                    item.classList.add('highlight');
                    item.classList.add('highlight-specialty');
                }
            });
        });

        link.addEventListener('mouseleave', () => {
            document.body.classList.remove('filter-active');
            document.body.classList.remove('highlight-bg');
            document.querySelectorAll('.portfolio-item').forEach(item => {
                item.classList.remove('highlight');
                item.classList.remove('highlight-specialty');
            });
        });
    });

    const nameLink = document.querySelector('.header-left a');
    if (nameLink) {
        nameLink.addEventListener('click', (e) => {
            const targetId = nameLink.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Modal schließen wenn man außerhalb des Fensters klickt
    window.onclick = function(event) {
        const modal = document.getElementById('portfolio-modal');
        if (event.target == modal) {
            closeModal();
        }
    }
});

// Diese Funktionen müssen AUSSERHALB von DOMContentLoaded stehen, damit onclick im HTML sie findet
function openModal(contentId) {
    const modal = document.getElementById('portfolio-modal');
    const modalBody = document.getElementById('modal-body');
    const contentElement = document.getElementById(contentId);
    
    if (modal && modalBody && contentElement) {
        modalBody.innerHTML = contentElement.innerHTML;
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        document.body.classList.add('modal-open'); // NEU
    }
}

function closeModal() {
    const modal = document.getElementById('portfolio-modal');
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
        document.body.classList.remove('modal-open'); // NEU
        
        // Alle anderen eventuellen Reste entfernen
        document.body.classList.remove('filter-active', 'specialty-hover', 'highlight-bg');
    }
}
