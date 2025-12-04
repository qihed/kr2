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

  // NEW: Практика 17 - модалка с управлением фокусом для доступности
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalClose = modal?.querySelector('.modal__close');
  let previousFocus = null; // NEW: сохраняем элемент, который имел фокус до открытия модалки
  
  function openModal(title, body){
    if (!modal) return;
    modalTitle.textContent = title;
    modalBody.textContent = body;
    modal.setAttribute('aria-hidden','false');
    
    // NEW: Практика 17 - сохраняем текущий фокус и перемещаем его в модалку
    previousFocus = document.activeElement;
    modalClose?.focus();
    
    // NEW: Практика 17 - блокируем прокрутку фона и скрываем его от screen readers
    document.body.style.overflow = 'hidden';
    const backdrop = modal.querySelector('.modal__backdrop');
    if (backdrop) {
      backdrop.setAttribute('aria-hidden', 'true');
    }
  }
  
  function closeModal(){ 
    if (!modal) return;
    modal.setAttribute('aria-hidden','true');
    
    // NEW: Практика 17 - возвращаем фокус на элемент, который открыл модалку
    if (previousFocus) {
      previousFocus.focus();
      previousFocus = null;
    }
    
    // NEW: Практика 17 - возвращаем прокрутку
    document.body.style.overflow = '';
  }

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
  
  // NEW: Практика 17 - закрытие по Escape и ловушка фокуса внутри модалки
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
    // NEW: ловушка фокуса - если Tab в начале модалки, переходим в конец
    if (e.key === 'Tab' && modal?.getAttribute('aria-hidden') === 'false') {
      const focusableElements = modal.querySelectorAll('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  });
})();
