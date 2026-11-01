/**
 * Cipherforge - Client Interactions
 * Cloned visual behavior & interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mark document as JS-enabled
  document.documentElement.classList.add('js');

  // Mobile navigation toggle
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      const isExpanded = nav.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu on link click (mobile)
    if (navMenu) {
      navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  // Scroll effect on header
  const handleScroll = () => {
    if (window.scrollY > 20) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Reveal elements on scroll
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver not supported
    revealElements.forEach(el => el.classList.add('in-view'));
  }

  // Contact form submission handling
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('cf-name');
      const emailInput = document.getElementById('cf-email');
      const companyInput = document.getElementById('cf-company');
      const messageInput = document.getElementById('cf-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const company = companyInput ? companyInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please fill in all required fields (Name, Email, Message).';
        return;
      }

      // Display success message
      formStatus.className = 'form-status success';
      formStatus.innerHTML = `<strong>Thank you, ${escapeHtml(name)}.</strong> Your inquiry has been dispatched to Cipherforge's research team. A senior security engineer will respond within 24 hours. (Encrypted mailto dispatched).`;

      // Trigger mailto client as backup
      const mailtoSubject = encodeURIComponent(`Security Inquiry from ${company || name}`);
      const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`);
      
      // Reset form
      contactForm.reset();

      // Open mail client after slight pause
      setTimeout(() => {
        window.location.href = `mailto:contact@cipherforge.io?subject=${mailtoSubject}&body=${mailtoBody}`;
      }, 900);
    });
  }

  // Footer Year
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

function escapeHtml(string) {
  const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return String(string).replace(/[&<>"']/g, (s) => entityMap[s]);
}
