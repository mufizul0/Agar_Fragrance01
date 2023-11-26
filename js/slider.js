const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    
    // Function to slide images
    const slideImages = (direction) => {
        const scrollAmount = imageList.clientWidth * direction;
        imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    // Automatic sliding
    let slideInterval;

    const startAutomaticSlide = () => {
        slideInterval = setInterval(() => {
            slideImages(1);
        }, 5000); // Adjust the interval (in milliseconds) as needed
    };

    const stopAutomaticSlide = () => {
        clearInterval(slideInterval);
    };

    // Start automatic sliding on load
    startAutomaticSlide();

    // Pause automatic sliding on mouseover
    imageList.addEventListener("mouseenter", stopAutomaticSlide);

    // Resume automatic sliding on mouseout
    imageList.addEventListener("mouseleave", startAutomaticSlide);

    // Handle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
        // Your existing code for scrollbar drag
    });

    // Slide images according to the slide button clicks
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            slideImages(direction);
        });
    });

    // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    };

    // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    };

    // Call these two functions when the image list scrolls
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });
};

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);
