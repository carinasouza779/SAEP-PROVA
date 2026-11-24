# SAEP Prova — Site Informativo de Clínica Veterinária

Projeto de estudo adaptado para apresentar uma clínica veterinária ao público, utilizando **HTML, CSS, JavaScript, Node.js, Express e SQLite**.

## Como executar

```bash
git clone -b preparacao/saep-base https://github.com/carinasouza779/SAEP-PROVA.git
cd SAEP-PROVA
npm install
npm start
```

Acesse: http://localhost:3000

## O que o visitante encontra

- Página inicial com apresentação da clínica.
- Seção sobre a clínica e seu compromisso com o bem-estar animal.
- Informações sobre consultas, vacinação, exames e prevenção.
- Apresentação institucional da equipe.
- Dicas de saúde, alimentação e bem-estar.
- Perguntas frequentes.
- Formulário público para cadastrar tutor e animal e solicitar agendamento.
- Seleção de veterinário e validação de conflito de horário.
- Área de contato e navegação adaptada para celular.

O site é público: **o visitante não precisa fazer login**. O tutor informa seus dados e os dados do pet e solicita uma consulta pelo formulário. O sistema grava tutor, animal e agendamento no SQLite por meio da API. A clínica deve confirmar a solicitação com o tutor.

## Estrutura principal

- `index.js`: inicia o servidor Express.
- `public/index.html`: conteúdo e seções do site.
- `public/style.css`: identidade visual e responsividade.
- `public/script.js`: menu mobile, FAQ nativo e interações da página.
- `src/database/sqlite.js`: exemplo de conexão e criação de tabelas SQLite.
- `src/routes/index.js`: exemplo de rotas CRUD para estudo e adaptação de API.
- `schema.sql`: modelo relacional de referência.

## Executar e testar

1. Instale as dependências com `npm install`.
2. Inicie com `npm start`.
3. Abra `http://localhost:3000`.
4. Teste os links do menu, navegação entre seções e perguntas frequentes.
5. Preencha o formulário de tutor, animal e agendamento e confira a mensagem de retorno.
6. Tente solicitar duas consultas para o mesmo veterinário no mesmo horário para verificar o bloqueio de conflito.
7. Redimensione a tela para conferir o menu para celular.

## Personalização necessária

- Troque o nome genérico pela identificação oficial da clínica.
- Atualize e-mail, telefone, endereço, horários e dados reais da equipe.
- As imagens atuais são referências externas do Unsplash e precisam de internet para carregar.
- Configure o endereço de e-mail no link de contato quando a clínica fornecer o dado correto.

## Observação sobre API e banco

A página pública é informativa e não utiliza login para visitantes. As rotas e tabelas CRUD que permanecem em `src/` são uma base de estudo para praticar Node.js, Express, SQLite e operações de cadastro. Elas não são apresentadas como funcionalidades públicas do site.

Este projeto é demonstrativo. As informações e imagens devem ser substituídas e revisadas antes de publicar como site oficial de uma clínica real.