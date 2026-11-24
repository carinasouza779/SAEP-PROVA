# Exemplo de adaptação — Oficina mecânica

Este é um exercício de levantamento inicial para a prova. Confirme sempre o enunciado: nem todas as entidades e campos abaixo serão necessários. Use o nome de banco indicado somente se o enunciado permitir ou solicitar esse nome; se ele determinar outro, siga o enunciado.

## Banco de dados

Nome de exemplo: `oficina_db`.

## Possíveis entidades

| Entidade | Para que serve | Campos possíveis |
|---|---|---|
| usuarios | Pessoas que acessam o sistema | id, nome, email, senha_hash, perfil |
| clientes | Pessoas que solicitam serviços | id, nome, telefone, email, documento |
| veiculos | Veículos dos clientes | id, cliente_id, placa, marca, modelo, ano |
| ordens_servico | Serviços solicitados e executados | id, veiculo_id, data_abertura, descricao, status, valor |
| pecas | Peças utilizadas ou disponíveis, se exigido | id, nome, quantidade, valor |

## Relacionamentos que podem existir

- Um cliente pode possuir vários veículos.
- Um veículo pode ter várias ordens de serviço.
- Uma ordem de serviço pode utilizar várias peças, se o controle de peças fizer parte do escopo.

## Perguntas para adaptar corretamente

1. Quais cadastros e operações o enunciado realmente exige?
2. Quais campos são obrigatórios e quais validações precisam ser feitas?
3. Existem estados ou situações (ativo, pendente, concluído, cancelado) que precisam ser controlados?
4. Quais relacionamentos exigem chaves estrangeiras?
5. É necessário registrar qual usuário realizou cada operação?

Não acrescente módulos, tabelas ou regras que não foram pedidos. Atualize o DER, o SQL, as telas, as rotas da API e os testes em conjunto. Preserve as partes do projeto que já estiverem funcionando.
