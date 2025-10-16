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

// CONTACT FORM VALIDATION (no-op submit)
(() => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameEl = document.getElementById('name');
  const emailEl = document.getElementById('email');
  const messageEl = document.getElementById('message');
  const status = document.getElementById('form-status');

  const err = (id) => document.getElementById(id);

  const setError = (fieldWrapId, inputEl, errorEl, msg) => {
    inputEl.setAttribute('aria-invalid', 'true');
    errorEl.textContent = msg || '';
    document.getElementById(fieldWrapId).classList.toggle('error', !!msg);
  };

  const clearError = (fieldWrapId, inputEl, errorEl) => {
    setError(fieldWrapId, inputEl, errorEl, '');
    inputEl.removeAttribute('aria-invalid');
  };

  const emailOK = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value).trim());

  const nameOK = (value) => {
    const trimmed = String(value).trim();
    // Must have at least 2 words separated by space
    const words = trimmed.split(/\s+/).filter(w => w.length > 0);
    return words.length >= 2;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // reset
    clearError('field-name', nameEl, err('name-error'));
    clearError('field-email', emailEl, err('email-error'));
    clearError('field-message', messageEl, err('message-error'));
    status.textContent = '';

    let invalid = false;

    if (!nameEl.value.trim()) {
      setError('field-name', nameEl, err('name-error'), 'Please enter your name.');
      invalid = true;
    } else if (!nameOK(nameEl.value)) {
      setError('field-name', nameEl, err('name-error'), 'Please enter your first and last name.');
      invalid = true;
    }

    if (!emailEl.value.trim()) {
      setError('field-email', emailEl, err('email-error'), 'Email is required.');
      invalid = true;
    } else if (!emailOK(emailEl.value)) {
      setError('field-email', emailEl, err('email-error'), 'Enter a valid email address.');
      invalid = true;
    }

    if (!messageEl.value.trim()) {
      setError('field-message', messageEl, err('message-error'), 'Tell us a bit about your request.');
      invalid = true;
    }

    if (invalid) {
      status.textContent = 'Please fix the errors above and try again.';
      return;
    }

    // Mock success
    status.textContent = 'Thanks! Your message was captured (mock).';
    form.reset();
  });
})();
