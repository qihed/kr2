(function(){
  const outputs = document.querySelectorAll('.ascii-progress');
  outputs.forEach(out => {
    const val = Math.max(0, Math.min(100, Number(out.dataset.value || 0)));
    const total = 20; // characters
    const filled = Math.round(total * val / 100);
    const empty = total - filled;
    const bar = '[' + '#'.repeat(filled) + '-'.repeat(empty) + '] ' + val + '%';
    out.textContent = bar;
  });

  // Simple TODO persistence
  const ul = document.getElementById('todo');
  if (ul){
    const key = 'ascii.todo.v1';
    // Load
    try{
      const saved = JSON.parse(localStorage.getItem(key) || '[]');
      const boxes = ul.querySelectorAll('input[type="checkbox"]');
      saved.forEach((v, i) => boxes[i] && (boxes[i].checked = !!v));
      // Save on change
      ul.addEventListener('change', () => {
        const arr = Array.from(ul.querySelectorAll('input[type="checkbox"]')).map(b => b.checked ? 1 : 0);
        localStorage.setItem(key, JSON.stringify(arr));
      });
    }catch{ /* noop */ }
  }
})();
