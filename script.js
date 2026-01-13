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
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterGallery(btn.dataset.category);
        });
    });

    // Slideshow Toggle
    slideshowBtn.addEventListener('click', toggleSlideshow);

    // Lightbox Controls
    document.getElementById('close-btn').addEventListener('click', closeLightbox);
    document.getElementById('prev-btn').addEventListener('click', showPreviousImage);
    document.getElementById('next-btn').addEventListener('click', showNextImage);
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-overlay')) {
            closeLightbox();
        }
    });

    // Keyboard Navigation
    document.addEventListener('keydown', handleKeyPress);
}

// Lightbox Functions
function openLightbox(index) {
    currentIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore scrolling
    if (isSlideshowPlaying) {
        stopSlideshow();
    }
}

function updateLightboxContent() {
    const img = filteredImages[currentIndex];
    // Add simple fade effect for image transition could go here, but keeping it simple
    lightboxImg.src = img.src;
    lightboxImg.alt = img.title;
    lightboxTitle.textContent = img.title;
    lightboxDesc.textContent = img.description;
    slideCounter.textContent = `${currentIndex + 1} / ${filteredImages.length}`;
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
    isSlideshowPlaying = true;
    slideshowBtn.textContent = "Stop Slideshow";
    slideshowBtn.classList.add('active');
    
    // If lightbox is not open, open it at first image of current filter
    if (!lightbox.classList.contains('active')) {
        openLightbox(0);
    }

    slideshowInterval = setInterval(() => {
        showNextImage();
    }, 1000);
}

function stopSlideshow() {
    isSlideshowPlaying = false;
    slideshowBtn.textContent = "Start Slideshow";
    slideshowBtn.classList.remove('active');
    clearInterval(slideshowInterval);
}

// Keyboard Handling
function handleKeyPress(e) {
    if (!lightbox.classList.contains('active')) return;

    switch(e.key) {
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
