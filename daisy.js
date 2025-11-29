/* Unified navigation, smooth scroll, forms, and accessibility */

document.addEventListener('DOMContentLoaded', () => {

  /* ===========================
     AUTO YEAR
  ============================ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();



  /* ===========================
     UNIFIED MOBILE NAVIGATION
  ============================ */
  const navToggle = document.getElementById('mobileToggle');
  const navMenu   = document.querySelector('.nav-links-mobile');

  if (navToggle && navMenu) {

    // open/close
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('show');
    });

    // close when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.main-nav') && navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }


  /* ===========================
     SMOOTH SCROLL
  ============================ */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // close mobile menu after clicking a section
        if (navMenu && navMenu.classList.contains('show')) {
          navMenu.classList.remove('show');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });



  /* ===========================
     CONTACT FORM
  ============================ */
  const contactForm = document.getElementById('contactForm');
  const formStatus  = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      formStatus.textContent = '';

      const name    = document.getElementById('name').value.trim();
      const email   = document.getElementById('email').value.trim();
      const phone   = document.getElementById('phone').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !phone || !message) {
        formStatus.textContent = 'Please fill all fields before sending.';
        formStatus.style.color = 'crimson';
        return;
      }

      const to      = 'jumahkatongole1@gmail.com';
      const subject = encodeURIComponent(`Contact from website: ${name}`);
      const body    = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
      );
      const mailto  = `mailto:${to}?subject=${subject}&body=${body}`;

      window.location.href = mailto;

      formStatus.textContent = 'Your email client should open. If it does not, ensure you have a mail app configured.';
      formStatus.style.color = 'green';

      // For real automatic delivery use EmailJS or your server.
    });
  }



  /* ===========================
     NEWSLETTER FORM
  ============================ */
  const newsletterForm = document.getElementById('newsletterForm');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('nlEmail');

      if (!emailInput.value.trim()) {
        alert('Please enter an email address first.');
        return;
      }

      alert('Thanks — your email was recorded (client-side only). Connect this to a real newsletter provider to store subscribers.');

      emailInput.value = '';
    });
  }

});
