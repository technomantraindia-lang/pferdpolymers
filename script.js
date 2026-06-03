document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.classList.contains("inquiry-trigger")) {
      return;
    }

    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      event.preventDefault();
      return;
    }

    const target = document.querySelector(targetId);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

document.querySelectorAll(".product-section .product-card").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });
});

const bannerCarousel = document.querySelector("[data-banner-carousel]");

if (bannerCarousel) {
  const track = bannerCarousel.querySelector("[data-banner-track]");
  const dotsWrap = bannerCarousel.querySelector("[data-banner-dots]");
  const prevButton = bannerCarousel.querySelector("[data-banner-prev]");
  const nextButton = bannerCarousel.querySelector("[data-banner-next]");
  const slides = Array.from(track?.querySelectorAll(".banner-slide") || []);
  let activeBanner = 0;
  let bannerTimer;

  if (track && slides.length > 0) {
    const firstClone = slides[0].cloneNode(true);
    firstClone.classList.remove("is-active");
    firstClone.setAttribute("aria-hidden", "true");
    track.appendChild(firstClone);

    const dots = slides.map((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Show banner ${index + 1}`);
      dot.addEventListener("click", () => {
        showBanner(index);
        restartBanner();
      });
      dotsWrap?.appendChild(dot);
      return dot;
    });

    const updateBannerState = () => {
      slides.forEach((slide, index) => {
        slide.classList.toggle("is-active", index === activeBanner);
      });
      dots.forEach((dot, index) => {
        dot.classList.toggle("is-active", index === activeBanner);
      });
    };

    const moveTrack = (index) => {
      track.style.transform = `translateX(-${index * 100}%)`;
    };

    const showBanner = (index) => {
      activeBanner = (index + slides.length) % slides.length;
      moveTrack(activeBanner);
      updateBannerState();
    };

    const nextBanner = () => {
      if (activeBanner === slides.length - 1) {
        activeBanner = 0;
        moveTrack(slides.length);
        updateBannerState();
        window.setTimeout(() => {
          track.classList.add("is-resetting");
          moveTrack(0);
          track.offsetHeight;
          track.classList.remove("is-resetting");
        }, 860);
        return;
      }

      showBanner(activeBanner + 1);
    };

    const restartBanner = () => {
      window.clearInterval(bannerTimer);
      bannerTimer = window.setInterval(nextBanner, 3600);
    };

    prevButton?.addEventListener("click", () => {
      showBanner(activeBanner - 1);
      restartBanner();
    });

    nextButton?.addEventListener("click", () => {
      nextBanner();
      restartBanner();
    });

    updateBannerState();
    restartBanner();
  }
}

const testimonialCard = document.querySelector(".testimonial-card");

if (testimonialCard) {
  const testimonials = [
    {
      quote: "Pferd Polymers delivered highly reliable PTFE lined piping systems with excellent chemical resistance and on-time execution.",
      person: "Process Engineering Manager",
      sector: "Petrochemical Industry",
      badge: "Petrochemical",
      logo: "Reliance",
      logoSub: "Industries Limited",
      icon: "&#9962;",
    },
    {
      quote: "Their lined valves and fittings performed consistently in aggressive chemical service, with strong technical support from selection to installation.",
      person: "Plant Maintenance Head",
      sector: "Chemical Processing",
      badge: "Chemical",
      logo: "TATA",
      logoSub: "Chemicals",
      icon: "&#9879;",
    },
    {
      quote: "We needed clean, durable fluoropolymer solutions for critical process lines, and Pferd Polymers handled the project with precision.",
      person: "Project Lead",
      sector: "Pharmaceutical Industry",
      badge: "Pharma",
      logo: "Lupin",
      logoSub: "Pharmaceuticals",
      icon: "&#9675;",
    },
  ];

  let activeTestimonial = Math.floor(Math.random() * testimonials.length);
  let testimonialTimer;

  const quote = testimonialCard.querySelector(".testimonial-copy p");
  const person = testimonialCard.querySelector(".testimonial-copy strong");
  const sector = testimonialCard.querySelector(".testimonial-copy > span");
  const count = testimonialCard.querySelector(".testimonial-nav em");
  const prev = testimonialCard.querySelector(".testimonial-nav button:first-child");
  const next = testimonialCard.querySelector(".testimonial-nav button:last-child");
  const industryIcon = testimonialCard.querySelector(".testimonial-industry span");
  const industryName = testimonialCard.querySelector(".testimonial-industry strong");
  const logo = testimonialCard.querySelector(".testimonial-logo strong");
  const logoSub = testimonialCard.querySelector(".testimonial-logo span");

  const renderTestimonial = () => {
    const item = testimonials[activeTestimonial];

    quote.textContent = `"${item.quote}"`;
    person.textContent = item.person;
    sector.textContent = item.sector;
    count.textContent = `${activeTestimonial + 1} / ${testimonials.length}`;
    industryIcon.innerHTML = item.icon;
    industryName.innerHTML = `${item.badge}<br>Industry`;
    logo.textContent = item.logo;
    logoSub.textContent = item.logoSub;
  };

  const showTestimonial = (direction = 1) => {
    activeTestimonial = (activeTestimonial + direction + testimonials.length) % testimonials.length;
    renderTestimonial();
  };

  const restartTestimonials = () => {
    window.clearInterval(testimonialTimer);
    testimonialTimer = window.setInterval(() => showTestimonial(1), 4200);
  };

  prev.addEventListener("click", () => {
    showTestimonial(-1);
    restartTestimonials();
  });

  next.addEventListener("click", () => {
    showTestimonial(1);
    restartTestimonials();
  });

  renderTestimonial();
  restartTestimonials();
}

const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const mobileMenuCloseItems = document.querySelectorAll("[data-menu-close], .mobile-sidebar a");
const mobileSubmenuToggles = document.querySelectorAll(".mobile-submenu-toggle");

if (mobileMenuToggle) {
  const closeMobileMenu = () => {
    document.body.classList.remove("mobile-menu-open");
    mobileMenuToggle.setAttribute("aria-expanded", "false");
  };

  mobileMenuToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("mobile-menu-open");
    mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenuCloseItems.forEach((item) => {
    item.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });
}

mobileSubmenuToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const submenu = toggle.nextElementSibling;
    const isOpen = toggle.classList.toggle("is-open");

    toggle.setAttribute("aria-expanded", String(isOpen));

    if (submenu && submenu.classList.contains("mobile-submenu")) {
      submenu.classList.toggle("is-open", isOpen);
    }
  });
});

const productGallery = document.querySelector(".product-gallery");

if (productGallery) {
  const mainImage = productGallery.querySelector(".product-main-image img");
  const thumbnails = Array.from(productGallery.querySelectorAll(".product-thumbs img"));
  const prevButton = productGallery.querySelector(".product-thumbs button:first-child");
  const nextButton = productGallery.querySelector(".product-thumbs button:last-child");
  let activeImageIndex = Math.max(0, thumbnails.findIndex((thumb) => thumb.classList.contains("active")));

  const showProductImage = (index) => {
    if (!mainImage || thumbnails.length === 0) return;

    activeImageIndex = (index + thumbnails.length) % thumbnails.length;
    const activeThumb = thumbnails[activeImageIndex];

    mainImage.src = activeThumb.src;
    mainImage.alt = activeThumb.alt || "PTFE Lined pipes";

    thumbnails.forEach((thumb) => thumb.classList.remove("active"));
    activeThumb.classList.add("active");
  };

  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => showProductImage(index));
  });

  if (prevButton) {
    prevButton.addEventListener("click", () => showProductImage(activeImageIndex - 1));
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => showProductImage(activeImageIndex + 1));
  }
}

const inquiryModal = document.querySelector(".inquiry-modal");
const inquiryTriggers = document.querySelectorAll(".inquiry-trigger");
const inquiryCloseItems = document.querySelectorAll("[data-inquiry-close]");

if (inquiryModal) {
  const openInquiryModal = () => {
    inquiryModal.hidden = false;
    document.body.classList.add("inquiry-open");
  };

  const closeInquiryModal = () => {
    inquiryModal.hidden = true;
    document.body.classList.remove("inquiry-open");
  };

  inquiryTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      document.body.classList.remove("mobile-menu-open");
      openInquiryModal();
    });
  });

  inquiryCloseItems.forEach((item) => {
    item.addEventListener("click", closeInquiryModal);
  });

  inquiryModal.querySelector(".inquiry-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    closeInquiryModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !inquiryModal.hidden) {
      closeInquiryModal();
    }
  });
}

const qualityStandardsVisual = document.querySelector(".quality-page .standards-visual");
const qualityStandardsWrap = document.querySelector(".quality-page .standards-visual-wrap");

if (qualityStandardsWrap && qualityStandardsVisual) {
  const prevBtn = qualityStandardsWrap.querySelector(".standards-visual-nav.prev");
  const nextBtn = qualityStandardsWrap.querySelector(".standards-visual-nav.next");
  const sliderMedia = window.matchMedia("(max-width: 980px)");

  const getSlides = () => Array.from(qualityStandardsVisual.querySelectorAll("img"));

  const getStep = () => {
    const slides = getSlides();
    const firstSlide = slides[0];

    if (!firstSlide) return 320;

    const styles = window.getComputedStyle(qualityStandardsVisual);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
    return firstSlide.getBoundingClientRect().width + gap;
  };

  const updateNavState = () => {
    if (!prevBtn || !nextBtn) return;

    const maxScrollLeft = qualityStandardsVisual.scrollWidth - qualityStandardsVisual.clientWidth;
    const enableSlider = sliderMedia.matches && maxScrollLeft > 2;

    prevBtn.style.display = enableSlider ? "grid" : "none";
    nextBtn.style.display = enableSlider ? "grid" : "none";

    if (!enableSlider) {
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }

    prevBtn.disabled = qualityStandardsVisual.scrollLeft <= 2;
    nextBtn.disabled = qualityStandardsVisual.scrollLeft >= maxScrollLeft - 2;
  };

  const scrollByStep = (direction) => {
    const step = getStep();
    qualityStandardsVisual.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  prevBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    scrollByStep(-1);
  });
  nextBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    scrollByStep(1);
  });

  qualityStandardsVisual.addEventListener("scroll", updateNavState, { passive: true });
  window.addEventListener("resize", updateNavState, { passive: true });
  sliderMedia.addEventListener("change", updateNavState);
  window.addEventListener("load", updateNavState);

  updateNavState();
}
