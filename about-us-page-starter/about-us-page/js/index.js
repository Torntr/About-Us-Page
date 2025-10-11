// Mobile menu toggle + accessibility features
const toggleBtn = document.querySelector('.nav-toggle');
const nav = document.getElementById('primary-nav');

if (toggleBtn && nav) {
  // Toggle menu on button click
  toggleBtn.addEventListener('click', () => {
    const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('open', !isOpen);

    // Focus the first link when opening (accessibility enhancement)
    if (!isOpen) {
      const firstLink = nav.querySelector('a');
      if (firstLink) firstLink.focus();
    }
  });

  // Close menu when Escape key is pressed
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
      toggleBtn.focus(); // Return focus to button
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    const isClickInsideNav = nav.contains(e.target);
    const isClickOnToggle = toggleBtn.contains(e.target);

    if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('open')) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    }
  });
}

