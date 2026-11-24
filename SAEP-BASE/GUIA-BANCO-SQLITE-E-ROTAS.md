# Guia básico — Banco de dados, CRUD e rotas (SAEP)

Este guia reúne os passos essenciais para começar um sistema. Use o enunciado da prova como referência e adapte os nomes e as funcionalidades ao tema solicitado.

## 1. Criar e configurar um banco de dados

- Identifique quais informações o sistema precisa guardar.
- Crie uma tabela para cada grupo de informações (por exemplo: usuarios, produtos e movimentacoes).
- Defina um campo `id` como chave primária.
- Use chaves estrangeiras quando uma tabela depender de outra.
- Configure a conexão com o banco no Node.js.

Exemplo básico de tabela SQLite:

```sql
CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    quantidade INTEGER NOT NULL
);
```

## 2. Fazer cadastro, consulta, edição e exclusão (CRUD)

CRUD representa as quatro operações principais de um sistema:

| Operação | SQL | Para que serve |
|---|---|---|
| Cadastrar | INSERT | Adicionar um registro |
| Consultar | SELECT | Listar ou buscar registros |
| Editar | UPDATE | Alterar um registro |
| Excluir | DELETE | Remover um registro |

Exemplo:

```sql
INSERT INTO produtos (nome, quantidade) VALUES ('Caderno', 10);
SELECT * FROM produtos;
UPDATE produtos SET quantidade = 15 WHERE id = 1;
DELETE FROM produtos WHERE id = 1;
```



### Como visualizar e editar dados pelo SQLite Editor no VS Code

Na extensão SQLite Editor, abra o arquivo do banco (por exemplo, `almoxarifado.db`) e selecione a tabela que deseja consultar, como `movimentacoes`.

- A grade à esquerda mostra os registros que já estão salvos na tabela.
- Na área de consulta SQL, escreva um comando, como `SELECT * FROM movimentacoes;`, e clique no botão de executar (ícone de ▶) para atualizar a consulta e visualizar os registros.
- O formulário inferior com o comando `INSERT INTO` serve para adicionar um novo registro. Preencha os campos e execute a inserção.
- Para editar um registro que já existe, use `UPDATE` e identifique qual registro será alterado com `WHERE`. Exemplo:

```sql
UPDATE movimentacoes
SET quantidade = 5
WHERE id = 1;
```

- Para conferir a alteração, execute novamente:

```sql
SELECT * FROM movimentacoes;
```

**Atenção:** sempre confira o campo usado no `WHERE` antes de executar um `UPDATE` ou `DELETE`. Sem essa condição, você pode alterar ou excluir vários registros da tabela. Os nomes `movimentacoes`, `quantidade` e `id` são apenas exemplos: use os nomes que existem no seu banco.

## 3. Criar e modificar rotas no Node.js

As rotas recebem as solicitações do front-end e executam ações no servidor.

| Método | Exemplo de rota | Função |
|---|---|---|
| GET | /api/produtos | Consultar produtos |
| POST | /api/produtos | Cadastrar produto |
| PUT | /api/produtos/:id | Editar produto |
| DELETE | /api/produtos/:id | Excluir produto |

### O que significa cada parte?

- `express.Router()`: cria um conjunto de rotas.
- `req`: contém os dados recebidos na solicitação.
- `res`: é usado para enviar uma resposta ao front-end.
- `req.body`: recebe os dados enviados no corpo da solicitação, normalmente em POST e PUT.
- `req.params.id`: recebe o valor do `:id` que aparece no endereço da rota.
- `db.prepare()`: prepara um comando SQL.
- `.all()`: retorna vários registros.
- `.get()`: retorna um único registro.
- `.run()`: executa comandos que inserem, alteram ou excluem dados.
- `res.json()`: envia uma resposta em formato JSON.
- `module.exports`: permite utilizar as rotas em outro arquivo.

### Exemplo completo de rotas comentadas

O exemplo usa Express e better-sqlite3. Considere que a tabela `produtos` já foi criada e que o arquivo de conexão exporta o banco como `db`.

