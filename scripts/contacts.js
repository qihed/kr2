(function(){
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  if (!form) return;

  function showError(input, msg){
    const small = input.closest('.field').querySelector('.error');
    small.textContent = msg || '';
  }

  function validate(){
    let ok = true;
    const name = form.elements['name'];
    const email = form.elements['email'];
    const message = form.elements['message'];

    // Name
    if (!name.value || name.value.trim().length < 2){
      showError(name, 'Введите имя (минимум 2 символа).');
      ok = false;
    } else showError(name, '');

    // Email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!re.test(email.value)){
      showError(email, 'Введите корректный email.');
      ok = false;
    } else showError(email, '');

    // Message
    if (!message.value || message.value.trim().length < 10){
      showError(message, 'Минимум 10 символов.');
      ok = false;
    } else showError(message, '');

    return ok;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validate()){
      toast.hidden = false;
      setTimeout(() => { toast.hidden = true; }, 2500);
      form.reset();
    }
  });
})();
