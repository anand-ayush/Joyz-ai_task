// Landing Page Interactive Script
document.addEventListener("DOMContentLoaded", function () {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-visible");
      }
    });
  }, observerOptions);

  // Observe all elements with animate-on-scroll class
  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });

  // Floating avatars animation
  function animateFloatingAvatars() {
    const avatars = document.querySelectorAll(".floating-avatar");
    avatars.forEach((avatar, index) => {
      // Random float animation
      const delay = index * 0.5;
      const duration = 3 + Math.random() * 2;

      avatar.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    });
  }
  //   Company Logo animation
  // Reveal logos on scroll
  document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    document
      .querySelectorAll(".animate-on-scroll")
      .forEach((el) => observer.observe(el));
  });

// Typewriter effect for hero text
document.addEventListener("DOMContentLoaded", function () {
  const fullText = "Don't spend a rupee until";
  const target = document.getElementById("typewriter-text");
  let index = 0;
  target.innerHTML = ""; // Clear fallback text

  function type() {
    if (index < fullText.length) {
      target.innerHTML += fullText.charAt(index);
      index++;
      setTimeout(type, 70);
    } else {
      // Highlight rupee word
      target.innerHTML = target.innerHTML.replace(
        "rupee",
        '<span class="highlight">rupee</span>'
      );
    }
  }

  type();
});


  // Counter animation for statistics
  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      // Format numbers with K suffix
      const displayValue =
        current >= 1000
          ? Math.round(current / 1000) + "K"
          : Math.round(current).toString();

      element.textContent = displayValue;
    }, 16);
  }

  // Animate statistics when they come into view
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statValue = entry.target;
        const text = statValue.textContent;

        if (text.includes("K")) {
          const number = parseInt(text.replace("K", "")) * 1000;
          animateCounter(statValue, number);
        } else {
          const number = parseInt(text.replace(/[^\d]/g, ""));
          if (number > 0) {
            animateCounter(statValue, number);
          }
        }

        statsObserver.unobserve(statValue);
      }
    });
  });

  // Observe stat values
  document.querySelectorAll(".stat-value").forEach((stat) => {
    statsObserver.observe(stat);
  });

  // Observe results numbers
  document.querySelectorAll(".result-number").forEach((result) => {
    statsObserver.observe(result);
  });

  // Button hover effects
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
      this.style.boxShadow = "0 10px 25px rgba(34, 197, 94, 0.3)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "none";
    });

    // Click effect
    button.addEventListener("click", function (e) {
      // Create ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Campaign card hover effect
  const campaignCard = document.querySelector(".campaign-card");
  if (campaignCard) {
    campaignCard.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.02)";
      this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.1)";
    });

    campaignCard.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.08)";
    });
  }

  // Step cards hover effect
  document.querySelectorAll(".step-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
      this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.1)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.08)";
    });
  });

  // Animated progress bars in results chart
  function animateChartBars() {
    const bars = document.querySelectorAll(".chart-bars .bar");
    bars.forEach((bar, index) => {
      const height = bar.style.height;
      bar.style.height = "0%";

      setTimeout(() => {
        bar.style.height = height;
        bar.style.transition = "height 0.8s ease-out";
      }, index * 100);
    });
  }

  // Animate chart bars when visible
  const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateChartBars();
        chartObserver.unobserve(entry.target);
      }
    });
  });

  const chartElement = document.querySelector(".result-chart");
  if (chartElement) {
    chartObserver.observe(chartElement);
  }

  // Typing effect for speech bubble
  function typeText(element, text, speed = 50) {
    element.textContent = "";
    let i = 0;

    const typeTimer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeTimer);
      }
    }, speed);
  }

  // Animate speech bubble text
  const speechBubble = document.querySelector(".speech-bubble span");
  if (speechBubble) {
    const originalText = speechBubble.textContent;

    const speechObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            typeText(speechBubble, originalText);
          }, 500);
          speechObserver.unobserve(speechBubble);
        }
      });
    });

    speechObserver.observe(speechBubble);
  }

  // Onboarding flow step animation
  function animateOnboardingFlow() {
    const flowItems = document.querySelectorAll(".flow-item");
    flowItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("animate-step");
      }, index * 500);
    });
  }

  // Animate onboarding flow when visible
  const flowObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateOnboardingFlow();
        flowObserver.unobserve(entry.target);
      }
    });
  });

  const onboardingFlow = document.querySelector(".onboarding-flow");
  if (onboardingFlow) {
    flowObserver.observe(onboardingFlow);
  }

  // Form field focus effects
  document.querySelectorAll(".form-control").forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", function () {
      if (!this.value) {
        this.parentElement.classList.remove("focused");
      }
    });
  });

  // Feature items stagger animation
  function staggerFeatureItems() {
    const featureItems = document.querySelectorAll(".feature-item");
    featureItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("animate-visible");
      }, index * 200);
    });
  }

  // Trigger feature items animation
  const featuresObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        staggerFeatureItems();
        featuresObserver.unobserve(entry.target);
      }
    });
  });

  const featuresList = document.querySelector(".features-list");
  if (featuresList) {
    featuresObserver.observe(featuresList);
  }

  // Parallax effect for dashboard preview
  function handleParallax() {
    const dashboardPreview = document.querySelector(".dashboard-preview");
    if (dashboardPreview) {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.1;

      dashboardPreview.style.transform = `translateY(${
        scrolled * parallaxSpeed
      }px)`;
    }
  }

  // Throttle scroll events for performance
  let ticking = false;
  function updateParallax() {
    handleParallax();
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });

  // Initialize floating avatars animation
  animateFloatingAvatars();

  // Badge hover effects
  document.querySelectorAll(".badge").forEach((badge) => {
    badge.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)";
    });

    badge.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });

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

  console.log("Landing page scripts loaded successfully! 🚀");
});

// CSS Keyframes for animations (to be added to your CSS)
const animationStyles = `
@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
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

.animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease-out;
}

.animate-on-scroll.animate-visible {
    opacity: 1;
    transform: translateY(0);
}

.btn {
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.campaign-card, .step-card {
    transition: all 0.3s ease;
}

.floating-avatar {
    animation-fill-mode: both;
}

.flow-item {
    opacity: 0.5;
    transition: all 0.5s ease;
}

.flow-item.animate-step {
    opacity: 1;
    transform: scale(1.05);
}

.feature-item {
    transition: all 0.4s ease;
}

.badge {
    transition: transform 0.2s ease;
}

.form-group.focused label {
    color: #22c55e;
    transform: scale(0.9);
}
`;

// Inject animation styles
const styleSheet = document.createElement("style");
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);
