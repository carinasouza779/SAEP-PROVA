# Exemplo de adaptação — Clínica médica

Este é um exercício de levantamento inicial para a prova. Confirme sempre o enunciado: nem todas as entidades e campos abaixo serão necessários. Use o nome de banco indicado somente se o enunciado permitir ou solicitar esse nome; se ele determinar outro, siga o enunciado.

## Banco de dados

Nome de exemplo: `clinica_db`.

## Possíveis entidades

| Entidade | Para que serve | Campos possíveis |
|---|---|---|
| usuarios | Pessoas que acessam o sistema | id, nome, email, senha_hash, perfil |
| pacientes | Pessoas atendidas | id, nome, documento, telefone, email, data_nascimento |
| medicos | Profissionais da clínica | id, nome, crm, especialidade, telefone |
| consultas | Agendamentos e atendimentos | id, paciente_id, medico_id, data_hora, motivo, status |
| especialidades | Áreas médicas, se exigidas | id, nome, descricao |

## Relacionamentos que podem existir

- Um paciente pode ter várias consultas.
- Um médico pode realizar várias consultas.
- Uma especialidade pode estar relacionada a vários médicos, conforme o modelo escolhido.

## Perguntas para adaptar corretamente

1. Quais cadastros e operações o enunciado realmente exige?
2. Quais campos são obrigatórios e quais validações precisam ser feitas?
3. Existem estados ou situações (ativo, pendente, concluído, cancelado) que precisam ser controlados?
4. Quais relacionamentos exigem chaves estrangeiras?
5. É necessário registrar qual usuário realizou cada operação?

Não acrescente módulos, tabelas ou regras que não foram pedidos. Atualize o DER, o SQL, as telas, as rotas da API e os testes em conjunto. Preserve as partes do projeto que já estiverem funcionando.
