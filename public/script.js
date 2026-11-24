// Interações simples do site informativo.
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  menuToggle.setAttribute('aria-expanded', String(aberto));
  menuToggle.textContent = aberto ? '✕' : '☰';
});

// Fecha o menu depois que o visitante escolhe uma seção.
menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('aberto');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

// Atualiza automaticamente o ano do rodapé.
document.getElementById('ano').textContent = new Date().getFullYear();

// O link de contato não possui endereço ou telefone fictício.
// Configure o href="mailto:..." no index.html quando os dados reais da clínica estiverem disponíveis.
const contato = document.querySelector('.contato .botao');
contato.addEventListener('click', event => {
  if (!contato.getAttribute('href').replace('mailto:', '').trim()) {
    event.preventDefault();
    alert('Adicione o e-mail oficial da clínica no link de contato.');
  }
});