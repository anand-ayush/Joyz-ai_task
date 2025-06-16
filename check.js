$(document).ready(function () {
  // Smooth scrolling for navigation links
  $('a[href^="#"]').on("click", function (event) {
    var target = $(this.getAttribute("href"));
    if (target.length) {
      event.preventDefault();
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: target.offset().top - 80,
          },
          800,
          "swing"
        );
    }
  });

  // Navbar scroll effect
  $(window).scroll(function () {
    if ($(window).scrollTop() > 50) {
      $(".navbar").addClass("navbar-scrolled");
    } else {
      $(".navbar").removeClass("navbar-scrolled");
    }
  });

  // Add CSS for navbar scroll effect
  const style = document.createElement("style");
  style.textContent = `
        .navbar-scrolled {
            background: rgba(255, 255, 255, 0.98) !important;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15) !important;
        }
        .cta-button {
            position: relative;
            overflow: hidden;
        }
        .cta-button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transition: width 0.6s, height 0.6s;
            transform: translate(-50%, -50%);
            z-index: 0;
        }
        .cta-button.clicked::before {
            width: 300px;
            height: 300px;
        }
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
  document.head.appendChild(style);

  // Parallax effect for background elements
  $(window).scroll(function () {
    const scrolled = $(window).scrollTop();
    const parallax1 = scrolled * 0.5;
    const parallax2 = scrolled * 0.3;
    const parallax3 = scrolled * 0.7;

    $(".circle-1").css(
      "transform",
      `translate(${-parallax1}px, ${parallax1}px) rotate(${scrolled * 0.1}deg)`
    );
    $(".circle-2").css(
      "transform",
      `translate(${parallax2}px, ${-parallax2}px) rotate(${-scrolled * 0.1}deg)`
    );
    $(".circle-3").css(
      "transform",
      `translate(${-parallax3}px, ${parallax3}px)`
    );
  });

  // Interactive hover effects for check items
  $(".check-item").hover(
    function () {
      $(this).find(".check-icon").css({
        transform: "scale(1.2) rotate(360deg)",
        transition: "all 0.5s ease",
      });
      $(this).css({
        transform: "translateX(10px)",
        transition: "all 0.3s ease",
      });
    },
    function () {
      $(this).find(".check-icon").css({
        transform: "scale(1) rotate(0deg)",
      });
      $(this).css({
        transform: "translateX(0)",
      });
    }
  );

  // CTA Button click effect
  $(".cta-button").click(function (e) {
    e.preventDefault();

    // Add clicked class for ripple effect
    $(this).addClass("clicked");

    // Button animation
    $(this).css({
      transform: "scale(0.95)",
      transition: "transform 0.1s ease",
    });

    // Reset button scale after animation
    setTimeout(() => {
      $(this).css({
        transform: "scale(1)",
        transition: "transform 0.2s ease",
      });
    }, 100);

    // Remove clicked class after ripple animation
    setTimeout(() => {
      $(this).removeClass("clicked");
    }, 600);

    // Optional: Add your custom action here
    // Example: scroll to a section, open a modal, etc.
    console.log("CTA button clicked!");
  });

  // Fade in animation on scroll
  function checkFade() {
    $(".fade-in").each(function () {
      const elementTop = $(this).offset().top;
      const elementBottom = elementTop + $(this).outerHeight();
      const viewportTop = $(window).scrollTop();
      const viewportBottom = viewportTop + $(window).height();

      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        $(this).addClass("visible");
      }
    });
  }

  // Trigger fade in on scroll and page load
  $(window).on("scroll", checkFade);
  $(window).on("resize", checkFade);
  checkFade(); // Check on page load

  // Mobile menu toggle (if you have a hamburger menu)
  $(".mobile-menu-toggle").click(function () {
    $(".mobile-menu").toggleClass("active");
    $(this).toggleClass("active");
  });

  // Close mobile menu when clicking on a link
  $(".mobile-menu a").click(function () {
    $(".mobile-menu").removeClass("active");
    $(".mobile-menu-toggle").removeClass("active");
  });

  // Form validation and submission (if you have forms)
  $("form").submit(function (e) {
    e.preventDefault();

    let isValid = true;
    const form = $(this);

    // Basic validation
    form.find("input[required], textarea[required]").each(function () {
      if ($(this).val().trim() === "") {
        $(this).addClass("error");
        isValid = false;
      } else {
        $(this).removeClass("error");
      }
    });

    // Email validation
    const emailField = form.find('input[type="email"]');
    if (emailField.length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailField.val())) {
        emailField.addClass("error");
        isValid = false;
      }
    }

    if (isValid) {
      // Show success message or submit form
      console.log("Form is valid and ready to submit!");
      // You can add AJAX form submission here
    } else {
      console.log("Form has validation errors");
    }
  });

  // Input focus effects
  $("input, textarea")
    .focus(function () {
      $(this).parent().addClass("focused");
    })
    .blur(function () {
      $(this).parent().removeClass("focused");
      if ($(this).val() !== "") {
        $(this).parent().addClass("filled");
      } else {
        $(this).parent().removeClass("filled");
      }
    });

  // Counter animation for statistics
  function animateCounter() {
    $(".counter").each(function () {
      const $this = $(this);
      const countTo = $this.attr("data-count");

      $({ countNum: $this.text() }).animate(
        {
          countNum: countTo,
        },
        {
          duration: 2000,
          easing: "swing",
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
          },
        }
      );
    });
  }

  // Trigger counter animation when element comes into view
  $(window).scroll(function () {
    $(".counter").each(function () {
      const elementTop = $(this).offset().top;
      const viewportBottom = $(window).scrollTop() + $(window).height();

      if (elementTop < viewportBottom && !$(this).hasClass("animated")) {
        $(this).addClass("animated");
        animateCounter();
      }
    });
  });

  // Smooth reveal for images
  $("img").each(function () {
    $(this).on("load", function () {
      $(this).addClass("loaded");
    });

    // If image is already cached and loaded
    if (this.complete) {
      $(this).addClass("loaded");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      $(".back-to-top").fadeIn();
    } else {
      $(".back-to-top").fadeOut();
    }
  });

  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 800);
    return false;
  });
});
