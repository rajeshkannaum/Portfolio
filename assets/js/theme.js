document.documentElement.classList.add('js');
try {
  const savedTheme = localStorage.getItem('portfolio-theme');
  const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.theme = savedTheme || preferredTheme;
} catch (error) {
  document.documentElement.dataset.theme = 'light';
}
  
