# Guia de adaptação de projeto para a prova SAEP

Este guia mostra como partir de uma estrutura pronta e adaptá-la ao sistema pedido no enunciado. A prioridade é manter o sistema **funcionando**: banco conectado, rotas respondendo e telas realizando as operações. Não perca tempo mudando cores ou efeitos antes de concluir as funções.

> Use este material como roteiro. Os nomes de tabelas, campos e rotas abaixo são exemplos; substitua-os pelos nomes exigidos no enunciado.

## 1. Clonar o repositório e abrir o projeto

No terminal, entre na pasta em que deseja salvar o projeto e execute:

```bash
git clone https://github.com/carinasouza779/SAEP-PROVA.git
cd SAEP-PROVA
git checkout preparacao/saep-base
```

Se a prova fornecer outro repositório-base, troque a URL do `git clone` pela URL fornecida. Para conferir a branch atual:

```bash
git branch
```

Abra a pasta no VS Code:

```bash
code .
```

## 2. Instalar dependências e iniciar

Confira se o Node.js e o npm estão instalados:

```bash
node -v
npm -v
```

Instale as dependências do projeto:

```bash
npm install
```

Inicie usando o script existente no `package.json` (normalmente):

```bash
npm start
```

Se o projeto usar outro script, confira a seção `scripts` do `package.json` e execute o comando correspondente, por exemplo `npm run dev`.

**Sem internet durante a prova:** faça antes o clone e a instalação das dependências no computador que será utilizado. O `git clone` e o `npm install` normalmente precisam de rede; depois de tudo baixado, o projeto pode ser executado localmente, desde que as dependências já estejam disponíveis.

## 3. Ler o enunciado antes de alterar o código

Faça uma lista curta com:

- Quais dados precisam ser cadastrados?
- Quais campos cada cadastro possui?
- Quais informações podem ser consultadas, editadas e excluídas?
- Existem relacionamentos entre cadastros?
- Quais telas e operações a prova exige?
- Há regras de validação (campo obrigatório, valor positivo, registro duplicado etc.)?

Monte uma tabela de correspondência entre o enunciado e o projeto-base:

| No enunciado | No projeto-base | O que adaptar |
|---|---|---|
| Entidade solicitada | Tabela existente | Nome e campos |
| Campo solicitado | Coluna existente | Nome, tipo e validação |
| Operação solicitada | Rota existente | Método, URL e SQL |
| Tela solicitada | Página existente | Formulário e listagem |

Antes de renomear arquivos ou pastas, procure onde cada nome é utilizado. Altere em conjunto o banco, a API e o front-end para evitar divergências.

## 4. Planejar e criar o banco SQLite

1. Identifique as entidades do enunciado.
2. Transforme cada entidade em uma tabela.
3. Defina uma chave primária (`id`) para identificar cada registro.
4. Use chave estrangeira quando uma tabela depender de outra.
5. Defina tipos e restrições: `INTEGER`, `TEXT`, `REAL`, `NOT NULL`, `UNIQUE`.
6. Crie as tabelas antes de implementar as rotas que as utilizam.

Exemplo genérico:

```sql
CREATE TABLE IF NOT EXISTS categorias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS produtos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  quantidade INTEGER NOT NULL DEFAULT 0,
  preco REAL NOT NULL DEFAULT 0,
  categoria_id INTEGER,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);
```

Adapte o exemplo às entidades reais. Não crie tabelas desnecessárias e não mantenha campos que não fazem parte do enunciado.

### Comandos SQL essenciais

```sql
-- Inserir
INSERT INTO produtos (nome, quantidade, preco)
VALUES ('Caderno', 10, 15.50);

-- Consultar todos
SELECT * FROM produtos;

-- Consultar um registro
SELECT * FROM produtos WHERE id = 1;

-- Atualizar
UPDATE produtos
SET nome = 'Caderno universitário', quantidade = 12
WHERE id = 1;

-- Excluir
DELETE FROM produtos WHERE id = 1;
```

