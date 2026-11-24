# Exemplo de adaptação — Salão de beleza

Este é um exercício de levantamento inicial para a prova. Confirme sempre o enunciado: nem todas as entidades e campos abaixo serão necessários. Use o nome de banco indicado somente se o enunciado permitir ou solicitar esse nome; se ele determinar outro, siga o enunciado.

## Banco de dados

Nome de exemplo: `salao_db`.

## Possíveis entidades

| Entidade | Para que serve | Campos possíveis |
|---|---|---|
| usuarios | Pessoas que acessam o sistema | id, nome, email, senha_hash, perfil |
| clientes | Pessoas atendidas | id, nome, telefone, email |
| profissionais | Funcionários que realizam serviços | id, nome, telefone, especialidade |
| servicos | Serviços oferecidos | id, nome, descricao, duracao, preco |
| agendamentos | Horários marcados | id, cliente_id, profissional_id, servico_id, data_hora, status |

## Relacionamentos que podem existir

- Um cliente pode ter vários agendamentos.
- Um profissional pode realizar vários agendamentos.
- Um serviço pode estar presente em vários agendamentos.

## Perguntas para adaptar corretamente

1. Quais cadastros e operações o enunciado realmente exige?
2. Quais campos são obrigatórios e quais validações precisam ser feitas?
3. Existem estados ou situações (ativo, pendente, concluído, cancelado) que precisam ser controlados?
4. Quais relacionamentos exigem chaves estrangeiras?
5. É necessário registrar qual usuário realizou cada operação?

Não acrescente módulos, tabelas ou regras que não foram pedidos. Atualize o DER, o SQL, as telas, as rotas da API e os testes em conjunto. Preserve as partes do projeto que já estiverem funcionando.
