# Como usar o CSS universal do SAEP

O arquivo `public/saep-base.css` foi criado para servir como ponto de partida visual em sistemas de temas diferentes (estoque, clínica, biblioteca, escola, oficina etc.).

## Como ativar

No arquivo `public/index.html`, dentro de `<head>`, carregue o CSS base:

```html
<link rel="stylesheet" href="saep-base.css">
```

Se o HTML já carregar outro CSS, coloque o link do `saep-base.css` depois dele para que as regras da base tenham prioridade quando houver conflito. Não é necessário apagar o CSS antigo.

## O que ele já organiza

- Fundo, área principal e conteúdo centralizado.
- Cabeçalhos, navegação e seções.
- Formulários, campos, selects e botões.
- Tabelas com rolagem em telas pequenas.
- Cartões, mensagens de erro/sucesso e classes auxiliares.
- Layout responsivo para celular e computador.
- Respeito ao atributo HTML `hidden`, importante para telas controladas por JavaScript.

## Como adaptar para qualquer tema

A base usa nomes genéricos e variáveis CSS. Por padrão, usa tons neutros para não ficar presa a um tema específico. Se o enunciado pedir uma cor, altere somente as variáveis no começo do arquivo, dentro de `:root`:

- `--cor-principal`: cor dos botões e elementos principais.
- `--cor-principal-hover`: cor ao passar o mouse.
- `--cor-destaque`: contornos e foco.
- `--cor-fundo`: fundo da página.
- `--cor-superficie`: fundo dos painéis.
- `--cor-texto`: textos principais.
- `--cor-texto-suave`: textos secundários.

Se não houver exigência de identidade visual, mantenha os valores padrão. Para novas telas, reutilize as classes `.card`, `.cartao`, `.painel`, `.acoes`, `.sucesso`, `.erro` e `.aviso`.

## Exemplo de uma nova tela

```html
<section>
  <h2>Cadastro</h2>
  <div class="card">
    <form>
      <label for="nome">Nome</label>
      <input id="nome" type="text" placeholder="Digite o nome" required>
      <button type="submit">Salvar</button>
    </form>
  </div>
</section>
```

## Importante na prova

O CSS cuida apenas da aparência. Ele não cria funcionalidades, rotas, tabelas do banco ou validações. Preserve os IDs usados pelo JavaScript e pelo backend. Adapte os textos, campos, entidades e regras conforme o enunciado, sem perder tempo reconstruindo o visual do zero.

A base foi adicionada como arquivo novo; os arquivos existentes do projeto não precisam ser substituídos.
