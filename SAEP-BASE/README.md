# SAEP-BASE — Preparação para sistemas de gestão

Esta pasta contém modelos de estudo para acelerar a adaptação de um sistema de gestão a diferentes temas de prova. O projeto original na raiz do repositório é preservado.

## Princípio de uso

Reaproveite a estrutura técnica (organização de pastas, conexão com SQLite, autenticação, componentes visuais e padrões de CRUD), mas **modele novamente as entidades, os campos, os relacionamentos e as regras de negócio conforme o enunciado**. Não existe um banco universal que sirva corretamente para todos os temas.

## Roteiro durante a prova

1. Leia o enunciado e marque cada informação que precisa ser cadastrada.
2. Identifique os usuários e os perfis de acesso.
3. Liste as entidades, seus atributos, PKs e FKs.
4. Desenhe o DER e confira cardinalidades.
5. Crie o banco com o nome exigido no enunciado (por exemplo, se a prova pedir literalmente `almoxarifado_db`, use esse nome).
6. Crie as tabelas respeitando tipos, restrições e relacionamentos.
7. Insira a quantidade de registros de exemplo solicitada para **cada tabela**.
8. Implemente login, telas, rotas e operações realmente exigidas.
9. Teste caminhos válidos e inválidos; confira persistência após reiniciar o servidor.
10. Atualize os documentos para refletir o sistema entregue.

## Materiais

- `docs/requisitos-funcionais.modelo.md`: modelo de requisitos funcionais.
- `docs/DER.modelo.md`: roteiro para modelar e documentar o DER.
- `docs/casos-de-teste.modelo.md`: tabela inicial de testes.
- `sql/LEIA-ME.md`: orientações para adaptar o script SQLite.
- `temas/veterinaria/README.md`: exemplo de levantamento de entidades para veterinária.

## Antes de usar

Confira as regras da avaliação e as orientações do avaliador sobre materiais previamente preparados. Estes arquivos são modelos de estudo, não substituem a leitura do enunciado.
