# Exemplo de adaptação — Restaurante

Este é um exercício de levantamento inicial para a prova. Confirme sempre o enunciado: nem todas as entidades e campos abaixo serão necessários. Use o nome de banco indicado somente se o enunciado permitir ou solicitar esse nome; se ele determinar outro, siga o enunciado.

## Banco de dados

Nome de exemplo: `restaurante_db`.

## Possíveis entidades

| Entidade | Para que serve | Campos possíveis |
|---|---|---|
| usuarios | Pessoas que acessam o sistema | id, nome, email, senha_hash, perfil |
| clientes | Clientes atendidos | id, nome, telefone |
| produtos | Pratos, bebidas e itens do cardápio | id, nome, descricao, preco, categoria, disponivel |
| pedidos | Pedidos realizados | id, cliente_id, data_hora, status, valor_total |
| itens_pedido | Produtos e quantidades de cada pedido | id, pedido_id, produto_id, quantidade, preco_unitario |

## Relacionamentos que podem existir

- Um cliente pode realizar vários pedidos.
- Um pedido possui vários itens.
- Um produto pode aparecer em vários itens de pedidos.

## Perguntas para adaptar corretamente

1. Quais cadastros e operações o enunciado realmente exige?
2. Quais campos são obrigatórios e quais validações precisam ser feitas?
3. Existem estados ou situações (ativo, pendente, concluído, cancelado) que precisam ser controlados?
4. Quais relacionamentos exigem chaves estrangeiras?
5. É necessário registrar qual usuário realizou cada operação?

Não acrescente módulos, tabelas ou regras que não foram pedidos. Atualize o DER, o SQL, as telas, as rotas da API e os testes em conjunto. Preserve as partes do projeto que já estiverem funcionando.
