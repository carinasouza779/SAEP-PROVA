// Rotas da API da Clínica Veterinária.
const express = require('express');
const db = require('../database/sqlite');
const router = express.Router();

// Login simples para o ambiente de demonstração da prova.
router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).json({ erro: 'Informe e-mail e senha.' });
  db.get('SELECT id,nome,email FROM usuarios WHERE email=? AND senha=?', [email, senha], (err, user) => {
    if (err) return res.status(500).json({ erro: err.message });
    if (!user) return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
    res.json(user);
  });
});

// TUTORES: listar, cadastrar, editar e excluir.
router.get('/tutores', (req, res) => {
  db.all('SELECT * FROM tutores WHERE nome LIKE ? ORDER BY nome', [`%${req.query.busca || ''}%`], (e, rows) => {
    if (e) return res.status(500).json({ erro: e.message });
    res.json(rows);
  });
});
router.post('/tutores', (req, res) => {
  const { nome, telefone, email } = req.body;
  if (!nome || !telefone) return res.status(400).json({ erro: 'Nome e telefone do tutor são obrigatórios.' });
  db.run('INSERT INTO tutores(nome,telefone,email) VALUES(?,?,?)', [nome, telefone, email || ''], function(e) {
    if (e) return res.status(400).json({ erro: e.message });
    res.status(201).json({ mensagem: 'Tutor cadastrado.', id: this.lastID });
  });
});
router.put('/tutores/:id', (req, res) => {
  const { nome, telefone, email } = req.body;
  if (!nome || !telefone) return res.status(400).json({ erro: 'Nome e telefone são obrigatórios.' });
  db.run('UPDATE tutores SET nome=?,telefone=?,email=? WHERE id=?', [nome, telefone, email || '', req.params.id], function(e) {
    if (e) return res.status(400).json({ erro: e.message });
    if (!this.changes) return res.status(404).json({ erro: 'Tutor não encontrado.' });
    res.json({ mensagem: 'Tutor atualizado.' });
  });
});
router.delete('/tutores/:id', (req, res) => {
  db.run('DELETE FROM tutores WHERE id=?', [req.params.id], function(e) {
    if (e) return res.status(409).json({ erro: 'Não é possível excluir: existem animais vinculados a este tutor.' });
    if (!this.changes) return res.status(404).json({ erro: 'Tutor não encontrado.' });
    res.json({ mensagem: 'Tutor excluído.' });
  });
});

// ANIMAIS: a consulta já retorna o nome do tutor.
router.get('/animais', (req, res) => {
  db.all(`SELECT a.*, t.nome AS tutor FROM animais a JOIN tutores t ON t.id=a.tutor_id
    WHERE a.nome LIKE ? OR a.especie LIKE ? ORDER BY a.nome`,
    [`%${req.query.busca || ''}%`, `%${req.query.busca || ''}%`], (e, rows) => {
      if (e) return res.status(500).json({ erro: e.message });
      res.json(rows);
    });
});
router.post('/animais', (req, res) => {
  const { nome, especie, raca, idade, tutor_id } = req.body;
  if (!nome || !especie || !tutor_id || (idade !== '' && idade != null && Number(idade) < 0))
    return res.status(400).json({ erro: 'Informe nome, espécie e tutor. A idade não pode ser negativa.' });
  db.run('INSERT INTO animais(nome,especie,raca,idade,tutor_id) VALUES(?,?,?,?,?)',
    [nome, especie, raca || '', idade === '' ? null : idade, tutor_id], function(e) {
      if (e) return res.status(400).json({ erro: e.message });
      res.status(201).json({ mensagem: 'Animal cadastrado.', id: this.lastID });
    });
});
router.put('/animais/:id', (req, res) => {
  const { nome, especie, raca, idade, tutor_id } = req.body;
  if (!nome || !especie || !tutor_id) return res.status(400).json({ erro: 'Nome, espécie e tutor são obrigatórios.' });
  db.run('UPDATE animais SET nome=?,especie=?,raca=?,idade=?,tutor_id=? WHERE id=?',
    [nome, especie, raca || '', idade === '' ? null : idade, tutor_id, req.params.id], function(e) {
      if (e) return res.status(400).json({ erro: e.message });
      if (!this.changes) return res.status(404).json({ erro: 'Animal não encontrado.' });
      res.json({ mensagem: 'Animal atualizado.' });
    });
});
router.delete('/animais/:id', (req, res) => {
  db.run('DELETE FROM animais WHERE id=?', [req.params.id], function(e) {
    if (e) return res.status(409).json({ erro: 'Não é possível excluir: existem consultas ou prontuários vinculados.' });
    if (!this.changes) return res.status(404).json({ erro: 'Animal não encontrado.' });
    res.json({ mensagem: 'Animal excluído.' });
  });
});

