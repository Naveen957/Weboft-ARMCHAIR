document.addEventListener('DOMContentLoaded', function () {
  
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navbar = document.querySelector(".navbar");
const hero = document.getElementById("hero");

if (menuToggle && navLinks && navbar) {

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    navbar.classList.toggle("nav-bg"); 
  });

  if (hero) {
    window.addEventListener("scroll", () => {
      const heroBottom = hero.offsetTop + hero.offsetHeight;

      if (navbar.classList.contains("nav-bg")) return;

      if (window.scrollY > heroBottom - 80) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }
}

 const wrapper = document.getElementById("sliderWrapper");

if (wrapper) {
  const slides = document.querySelectorAll(".slide");
  let slidesPerView = 4;
  let currentIndex = 0;
  let autoPlayInterval;

  function updateSlidesPerView() {
    const w = window.innerWidth;

    if (w <= 480) slidesPerView = 1;
    else if (w <= 768) slidesPerView = 1.5;
    else if (w <= 992) slidesPerView = 2.5;
    else if (w <= 1200) slidesPerView = 3;
    else slidesPerView = 4.5;
  }

  function updateSlider(smooth = true) {
    const slideWidth = 100 / slidesPerView;
    wrapper.style.transition = smooth ? "transform 0.5s ease" : "none";
    wrapper.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
  }

  function startAutoplay() {
    stopAutoplay();
    autoPlayInterval = setInterval(() => {
      const maxIndex = slides.length - slidesPerView;
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      updateSlider();
    }, 3000);
  }

  function stopAutoplay() {
    clearInterval(autoPlayInterval);
  }

  // ===== DRAG SUPPORT =====
  let isDragging = false;
  let startX = 0;
  let moveX = 0;

  wrapper.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    stopAutoplay();
    wrapper.style.cursor = "grabbing";
    wrapper.style.transition = "none";
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    moveX = e.clientX - startX;
    wrapper.style.transform = `translateX(calc(-${currentIndex * (100 / slidesPerView)}% + ${moveX}px))`;
  });

  window.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;

    if (moveX < -80) currentIndex++;
    if (moveX > 80) currentIndex--;

    const maxIndex = slides.length - slidesPerView;
    currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));

    updateSlider(true);
    startAutoplay();
    wrapper.style.cursor = "grab";
  });

  // ===== TOUCH SUPPORT =====
  let touchStartX = 0;

  wrapper.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    stopAutoplay();
  });

  wrapper.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX;

    if (diff < -60) currentIndex++;
    if (diff > 60) currentIndex--;

    const maxIndex = slides.length - slidesPerView;
    currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));

    updateSlider(true);
    startAutoplay();
  });

  // Hover pause
  wrapper.addEventListener("mouseenter", stopAutoplay);
  wrapper.addEventListener("mouseleave", startAutoplay);

  // Resize
  window.addEventListener("resize", () => {
    updateSlidesPerView();
    currentIndex = 0;
    updateSlider(false);
  });

  // Init
  updateSlidesPerView();
  updateSlider(false);
  startAutoplay();
}

  if (typeof jQuery !== 'undefined' && jQuery.fn.slick) {
    jQuery(document).ready(function ($) {
      if ($('.gallery-slider').length) {
        const $slider = $('.gallery-slider');

        $slider.slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
          dots: false,
          autoplay: true,
          speed: 800,
          cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
          swipeToSlide: true,
          touchThreshold: 20,
          responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2, arrows: false } },
            { breakpoint: 480, settings: { slidesToShow: 1, arrows: false } }
          ]
        });

        let wheelSum = 0;
        let isSliding = false;

        $slider.on('wheel', function (e) {
          e.preventDefault();
          if (isSliding) return;

          wheelSum += e.originalEvent.deltaY;

          if (Math.abs(wheelSum) > 120) {
            isSliding = true;

            if (wheelSum > 0) {
              $slider.slick('slickNext');
            } else {
              $slider.slick('slickPrev');
            }

            wheelSum = 0;

            setTimeout(() => {
              isSliding = false;
            }, 850);
          }
        });

      }
    });
  }

});