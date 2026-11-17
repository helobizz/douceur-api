# Douceur API

API RESTful desenvolvida para o gerenciamento de vendas da Douceur, uma marca de doces artesanais que trabalha com produtos como cookies, brownies, cones trufados e outros doces.

O projeto utiliza Node.js, Express e TypeScript, com Sequelize para comunicação com PostgreSQL. Também conta com documentação interativa via Swagger, validações de qualidade de código, hooks de pré-commit com Husky, containerização com Docker e uma esteira de Integração e Entrega Contínua (CI/CD) utilizando GitHub Actions e Render.

## Objetivo

Disponibilizar uma API RESTful para o gerenciamento das vendas da Douceur, permitindo cadastrar, consultar, atualizar e excluir registros de vendas.

Cada venda armazena informações como cliente, produto, quantidade, valor total, forma de pagamento, status da venda, status do pagamento, data da venda e observação.

Além das operações de gerenciamento, o projeto possui um endpoint de Health Check para monitoramento da aplicação em produção.

## Tecnologias utilizadas

- **Node.js** — ambiente de execução da aplicação.
- **TypeScript** — linguagem utilizada no desenvolvimento, com tipagem estática.
- **Express** — framework utilizado para criação da API REST.
- **Sequelize** — ORM utilizado para comunicação com o banco de dados.
- **PostgreSQL** — banco de dados relacional utilizado para armazenamento das vendas.
- **Swagger / OpenAPI** — documentação e testes dos endpoints da API.
- **ESLint** — análise estática e padronização do código.
- **Prettier** — formatação automática do código.
- **Husky** — execução de validações antes dos commits.
- **Docker** — containerização da aplicação.
- **Docker Compose** — execução da API e do PostgreSQL em containers.
- **GitHub Actions** — automação dos workflows de CI e CD.
- **Render** — hospedagem da API e execução dos deploys.
- **pnpm** — gerenciador de pacotes utilizado no projeto.

## Estrutura do projeto

```text
douceur-api/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── cd.yml
├── .husky/
│   └── pre-commit
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   └── swagger.ts
│   ├── controllers/
│   │   └── VendaController.ts
│   ├── models/
│   │   └── Venda.ts
│   ├── routes/
│   │   └── vendaRoutes.ts
│   ├── types/
│   │   └── CreateVendaDTO.ts
│   ├── app.ts
│   └── server.ts
├── .dockerignore
├── .env.example
├── .gitignore
├── .prettierignore
├── .prettierrc
├── docker-compose.yml
├── Dockerfile
├── eslint.config.js
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
└── tsconfig.json
```

## Configuração do ambiente

### Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- Node.js 24 ou superior.
- pnpm 12.6.0.
- Acesso a um banco de dados PostgreSQL, caso a API seja executada diretamente na máquina.
- Docker e Docker Compose, caso seja utilizada a execução containerizada.

### Instalação das dependências

Após clonar o repositório, instale as dependências:

```bash
pnpm install
```

### Variáveis de ambiente

