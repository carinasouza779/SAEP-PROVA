-- Modelo relacional da Clínica Veterinária
CREATE TABLE usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL
);
CREATE TABLE tutores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  email TEXT
);
CREATE TABLE animais (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  especie TEXT NOT NULL,
  raca TEXT,
  idade INTEGER,
  tutor_id INTEGER NOT NULL,
  FOREIGN KEY (tutor_id) REFERENCES tutores(id)
);
CREATE TABLE veterinarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  crmv TEXT UNIQUE NOT NULL,
  especialidade TEXT
);
CREATE TABLE consultas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  animal_id INTEGER NOT NULL,
  veterinario_id INTEGER NOT NULL,
  data_hora TEXT NOT NULL,
  motivo TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Agendada',
  FOREIGN KEY (animal_id) REFERENCES animais(id),
  FOREIGN KEY (veterinario_id) REFERENCES veterinarios(id)
);
CREATE TABLE prontuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  animal_id INTEGER NOT NULL,
  veterinario_id INTEGER NOT NULL,
  data TEXT NOT NULL DEFAULT (datetime('now','localtime')),
  descricao TEXT NOT NULL,
  tratamento TEXT,
  FOREIGN KEY (animal_id) REFERENCES animais(id),
  FOREIGN KEY (veterinario_id) REFERENCES veterinarios(id)
);
