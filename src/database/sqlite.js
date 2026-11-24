// Banco de dados da Clínica Veterinária (SQLite).
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, '../../clinica_veterinaria.db'));

db.serialize(() => {
  db.run('PRAGMA foreign_keys = ON');

  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS tutores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    telefone TEXT NOT NULL,
    email TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS animais (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    especie TEXT NOT NULL,
    raca TEXT,
    idade INTEGER,
    tutor_id INTEGER NOT NULL,
    FOREIGN KEY (tutor_id) REFERENCES tutores(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS veterinarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    crmv TEXT UNIQUE NOT NULL,
    especialidade TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS consultas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    animal_id INTEGER NOT NULL,
    veterinario_id INTEGER NOT NULL,
    data_hora TEXT NOT NULL,
    motivo TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Agendada',
    FOREIGN KEY (animal_id) REFERENCES animais(id),
    FOREIGN KEY (veterinario_id) REFERENCES veterinarios(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS prontuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    animal_id INTEGER NOT NULL,
    veterinario_id INTEGER NOT NULL,
    data TEXT NOT NULL DEFAULT (datetime('now','localtime')),
    descricao TEXT NOT NULL,
    tratamento TEXT,
    FOREIGN KEY (animal_id) REFERENCES animais(id),
    FOREIGN KEY (veterinario_id) REFERENCES veterinarios(id)
  )`);

  db.run("INSERT OR IGNORE INTO usuarios (nome,email,senha) VALUES ('Administrador','admin@teste.com','123456')");
  // Profissional demonstrativo para testar o agendamento. Substitua pelos dados e CRMV reais da clínica.
  db.run("INSERT OR IGNORE INTO veterinarios (nome,crmv,especialidade) VALUES ('Profissional demonstrativo - substituir','PENDENTE-CADASTRO','Clínica geral')");
});

module.exports = db;
