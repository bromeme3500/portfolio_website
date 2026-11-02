/**
 * Neeraj K R - Portfolio Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // Typewriter effect for Hero section
  const typingElement = document.getElementById('typingText');
  const words = [
    'Data Science & Analytics',
    'Deep Learning & PyTorch',
    'YOLO & Computer Vision',
    'Crowd Density Estimation',
    'Backend Systems with Flask',
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typingElement) return;

    const currentWord = words[wordIndex];
    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400; // Pause before typing new word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // Mobile Menu Navigation
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.toggle('hidden');
      if (menuIcon) {
        if (isHidden) {
          menuIcon.className = 'fa-solid fa-bars-staggered text-xl';
        } else {
          menuIcon.className = 'fa-solid fa-xmark text-xl';
        }
      }
    });

    // Close mobile menu on link click
    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        if (menuIcon) {
          menuIcon.className = 'fa-solid fa-bars-staggered text-xl';
        }
      });
    });
  }

  // Project Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Toggle active button style
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('filter-hidden');
        } else {
          card.classList.add('filter-hidden');
        }
      });
    });
  });

  // Scroll to Top Button & Navbar Shadow
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Navbar backdrop effect
    if (navbar) {
      if (scrollPos > 40) {
        navbar.classList.add('shadow-lg', 'shadow-black/40', 'bg-[#090d16]/95');
        navbar.classList.remove('bg-[#090d16]/80');
      } else {
        navbar.classList.remove('shadow-lg', 'shadow-black/40', 'bg-[#090d16]/95');
        navbar.classList.add('bg-[#090d16]/80');
      }
    }

    // Scroll to Top Reveal
    if (scrollTopBtn) {
      if (scrollPos > 400) {
        scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-3');
        scrollTopBtn.classList.add('opacity-100', 'translate-y-0');
      } else {
        scrollTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-3');
        scrollTopBtn.classList.remove('opacity-100', 'translate-y-0');
      }
    }

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('text-cyan-400');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('text-cyan-400');
      }
    });
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  // Interactive Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const subject = document.getElementById('subject')?.value.trim();
      const message = document.getElementById('message')?.value.trim();

      if (!name || !email || !subject || !message) {
        showStatus('Please fill in all fields before sending.', 'error');
        return;
      }

      // Prepare mailto link as fallback/convenient direct email client trigger
      const mailtoUrl = `mailto:neerajkr5354@gmail.com?subject=${encodeURIComponent(
        `[Portfolio] ${subject}`
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      )}`;

      showStatus('Opening your email client to send message...', 'success');

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 600);
    });
  }

  function showStatus(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.classList.remove('hidden', 'bg-red-500/20', 'text-red-300', 'bg-emerald-500/20', 'text-emerald-300');

    if (type === 'error') {
      formStatus.classList.add('bg-red-500/20', 'text-red-300');
    } else {
      formStatus.classList.add('bg-emerald-500/20', 'text-emerald-300');
    }
  }
});
