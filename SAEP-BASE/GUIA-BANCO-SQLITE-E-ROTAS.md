# Guia de banco de dados SQLite e adaptação de rotas (SAEP)

Este guia é um roteiro de estudo para adaptar a base a um novo enunciado. Leia o enunciado e as regras da avaliação antes de reutilizar qualquer material. Preserve os arquivos existentes e faça alterações em uma branch de trabalho.

## Parte A — Banco de dados SQLite

### 1. Antes de criar o banco, leia o enunciado

Anote o nome exato do banco solicitado, as informações que precisam ser armazenadas, os cadastros, as operações, os campos obrigatórios, as regras de validação, os relacionamentos e a quantidade de registros de exemplo exigida em cada tabela. Não invente tabelas ou regras que não foram pedidas.

### 2. Identifique entidades, campos e chaves

Exemplo ilustrativo para veterinária, caso o enunciado peça esse escopo:

| Entidade | Campos possíveis | Relacionamento |
|---|---|---|
| tutores | id, nome, telefone | PK id |
| animais | id, tutor_id, nome, especie | PK id; FK tutor_id |
| veterinarios | id, nome, crmv | PK id |
| consultas | id, animal_id, veterinario_id, data_hora, status | FKs para animais e veterinarios |

Cada tabela representa uma entidade ou associação. Defina PK, FK, cardinalidades e tipos coerentes. Relações muitos-para-muitos normalmente precisam de uma tabela associativa. Use NOT NULL, UNIQUE, CHECK e valores padrão quando fizer sentido e estiver de acordo com o enunciado.

### 3. Nomeie e crie o banco

Se o enunciado especificar o nome, use-o exatamente. Se não especificar, escolha um nome claro, por exemplo clinica_veterinaria.db. Mantenha o arquivo em uma única pasta definida, como database/ ou src/database/.

### 4. Exemplo de script SQL

    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS tutores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        telefone TEXT
    );

    CREATE TABLE IF NOT EXISTS animais (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tutor_id INTEGER NOT NULL,
        nome TEXT NOT NULL,
        especie TEXT NOT NULL,
        FOREIGN KEY (tutor_id) REFERENCES tutores(id)
    );

    CREATE TABLE IF NOT EXISTS veterinarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        crmv TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS consultas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        animal_id INTEGER NOT NULL,
        veterinario_id INTEGER NOT NULL,
        data_hora TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'Agendada',
        FOREIGN KEY (animal_id) REFERENCES animais(id),
        FOREIGN KEY (veterinario_id) REFERENCES veterinarios(id)
    );

Este é apenas um exemplo. Adapte tabelas, colunas, restrições e relacionamentos ao problema real.

### 5. Conecte o SQLite no Node.js

Exemplo com better-sqlite3:

    const Database = require("better-sqlite3");
    const path = require("path");

    const caminhoBanco = path.join(__dirname, "clinica_veterinaria.db");
    const db = new Database(caminhoBanco);

    db.pragma("foreign_keys = ON");

    module.exports = db;

Instale a dependência somente se o projeto ainda não tiver um driver SQLite:

    npm install better-sqlite3

Se o repositório já usa outro driver, mantenha o padrão existente em vez de instalar um segundo.

### 6. Insira e confira os dados

Insira a quantidade de registros solicitada em cada tabela. Confira com SELECT * FROM nome_da_tabela. Use PRAGMA foreign_key_check; para verificar integridade e PRAGMA table_info(nome_da_tabela); para conferir colunas.

Cuidados:
- Habilite chaves estrangeiras em cada conexão SQLite.
- Use consultas parametrizadas; nunca concatene diretamente dados digitados pelo usuário no SQL.
- Não armazene senhas em texto puro; use hash.
- Antes de alterar uma tabela existente, faça cópia de segurança e planeje a migração.
- Teste duplicidade, dados inválidos e exclusão de registros relacionados.

### Checklist do banco

- [ ] Nome conforme o enunciado.
- [ ] Entidades e atributos identificados.
- [ ] DER corresponde ao SQL.
- [ ] PK e FK configuradas.
- [ ] Tipos e restrições corretos.
- [ ] Quantidade de registros exigida em cada tabela.
- [ ] Integridade referencial conferida.
- [ ] Dados continuam após reiniciar o servidor.

## Parte B — Como analisar e adaptar rotas (API)

### 1. Entenda o caminho completo

Uma ação percorre normalmente:

    HTML/JavaScript → rota Express → controller/regra → SQLite → resposta JSON → atualização da tela

Antes de alterar uma rota, localize todos esses pontos. Mudar apenas o fetch no frontend não adianta se o backend continuar esperando o caminho antigo.

### 2. Faça um inventário das rotas

