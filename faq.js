document.addEventListener("DOMContentLoaded", function () {
  // Initialize FAQ functionality
  initializeFAQ();

  // Add smooth animations
  initializeAnimations();

  // Handle accessibility
  initializeAccessibility();
});

/**
 * Initialize FAQ collapse functionality
 */
function initializeFAQ() {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const targetId = this.getAttribute("data-bs-target").substring(1);
      const targetCollapse = document.getElementById(targetId);
      const isExpanded = this.getAttribute("aria-expanded") === "true";

      // Close all other FAQs
      closeOtherFAQs(targetId);

      // Toggle current FAQ
      if (!isExpanded) {
        this.setAttribute("aria-expanded", "true");
        targetCollapse.classList.add("show");
      } else {
        this.setAttribute("aria-expanded", "false");
        targetCollapse.classList.remove("show");
      }

      // Add visual feedback
      addClickFeedback(this);
    });

    // Add hover effects
    addHoverEffects(question);
  });
}

/**
 * Close all other FAQ items
 */
function closeOtherFAQs(currentId) {
  const allQuestions = document.querySelectorAll(".faq-question");
  const allCollapses = document.querySelectorAll(".collapse");

  allQuestions.forEach((question) => {
    const targetId = question.getAttribute("data-bs-target").substring(1);
    if (targetId !== currentId) {
      question.setAttribute("aria-expanded", "false");
    }
  });

  allCollapses.forEach((collapse) => {
    if (collapse.id !== currentId) {
      collapse.classList.remove("show");
    }
  });
}

/**
 * Add click feedback animation
 */
function addClickFeedback(element) {
  element.style.transform = "scale(0.98)";
  setTimeout(() => {
    element.style.transform = "scale(1)";
  }, 150);
}

/**
 * Add hover effects to FAQ questions
 */
function addHoverEffects(question) {
  question.addEventListener("mouseenter", function () {
    this.style.transform = "translateX(5px)";
  });

  question.addEventListener("mouseleave", function () {
    this.style.transform = "translateX(0)";
  });
}

/**
 * Initialize scroll animations
 */
function initializeAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");

        // Add ripple effect
        if (entry.target.classList.contains("faq-item")) {
          addRippleEffect(entry.target);
        }
      }
    });
  }, observerOptions);

  // Observe FAQ items
  document.querySelectorAll(".faq-item").forEach((item) => {
    observer.observe(item);
  });
}

/**
 * Add ripple effect to FAQ items
 */
function addRippleEffect(item) {
  const question = item.querySelector(".faq-question");

  setTimeout(() => {
    question.style.boxShadow = "0 0 0 10px rgba(0, 123, 255, 0.1)";
    question.style.transition = "box-shadow 0.6s ease";

    setTimeout(() => {
      question.style.boxShadow = "";
    }, 600);
  }, 200);
}

/**
 * Initialize accessibility features
 */
function initializeAccessibility() {
  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      const activeElement = document.activeElement;

      if (activeElement && activeElement.classList.contains("faq-question")) {
        e.preventDefault();
        activeElement.click();
      }
    }
  });

  // Focus management
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question, index) => {
    question.addEventListener("keydown", function (e) {
      let nextIndex;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          nextIndex = (index + 1) % faqQuestions.length;
          faqQuestions[nextIndex].focus();
          break;
        case "ArrowUp":
          e.preventDefault();
          nextIndex = (index - 1 + faqQuestions.length) % faqQuestions.length;
          faqQuestions[nextIndex].focus();
          break;
        case "Home":
          e.preventDefault();
          faqQuestions[0].focus();
          break;
        case "End":
          e.preventDefault();
          faqQuestions[faqQuestions.length - 1].focus();
          break;
      }
    });
  });
}

/**
 * Add smooth scroll to FAQ section
 */
function smoothScrollToFAQ() {
  const faqSection = document.querySelector(".faq-section");
  if (faqSection) {
    faqSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

/**
 * Add loading animation on page load
 */
window.addEventListener("load", function () {
  // Trigger entrance animations
  const header = document.querySelector(".faq-header");
  const container = document.querySelector(".faq-container");

  if (header) {
    header.style.animationDelay = "0.2s";
  }

  if (container) {
    container.style.animationDelay = "0.5s";
  }

  // Add loaded class for any additional effects
  document.body.classList.add("loaded");
});

/**
 * Handle window resize
 */
window.addEventListener(
  "resize",
  debounce(function () {
    // Reset any transformations on resize
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach((question) => {
      question.style.transform = "";
    });
  }, 250)
);

/**
 * Debounce function for performance
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Add performance optimization for animations
 */
function optimizeAnimations() {
  // Check if user prefers reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    // Disable animations for users who prefer reduced motion
    const style = document.createElement("style");
    style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
    document.head.appendChild(style);
  }
}

// Initialize performance optimizations
optimizeAnimations();

/**
 * Export functions for potential external use
 */
window.FAQManager = {
  smoothScrollToFAQ,
  closeAllFAQs: () => closeOtherFAQs(""),
  openFAQ: (id) => {
    const question = document.querySelector(`[data-bs-target="#${id}"]`);
    if (question) question.click();
  },
};
