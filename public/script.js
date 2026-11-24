// Menu responsivo.
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');
menuToggle.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  menuToggle.setAttribute('aria-expanded', String(aberto));
  menuToggle.textContent = aberto ? '✕' : '☰';
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('aberto');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));
document.getElementById('ano').textContent = new Date().getFullYear();

// Define a data mínima como o momento atual.
const campoData = document.getElementById('dataHora');
const agora = new Date();
agora.setMinutes(agora.getMinutes() - agora.getTimezoneOffset());
campoData.min = agora.toISOString().slice(0, 16);

// Carrega os profissionais cadastrados no banco.
const veterinarioSelect = document.getElementById('veterinarioSelect');
async function carregarVeterinarios() {
  try {
    const resposta = await fetch('/api/veterinarios');
    if (!resposta.ok) throw new Error('Não foi possível carregar os profissionais.');
    const profissionais = await resposta.json();
    veterinarioSelect.innerHTML = '<option value="">Selecione o profissional</option>';
    profissionais.forEach(profissional => {
      const opcao = document.createElement('option');
      opcao.value = profissional.id;
      opcao.textContent = profissional.nome + (profissional.especialidade ? ' — ' + profissional.especialidade : '');
      veterinarioSelect.appendChild(opcao);
    });
    if (!profissionais.length) veterinarioSelect.innerHTML = '<option value="">Profissionais ainda não cadastrados</option>';
  } catch (erro) {
    veterinarioSelect.innerHTML = '<option value="">Erro ao carregar profissionais</option>';
  }
}
carregarVeterinarios();

// Registra tutor, animal e consulta pela API, salvando no SQLite.
const formAgendamento = document.getElementById('formAgendamento');
const retorno = document.getElementById('retornoAgendamento');
const botaoAgendar = document.getElementById('btnAgendar');

formAgendamento.addEventListener('submit', async event => {
  event.preventDefault();
  retorno.textContent = '';
  retorno.className = 'retorno-form';
  botaoAgendar.disabled = true;
  botaoAgendar.textContent = 'Enviando...';
  const dados = new FormData(formAgendamento);

  const enviar = async (rota, corpo) => {
    const resposta = await fetch('/api/' + rota, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(corpo)
    });
    const resultado = await resposta.json();
    if (!resposta.ok) throw new Error(resultado.erro || 'Não foi possível concluir a solicitação.');
    return resultado;
  };

  try {
    const tutor = await enviar('tutores', {
      nome: dados.get('tutorNome').trim(),
      telefone: dados.get('telefone').trim(),
      email: dados.get('email').trim()
    });
    const animal = await enviar('animais', {
      nome: dados.get('animalNome').trim(),
      especie: dados.get('especie'),
      raca: dados.get('raca').trim(),
      idade: dados.get('idade') || '',
      tutor_id: tutor.id
    });
    const consulta = await enviar('consultas', {
      animal_id: animal.id,
      veterinario_id: dados.get('veterinario_id'),
      data_hora: dados.get('data_hora'),
      motivo: dados.get('motivo').trim()
    });
    retorno.textContent = 'Solicitação registrada! Número do agendamento: ' + consulta.id + '. A clínica deverá confirmar com você.';
    retorno.classList.add('sucesso');
    formAgendamento.reset();
  } catch (erro) {
    retorno.textContent = erro.message;
    retorno.classList.add('erro');
  } finally {
    botaoAgendar.disabled = false;
    botaoAgendar.innerHTML = 'Enviar solicitação <span>→</span>';
  }
});