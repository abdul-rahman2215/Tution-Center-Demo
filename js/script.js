/* ==========================================================================
   MY TUITION CENTER - JAVASCRIPT
   Handles Mobile Navigation, Active Link highlighting, Form Validation,
   Accessibility, and Dynamic Copyright Year.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DYNAMIC FOOTER YEAR
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. MOBILE NAVIGATION TOGGLE
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    const toggleMenu = () => {
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      } else {
        navMenu.classList.add('open');
        mobileToggle.setAttribute('aria-expanded', 'true');
      }
    };

    mobileToggle.addEventListener('click', toggleMenu);

    // Close mobile menu when a nav link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Keyboard accessibility: Close menu on 'Escape' key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.focus();
      }
    });
  }

  // 3. HIGHLIGHT ACTIVE NAVIGATION LINK
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.nav-link');

  allNavLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (!linkHref) return;

    const pageName = linkHref.split('#')[0];
    if (pageName === currentPath || (currentPath === '' && pageName === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });

  // 4. ADMISSION FORM VALIDATION
  const enquiryForm = document.getElementById('enquiry-form');
  const confirmationBox = document.getElementById('confirmation-box');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Inputs to validate
      const studentName = document.getElementById('student-name');
      const parentName = document.getElementById('parent-name');
      const phoneNumber = document.getElementById('phone-number');
      const studentClass = document.getElementById('student-class');
      const learningMode = document.getElementById('learning-mode');

      // Reset previous error messages
      clearErrors(enquiryForm);

      // Validate Student Name
      if (!studentName.value.trim()) {
        showError(studentName, 'Please enter student name.');
        isValid = false;
      }

      // Validate Parent Name
      if (!parentName.value.trim()) {
        showError(parentName, 'Please enter parent or guardian name.');
        isValid = false;
      }

      // Validate Indian Phone Number (10 digits starting with 6-9)
      const phoneRegex = /^[6-9]\d{9}$/;
      const cleanedPhone = phoneNumber.value.replace(/\s+/g, '').replace(/^\+91/, '');
      if (!cleanedPhone) {
        showError(phoneNumber, 'Please enter mobile number.');
        isValid = false;
      } else if (!phoneRegex.test(cleanedPhone)) {
        showError(phoneNumber, 'Please enter a valid 10-digit Indian mobile number (e.g., 9876543210).');
        isValid = false;
      }

      // Validate Student Class Selection
      if (!studentClass.value) {
        showError(studentClass, 'Please select student class.');
        isValid = false;
      }

      // Validate Learning Mode Selection
      if (!learningMode.value) {
        showError(learningMode, 'Please select preferred learning mode.');
        isValid = false;
      }

      // If valid, show confirmation message
      if (isValid) {
        if (confirmationBox) {
          confirmationBox.textContent = "Your sample enquiry has been validated successfully. This prototype does not send or store enquiries.";
          confirmationBox.classList.add('visible');
          confirmationBox.setAttribute('role', 'alert');
        }

        // Reset form
        enquiryForm.reset();

        // Scroll to confirmation box smoothly
        confirmationBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // Helper functions for error handling
  function showError(inputElement, message) {
    inputElement.classList.add('is-invalid');
    const errorDiv = document.getElementById(`${inputElement.id}-error`);
    if (errorDiv) {
      errorDiv.textContent = message;
      errorDiv.classList.add('visible');
    }
  }

  function clearErrors(form) {
    const invalidInputs = form.querySelectorAll('.is-invalid');
    invalidInputs.forEach(input => input.classList.remove('is-invalid'));

    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(msg => {
      msg.classList.remove('visible');
      msg.textContent = '';
    });

    if (confirmationBox) {
      confirmationBox.classList.remove('visible');
    }
  }
});
