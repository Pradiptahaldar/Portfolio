// Contact form
function handleForm(e) {
  e.preventDefault();

  const btn = e.target.querySelector('.btn-send');

  btn.textContent = 'Message sent ✓';
  btn.style.background = '#52B788';

  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}