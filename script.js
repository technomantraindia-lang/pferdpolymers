document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
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
