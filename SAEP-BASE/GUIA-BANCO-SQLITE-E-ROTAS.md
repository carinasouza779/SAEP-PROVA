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

## 3. Criar e modificar rotas no Node.js

As rotas recebem as solicitações do front-end e executam ações no servidor.

| Método | Exemplo de rota | Função |
|---|---|---|
| GET | /api/produtos | Consultar produtos |
| POST | /api/produtos | Cadastrar produto |
| PUT | /api/produtos/:id | Editar produto |
| DELETE | /api/produtos/:id | Excluir produto |

Ao modificar uma rota, confira também o arquivo em que ela é registrada no servidor.

## 4. Conectar o JavaScript do front-end com a API

Use `fetch()` para enviar solicitações para as rotas e receber os dados.

Exemplo de consulta:

```javascript
const resposta = await fetch("/api/produtos");
const produtos = await resposta.json();
```

Para enviar dados, use o método adequado e, normalmente, `JSON.stringify()` no corpo da solicitação.

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