```javascript
const express = require("express"); // Importa o Express
const router = express.Router(); // Cria um grupo de rotas
const db = require("../database/conexao"); // Importa a conexão com o banco

// GET: lista todos os produtos
router.get("/", (req, res) => {
    const produtos = db.prepare(
        "SELECT * FROM produtos"
    ).all(); // .all() busca todos os registros

    res.json(produtos); // Envia a lista para o front-end
});

// POST: cadastra um produto
router.post("/", (req, res) => {
    const { nome, quantidade } = req.body; // Pega os dados enviados pelo front-end

    if (!nome || quantidade === undefined) {
        return res.status(400).json({ erro: "Preencha nome e quantidade." });
    } // Verifica se os campos foram enviados

    const resultado = db.prepare(
        "INSERT INTO produtos (nome, quantidade) VALUES (?, ?)"
    ).run(nome, quantidade); // ? recebe os valores com segurança

    res.status(201).json({
        id: resultado.lastInsertRowid,
        mensagem: "Produto cadastrado!"
    }); // Retorna confirmação e o ID criado
});

// PUT: edita um produto pelo ID
router.put("/:id", (req, res) => {
    const { id } = req.params; // Pega o ID que veio no endereço
    const { nome, quantidade } = req.body; // Pega os novos dados

    const resultado = db.prepare(
        "UPDATE produtos SET nome = ?, quantidade = ? WHERE id = ?"
    ).run(nome, quantidade, id); // Atualiza o produto correspondente ao ID

    if (resultado.changes === 0) {
        return res.status(404).json({ erro: "Produto não encontrado." });
    } // Avisa se nenhum registro foi alterado

    res.json({ mensagem: "Produto atualizado!" }); // Confirma a edição
});

// DELETE: exclui um produto pelo ID
router.delete("/:id", (req, res) => {
    const { id } = req.params; // Pega o ID que veio no endereço

    const resultado = db.prepare(
        "DELETE FROM produtos WHERE id = ?"
    ).run(id); // Exclui o registro com esse ID

    if (resultado.changes === 0) {
        return res.status(404).json({ erro: "Produto não encontrado." });
    } // Avisa se o ID não existe

    res.json({ mensagem: "Produto excluído!" }); // Confirma a exclusão
});

module.exports = router; // Exporta as rotas para o servidor principal
```

### Como ligar as rotas ao servidor?

No arquivo principal do projeto, como `server.js` ou `index.js`:

```javascript
app.use(express.json()); // Permite receber dados em JSON
app.use("/api/produtos", require("./src/routes/produtos")); // Registra as rotas
```

O caminho do `require` deve corresponder à localização real do arquivo de rotas no projeto. Se a estrutura for diferente, ajuste esse caminho.

**Atenção:** este exemplo é uma base didática. Adapte os nomes das tabelas, campos, arquivos e validações ao projeto e ao enunciado. Em projetos que já possuem rotas, confira o padrão existente antes de substituir qualquer código.

## 4. Conectar o JavaScript do front-end com a API

Use `fetch()` para enviar solicitações para as rotas e receber os dados.

Exemplo de consulta:

```javascript
const resposta = await fetch("/api/produtos"); // Chama a rota GET
const produtos = await resposta.json(); // Converte a resposta para JavaScript
```

Exemplo de cadastro:

```javascript
const resposta = await fetch("/api/produtos", {
    method: "POST", // Informa que deseja cadastrar
    headers: { "Content-Type": "application/json" }, // Informa que enviará JSON
    body: JSON.stringify({ nome: "Caderno", quantidade: 10 }) // Envia os dados
});

const resultado = await resposta.json(); // Lê a resposta do servidor
```

Para editar ou excluir, use `PUT` ou `DELETE` e inclua o ID no endereço, por exemplo `/api/produtos/1`.

## 5. Adaptar nomes de tabelas, campos e telas ao tema sorteado

Leia o enunciado e troque os exemplos pelos nomes do tema da prova.

Exemplo:
- Estoque: produtos, fornecedores e movimentacoes.
- Biblioteca: livros, usuarios e emprestimos.
- Oficina: veiculos, clientes e ordens_servico.

Lembre-se de adaptar os nomes em todos os lugares relacionados: banco de dados, rotas, JavaScript e telas.

## 6. Testar se tudo funciona e corrigir erros

- Inicie o servidor e abra o sistema no navegador.
- Teste cadastro, consulta, edição e exclusão.
- Confira se os dados aparecem corretamente na tela e permanecem salvos no banco.
- Teste também campos vazios e informações inválidas.
- Se algo não funcionar, confira o terminal, o console do navegador, o caminho da rota e os nomes dos campos.

## Resumo para a prova

**Banco de dados → CRUD → rotas Node.js → integração com o front-end → adaptação ao tema → testes.**

Siga sempre os requisitos do enunciado e preserve as funcionalidades que já estiverem funcionando.
