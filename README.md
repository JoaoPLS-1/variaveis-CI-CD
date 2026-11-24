# Variaveis de CI/CD

Exercicio pratico sobre warnings no build e a variavel de ambiente `CI`.
Este exemplo usa React com `react-scripts` para reproduzir o comportamento do enunciado.
Create React App esta descontinuado; seu uso aqui e didatico, para estudar esse comportamento em projetos existentes.

## Estrutura

- `package.json`: scripts de build e dependencias.
- `src/App.js`: aplicacao com uma variavel nao utilizada de proposito, que gera warning do ESLint.
- `public/index.html`: pagina base.
- `.github/workflows/build.yml`: Job de Build e artefato de producao.
- `package-lock.json`: versoes resolvidas para instalacao com `npm ci`.

## Executar

Use Node.js 22 e npm. No PowerShell, se a politica de execucao bloquear `npm.ps1`, utilize `npm.cmd`.

```sh
npm ci
npm start
```

Para reproduzir o bloqueio por warnings:

```sh
npm run build:strict
```

Esse comando usa `CI=true` e deve terminar com codigo diferente de zero devido ao aviso intencional.

Para gerar a pasta `build/`, mantendo o warning no log:

```sh
npm run build
```

## Questao 1

O script de build fica em `scripts.build` no `package.json`. A alteracao solicitada e definir `CI=false` antes de executar o build.

Antes:

```json
"build": "react-scripts build"
```

Depois, na sintaxe de shell do Linux usado pelo GitHub Actions:

```json
"build": "CI=false react-scripts build"
```

Neste repositorio, a versao equivalente que funciona tambem no Windows e:

```json
"build": "cross-env CI=false react-scripts build"
```

`cross-env` define a variavel de ambiente de maneira portavel. No `react-scripts`, `CI=false` impede que warnings sejam tratados como falhas de build. Os avisos continuam visiveis e erros reais de compilacao continuam causando falha. Essa variavel nao altera automaticamente o comportamento de qualquer ferramenta de build.

## Questao 2

A atribuicao solicitada e **`CI=false`**, antes de `react-scripts build`. O prefixo exato usado neste projeto e **`cross-env CI=false`**.

Para enviar a alteracao:

```sh
git add .
git commit -m "Configura build com CI=false e workflow do GitHub Actions"
git push -u origin main
```

Depois do push:

1. Abra https://github.com/JoaoPLS-1/variaveis-CI-CD/actions.
2. Abra a execucao do workflow **Build** referente ao commit enviado.
3. Confirme que o Job **Build** concluiu com sucesso (verde).
4. No passo **Gerar arquivos de producao com warnings visiveis**, confira o aviso `no-unused-vars` e a mensagem `Compiled with warnings`.
5. O artefato **build-producao** contem os arquivos gerados na pasta `build/`.

O resultado remoto deve ser verificado na execucao real; a configuracao, por si so, nao comprova que o Job ficou verde.

## Questao 3

Colocar `CI=false` em todos os projetos para evitar builds vermelhos pode esconder sinais de problemas: variaveis sem uso, dependencias incorretas de hooks, avisos de acessibilidade e outros pontos que merecem revisao. Ao permitir que esses avisos se acumulem, a equipe perde parte da barreira automatica de qualidade, aumenta a divida tecnica e pode deixar passar defeitos.

Esse recurso cabe como excecao temporaria e consciente, depois de analisar os avisos e confirmar que nao impedem a entrega. Por exemplo, pode desbloquear uma entrega urgente enquanto a correcao de um aviso conhecido esta registrada com responsavel e prazo. O ideal e corrigir a causa, manter verificacoes de lint e testes apropriadas e restaurar o comportamento rigoroso assim que possivel.

Neste exercicio, o aviso foi introduzido apenas para demonstracao. Ao finalizar, remova a variavel `avisoDidatico` e restaure `"build": "react-scripts build"` para que o GitHub Actions volte a aplicar seu modo de CI padrao.

## Referencias

- [Create React App: variavel CI](https://create-react-app.dev/docs/advanced-configuration/)
- [Create React App: integracao continua](https://create-react-app.dev/docs/running-tests/#continuous-integration)
- [React: descontinuacao do Create React App](https://react.dev/blog/2025/02/14/sunsetting-create-react-app)

## Validacao local realizada

- `npm run build:strict`: codigo de saida 1; o warning `no-unused-vars` reprovou o build com `CI=true`.
- `npm run build`: codigo de saida 0; exibiu `Compiled with warnings` e gerou `build/index.html` com `CI=false`.

Esses resultados comprovam o comportamento local. A confirmacao do Job remoto esta na aba Actions do repositorio.
