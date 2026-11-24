# Exemplo de adaptação — Hotel

Este é um exercício de levantamento inicial para a prova. Confirme sempre o enunciado: nem todas as entidades e campos abaixo serão necessários. Use o nome de banco indicado somente se o enunciado permitir ou solicitar esse nome; se ele determinar outro, siga o enunciado.

## Banco de dados

Nome de exemplo: `hotel_db`.

## Possíveis entidades

| Entidade | Para que serve | Campos possíveis |
|---|---|---|
| usuarios | Pessoas que acessam o sistema | id, nome, email, senha_hash, perfil |
| hospedes | Pessoas responsáveis pelas reservas | id, nome, documento, telefone, email |
| quartos | Acomodações disponíveis | id, numero, tipo, capacidade, valor_diaria, status |
| reservas | Reservas de hospedagem | id, hospede_id, quarto_id, data_entrada, data_saida, status |
| pagamentos | Pagamentos de reservas, se exigidos | id, reserva_id, valor, data_pagamento, forma_pagamento |

## Relacionamentos que podem existir

- Um hóspede pode realizar várias reservas.
- Um quarto pode aparecer em várias reservas em períodos diferentes.
- Uma reserva pode possuir pagamentos, se o controle financeiro for solicitado.

## Perguntas para adaptar corretamente

1. Quais cadastros e operações o enunciado realmente exige?
2. Quais campos são obrigatórios e quais validações precisam ser feitas?
3. Existem estados ou situações (ativo, pendente, concluído, cancelado) que precisam ser controlados?
4. Quais relacionamentos exigem chaves estrangeiras?
5. É necessário registrar qual usuário realizou cada operação?

Não acrescente módulos, tabelas ou regras que não foram pedidos. Atualize o DER, o SQL, as telas, as rotas da API e os testes em conjunto. Preserve as partes do projeto que já estiverem funcionando.
