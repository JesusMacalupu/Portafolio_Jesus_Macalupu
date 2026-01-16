// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ────────────────────────────────────────────────
//          VARIABLES GLOBALES DE ESTADO
// ────────────────────────────────────────────────
let currentCategory = 'logro';
let currentYear = 'all';
let logrosExpanded = false;
let certificacionesExpanded = false;

const moreLogrosBtn = document.querySelector('#more-logros');
const moreCertificacionesBtn = document.querySelector('#more-certificaciones');

// ────────────────────────────────────────────────
//          ACTUALIZAR TEXTOS DE BOTONES
// ────────────────────────────────────────────────
function updateButtonTexts() {
    if (moreLogrosBtn) {
        moreLogrosBtn.textContent = logrosExpanded
            ? "Ocultar mis logros"
            : "Ver todos mis logros";
    }
    if (moreCertificacionesBtn) {
        moreCertificacionesBtn.textContent = certificacionesExpanded
            ? "Ocultar mis certificaciones"
            : "Ver todas las certificaciones";
    }
}

// ────────────────────────────────────────────────
//               APLICAR FILTROS
// ────────────────────────────────────────────────
function applyFilters() {
    const items = document.querySelectorAll('.achievement-item');
    const noResultsDiv = document.querySelector('#no-results-message');
    const noResultsText = document.querySelector('#no-results-text');

    let visibleCount = 0;
    let logroCount = 0;
    let certificacionCount = 0;

    // Mostrar/ocultar botones según categoría
    if (currentCategory === 'logro') {
        moreLogrosBtn.style.display = 'block';
        moreCertificacionesBtn.style.display = 'none';
    } else if (currentCategory === 'certificacion') {
        moreLogrosBtn.style.display = 'none';
        moreCertificacionesBtn.style.display = 'block';
    }

    items.forEach(item => {
        const category = item.getAttribute('data-category');
        const year = item.getAttribute('data-year');
        const isVisible = (currentCategory === 'all' || category === currentCategory) &&
            (currentYear === 'all' || year === currentYear);

        if (isVisible) {
            if (category === 'logro' && (logrosExpanded || logroCount < 4)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
                logroCount++;
                visibleCount++;
            }
            else if (category === 'certificacion' && (certificacionesExpanded || certificacionCount < 6)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
                certificacionCount++;
                visibleCount++;
            }
            else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => item.style.display = 'none', 300);
            }
        } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => item.style.display = 'none', 300);
        }
    });

    // ─── Mensaje de "sin resultados" ───────────────────────────────
    if (visibleCount === 0) {
        let message = "No hay resultados para este filtro.";

        if (currentCategory === 'logro') {
            message = currentYear === 'all'
                ? "No hay ningún logro registrado."
                : `No hay ningún logro en el año ${currentYear}.`;
        } else if (currentCategory === 'certificacion') {
            message = currentYear === 'all'
                ? "No hay ninguna certificación registrada."
                : `No hay ninguna certificación en el año ${currentYear}.`;
        }

        noResultsText.textContent = message;
        noResultsDiv.style.display = 'block';
    } else {
        noResultsDiv.style.display = 'none';
    }

    // Actualizamos textos de los botones
    updateButtonTexts();
}

// ────────────────────────────────────────────────
//          EVENTOS DE FILTRO POR CATEGORÍA
// ────────────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function () {
        currentCategory = this.getAttribute('data-filter');
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        logrosExpanded = false;
        certificacionesExpanded = false;

        applyFilters();
    });
});

// ────────────────────────────────────────────────
//          EVENTOS DE FILTRO POR AÑO
// ────────────────────────────────────────────────
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        currentYear = this.getAttribute('data-filter-year');
        document.querySelector('#yearFilter').textContent = currentYear === 'all' ? 'Filtrar' : currentYear;

        logrosExpanded = false;
        certificacionesExpanded = false;

        applyFilters();
    });
});

// ────────────────────────────────────────────────
//          BOTONES "VER TODOS / OCULTAR"
// ────────────────────────────────────────────────
if (moreLogrosBtn) {
    moreLogrosBtn.addEventListener('click', function (e) {
        e.preventDefault();
        logrosExpanded = !logrosExpanded;

        currentCategory = 'logro';
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.filter-btn[data-filter="logro"]').classList.add('active');

        applyFilters();
    });
}

if (moreCertificacionesBtn) {
    moreCertificacionesBtn.addEventListener('click', function (e) {
        e.preventDefault();
        certificacionesExpanded = !certificacionesExpanded;

        currentCategory = 'certificacion';
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.filter-btn[data-filter="certificacion"]').classList.add('active');

        applyFilters();
    });
}

// Carga inicial
document.addEventListener('DOMContentLoaded', () => {
    applyFilters();
});