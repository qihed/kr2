(function(){
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  if (!form) return;

  // NEW: Практика 17 - функция показа ошибок с установкой aria-invalid и aria-describedby
  function showError(input, msg){
    // NEW: находим элемент ошибки по id (name-error, email-error, message-error)
    const fieldName = input.id.replace('contact-', '');
    const errorId = fieldName + '-error';
    const hintId = fieldName + '-hint';
    const small = document.getElementById(errorId);
    
    if (small) {
      small.textContent = msg || '';
    }
    // NEW: Практика 17 - установка aria-invalid для screen readers
    if (msg) {
      input.setAttribute('aria-invalid', 'true');
      // NEW: добавляем aria-describedby для связи с подсказкой и сообщением об ошибке
      // Формат: "hint-id error-id" или просто "error-id" если нет подсказки
      const describedBy = hintId + ' ' + errorId;
      input.setAttribute('aria-describedby', describedBy);
    } else {
      input.removeAttribute('aria-invalid');
      // NEW: при успешной валидации оставляем только подсказку в aria-describedby
      const describedBy = hintId;
      input.setAttribute('aria-describedby', describedBy);
    }
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