Sempre use `WHERE id = ?` em atualizações e exclusões para não alterar ou apagar todos os registros por engano. Use parâmetros nas consultas, evitando montar SQL com concatenação de valores recebidos do usuário.

## 5. Conectar o Node.js ao SQLite

Localize o arquivo de conexão que já existe no projeto. Evite criar uma segunda conexão sem necessidade. Um exemplo com `better-sqlite3` é:

```js
const Database = require('better-sqlite3');

// Abre ou cria o arquivo do banco de dados
const db = new Database('./database/banco.db');

// Permite utilizar chaves estrangeiras
db.pragma('foreign_keys = ON');

module.exports = db;
```

O caminho do arquivo deve corresponder à estrutura real do projeto. Se o projeto usa outro pacote SQLite, mantenha o padrão já instalado e adapte os exemplos à biblioteca existente.

## 6. Criar ou modificar rotas no Express

Uma rota conecta uma requisição HTTP a uma ação do sistema. Os métodos mais usados no CRUD são:

| Método | Finalidade | Exemplo |
|---|---|---|
| GET | Consultar | `GET /api/produtos` |
| GET | Consultar um item | `GET /api/produtos/:id` |
| POST | Cadastrar | `POST /api/produtos` |
| PUT | Editar | `PUT /api/produtos/:id` |
| DELETE | Excluir | `DELETE /api/produtos/:id` |

Exemplo de arquivo de rotas com SQLite e Express:

```js
const express = require('express');
const router = express.Router();
const db = require('../database/conexao');

// GET: lista todos os produtos
router.get('/', (req, res) => {
  const produtos = db.prepare('SELECT * FROM produtos').all();
  res.json(produtos);
});

// GET: busca um produto pelo id
router.get('/:id', (req, res) => {
  const produto = db.prepare(
    'SELECT * FROM produtos WHERE id = ?'
  ).get(req.params.id);

  if (!produto) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }

  res.json(produto);
});

// POST: cadastra um produto
router.post('/', (req, res) => {
  const { nome, quantidade, preco } = req.body;

  if (!nome || quantidade == null || preco == null) {
    return res.status(400).json({ erro: 'Preencha os campos obrigatórios' });
  }

  const resultado = db.prepare(
    'INSERT INTO produtos (nome, quantidade, preco) VALUES (?, ?, ?)'
  ).run(nome, quantidade, preco);

  res.status(201).json({
    mensagem: 'Produto cadastrado',
    id: resultado.lastInsertRowid
  });
});

// PUT: atualiza um produto
router.put('/:id', (req, res) => {
  const { nome, quantidade, preco } = req.body;

  const resultado = db.prepare(
    'UPDATE produtos SET nome = ?, quantidade = ?, preco = ? WHERE id = ?'
  ).run(nome, quantidade, preco, req.params.id);

  if (resultado.changes === 0) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }

  res.json({ mensagem: 'Produto atualizado' });
});

// DELETE: exclui um produto
router.delete('/:id', (req, res) => {
  const resultado = db.prepare(
    'DELETE FROM produtos WHERE id = ?'
  ).run(req.params.id);

  if (resultado.changes === 0) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }

  res.json({ mensagem: 'Produto excluído' });
});

module.exports = router;
```

No arquivo principal do servidor, registre a rota. Exemplo:

```js
const express = require('express');
const app = express();

app.use(express.json()); // Permite receber JSON no corpo das requisições
app.use('/api/produtos', require('./routes/produtos'));

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
```

Ajuste os caminhos (`require`) para as pastas reais do projeto. Se já houver `express.json()`, conexão ou `app.listen()`, não duplique.

## 7. Conectar o JavaScript do front-end à API

Use `fetch` para enviar e receber dados. Exemplo de consulta:

```js
async function carregarProdutos() {
  const resposta = await fetch('/api/produtos');
  const produtos = await resposta.json();

  // Atualize a listagem da página com os dados recebidos
  console.log(produtos);
}
```

Exemplo de cadastro:

