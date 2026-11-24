# Exemplo de adaptação — Clínica veterinária

Este é um exercício de levantamento inicial. Confirme sempre o enunciado: nem todas as entidades abaixo serão necessárias.

## Possíveis entidades

| Entidade | Para que serve | Campos possíveis |
|---|---|---|
| usuarios | Pessoas que acessam o sistema | id, nome, email, senha_hash, perfil |
| tutores | Responsáveis pelos animais | id, nome, telefone, email, documento |
| animais | Animais atendidos | id, tutor_id, nome, espécie, raça, nascimento, observações |
| veterinarios | Profissionais | id, nome, crmv, telefone |
| consultas | Atendimentos agendados/realizados | id, animal_id, veterinario_id, data_hora, motivo, status |
| procedimentos | Serviços realizados, se exigidos | id, consulta_id, descrição, valor |

## Relacionamentos que podem existir

- Um tutor pode ser responsável por vários animais.
- Um animal pode ter várias consultas.
- Um veterinário pode realizar várias consultas.
- Uma consulta pode possuir vários procedimentos, se o escopo exigir.

## Perguntas para adaptar corretamente

1. O enunciado pede cadastro de tutores, animais e veterinários?
2. Há agendamento, confirmação, cancelamento ou histórico de consultas?
3. É necessário controlar vacinas, medicamentos ou estoque?
4. Quais dados são obrigatórios e quais validações foram especificadas?
5. O sistema precisa registrar qual usuário realizou cada operação?

Não acrescente módulos como estoque, financeiro ou vacinação sem que sejam pedidos ou aprovados pelo avaliador. Atualize DER, SQL, telas, API e testes em conjunto.
