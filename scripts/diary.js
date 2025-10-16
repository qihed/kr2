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

  // ---- диалог ----
  const open = () => {
    if (!modal || !form) return;
    modal.setAttribute('aria-hidden', 'false');
    form.reset();
    form.elements.text?.focus();
  };
  const close = () => modal?.setAttribute('aria-hidden', 'true');

  openBtn?.addEventListener('click', open);
  modal?.addEventListener('click', (e) => { if (e.target.hasAttribute('data-close')) close(); });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = form.elements.text.value.trim();
    const done = form.elements.done.checked;
    const err = form.querySelector('.error');
    if (text.length < 2){
      if (err) err.textContent = 'Введите текст (≥ 2 символов).';
      return;
    }
    if (err) err.textContent = '';

    items.push({ text, done });
    save(items);
    render(items);
    close();
  });
})();
