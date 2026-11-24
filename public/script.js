// JavaScript do front-end: formulários, consultas à API e atualização das tabelas.
let usuario = null;
const $ = (id) => document.getElementById(id);
const api = async (url, opcoes = {}) => {
  const resposta = await fetch('/api' + url, {
    headers: { 'Content-Type': 'application/json' },
    ...opcoes
  });
  const dados = await resposta.json();
  if (!resposta.ok) throw new Error(dados.erro || 'Erro na solicitação.');
  return dados;
};
const corpo = (id, html) => { $(id).innerHTML = html; };
const escapeHtml = (valor) => String(valor ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

$('formLogin').onsubmit = async (e) => {
  e.preventDefault();
  try {
    usuario = await api('/login', { method: 'POST', body: JSON.stringify({ email: $('email').value, senha: $('senha').value }) });
    $('login').hidden = true;
    $('sistema').hidden = false;
    $('usuario').textContent = 'Olá, ' + usuario.nome;
    await Promise.all([carregarTutores(), carregarAnimais(), carregarVeterinarios(), carregarConsultas(), carregarSelects()]);
  } catch (erro) { $('mensagem').textContent = erro.message; }
};
$('sair').onclick = () => location.reload();

document.querySelectorAll('nav button').forEach(botao => {
  botao.onclick = async () => {
    document.querySelectorAll('.tela').forEach(tela => tela.hidden = true);
    $(botao.dataset.tela).hidden = false;
    if (botao.dataset.tela === 'consultas') await carregarConsultas();
    if (botao.dataset.tela === 'prontuarios') await carregarSelects();
  };
});

async function carregarTutores() {
  const rows = await api('/tutores?busca=' + encodeURIComponent($('buscaTutor').value));
  corpo('listaTutores', rows.map(t => `<tr><td>${escapeHtml(t.nome)}</td><td>${escapeHtml(t.telefone)}</td><td>${escapeHtml(t.email)}</td><td><button onclick="editarTutor(${t.id})">Editar</button> <button class="perigo" onclick="excluirTutor(${t.id})">Excluir</button></td></tr>`).join(''));
}
$('buscaTutor').oninput = carregarTutores;
$('formTutor').onsubmit = async e => {
  e.preventDefault();
  try {
    await api('/tutores', { method: 'POST', body: JSON.stringify({ nome: $('tutorNome').value, telefone: $('tutorTelefone').value, email: $('tutorEmail').value }) });
    e.target.reset(); await carregarTutores(); await carregarSelects();
  } catch (erro) { alert(erro.message); }
};
window.editarTutor = async id => {
  const atual = (await api('/tutores')).find(x => x.id === id); if (!atual) return;
  const nome = prompt('Nome:', atual.nome); if (nome === null) return;
  const telefone = prompt('Telefone:', atual.telefone); if (telefone === null) return;
  const email = prompt('E-mail:', atual.email || ''); if (email === null) return;
  try { await api('/tutores/' + id, { method:'PUT', body:JSON.stringify({nome,telefone,email}) }); await carregarTutores(); await carregarSelects(); } catch(e) { alert(e.message); }
};
window.excluirTutor = async id => { if (confirm('Excluir este tutor?')) { try { await api('/tutores/' + id,{method:'DELETE'}); await carregarTutores(); } catch(e) { alert(e.message); } } };

async function carregarAnimais() {
  const rows = await api('/animais?busca=' + encodeURIComponent($('buscaAnimal').value));
  corpo('listaAnimais', rows.map(a => `<tr><td>${escapeHtml(a.nome)}</td><td>${escapeHtml(a.especie)}</td><td>${escapeHtml(a.raca)}</td><td>${a.idade ?? ''}</td><td>${escapeHtml(a.tutor)}</td><td><button onclick="editarAnimal(${a.id})">Editar</button> <button class="perigo" onclick="excluirAnimal(${a.id})">Excluir</button></td></tr>`).join(''));
}
$('buscaAnimal').oninput = carregarAnimais;
$('formAnimal').onsubmit = async e => {
  e.preventDefault();
  try {
    await api('/animais',{method:'POST',body:JSON.stringify({nome:$('animalNome').value,especie:$('animalEspecie').value,raca:$('animalRaca').value,idade:$('animalIdade').value,tutor_id:Number($('animalTutor').value)})});
    e.target.reset(); await carregarAnimais(); await carregarSelects();
  } catch(erro) { alert(erro.message); }
};
window.editarAnimal = async id => {
  const a = (await api('/animais')).find(x => x.id === id); if (!a) return;
  const nome = prompt('Nome do animal:',a.nome); if(nome===null)return;
  const especie = prompt('Espécie:',a.especie); if(especie===null)return;
  const raca = prompt('Raça:',a.raca||''); if(raca===null)return;
  const idade = prompt('Idade:',a.idade??''); if(idade===null)return;
  try { await api('/animais/'+id,{method:'PUT',body:JSON.stringify({nome,especie,raca,idade,tutor_id:a.tutor_id})}); await carregarAnimais(); } catch(e){alert(e.message);}
};
window.excluirAnimal = async id => { if(confirm('Excluir este animal?')) { try { await api('/animais/'+id,{method:'DELETE'}); await carregarAnimais(); } catch(e){alert(e.message);} } };

async function carregarVeterinarios() {
  const rows = await api('/veterinarios');
  corpo('listaVeterinarios',rows.map(v=>`<tr><td>${escapeHtml(v.nome)}</td><td>${escapeHtml(v.crmv)}</td><td>${escapeHtml(v.especialidade)}</td><td><button onclick="editarVet(${v.id})">Editar</button> <button class="perigo" onclick="excluirVet(${v.id})">Excluir</button></td></tr>`).join(''));
}
$('formVeterinario').onsubmit = async e => {
  e.preventDefault();
  try { await api('/veterinarios',{method:'POST',body:JSON.stringify({nome:$('vetNome').value,crmv:$('vetCrmv').value,especialidade:$('vetEspecialidade').value})}); e.target.reset(); await carregarVeterinarios(); await carregarSelects(); }
  catch(erro){alert(erro.message);}
};
window.editarVet = async id => {
  const v=(await api('/veterinarios')).find(x=>x.id===id); if(!v)return;
  const nome=prompt('Nome:',v.nome);if(nome===null)return;
  const crmv=prompt('CRMV:',v.crmv);if(crmv===null)return;
  const especialidade=prompt('Especialidade:',v.especialidade||'');if(especialidade===null)return;
  try{await api('/veterinarios/'+id,{method:'PUT',body:JSON.stringify({nome,crmv,especialidade})});await carregarVeterinarios();}catch(e){alert(e.message);}
};
window.excluirVet = async id => {if(confirm('Excluir este veterinário?')){try{await api('/veterinarios/'+id,{method:'DELETE'});await carregarVeterinarios();}catch(e){alert(e.message);}}};

async function carregarSelects() {
  const [tutores,animais,vets] = await Promise.all([api('/tutores'),api('/animais'),api('/veterinarios')]);
  $('animalTutor').innerHTML='<option value="">Selecione o tutor</option>'+tutores.map(t=>`<option value="${t.id}">${escapeHtml(t.nome)}</option>`).join('');
  const opAnimais='<option value="">Selecione o animal</option>'+animais.map(a=>`<option value="${a.id}">${escapeHtml(a.nome)} — ${escapeHtml(a.tutor)}</option>`).join('');
  const opVets='<option value="">Selecione o veterinário</option>'+vets.map(v=>`<option value="${v.id}">${escapeHtml(v.nome)}</option>`).join('');
  $('consultaAnimal').innerHTML=opAnimais; $('prontuarioAnimal').innerHTML=opAnimais;
  $('consultaVet').innerHTML=opVets; $('prontuarioVet').innerHTML=opVets;
}
async function carregarConsultas() {
  const rows=await api('/consultas');
  corpo('listaConsultas',rows.map(c=>`<tr><td>${escapeHtml(c.animal)}</td><td>${escapeHtml(c.tutor)}</td><td>${escapeHtml(c.veterinario)}</td><td>${escapeHtml(c.data_hora)}</td><td>${escapeHtml(c.motivo)}</td><td>${escapeHtml(c.status)}</td><td>${c.status==='Agendada'?`<button onclick="alterarStatus(${c.id},'Concluída')">Concluir</button> <button class="perigo" onclick="alterarStatus(${c.id},'Cancelada')">Cancelar</button>`:''}</td></tr>`).join(''));
}
$('formConsulta').onsubmit=async e=>{
  e.preventDefault();
  try{await api('/consultas',{method:'POST',body:JSON.stringify({animal_id:Number($('consultaAnimal').value),veterinario_id:Number($('consultaVet').value),data_hora:$('consultaData').value,motivo:$('consultaMotivo').value})});$('avisoConsulta').textContent='Consulta agendada com sucesso.';e.target.reset();await carregarConsultas();}
  catch(erro){$('avisoConsulta').textContent=erro.message;}
};
window.alterarStatus=async(id,status)=>{try{await api('/consultas/'+id+'/status',{method:'PUT',body:JSON.stringify({status})});await carregarConsultas();}catch(e){alert(e.message);}};

$('formProntuario').onsubmit=async e=>{
  e.preventDefault();
  try{await api('/prontuarios',{method:'POST',body:JSON.stringify({animal_id:Number($('prontuarioAnimal').value),veterinario_id:Number($('prontuarioVet').value),descricao:$('prontuarioDescricao').value,tratamento:$('prontuarioTratamento').value})});e.target.reset();await carregarHistoricoProntuario();}
  catch(erro){alert(erro.message);}
};
$('prontuarioAnimal').onchange=carregarHistoricoProntuario;
async function carregarHistoricoProntuario(){
  const id=$('prontuarioAnimal').value;
  if(!id){$('historicoProntuario').innerHTML='Selecione um animal para consultar o histórico.';return;}
  const rows=await api('/prontuarios/'+id);
  $('historicoProntuario').innerHTML=rows.map(p=>`<article class="card"><strong>${escapeHtml(p.data)}</strong> — Dr(a). ${escapeHtml(p.veterinario)}<p>${escapeHtml(p.descricao)}</p><p>${escapeHtml(p.tratamento)}</p></article>`).join('')||'Nenhum prontuário cadastrado para este animal.';
}