No VS Code, use Ctrl+Shift+F e procure por:
- app.get( ou router.get(
- app.post( ou router.post(
- app.put( ou router.put(
- app.delete( ou router.delete(
- app.use(
- fetch( no JavaScript do frontend.

Registre método, caminho, finalidade, autenticação e tabela acessada.

| Método | Rota | Finalidade |
|---|---|---|
| GET | /api/animais | Listar animais |
| GET | /api/animais/:id | Consultar um animal |
| POST | /api/animais | Cadastrar animal |
| PUT | /api/animais/:id | Atualizar animal |
| DELETE | /api/animais/:id | Excluir animal |

### 3. Entenda os métodos HTTP

- GET: consultar dados; não deve alterar registros.
- POST: criar registro ou executar operação.
- PUT: atualizar um registro.
- PATCH: atualizar parcialmente, se o projeto adotar esse padrão.
- DELETE: excluir ou inativar conforme a regra.

Use respostas HTTP coerentes: 200 sucesso, 201 criação, 400 dados inválidos, 401 não autenticado, 403 sem permissão, 404 não encontrado e 500 erro inesperado. Não exponha detalhes internos ao usuário.

### 4. Exemplo de rotas Express

Exemplo didático com better-sqlite3. Ajuste os caminhos dos imports à estrutura real:

    const express = require("express");
    const router = express.Router();
    const db = require("../database/conexao");

    // Listar animais
    router.get("/", (req, res) => {
        try {
            const animais = db.prepare(
                "SELECT id, nome, especie, tutor_id FROM animais ORDER BY id DESC"
            ).all();

            res.json(animais);
        } catch (erro) {
            console.error(erro);
            res.status(500).json({ erro: "Não foi possível listar animais." });
        }
    });

    // Cadastrar animal
    router.post("/", (req, res) => {
        const { nome, especie, tutor_id } = req.body;

        if (!nome || !especie || !tutor_id) {
            return res.status(400).json({
                erro: "Nome, espécie e tutor são obrigatórios."
            });
        }

        try {
            const resultado = db.prepare(
                "INSERT INTO animais (nome, especie, tutor_id) VALUES (?, ?, ?)"
            ).run(nome, especie, tutor_id);

            res.status(201).json({
                id: resultado.lastInsertRowid,
                mensagem: "Animal cadastrado com sucesso."
            });
        } catch (erro) {
            console.error(erro);
            res.status(400).json({ erro: "Não foi possível cadastrar o animal." });
        }
    });

    module.exports = router;

O exemplo presume um objeto de banco compatível com better-sqlite3. Se o projeto usa outro driver, adapte a sintaxe.

### 5. Registre a rota no servidor

No arquivo principal, como index.js ou server.js, confira se o middleware JSON vem antes das rotas:

    app.use(express.json());
    app.use("/api/animais", require("./src/routes/animais"));

Ajuste o caminho do require à estrutura real. Evite registrar o mesmo endpoint duas vezes.

### 6. Atualize o frontend

Se o backend usa /api/animais, o frontend precisa chamar o mesmo caminho:

    const resposta = await fetch("/api/animais");
    const animais = await resposta.json();

Para cadastrar:

    const resposta = await fetch("/api/animais", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nome: "Mel",
            especie: "Cachorro",
            tutor_id: 1
        })
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
        throw new Error(resultado.erro || "Falha ao cadastrar");
    }

Se frontend e API estiverem em origens diferentes, configure URL base e CORS conforme o ambiente. Evite espalhar endereços fixos por vários arquivos.

### 7. Equivalência de rotas entre temas

A tabela mostra equivalências conceituais, não substituições automáticas:

| Almoxarifado | Veterinária | Oficina |
|---|---|---|
| /api/produtos | /api/animais | /api/veiculos |
| /api/movimentacoes | /api/consultas | /api/ordens-servico |
| produto_id | animal_id | veiculo_id |
| quantidade | data_hora/status | descricao/status |

Ao mudar o tema, atualize em conjunto: caminho da rota, controller, validações, SQL, frontend, autenticação, testes e documentação.

## Parte C — Roteiro de engenharia reversa

Quando receber um sistema existente ou pouco documentado:

1. Execute o projeto e registre o comportamento observado.
2. Leia package.json e identifique dependências e scripts.
3. Localize o arquivo de inicialização do servidor.
4. Mapeie rotas e middlewares.
5. Localize consultas SQL e tabelas usadas por cada rota.
6. Relacione telas, chamadas fetch, endpoints, controllers e tabelas.
7. Identifique autenticação, sessão, permissões e validações.
8. Compare o comportamento observado com o enunciado.
9. Faça alterações pequenas e rastreáveis.
10. Execute testes de regressão para garantir que as funções existentes continuam funcionando.

Mapa para preencher:

| Tela/ação | Arquivo frontend | Método e rota | Controller/regra | Tabela(s) |
|---|---|---|---|---|
| Listar animais | [arquivo.js] | GET /api/animais | [arquivo/função] | animais |
| [preencher] | [preencher] | [preencher] | [preencher] | [preencher] |

### Checklist de rotas e integração

- [ ] Rotas necessárias inventariadas.
- [ ] Método HTTP e caminho correspondem ao frontend.
- [ ] express.json() vem antes das rotas.
- [ ] Rota consulta ou altera a tabela correta.
- [ ] Dados validados no servidor.
- [ ] Consultas SQL parametrizadas.
- [ ] Autenticação e autorização aplicadas quando necessárias.
- [ ] Respostas e códigos HTTP coerentes.
- [ ] Testes positivos e negativos executados.
- [ ] Funcionalidades antigas continuam funcionando.

## Fluxo resumido

Enunciado → requisitos → entidades/DER → SQLite/SQL → rotas/API → frontend → testes → documentação.

Preserve os arquivos originais em uma branch separada e siga as regras da avaliação sobre materiais previamente preparados.
