# Exemplo de adaptação — Almoxarifado

Este é um exercício de levantamento inicial para a prova. Confirme sempre o enunciado: nem todas as entidades e campos abaixo serão necessários. Use o nome de banco indicado somente se o enunciado permitir ou solicitar esse nome; se ele determinar outro, siga o enunciado.

## Banco de dados

Nome de exemplo: `almoxarifado_db`.

## Possíveis entidades

| Entidade | Para que serve | Campos possíveis |
|---|---|---|
| usuarios | Pessoas que acessam o sistema | id, nome, email, senha_hash, perfil |
| produtos | Materiais armazenados | id, nome, descricao, categoria, quantidade, estoque_minimo |
| fornecedores | Empresas que fornecem materiais | id, nome, documento, telefone, email |
| movimentacoes | Entradas e saídas de materiais | id, produto_id, usuario_id, tipo, quantidade, data |
| categorias | Classificação dos produtos, se exigida | id, nome, descricao |

## Relacionamentos que podem existir

- Um produto pode possuir várias movimentações.
- Um usuário pode registrar várias movimentações.
- Um fornecedor pode estar associado a produtos ou entradas, se isso for solicitado.

## Perguntas para adaptar corretamente

1. Quais cadastros e operações o enunciado realmente exige?
2. Quais campos são obrigatórios e quais validações precisam ser feitas?
3. Existem estados ou situações (ativo, pendente, concluído, cancelado) que precisam ser controlados?
4. Quais relacionamentos exigem chaves estrangeiras?
5. É necessário registrar qual usuário realizou cada operação?

Não acrescente módulos, tabelas ou regras que não foram pedidos. Atualize o DER, o SQL, as telas, as rotas da API e os testes em conjunto. Preserve as partes do projeto que já estiverem funcionando.
