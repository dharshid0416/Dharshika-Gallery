# Dharshika Gallery

An interactive and responsive photography portfolio website designed to showcase visual stories through a modern digital interface.

## 🌟 Features

- **Dynamic Gallery Grid**: Masonry-style layout that adapts to different screen sizes.
- **Category Filtering**: Instant filtering for Nature, City, People, and Animals.
- **Interactive Lightbox**: Full-screen image viewing with:
  - Previous/Next navigation
  - Image counter (e.g., "Image 5 of 16")
  - Smooth fade transitions
  - Loading spinner for optimal UX
- **Slideshow Mode**: Automated playback of gallery images.
- **Dark Mode**: Toggleable theme that persists user preference via LocalStorage.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewports.
- **About Page**: Dedicated profile section with separate dark mode support.
- **Back to Top**: Smooth scrolling navigation assistant.

## 🛠️ Technologies Used

- **HTML5**: Semantic structure and accessibility.
- **CSS3**: Custom design system, CSS Variables (for theming), Flexbox, Grid, and Animations.
- **JavaScript (Vanilla)**: DOM manipulation, event handling, slideshow logic, and state management.

## 🚀 How to Run

1.  Clone or download the repository.
2.  Open the `index.html` file in any modern web browser (Chrome, Firefox, Edge, Safari).
3.  No styling pre-processors or build steps are required.

## 📂 File Structure

```text
Dharshika-Gallery/
├── index.html      # Main gallery interface
├── about.html      # Photographer profile page
├── style.css       # Global styles, variables, and media queries
├── script.js       # Core logic (Gallery, Lightbox, Slideshow, Theme)
├── img.jpg         # Profile image for About page
└── README.md       # Project documentation
```

## 🔮 Future Enhancement Ideas

- **Backend Integration**: Connect to a CMS or database (like Firebase or MongoDB) to upload images dynamically without editing code.
- **Search Functionality**: Add a search bar to find images by title or tags.
- **Social Sharing**: Buttons to share specific images directly to social media.
- **Lazy Loading Optimization**: Implement `IntersectionObserver` for even better performance with large image sets.
- **Download Option**: Allow users to download high-resolution versions of the photos.
