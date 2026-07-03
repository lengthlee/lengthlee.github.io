const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = Array.from(document.querySelectorAll('.nav-menu a'));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  root.setAttribute('data-theme', 'dark');
}

function updateThemeIcon() {
  const isDark = root.getAttribute('data-theme') === 'dark';
  themeButton.textContent = isDark ? '☀' : '☾';
}

updateThemeIcon();

themeButton.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', current);
  localStorage.setItem('theme', current);
  updateThemeIcon();
});

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  document.body.classList.toggle('menu-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.remove('active'));
      const active = navLinks.find((link) => link.getAttribute('href') === `#${entry.target.id}`);
      if (active) active.classList.add('active');
    });
  },
  { rootMargin: '-40% 0px -52% 0px', threshold: 0 }
);

sections.forEach((section) => observer.observe(section));

document.getElementById('year').textContent = new Date().getFullYear();