// VETERINÁRIOS: cadastro e consulta.
router.get('/veterinarios', (req, res) => {
  db.all('SELECT * FROM veterinarios ORDER BY nome', (e, rows) => {
    if (e) return res.status(500).json({ erro: e.message });
    res.json(rows);
  });
});
router.post('/veterinarios', (req, res) => {
  const { nome, crmv, especialidade } = req.body;
  if (!nome || !crmv) return res.status(400).json({ erro: 'Nome e CRMV são obrigatórios.' });
  db.run('INSERT INTO veterinarios(nome,crmv,especialidade) VALUES(?,?,?)', [nome, crmv, especialidade || ''], function(e) {
    if (e) return res.status(400).json({ erro: e.message.includes('UNIQUE') ? 'CRMV já cadastrado.' : e.message });
    res.status(201).json({ mensagem: 'Veterinário cadastrado.', id: this.lastID });
  });
});
router.put('/veterinarios/:id', (req, res) => {
  const { nome, crmv, especialidade } = req.body;
  if (!nome || !crmv) return res.status(400).json({ erro: 'Nome e CRMV são obrigatórios.' });
  db.run('UPDATE veterinarios SET nome=?,crmv=?,especialidade=? WHERE id=?', [nome, crmv, especialidade || '', req.params.id], function(e) {
    if (e) return res.status(400).json({ erro: e.message });
    if (!this.changes) return res.status(404).json({ erro: 'Veterinário não encontrado.' });
    res.json({ mensagem: 'Veterinário atualizado.' });
  });
});
router.delete('/veterinarios/:id', (req, res) => {
  db.run('DELETE FROM veterinarios WHERE id=?', [req.params.id], function(e) {
    if (e) return res.status(409).json({ erro: 'Não é possível excluir: existem consultas ou prontuários vinculados.' });
    if (!this.changes) return res.status(404).json({ erro: 'Veterinário não encontrado.' });
    res.json({ mensagem: 'Veterinário excluído.' });
  });
});

// CONSULTAS: impede conflito de horário para o mesmo veterinário.
router.get('/consultas', (req, res) => {
  db.all(`SELECT c.*, a.nome AS animal, v.nome AS veterinario, t.nome AS tutor
    FROM consultas c JOIN animais a ON a.id=c.animal_id
    JOIN veterinarios v ON v.id=c.veterinario_id
    JOIN tutores t ON t.id=a.tutor_id ORDER BY c.data_hora DESC`, (e, rows) => {
      if (e) return res.status(500).json({ erro: e.message });
      res.json(rows);
    });
});
router.post('/consultas', (req, res) => {
  const { animal_id, veterinario_id, data_hora, motivo } = req.body;
  if (!animal_id || !veterinario_id || !data_hora || !motivo)
    return res.status(400).json({ erro: 'Animal, veterinário, data e motivo são obrigatórios.' });
  db.get("SELECT id FROM consultas WHERE veterinario_id=? AND data_hora=? AND status='Agendada'",
    [veterinario_id, data_hora], (e, conflito) => {
      if (e) return res.status(500).json({ erro: e.message });
      if (conflito) return res.status(409).json({ erro: 'Este veterinário já possui consulta agendada nesse horário.' });
      db.run('INSERT INTO consultas(animal_id,veterinario_id,data_hora,motivo) VALUES(?,?,?,?)',
        [animal_id, veterinario_id, data_hora, motivo], function(err) {
          if (err) return res.status(400).json({ erro: err.message });
          res.status(201).json({ mensagem: 'Consulta agendada.', id: this.lastID });
        });
    });
});
router.put('/consultas/:id/status', (req, res) => {
  const { status } = req.body;
  if (!['Agendada', 'Concluída', 'Cancelada'].includes(status))
    return res.status(400).json({ erro: 'Status inválido.' });
  db.run('UPDATE consultas SET status=? WHERE id=?', [status, req.params.id], function(e) {
    if (e) return res.status(400).json({ erro: e.message });
    if (!this.changes) return res.status(404).json({ erro: 'Consulta não encontrada.' });
    res.json({ mensagem: 'Status da consulta atualizado.' });
  });
});

// PRONTUÁRIOS: histórico clínico do animal.
router.get('/prontuarios/:animal_id', (req, res) => {
  db.all(`SELECT p.*, v.nome AS veterinario FROM prontuarios p
    JOIN veterinarios v ON v.id=p.veterinario_id
    WHERE p.animal_id=? ORDER BY p.data DESC`, [req.params.animal_id], (e, rows) => {
      if (e) return res.status(500).json({ erro: e.message });
      res.json(rows);
    });
});
router.post('/prontuarios', (req, res) => {
  const { animal_id, veterinario_id, descricao, tratamento } = req.body;
  if (!animal_id || !veterinario_id || !descricao)
    return res.status(400).json({ erro: 'Animal, veterinário e descrição são obrigatórios.' });
  db.run('INSERT INTO prontuarios(animal_id,veterinario_id,descricao,tratamento) VALUES(?,?,?,?)',
    [animal_id, veterinario_id, descricao, tratamento || ''], function(e) {
      if (e) return res.status(400).json({ erro: e.message });
      res.status(201).json({ mensagem: 'Prontuário registrado.', id: this.lastID });
    });
});

module.exports = router;
