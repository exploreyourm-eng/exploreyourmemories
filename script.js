const menuButton = document.querySelector('.hamburger');
const navigation = document.querySelector('#nav');
function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => { const open = navigation.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
  document.getElementById('enquiry-service').value = link.dataset.service;
  if (link.dataset.style) document.getElementById('enquiry-notes').value = link.dataset.style;
}));
const form = document.getElementById('enquiry-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const values = new FormData(form);
  const lines = ['Hello Explore Your Memories, I would like to enquire:', ...[['name','Name'],['phone','Phone'],['service','Service'],['date','Event date'],['location','Location'],['guests','Guest count'],['budget','Budget'],['notes','Plans']].filter(([key]) => String(values.get(key) || '').trim()).map(([key,label]) => `${label}: ${String(values.get(key)).trim()}`)];
  window.location.assign('https://wa.me/918240688144?text=' + encodeURIComponent(lines.join('\n')));
});
