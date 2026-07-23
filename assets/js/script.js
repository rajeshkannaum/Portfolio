document.getElementById('year').textContent = new Date().getFullYear();

const mobileMenu = document.querySelector('.mobile-menu');
if (mobileMenu) {
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => mobileMenu.removeAttribute('open'));
  });

  document.addEventListener('click', (event) => {
    if (!mobileMenu.contains(event.target)) mobileMenu.removeAttribute('open');
  });
}

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

function updateThemeButton() {
  const darkMode = document.documentElement.dataset.theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(darkMode));
  themeToggle.setAttribute('aria-label', darkMode ? 'Switch to light theme' : 'Switch to dark theme');
  themeIcon.textContent = darkMode ? '☀' : '☾';
}

updateThemeButton();
themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = nextTheme;
  try { localStorage.setItem('portfolio-theme', nextTheme); } catch (error) {}
  updateThemeButton();
});

const loader = document.getElementById('site-loader');
function hideLoader() {
  loader.classList.add('is-hidden');
  document.body.classList.remove('loading');
}

if (document.readyState === 'complete') {
  setTimeout(hideLoader, 150);
} else {
  window.addEventListener('load', () => setTimeout(hideLoader, 150), { once: true });
  setTimeout(hideLoader, 800);
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const typingText = document.getElementById('typing-text');
const roles = [
  'Junior Software Developer | Building Scalable Web Applications',
  'PHP · Java · Full-Stack Development',
  'Building Modern Web Applications'
];

if (!reducedMotion) {
  let roleIndex = 0;
  let characterIndex = roles[0].length;
  let deleting = true;

  function typeRole() {
    const role = roles[roleIndex];
    typingText.textContent = role.slice(0, characterIndex);

    if (deleting) {
      characterIndex -= 1;
      if (characterIndex < 1) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    } else {
      characterIndex += 1;
      if (characterIndex > roles[roleIndex].length) {
        deleting = true;
        characterIndex = roles[roleIndex].length;
        setTimeout(typeRole, 1200);
        return;
      }
    }
    setTimeout(typeRole, deleting ? 45 : 85);
  }

  setTimeout(typeRole, 1200);
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
