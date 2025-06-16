// WhatsApp Marketing Landing Page JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Initialize animations and interactions
  initScrollAnimations();
  initCounterAnimations();
  initPhoneMockupInteractions();
  initHoverEffects();
  initTypingAnimations();
});

// Scroll-triggered animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");

        // Trigger specific animations based on element type
        if (entry.target.classList.contains("feature-card")) {
          animateFeatureCard(entry.target);
        }

        if (entry.target.classList.contains("phone-mockup")) {
          animatePhoneMockup(entry.target);
        }
      }
    });
  }, observerOptions);

  // Observe all feature cards and phone mockups
  document.querySelectorAll(".feature-card, .phone-mockup").forEach((el) => {
    observer.observe(el);
  });
}

// Animate feature cards on scroll
function animateFeatureCard(card) {
  card.style.transform = "translateY(20px)";
  card.style.opacity = "0";

  setTimeout(() => {
    card.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    card.style.transform = "translateY(0)";
    card.style.opacity = "1";
  }, 100);
}

// Animate phone mockups
function animatePhoneMockup(mockup) {
  const screen = mockup.querySelector(".phone-screen");
  if (screen) {
    screen.style.transform = "scale(0.9)";
    screen.style.opacity = "0";

    setTimeout(() => {
      screen.style.transition = "all 0.5s ease-out";
      screen.style.transform = "scale(1)";
      screen.style.opacity = "1";
    }, 200);
  }
}

// Counter animations for statistics
function initCounterAnimations() {
  const counters = document.querySelectorAll(".stat-value");

  const animateCounter = (counter) => {
    const target = parseInt(counter.textContent);
    const duration = 2000;
    const start = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * easeOutCubic);

      counter.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
}

// Phone mockup interactions
function initPhoneMockupInteractions() {
  // Animate message sending
  initMessageSendAnimation();

  // Animate CTA button interactions
  initCTAButtonAnimations();

  // Animate status indicators
  initStatusIndicators();
}

// Message send animation
function initMessageSendAnimation() {
  const sendButtons = document.querySelectorAll(".send-btn");

  sendButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Add sending animation
      this.textContent = "Sending...";
      this.style.background = "#ccc";
      this.disabled = true;

      // Simulate sending delay
      setTimeout(() => {
        this.textContent = "Sent ✓";
        this.style.background = "#25D366";

        // Add delivery status animation
        const deliveryStatus =
          this.closest(".phone-screen").querySelector(".delivery-status");
        if (deliveryStatus) {
          deliveryStatus.style.opacity = "0";
          deliveryStatus.style.transform = "translateY(10px)";

          setTimeout(() => {
            deliveryStatus.style.transition = "all 0.3s ease";
            deliveryStatus.style.opacity = "1";
            deliveryStatus.style.transform = "translateY(0)";
          }, 100);
        }

        // Reset button after animation
        setTimeout(() => {
          this.textContent = "Send";
          this.disabled = false;
        }, 2000);
      }, 1500);
    });
  });
}

// CTA button animations
function initCTAButtonAnimations() {
  const ctaButtons = document.querySelectorAll(".cta-btn");

  ctaButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Add ripple effect
      const ripple = document.createElement("span");
      ripple.classList.add("ripple");
      this.appendChild(ripple);

      // Position ripple
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = event.clientX - rect.left - size / 2 + "px";
      ripple.style.top = event.clientY - rect.top - size / 2 + "px";

      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);

      // Simulate booking action
      if (this.textContent.includes("Book Now")) {
        simulateBooking(this);
      }
    });
  });
}

// Simulate booking process
function simulateBooking(button) {
  const bookingWidget = button
    .closest(".phone-screen")
    .querySelector(".booking-widget");
  if (bookingWidget) {
    const bookingDetails = bookingWidget.querySelector(".booking-details");
    if (bookingDetails) {
      // Show booking confirmation with animation
      setTimeout(() => {
        const confirmationElement = bookingDetails.querySelector(
          ".booking-confirmation"
        );
        if (confirmationElement) {
          confirmationElement.style.opacity = "0";
          confirmationElement.style.transform = "scale(0.8)";

          setTimeout(() => {
            confirmationElement.style.transition = "all 0.3s ease";
            confirmationElement.style.opacity = "1";
            confirmationElement.style.transform = "scale(1)";
          }, 100);
        }
      }, 500);
    }
  }
}

