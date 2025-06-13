// Testimonials Section Interactive Script
document.addEventListener("DOMContentLoaded", function () {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add("animate-visible");
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with animate-on-scroll class
  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });

  // Testimonial card hover effects
  document.querySelectorAll(".testimonial-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-12px) scale(1.02)";
      this.style.boxShadow = "0 25px 50px -12px rgba(0, 0, 0, 0.15)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
    });
  });

  // Staggered animation for testimonial cards
  function staggerTestimonials() {
    const testimonialCards = document.querySelectorAll(".testimonial-card");
    testimonialCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
    });
  }

  // Rating stars animation
  function animateStars() {
    const ratings = document.querySelectorAll(".rating");
    ratings.forEach((rating) => {
      const stars = rating.querySelectorAll("i");
      stars.forEach((star, index) => {
        star.style.animation = `starPop 0.3s ease-out ${index * 0.1}s forwards`;
      });
    });
  }

  // Animate ratings when visible
  const ratingsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const stars = entry.target.querySelectorAll(".rating i");
        stars.forEach((star, index) => {
          setTimeout(() => {
            star.style.transform = "scale(1.2)";
            star.style.color = "#fbbf24"; // gold/yellow
            setTimeout(() => {
              star.style.transform = "scale(1)";
            }, 150);
          }, index * 100);
        });
        ratingsObserver.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll(".rating").forEach((rating) => {
    ratingsObserver.observe(rating);
  });

  // Floating animation for testimonial cards
  function addFloatingAnimation() {
    const cards = document.querySelectorAll(".testimonial-card");
    cards.forEach((card, index) => {
      const delay = index * 0.5;
      const duration = 4 + Math.random() * 2;
      card.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    });
  }

  // CTA button effects
  const ctaButton = document.querySelector(".cta-button");
  if (ctaButton) {
    // Add hover effects
    ctaButton.addEventListener("mouseenter", () => {
      ctaButton.style.transform = "scale(1.05)";
      ctaButton.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
    });

    ctaButton.addEventListener("mouseleave", () => {
      ctaButton.style.transform = "scale(1)";
      ctaButton.style.boxShadow = "none";
    });

    // Click effect
    ctaButton.addEventListener("click", () => {
      ctaButton.classList.add("clicked");
      setTimeout(() => {
        ctaButton.classList.remove("clicked");
      }, 300);
    });
  }

  // Trigger staggered and floating animations after DOM is ready
  staggerTestimonials();
  addFloatingAnimation();
});
