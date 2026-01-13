// Image Data with Picsum Placeholders
const images = [
    { id: 1, src: "https://picsum.photos/800/600?random=1", title: "Misty Mountains", category: "nature", description: "Fog rolling over mountain peaks at dawn." },
    { id: 2, src: "https://picsum.photos/800/600?random=2", title: "Urban Jungle", category: "city", description: "Skyscrapers reaching for the sky in downtown." },
    { id: 3, src: "https://picsum.photos/800/600?random=3", title: "Portrait in Light", category: "people", description: "A candid moment captured in natural light." },
    { id: 4, src: "https://picsum.photos/800/600?random=4", title: "Wild Wolf", category: "animals", description: "A majestic wolf in its natural habitat." },
    { id: 5, src: "https://picsum.photos/800/600?random=5", title: "Forest Path", category: "nature", description: "Sunlight filtering through the trees." },
    { id: 6, src: "https://picsum.photos/800/600?random=6", title: "Night Lights", category: "city", description: "City streets alive with neon colors at night." },
    { id: 7, src: "https://picsum.photos/800/600?random=7", title: "Street Artist", category: "people", description: "An artist focused on their craft." },
    { id: 8, src: "https://picsum.photos/800/600?random=8", title: "Soaring Eagle", category: "animals", description: "An eagle gliding through the air." },
    { id: 9, src: "https://picsum.photos/800/600?random=9", title: "Desert Dunes", category: "nature", description: "Endless sand dunes under a harsh sun." },
    { id: 10, src: "https://picsum.photos/800/600?random=10", title: "Modern Architecture", category: "city", description: "Geometric shapes in modern building design." },
    { id: 11, src: "https://picsum.photos/800/600?random=11", title: "Laughing Child", category: "people", description: "Pure joy captured in a smile." },
    { id: 12, src: "https://picsum.photos/800/600?random=12", title: "Resting Lion", category: "animals", description: "King of the jungle taking a nap." },
    { id: 13, src: "https://picsum.photos/800/600?random=13", title: "Ocean Waves", category: "nature", description: "Power of the ocean crashing on rocks." },
    { id: 14, src: "https://picsum.photos/800/600?random=14", title: "Subway Station", category: "city", description: "The daily commute in the underground." },
    { id: 15, src: "https://picsum.photos/800/600?random=15", title: "Elderly Wisdom", category: "people", description: "A face telling a thousand stories." },
    { id: 16, src: "https://picsum.photos/800/600?random=16", title: "Playful Puppy", category: "animals", description: "Energy and innocence in a single frame." }
];

// State
let filteredImages = [...images]; // Initially all images
let currentIndex = 0;
let slideshowInterval = null;
let isSlideshowPlaying = false;

// DOM Elements
const galleryGrid = document.getElementById('gallery-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDesc = document.getElementById('lightbox-desc');
const slideCounter = document.getElementById('slide-counter');
const slideshowBtn = document.getElementById('slideshow-btn');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderGallery(images);
    setupEventListeners();
});

// Render Gallery
function renderGallery(imagesToRender) {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';

    // reset animation by voiding flow (optional simple approach)

    imagesToRender.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item fade-in';
        item.innerHTML = `
            <img src="${img.src}" alt="${img.title}" loading="lazy">
            <div class="item-overlay">
                <div class="item-title">${img.title}</div>
            </div>
        `;
        // Pass the actual ID or index within the filtered list to openLightbox
        // We'll use the index within the filtered list for easier navigation
        item.addEventListener('click', () => openLightbox(index));
        galleryGrid.appendChild(item);
    });
}

// Filtering
function filterGallery(category) {
    // Update active button state
    filterBtns.forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Filter logic
    if (category === 'all') {
        filteredImages = [...images];
    } else {
        filteredImages = images.filter(img => img.category === category);
    }

    renderGallery(filteredImages);
}

// Setup Event Listeners
function setupEventListeners() {
    // Filter Buttons
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterGallery(btn.dataset.category);
            });
        });
    }

    // Slideshow Toggle
    if (slideshowBtn) {
        slideshowBtn.addEventListener('click', toggleSlideshow);
    }

    // Lightbox Controls
    const closeBtn = document.getElementById('close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    const prevBtn = document.getElementById('prev-btn');
    if (prevBtn) prevBtn.addEventListener('click', showPreviousImage);

    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) nextBtn.addEventListener('click', showNextImage);

    // Close on background click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-overlay')) {
                closeLightbox();
            }
        });
    }

    // Keyboard Navigation
    document.addEventListener('keydown', handleKeyPress);

    // Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggle) themeToggle.textContent = '☀️';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            themeToggle.textContent = isDark ? '☀️' : '🌙';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // Back to Top
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
                backToTopBtn.classList.remove('hidden');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Lightbox Functions
function openLightbox(index) {
    if (!lightbox) return;
    currentIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore scrolling
    if (isSlideshowPlaying) {
        stopSlideshow();
    }
}

function updateLightboxContent() {
    if (!lightboxImg || !lightboxTitle || !lightboxDesc || !slideCounter) return;

    const img = filteredImages[currentIndex];
    const loader = document.getElementById('lightbox-loader');

    // Show spinner, hide image initially for smooth load
    if (loader) loader.classList.remove('hidden');
    lightboxImg.style.opacity = '0';

    // Set source
    lightboxImg.src = img.src;
    lightboxImg.alt = img.title;

    // On load, hide spinner and fade in
    lightboxImg.onload = () => {
        if (loader) loader.classList.add('hidden');
        lightboxImg.style.opacity = '1';
    };

    lightboxTitle.textContent = img.title;
    lightboxDesc.textContent = img.description;

    // Enhanced Counter
    slideCounter.textContent = `Image ${currentIndex + 1} of ${filteredImages.length}`;
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % filteredImages.length;
    updateLightboxContent();
}

function showPreviousImage() {
    currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightboxContent();
}

// Slideshow Logic
function toggleSlideshow() {
    if (isSlideshowPlaying) {
        stopSlideshow();
    } else {
        startSlideshow();
    }
}

function startSlideshow() {
    if (!slideshowBtn) return;
    isSlideshowPlaying = true;
    slideshowBtn.textContent = "Stop Slideshow";
    slideshowBtn.classList.add('active');

    // If lightbox is not open, open it at first image of current filter
    if (lightbox && !lightbox.classList.contains('active')) {
        openLightbox(0);
    }

    slideshowInterval = setInterval(() => {
        showNextImage();
    }, 2000); // 2 seconds for better viewing
}

function stopSlideshow() {
    if (!slideshowBtn) return;
    isSlideshowPlaying = false;
    slideshowBtn.textContent = "Start Slideshow";
    slideshowBtn.classList.remove('active');
    clearInterval(slideshowInterval);
}

// Keyboard Handling
function handleKeyPress(e) {
    if (!lightbox || !lightbox.classList.contains('active')) return;

    switch (e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            showPreviousImage();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
    }
}
