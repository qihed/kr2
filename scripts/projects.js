(function(){
  // Filters
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.projects-grid .card');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const f = btn.dataset.filter;
      cards.forEach(c => {
        const ok = (f === 'all') || (c.dataset.category === f);
        c.style.display = ok ? '' : 'none';
      });
    });
  });

  // Modal
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  function openModal(title, body){
    modalTitle.textContent = title;
    modalBody.textContent = body;
    modal.setAttribute('aria-hidden','false');
  }
  function closeModal(){ modal.setAttribute('aria-hidden','true'); }

  document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.id;
      const card = btn.closest('.card');
      const title = card.querySelector('header')?.textContent.trim() || 'Проект';
      const desc = card.querySelector('p')?.textContent.trim() || 'Описание проекта.';
      openModal(title, desc);
    });
  });

  modal?.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-close')) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
})();
