# Preparação do banco SQLite

## Nome do banco

Use exatamente o nome informado no enunciado. Se o avaliador solicitar `almoxarifado_db`, mantenha esse nome. A extensão pode ser `.db` (por exemplo, `almoxarifado_db.db`) se a tecnologia/projeto assim organizar o arquivo.

## Estrutura mínima de um script

```sql
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha_hash TEXT NOT NULL
);

-- Crie aqui as tabelas específicas do tema.
-- Defina FOREIGN KEY para representar os relacionamentos.

-- Insira os registros de exemplo solicitados pelo enunciado.
```

## Conferência

- [ ] Nome do banco conforme o enunciado.
- [ ] Todas as tabelas necessárias foram criadas.
- [ ] PKs e FKs estão definidas.
- [ ] Tipos e campos obrigatórios estão corretos.
- [ ] Restrições UNIQUE, NOT NULL e CHECK foram usadas quando necessárias.
- [ ] Há a quantidade mínima de registros solicitada em cada tabela.
- [ ] O script pode ser executado novamente sem falhar (quando projetado com `IF NOT EXISTS` e estratégia de carga adequada).
- [ ] As FKs estão habilitadas na conexão SQLite (`PRAGMA foreign_keys = ON`).

Não copie o exemplo sem adaptar: ele não representa o modelo completo de nenhum tema específico.