A aplicação utiliza variáveis de ambiente para configurar a conexão com o PostgreSQL.

Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`:

```env
DB_HOST=seu-host
DB_PORT=5432
DB_NAME=seu-banco
DB_USER=seu-usuario
DB_PASSWORD=sua-senha
DB_SSL=true
```

As variáveis possuem as seguintes finalidades:

| Variável      | Descrição                         |
| ------------- | --------------------------------- |
| `DB_HOST`     | Host do servidor PostgreSQL       |
| `DB_PORT`     | Porta utilizada pelo PostgreSQL   |
| `DB_NAME`     | Nome do banco de dados            |
| `DB_USER`     | Usuário do banco de dados         |
| `DB_PASSWORD` | Senha do banco de dados           |
| `DB_SSL`      | Define se a conexão utilizará SSL |

O valor de `DB_SSL` depende do ambiente utilizado. Para a conexão com o PostgreSQL gerenciado pelo Supabase, utiliza-se `true`. No ambiente local com PostgreSQL executado pelo Docker Compose, utiliza-se `false`.

O arquivo `.env` não deve ser versionado no Git, pois pode conter credenciais de acesso ao banco de dados.

## Execução local

Com as dependências instaladas e o arquivo `.env` configurado, a aplicação pode ser executada em modo de desenvolvimento:

```bash
pnpm dev
```

A API será iniciada em:

```text
http://localhost:3000
```

A documentação interativa estará disponível no Swagger:

```text
http://localhost:3000/api-docs
```

Para gerar a versão compilada do projeto:

```bash
pnpm build
```

Após a compilação, a aplicação pode ser iniciada com:

```bash
node dist/server.js
```

### Porta dinâmica

O servidor utiliza a variável de ambiente `PORT` para definir a porta de execução, assumindo `3000` como valor padrão quando a variável não está definida.

```typescript
const PORT = process.env.PORT || 3000;
```

Essa configuração permite executar a aplicação tanto localmente quanto em ambientes de hospedagem, como o Render.

## Execução com Docker Compose

O projeto possui uma configuração com Docker Compose para executar a API e o PostgreSQL em containers.

Para iniciar os serviços, execute:

```bash
docker compose up --build
```

Esse comando:

- Constrói a imagem da API a partir do `Dockerfile`.
- Cria o container da API.
- Cria o container do PostgreSQL.
- Cria uma rede para comunicação entre os serviços.
- Cria um volume persistente para os dados do PostgreSQL.

A API estará disponível em:

```text
http://localhost:3000
```

A documentação Swagger estará disponível em:

```text
http://localhost:3000/api-docs
```

Para visualizar os containers em execução:

```bash
docker compose ps
```

Para interromper os containers:

```bash
docker compose down
```

O PostgreSQL utiliza um volume Docker chamado `postgres_data`, permitindo que os dados sejam mantidos mesmo após os containers serem interrompidos e recriados.

A configuração do Docker Compose utiliza um PostgreSQL executado localmente em container. Por isso, a API utiliza `DB_SSL=false` nesse ambiente.

## Containerização com Docker

O projeto utiliza um `Dockerfile` com estratégia **Multi-Stage Build**, separando a etapa de compilação da etapa de execução em produção.

Essa abordagem permite:

- Utilizar uma imagem Node.js baseada em Alpine.
- Instalar as dependências necessárias para a compilação.
- Compilar o TypeScript para JavaScript, gerando os arquivos na pasta `dist/`.
- Criar uma imagem final contendo apenas as dependências de produção e os arquivos compilados.
- Reduzir o conteúdo desnecessário da imagem utilizada em produção.

A imagem Docker pode ser construída localmente com:

```bash
docker build -t douceur-api:test .
```

Para executar a imagem:

```bash
docker run --env-file .env -p 3000:3000 --name douceur-api-test douceur-api:test
```

O arquivo `.dockerignore` exclui arquivos desnecessários ou sensíveis do contexto de construção da imagem, como:

- `node_modules`
- `.git`
- `.env`
- Arquivos de teste e outros arquivos que não são necessários para a execução da aplicação.

## Endpoints da API

A API disponibiliza operações CRUD para o gerenciamento de vendas.

| Método   | Endpoint      | Descrição                           |
| -------- | ------------- | ----------------------------------- |
| `GET`    | `/vendas`     | Lista as vendas cadastradas         |
| `GET`    | `/vendas/:id` | Consulta uma venda pelo ID          |
| `POST`   | `/vendas`     | Cadastra uma nova venda             |
| `PUT`    | `/vendas/:id` | Atualiza uma venda pelo ID          |
| `DELETE` | `/vendas/:id` | Remove uma venda pelo ID            |
| `GET`    | `/api/health` | Verifica a integridade da aplicação |

### Health Check

O endpoint `GET /api/health` é utilizado para verificar se a aplicação está funcionando corretamente.

A resposta possui código HTTP `200 OK` e retorna um objeto JSON com o status da aplicação e o tempo de atividade do servidor.

Exemplo de resposta:

```json
{
  "status": "ok",
  "uptime": 120
}
```

Esse endpoint também é utilizado pelo Render como caminho de verificação de integridade do Web Service, por meio da configuração `Health Check Path`.

### Respostas e validações

A API realiza validações dos dados recebidos nas requisições e trata diferentes situações de acordo com o resultado da operação.

- `200 OK` — operação realizada com sucesso.
- `201 Created` — venda cadastrada com sucesso.
- `400 Bad Request` — dados inválidos ou ausentes na requisição.
- `404 Not Found` — venda não encontrada.
- `500 Internal Server Error` — erro interno durante o processamento da requisição.

### Exemplo de criação de venda

**POST `/vendas`**

Corpo da requisição:

```json
{
  "cliente": "Ícaro",
  "produto": "Cookie de Nutella",
  "quantidade": 2,
  "valorTotal": 30,
  "formaPagamento": "PIX",
  "statusVenda": "ENCOMENDADA",
  "statusPagamento": "PAGO",
  "dataVenda": "2026-09-26",
  "observacao": "Retirada às 15h"
}
```

A API retorna `201 Created` quando a venda é cadastrada com sucesso.

### Dados da venda

Uma venda possui os seguintes campos:

| Campo             | Tipo   | Descrição                                             |
| ----------------- | ------ | ----------------------------------------------------- |
| `id`              | number | Identificador da venda                                |
| `cliente`         | string | Nome do cliente                                       |
| `produto`         | string | Produto vendido                                       |
| `quantidade`      | number | Quantidade do produto                                 |
| `valorTotal`      | number | Valor total da venda                                  |
| `formaPagamento`  | string | `PIX` ou `DINHEIRO`                                   |
| `statusVenda`     | string | `RESERVADA`, `ENCOMENDADA`, `ENTREGUE` ou `CANCELADA` |
| `statusPagamento` | string | `PAGO` ou `PENDENTE`                                  |
| `dataVenda`       | Date   | Data da venda                                         |
| `observacao`      | string | Observação opcional                                   |

## Documentação da API

A API possui documentação interativa utilizando Swagger/OpenAPI.

Com a aplicação em execução, a documentação pode ser acessada em:

```text
http://localhost:3000/api-docs
```

O Swagger permite visualizar os endpoints disponíveis, consultar parâmetros e corpos das requisições, verificar as respostas esperadas e executar as operações diretamente pela interface utilizando a opção **Try it out**.

## Qualidade de código

O projeto utiliza ferramentas para manter a qualidade, padronização e consistência do código.

### ESLint

O ESLint realiza a análise estática do código e identifica possíveis problemas.

Para executar a verificação:

```bash
pnpm lint
```

### Prettier

O Prettier é utilizado para formatar automaticamente os arquivos do projeto.

Para formatar os arquivos:

```bash
pnpm format
```

Para verificar a formatação:

```bash
pnpm format:check
```

### TypeScript

A verificação de tipos pode ser executada sem gerar os arquivos compilados:

```bash
pnpm typecheck
```

Para compilar o projeto:

```bash
pnpm build
```

## Husky e pre-commit

O projeto utiliza o Husky para executar validações automaticamente antes de cada commit.

O hook `pre-commit` executa:

```bash
pnpm lint
pnpm format:changed
pnpm typecheck
```

O comando `pnpm format:changed` utiliza o lint-staged para aplicar a formatação do Prettier somente aos arquivos preparados para o commit que correspondem aos padrões configurados.

Dessa forma, o projeto executa verificações de qualidade e formatação antes de registrar as alterações no Git.

O hook está versionado no repositório em:

```text
.husky/pre-commit
```

## Integração Contínua (CI)

O projeto utiliza GitHub Actions para executar uma esteira de Integração Contínua, definida no arquivo:

```text
.github/workflows/ci.yml
```

O workflow é acionado nos seguintes eventos:

- `push` na branch `main`.
- `pull_request` direcionado à branch `main`.
- Execução manual pelo GitHub Actions (`workflow_dispatch`).

### Etapas da CI

A esteira executa as seguintes etapas:

1. Checkout do código-fonte do repositório.
2. Habilitação do pnpm.
3. Configuração do Node.js 24 com cache de dependências.
4. Instalação das dependências com `pnpm install --frozen-lockfile`.
5. Validação do código com ESLint.
6. Verificação de formatação com Prettier.
7. Verificação dos tipos com TypeScript.
8. Compilação do projeto.
9. Construção da imagem Docker com `docker build`.
10. Exibição de um resumo da execução.

A esteira é considerada aprovada somente quando todas as etapas são executadas sem erros.

## Entrega Contínua (CD)

A Entrega Contínua é realizada por um segundo workflow do GitHub Actions, localizado em:

```text
.github/workflows/cd.yml
```

Esse workflow é responsável por solicitar automaticamente o deploy da aplicação no Render por meio de um Deploy Hook.

### Condições para execução

A CD utiliza o evento `workflow_run` para acompanhar a conclusão do workflow `Douceur API CI`.

O deploy somente é solicitado quando todas as condições abaixo são atendidas:

- A execução da CI foi concluída com sucesso.
- A execução da CI foi originada por um evento `push`.
- A branch de origem é `main`.

Dessa forma, a aprovação de um Pull Request ou uma execução manual da CI não provoca diretamente um deploy em produção.

### Disparo do Deploy Hook

Após a aprovação da CI, o GitHub Actions executa uma requisição HTTP `POST` para o Deploy Hook do Render utilizando o comando `curl`.

A URL do Deploy Hook é armazenada de forma segura nas configurações do repositório GitHub, como um segredo com o nome:

```text
RENDER_DEPLOY_HOOK_URL
```

A URL não é armazenada diretamente no código-fonte.

O workflow verifica o código HTTP retornado pelo Render:

- `200` — solicitação de deploy iniciada.
- `201` — resposta de sucesso aceita pela validação do workflow.
- `202` — solicitação aceita e colocada na fila de deploy.

Se a resposta não corresponder a um dos códigos aceitos, a etapa é encerrada com erro.

É importante destacar que a conclusão bem-sucedida da CD confirma que a solicitação foi aceita pelo Render. A finalização da implantação é acompanhada no painel do serviço, por meio do status `Live`.

## Deploy no Render

A aplicação está hospedada no Render por meio de um **Web Service com runtime Docker**, conectado ao repositório GitHub.

### Configurações do serviço

O serviço utiliza as seguintes configurações:

- **Runtime:** Docker.
- **Branch:** `main`.
- **Auto-Deploy:** desativado (`No`).
- **Health Check Path:** `/api/health`.

O Auto-Deploy permanece desativado para impedir que os commits enviados ao GitHub provoquem uma implantação sem passar primeiro pelas validações da CI.

A implantação é acionada exclusivamente pelo workflow de CD, por meio do Deploy Hook.

### Variáveis de ambiente

As variáveis necessárias para a execução da aplicação são configuradas diretamente no painel do Render:

| Variável      | Finalidade                                      |
| ------------- | ----------------------------------------------- |
| `NODE_ENV`    | Define o ambiente de execução como `production` |
| `DB_HOST`     | Host do PostgreSQL                              |
| `DB_PORT`     | Porta do PostgreSQL                             |
| `DB_NAME`     | Nome do banco de dados                          |
| `DB_USER`     | Usuário do banco de dados                       |
| `DB_PASSWORD` | Senha do banco de dados                         |
| `DB_SSL`      | Habilita a conexão SSL com o banco              |

O Render fornece automaticamente a variável `PORT`, utilizada pelo servidor para definir a porta de execução. Por isso, ela não precisa ser cadastrada manualmente.

As credenciais do banco de dados e a URL do Deploy Hook não devem ser publicadas no README ou no repositório.

### Aplicação publicada

A aplicação pode ser acessada pelo endereço público disponibilizado no painel do Render.

Endpoint de Health Check:

```text
https://douceur-api.onrender.com/api/health
```

Documentação Swagger:

```text
https://douceur-api.onrender.com/api-docs
```

## Fluxo completo de CI/CD

O processo de entrega da Douceur API ocorre da seguinte maneira:

1. Uma alteração é realizada no código-fonte.
2. O commit é enviado para a branch `main`.
3. O GitHub Actions inicia o workflow de CI.
4. O código passa pelas validações de qualidade, tipagem e formatação.
5. O projeto é compilado.
6. A imagem Docker é construída para validar a conteinerização.
7. Após o sucesso de todas as etapas da CI, o workflow de CD é acionado.
8. A CD envia uma requisição `POST` ao Deploy Hook do Render.
9. O Render inicia a implantação da nova versão da aplicação.
10. O serviço conclui o deploy e passa a apresentar o status `Live`.
11. O endpoint `/api/health` permite verificar a integridade da aplicação publicada.

## Comandos principais

| Comando                              | Finalidade                                   |
| ------------------------------------ | -------------------------------------------- |
| `pnpm install`                       | Instala as dependências do projeto           |
| `pnpm dev`                           | Inicia a API em modo de desenvolvimento      |
| `pnpm lint`                          | Executa a análise do ESLint                  |
| `pnpm format`                        | Formata os arquivos com Prettier             |
| `pnpm format:check`                  | Verifica a formatação dos arquivos           |
| `pnpm format:changed`                | Formata os arquivos preparados para o commit |
| `pnpm typecheck`                     | Verifica os tipos do TypeScript              |
| `pnpm build`                         | Compila o projeto                            |
| `node dist/server.js`                | Executa a aplicação compilada                |
| `docker build -t douceur-api:test .` | Constrói a imagem Docker                     |
| `docker compose up --build`          | Constrói as imagens e inicia os containers   |
| `docker compose ps`                  | Lista os containers do Compose               |
| `docker compose down`                | Interrompe e remove os containers do Compose |

## Repositório

O código-fonte do projeto está disponível no GitHub:

https://github.com/helobizz/douceur-api
