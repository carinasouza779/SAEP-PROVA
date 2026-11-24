# Como usar o CSS universal do SAEP

O CSS universal fica no arquivo principal `public/style.css`. Ele serve como ponto de partida visual para sistemas de temas diferentes, como estoque, clínica, biblioteca, escola ou oficina.

## Como ativar

O arquivo `public/index.html` já carrega `style.css`. Portanto, não precisa adicionar outro link no HTML nem criar um segundo arquivo CSS.

## O que ele já organiza

- Fundo, área principal e conteúdo.
- Cabeçalhos, navegação e seções.
- Formulários, campos, selects e botões.
- Tabelas com rolagem em telas pequenas.
- Cartões, mensagens de erro/sucesso e classes auxiliares.
- Layout responsivo para celular e computador.
- Respeito ao atributo HTML `hidden`, importante para telas controladas por JavaScript.

## Como adaptar para qualquer tema

Por padrão, o CSS usa tons neutros para não ficar preso a um segmento específico. Se o enunciado exigir uma cor, altere somente as variáveis no começo de `public/style.css`, dentro de `:root`:

- `--cor-principal`: cor dos botões e elementos principais.
- `--cor-principal-hover`: cor ao passar o mouse.
- `--cor-destaque`: contornos e foco.
- `--cor-fundo`: fundo da página.
- `--cor-superficie`: fundo dos painéis.
- `--cor-texto`: textos principais.
- `--cor-texto-suave`: textos secundários.

Se não houver exigência visual, mantenha os valores padrão. Para novas telas, reutilize as classes `.card`, `.cartao`, `.painel`, `.acoes`, `.sucesso`, `.erro` e `.aviso`.

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

O CSS cuida apenas da aparência. Ele não cria funcionalidades, rotas, tabelas do banco ou validações. Preserve os IDs usados pelo JavaScript e pelo backend. Adapte textos, campos, entidades e regras conforme o enunciado, sem perder tempo reconstruindo o visual do zero.
