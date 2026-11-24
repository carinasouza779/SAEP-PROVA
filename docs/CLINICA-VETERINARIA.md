# Clínica Veterinária — Site Informativo

## 1. Objetivo

Apresentar uma clínica veterinária ao público, disponibilizando informações sobre a instituição, serviços, cuidados com os animais e canais de contato. O visitante pode navegar pelo site sem realizar login.

## 2. Requisitos funcionais

- RF01 — Exibir a apresentação da clínica na página inicial.
- RF02 — Apresentar informações institucionais sobre a clínica.
- RF03 — Exibir os serviços e áreas de atendimento.
- RF04 — Apresentar informações sobre a equipe veterinária.
- RF05 — Disponibilizar dicas de saúde, alimentação e bem-estar animal.
- RF06 — Exibir perguntas frequentes com respostas expansíveis.
- RF07 — Disponibilizar uma seção de contato.
- RF08 — Permitir navegação entre as seções pelo menu.
- RF09 — Adaptar a navegação e o conteúdo para dispositivos móveis.

## 3. Requisitos não funcionais

- RNF01 — Interface responsiva para celular e computador.
- RNF02 — Conteúdo em português.
- RNF03 — Navegação simples e acessível.
- RNF04 — Utilizar HTML, CSS e JavaScript no front-end.
- RNF05 — Utilizar Node.js e Express para disponibilizar o site localmente.

## 4. Regras e cuidados com o conteúdo

- O visitante não precisa realizar login para consultar as informações.
- Informações de endereço, telefone, horários e profissionais devem ser preenchidas com dados oficiais.
- Dicas gerais não substituem avaliação ou orientação veterinária.
- Serviços disponíveis devem ser confirmados diretamente com a clínica.
- Não divulgar dados fictícios como se fossem informações reais.

## 5. Estrutura da página

1. Início — apresentação e chamada principal.
2. A clínica — objetivo e compromisso institucional.
3. Serviços — consultas, vacinação, exames e prevenção.
4. Nossa equipe — apresentação institucional.
5. Dicas — conteúdos informativos para tutores.
6. Dúvidas frequentes — perguntas e respostas.
7. Contato — canal para informações e atendimento.

## 6. Banco de dados e API para estudo

O site público atual é informativo e não depende de login ou cadastro. O projeto mantém em `src/database/sqlite.js` e `src/routes/index.js` um exemplo separado de banco relacional e rotas CRUD para praticar adaptações solicitadas em exercícios.

Esse exemplo técnico não deve ser confundido com uma área de gerenciamento já integrada à página pública.

## 7. Testes manuais

1. Abrir a página inicial sem login.
2. Clicar em cada opção do menu e conferir a seção correspondente.
3. Testar o menu em largura de celular.
4. Abrir e fechar cada pergunta frequente.
5. Conferir a leitura dos textos e imagens.
6. Testar os links de contato após configurar o e-mail oficial.
7. Conferir se o ano do rodapé é atualizado automaticamente.
8. Testar o site em diferentes larguras de tela.