// Status indicator animations
function initStatusIndicators() {
  const statusDots = document.querySelectorAll(".status-dot");

  statusDots.forEach((dot) => {
    // Add random pulse delay for more natural effect
    const delay = Math.random() * 2;
    dot.style.animationDelay = delay + "s";
  });
}

// Hover effects for enhanced interactivity
function initHoverEffects() {
  // Feature card hover effects
  const featureCards = document.querySelectorAll(".feature-card");

  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      // Add floating animation to phone mockups
      const phoneMockup = this.querySelector(".phone-mockup");
      if (phoneMockup) {
        phoneMockup.style.transform = "translateY(-5px) rotateY(5deg)";
        phoneMockup.style.transition = "all 0.3s ease";
      }

      // Highlight text elements
      const textElements = this.querySelectorAll(".text-dark");
      textElements.forEach((el) => {
        el.style.color = "#25D366";
        el.style.transition = "color 0.3s ease";
      });
    });

    card.addEventListener("mouseleave", function () {
      const phoneMockup = this.querySelector(".phone-mockup");
      if (phoneMockup) {
        phoneMockup.style.transform = "translateY(0) rotateY(0)";
      }

      const textElements = this.querySelectorAll(".text-dark");
      textElements.forEach((el) => {
        el.style.color = "#333";
      });
    });
  });

  // Button hover effects with sound simulation
  initButtonHoverEffects();

  // Phone mockup tilt effect
  initPhoneTiltEffect();
}

// Button hover effects
function initButtonHoverEffects() {
  const buttons = document.querySelectorAll(
    ".send-btn, .cta-btn, .book-btn, .contact-btn"
  );

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05) translateY(-2px)";
      this.style.boxShadow = "0 5px 15px rgba(37, 211, 102, 0.3)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) translateY(0)";
      this.style.boxShadow = "none";
    });
  });
}

// Phone tilt effect on mouse move
function initPhoneTiltEffect() {
  const phoneMockups = document.querySelectorAll(".phone-mockup");

  phoneMockups.forEach((phone) => {
    phone.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    phone.addEventListener("mouseleave", function () {
      this.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
    });
  });
}

// Typing animation effects
function initTypingAnimations() {
  const messageItems = document.querySelectorAll(".message-item");

  // Stagger message appearance
  messageItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-20px)";

    setTimeout(() => {
      item.style.transition = "all 0.4s ease";
      item.style.opacity = "1";
      item.style.transform = "translateX(0)";
    }, index * 150);
  });

  // Typing indicator animation
  initTypingIndicator();
}

// Typing indicator
function initTypingIndicator() {
  const typingIndicators = document.querySelectorAll(".message-template");

  typingIndicators.forEach((indicator) => {
    const text = indicator.textContent;
    indicator.textContent = "";

    // Add typing animation
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        indicator.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      } else {
        // Add cursor blink effect
        const cursor = document.createElement("span");
        cursor.innerHTML = "|";
        cursor.style.animation = "blink 1s infinite";
        indicator.appendChild(cursor);

        setTimeout(() => {
          cursor.remove();
        }, 3000);
      }
    };

    // Start typing animation when element comes into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(typeWriter, 1000);
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(indicator);
  });
}

// Parallax effect for hero section
function initParallaxEffect() {
  const heroSection = document.querySelector(".hero-section");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    if (heroSection) {
      heroSection.style.transform = `translateY(${rate}px)`;
    }
  });
}

// Initialize parallax effect
initParallaxEffect();

// Add CSS for additional animations
const additionalCSS = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject additional CSS
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);

// Smooth scrolling for any anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Animate hero elements
  const heroElements = document.querySelectorAll(
    ".boost-badge, .hero-title, .hero-subtitle"
  );
  heroElements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, index * 200);
  });
});

// Performance optimization - throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Apply throttling to scroll events
const throttledParallax = throttle(initParallaxEffect, 16);
window.addEventListener("scroll", throttledParallax);
