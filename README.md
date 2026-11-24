# SAEP Prova — Sistema de Clínica Veterinária

Projeto-base adaptado para gerenciamento de uma clínica veterinária, utilizando **Node.js, Express e SQLite**.

## Como executar

```bash
git clone -b preparacao/saep-base https://github.com/carinasouza779/SAEP-PROVA.git
cd SAEP-PROVA
npm install
npm start
```

Acesse: http://localhost:3000

**Acesso de demonstração:** `admin@teste.com` / `123456`.

## Funcionalidades

- Login de demonstração.
- Cadastro, consulta, edição e exclusão de tutores.
- Cadastro, consulta, edição e exclusão de animais, vinculados a um tutor.
- Cadastro, consulta, edição e exclusão de veterinários.
- Agendamento de consultas.
- Verificação de conflito de horário para o mesmo veterinário.
- Alteração do status da consulta para Agendada, Concluída ou Cancelada.
- Registro e consulta de prontuários por animal.

## Estrutura principal

- `index.js`: inicia o Express e disponibiliza os arquivos públicos.
- `src/database/sqlite.js`: cria/conecta o banco e as tabelas.
- `src/routes/index.js`: rotas da API e operações CRUD.
- `public/index.html`: telas e formulários.
- `public/script.js`: integração do front-end com a API via fetch.
- `public/style.css`: estilos.
- `schema.sql`: estrutura relacional do banco.
- `clinica_veterinaria.db`: arquivo SQLite criado automaticamente ao iniciar.

## Rotas principais

| Método | Rota | Função |
|---|---|---|
| POST | /api/login | validar acesso de demonstração |
| GET/POST | /api/tutores | listar e cadastrar tutores |
| PUT/DELETE | /api/tutores/:id | editar e excluir tutor |
| GET/POST | /api/animais | listar e cadastrar animais |
| PUT/DELETE | /api/animais/:id | editar e excluir animal |
| GET/POST | /api/veterinarios | listar e cadastrar veterinários |
| PUT/DELETE | /api/veterinarios/:id | editar e excluir veterinário |
| GET/POST | /api/consultas | listar e agendar consultas |
| PUT | /api/consultas/:id/status | concluir ou cancelar consulta |
| GET | /api/prontuarios/:animal_id | consultar histórico do animal |
| POST | /api/prontuarios | registrar atendimento |

## Banco de dados e relacionamentos

As tabelas são `usuarios`, `tutores`, `animais`, `veterinarios`, `consultas` e `prontuarios`. Um tutor pode possuir vários animais; um animal pode ter várias consultas e prontuários; um veterinário pode atender várias consultas e registrar vários prontuários.

Consulte `docs/CLINICA-VETERINARIA.md` para requisitos, regras de negócio e DER.

## Observações para a prova

- Leia o enunciado e ajuste campos, nomes e regras conforme o que for solicitado.
- Teste cada rota e cada operação antes de mexer na aparência.
- O login é simplificado para demonstração e estudo; não é um modelo de autenticação seguro para produção.
- Faça o clone e instale as dependências antes da prova caso não haja Wi-Fi disponível.
- Guia geral: `GUIA-ADAPTACAO-PROJETO-PROVA.md`.
