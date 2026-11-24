# Como usar o SAEP-PROVA com git clone

Este guia explica como baixar uma cópia do repositório para o computador e usar a base de preparação sem alterar o projeto original no GitHub.

## 1. Pré-requisitos

- Git instalado no computador.
- Visual Studio Code (ou outro editor).
- Node.js instalado, caso o projeto que você for executar utilize Node.js.

Para conferir se Git e Node.js estão instalados, abra o terminal e execute:

```bash
git --version
node -v
npm -v
```

## 2. Clonar a branch de preparação

A base de preparação foi adicionada na branch `preparacao/saep-base`. Para baixar exatamente essa versão, execute:

```bash
git clone -b preparacao/saep-base https://github.com/carinasouza779/SAEP-PROVA.git
```

O comando cria uma pasta chamada `SAEP-PROVA` no local em que o terminal está aberto.

Entre na pasta:

```bash
cd SAEP-PROVA
```

Abra o projeto no VS Code:

```bash
code .
```

Se o comando `code .` não estiver disponível, abra o VS Code manualmente e escolha **Arquivo > Abrir Pasta**, selecionando a pasta `SAEP-PROVA`.

## 3. Onde encontrar os modelos

Dentro do projeto, abra a pasta:

```text
SAEP-BASE/
```

Ela contém os modelos de requisitos, DER, casos de teste, orientações de SQLite e um exemplo de levantamento para veterinária.

O projeto que já existia no repositório permanece na raiz. A pasta `SAEP-BASE` é material adicional de preparação.

## 4. Como adaptar durante a prova

1. Leia o enunciado inteiro e identifique o que realmente foi solicitado.
2. Faça uma cópia de trabalho do projeto ou crie uma nova branch para a atividade.
3. Consulte os modelos de `SAEP-BASE`.
4. Adapte as entidades, campos, relacionamentos e regras ao tema da prova.
5. Use exatamente o nome de banco de dados pedido no enunciado.
6. Atualize o DER, o script SQL, as telas, o JavaScript e os testes para que todos representem o mesmo sistema.
7. Execute e teste o sistema antes de entregar.

**Atenção:** não existe um banco de dados universal para todos os temas. Por exemplo, um sistema veterinário pode precisar de tutores, animais e consultas; um almoxarifado pode precisar de produtos e movimentações. Crie somente o que o enunciado solicitar.

## 5. (Opcional) Criar uma branch para sua própria atividade

Antes de começar a adaptar os arquivos, você pode criar uma branch:

```bash
git switch -c prova/minha-adaptacao
```

Assim, suas alterações ficam separadas da branch de preparação.

## 6. Instalar dependências e executar

Primeiro, confira o `README.md` do projeto e o `package.json`, se existir. Se houver um `package.json` com dependências, execute:

```bash
npm install
```

Depois, use o comando de inicialização indicado no README ou na seção `scripts` do `package.json`. Não presuma que todo projeto inicia com o mesmo comando.

## 7. Salvar suas alterações no Git

Se você tiver permissão de escrita no repositório e quiser enviar sua branch:

```bash
git add .
git commit -m "Adapta sistema ao tema da prova"
git push -u origin prova/minha-adaptacao
```

Se estiver usando um repositório próprio criado para a prova, confira o endereço remoto antes de enviar:

```bash
git remote -v
```

Não envie arquivos com senhas, tokens, chaves ou dados pessoais. Confira também se o avaliador permite utilizar e reaproveitar materiais previamente preparados.
