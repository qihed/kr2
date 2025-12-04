// ASCII прогресс-бары 
(function(){
  const outputs = document.querySelectorAll('.ascii-progress');
  outputs.forEach(out => {
    const val = Math.max(0, Math.min(100, Number(out.dataset.value || 0)));
    const total = 20;
    const filled = Math.round(total * val / 100);
    const empty = total - filled;
    out.textContent = '[' + '#'.repeat(filled) + '-'.repeat(empty) + '] ' + val + '%';
  });
})();

// TODO-список 
(function(){
  const STORAGE = 'ascii.todo.v2';
  const ul = document.getElementById('todo');
  const openBtn = document.getElementById('addTaskBtn');
  const modal = document.getElementById('addTaskModal');
  const form = document.getElementById('addTaskForm');
  if (!ul) return;

  const save = (items) => localStorage.setItem(STORAGE, JSON.stringify(items));
  const escapeHtml = (s) => {
    const d = document.createElement('div'); d.textContent = s; return d.innerHTML;
  };

  function load(){
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) return JSON.parse(raw);
    } catch {}
    const items = [];
    ul.querySelectorAll('li').forEach(li => {
      const box = li.querySelector('input[type="checkbox"]');
      const label = li.querySelector('label');
      const text = label
        ? Array.from(label.childNodes).map(n => n.nodeType === 3 ? n.textContent : '').join('').trim()
        : li.textContent.trim();
      items.push({ text, done: !!(box && box.checked) });
    });
    return items;
  }

  let items = load();
  render(items);

  function render(list){
    ul.innerHTML = '';
    list.forEach((item, idx) => {
      const li = document.createElement('li');
      li.innerHTML = `<label><input type="checkbox" data-idx="${idx}" ${item.done ? 'checked' : ''}> ${escapeHtml(item.text)}</label>`;
      ul.appendChild(li);
    });
  }

  ul.addEventListener('change', (e) => {
    const t = e.target;
    if (t.matches('input[type="checkbox"][data-idx]')) {
      const i = Number(t.dataset.idx);
      items[i].done = t.checked;
      save(items);
    }
  });

  // NEW: Практика 17 - диалог с управлением фокусом для доступности
  let previousFocus = null; // NEW: сохраняем элемент, который имел фокус до открытия модалки
  
  const open = () => {
    if (!modal || !form) return;
    modal.setAttribute('aria-hidden', 'false');
    form.reset();
    
    // NEW: Практика 17 - сохраняем текущий фокус
    previousFocus = document.activeElement;
    
    // NEW: Практика 17 - перемещаем фокус в первое поле формы
    form.elements.text?.focus();
    
    // NEW: Практика 17 - блокируем прокрутку фона
    document.body.style.overflow = 'hidden';
    const backdrop = modal.querySelector('.modal__backdrop');
    if (backdrop) {
      backdrop.setAttribute('aria-hidden', 'true');
    }
  };
  
  const close = () => {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    
    // NEW: Практика 17 - возвращаем фокус на элемент, который открыл модалку
    if (previousFocus) {
      previousFocus.focus();
      previousFocus = null;
    }
    
    // NEW: Практика 17 - возвращаем прокрутку
    document.body.style.overflow = '';
  };

  openBtn?.addEventListener('click', open);
  modal?.addEventListener('click', (e) => { if (e.target.hasAttribute('data-close')) close(); });
  
  // NEW: Практика 17 - закрытие по Escape и ловушка фокуса внутри модалки
  window.addEventListener('keydown', (e) => { 
    if (e.key === 'Escape' && modal?.getAttribute('aria-hidden') === 'false') {
      close();
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

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = form.elements.text.value.trim();
    const done = form.elements.done.checked;
    // NEW: поиск элемента ошибки через closest для правильной работы с новой структурой формы
    const err = form.querySelector('.field .error');
    if (text.length < 2){
      if (err) {
        err.textContent = 'Введите текст (≥ 2 символов).';
        // NEW: установка aria-invalid для доступности
        form.elements.text.setAttribute('aria-invalid', 'true');
      }
      return;
    }
    if (err) {
      err.textContent = '';
      // NEW: сброс aria-invalid при успешной валидации
      form.elements.text.removeAttribute('aria-invalid');
    }

    items.push({ text, done });
    save(items);
    render(items);
    close();
  });
})();
