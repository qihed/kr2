(function(){
  const path = location.pathname.replace(/\/index\.html$/, '/');
  document.querySelectorAll('.main-nav .nav-link').forEach(a => {
    const href = new URL(a.href);
    if (href.pathname === location.pathname) {
      a.setAttribute('aria-current','page');
      a.classList.add('is-active');
    }
  });
})();