```js
async function cadastrarProduto() {
  const dados = {
    nome: document.querySelector('#nome').value,
    quantidade: Number(document.querySelector('#quantidade').value),
    preco: Number(document.querySelector('#preco').value)
  };

  const resposta = await fetch('/api/produtos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });

  const resultado = await resposta.json();

  if (!resposta.ok) {
    alert(resultado.erro || 'Não foi possível cadastrar');
    return;
  }

  alert('Cadastro realizado!');
  carregarProdutos();
}
```

Para editar, use `method: 'PUT'` e inclua o `id` na URL. Para excluir, use `method: 'DELETE'` e a URL com o `id`. Após uma operação bem-sucedida, atualize a listagem.

Confira se os seletores HTML (`#nome`, `#quantidade`, `#preco`) existem na página. Mantenha o JavaScript em arquivo separado, conforme a organização do projeto.

## 8. Como adaptar rapidamente os nomes

Imagine que o enunciado peça gerenciamento de clientes em vez de produtos. Faça a substituição de forma consistente:

| Exemplo original | Novo exemplo |
|---|---|
| `produtos` | `clientes` |
| `nome` | `nome` |
| `quantidade` | `telefone` |
| `preco` | `email` |
| `/api/produtos` | `/api/clientes` |
| `routes/produtos.js` | `routes/clientes.js` |
| `carregarProdutos()` | `carregarClientes()` |

A tabela é apenas ilustrativa. Defina os campos corretos pelo enunciado. Depois da troca, revise:
- SQL: nomes das tabelas e colunas;
- rotas: URL, método e parâmetros;
- front-end: IDs dos campos e nomes das funções;
- listagens: propriedades usadas para mostrar cada registro;
- mensagens e validações.

Use a busca global do VS Code (`Ctrl + Shift + F`) para encontrar todas as ocorrências de um nome antigo.

## 9. Roteiro de teste antes de entregar

- [ ] O servidor inicia sem erro?
- [ ] O banco é criado ou conectado corretamente?
- [ ] A tela carrega?
- [ ] O cadastro salva no banco?
- [ ] A consulta mostra os registros salvos?
- [ ] A edição altera somente o registro escolhido?
- [ ] A exclusão remove somente o registro escolhido?
- [ ] Campos obrigatórios são validados?
- [ ] IDs inexistentes retornam mensagem adequada?
- [ ] O navegador não apresenta erros no console?
- [ ] As rotas respondem no endereço esperado?

Teste cada operação no navegador ou em uma ferramenta de requisições e confirme também os dados no banco. Não considere o CRUD pronto apenas porque o botão aparece na tela.

## 10. Se algo der errado

| Problema | O que conferir |
|---|---|
| `npm start` não funciona | O script `start` existe no `package.json`? |
| Porta já está em uso | Feche o outro servidor ou configure outra porta |
| `Cannot find module` | Caminho do `require` e dependências instaladas |
| `req.body` vem vazio | `express.json()` antes das rotas e cabeçalho JSON |
| Erro no banco | Caminho do arquivo, nome da tabela e colunas |
| API retorna 404 | URL, método HTTP e registro da rota no servidor |
| Front-end não atualiza | Verifique o `fetch`, a resposta e a função de renderização |
| Edição/exclusão não funciona | Confira o `id` enviado e o `WHERE id = ?` |

## 11. Ordem recomendada para fazer a prova

1. Leia o enunciado e identifique entidades, campos e operações.
2. Clone/abra a base e faça o servidor iniciar.
3. Adapte o banco de dados e teste a conexão.
4. Adapte as rotas da API e teste cada uma.
5. Conecte formulários e listagens do front-end.
6. Teste cadastro, consulta, edição e exclusão.
7. Só depois faça ajustes visuais, se sobrar tempo.

**Regra principal:** altere o mínimo necessário, aproveite o que já funciona e teste cada etapa antes de avançar. Se o enunciado pedir algo diferente do exemplo, o enunciado sempre tem prioridade.
